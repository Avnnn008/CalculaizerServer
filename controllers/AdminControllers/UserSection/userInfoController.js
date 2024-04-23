const Token = require("../../../models/token")
const User = require('../../../models/user')
const ErrorService = require("../../../service/errorsService")

const userInfoController = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id, {email: 1, name: 1, isVIP: 1})
        const tokens = await Token.find({user: id}, {date: 1, device: 1, browser: 1, os: 1, location: 1})
        return res.status(200).json({user, tokens})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = userInfoController