const Token = require("../../models/token");
const ErrorService = require('../../service/errorsService');

const getDevicesController = async (req, res) => {
    try {
        const id = req.user.userId
        const devices = await Token.find({user: id}, {device: 1, os:1, browser:1, location:1, date: 1})
        res.status(200).json({devices})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getDevicesController