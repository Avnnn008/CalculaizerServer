const Event = require('../../models/events')
const ErrorService = require('../../service/errorsService')

const getEventsController = async (req, res) => {
    try {
        const id = req.user.userId

        const events = await Event.find({user: id})
        res.status(200).json({events})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getEventsController