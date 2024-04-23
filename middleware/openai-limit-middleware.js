const { RateLimiterMemory } = require("rate-limiter-flexible")
const UserRequestsToOpenAI = require('../models/userRequestsToOpenAI')
const User = require('../models/user')

const openAILimiter = new RateLimiterMemory({
    duration: 86400,
    points: 5})

    const openAILimiterVIP = new RateLimiterMemory({
        duration: 86400,
        points: 20})

const openAILimitMiddleware = async (req, res, next) => {
    try {
        const id = req.user.userId
        const vipStatus = await User.findById(id, {isVIP: 1})
        let limRes
        vipStatus.isVIP ? limRes = await openAILimiterVIP.consume(id) : limRes = await openAILimiter.consume(id)
        const userRequest = await UserRequestsToOpenAI.findOne({user: id})
        if (userRequest) {
            await UserRequestsToOpenAI.findOneAndUpdate({user:id}, {remainingPoints: limRes.remainingPoints, nextRequestTime: Date.now()+limRes.msBeforeNext})
        } else {
            const newUserRequest = new UserRequestsToOpenAI({user: id, remainingPoints: limRes.remainingPoints, nextRequestTime: Date.now()+limRes.msBeforeNext})
            await newUserRequest.save()
        }
                next()
    
    } catch {
        res.status(429).json({ message: 'Достигнуто максимальное число генераций за сутки! Возвращайтесь позже!'})}

}

module.exports = openAILimitMiddleware