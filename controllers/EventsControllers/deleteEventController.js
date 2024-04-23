const Event = require('../../models/events')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const deleteEventController = async (req, res) => {
    try {
        const id = req.user.userId
       const {key} = req.body
       if (!key) {
        res.status(400).json({message:'Что-то пошло не так... Попробуйте снова!'})
       }

       await Event.findByIdAndDelete(key)
       await User.findByIdAndUpdate(id, {$inc: {events: -1}})

       res.status(201).json({message: 'Успешно'})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteEventController