const Math = require('../../models/math-calc')
const ErrorService = require('../../service/errorsService')

const getMathHistoryController = async (req, res) => {
    try {
        const id = req.user.userId
        const {limit, skip} = req.query
    const history = await Math.find({user: id}).sort({date: -1}).skip(skip).limit(limit)

  res.status(201).json({history})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = getMathHistoryController