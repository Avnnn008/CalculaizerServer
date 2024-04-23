const Event = require('../../models/events');
const Note = require('../../models/notes');
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')
require("dotenv").config();

const getUserInfoController = async (req,res) => {
    try {   
        const id = req.user.userId
        const user = await User.findById(id, {name: 1, email: 1, notes: 1})
        await User.findByIdAndUpdate(id, {lastVizitDate: Date.now()})
        const notes = await Note.find({user: id}).sort({date: -1}).skip(0).limit(20)
        const events = await Event.find({user: id})
        res.status(200).json({name: user.name, email: user.email, notesCount: user.notes, notes, events})

    } catch(e) {
        ErrorService(e, res)
    }

}

module.exports = {getUserInfoController}