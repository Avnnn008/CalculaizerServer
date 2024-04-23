const Event = require('../../models/events')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const saveNewEventController = async (req, res) => {
    try {
        const id = req.user.userId
    const {date, newEvent} = req.body
    const event = new Event({user: id, date: new Date(date), newEvent})
    await event.save()
    await User.findByIdAndUpdate(id, {$inc: {events: 1}})
  res.status(201).json({message: 'Сохранено!'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = saveNewEventController