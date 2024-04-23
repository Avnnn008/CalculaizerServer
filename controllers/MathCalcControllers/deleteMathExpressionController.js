const Math = require('../../models/math-calc')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const deleteMathExpressionController = async (req, res) => {
    try {
       const key = req.query.key
       const id = req.user.userId
       if (!key) {
        res.status(400).json({message:'Что-то пошло не так... Попробуйте снова!'})
       }

       await Math.findOneAndDelete({user: id, date: key})
       await User.findByIdAndUpdate(id, {$inc: {maths: -1}})
       res.status(201).json({message: 'Успешно'})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteMathExpressionController