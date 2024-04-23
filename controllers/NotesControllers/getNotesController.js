const Note = require('../../models/notes')
const ErrorService = require('../../service/errorsService')

const getNotesController = async (req, res) => {
    try {
        const {limit, skip} = req.query
        const id = req.user.userId
        const notes = await Note.find({user: id}).sort({date: -1}).skip(skip).limit(limit);
        res.status(200).json({notes})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getNotesController