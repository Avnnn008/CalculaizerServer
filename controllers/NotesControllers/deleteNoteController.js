const Note = require('../../models/notes')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const deleteNoteController = async (req, res) => {
    try {
       const {key} = req.body
       const id = req.user.userId
       if (!key) {
        res.status(400).json({message:'Что-то пошло не так... Попробуйте снова!'})
       }

       await Note.findOneAndDelete({user: id, date: key})
       await User.findByIdAndUpdate(id, {$inc: {notes: -1}})
       res.status(201).json({message: 'Успешно'})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteNoteController