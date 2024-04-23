const { RateLimiterMemory } = require("rate-limiter-flexible")

const rateLimiter = new RateLimiterMemory({
    duration: 1,
    points: 20})


const rateLimitMiddleware = async (req, res, next) => {
   try {
    await rateLimiter.consume(req.ip)
    next()
   } catch {
    res.status(429).json({message: 'Превышено число запросов в секунду!'})
   }
}

module.exports = rateLimitMiddleware