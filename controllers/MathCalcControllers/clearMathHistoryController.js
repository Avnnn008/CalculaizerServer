const Math = require('../../models/math-calc')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const clearMathHistoryController = async (req, res) => {
    try {
        const id = req.user.userId
        await Math.deleteMany({user: id})
        await User.findByIdAndUpdate(id, {maths: 0})
        res.status(201).json({message: 'Успешно'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = clearMathHistoryController