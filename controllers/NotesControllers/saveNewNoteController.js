const Note = require('../../models/notes')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const saveNewNoteController = async (req, res) => {
    try {
        const id = req.user.userId
    const {date, text} = req.body
    const note = new Note({user: id, date: new Date(date), text})
    await note.save()
    await User.findByIdAndUpdate(id, {$inc: {notes: 1}})
  res.status(201).json({message: 'Успешно'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = saveNewNoteController