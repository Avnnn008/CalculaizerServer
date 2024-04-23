const Note = require('../../models/notes')
const ErrorService = require('../../service/errorsService')

const updateNoteController = async (req, res) => {
    try {
        const id = req.user.userId
    const {date, text} = req.body
    await Note.findOneAndUpdate({user: id, date}, {text})
    
    
  res.status(201).json({message: 'Успешно'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = updateNoteController