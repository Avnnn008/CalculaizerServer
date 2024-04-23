const Token = require("../../../models/token")
const ErrorService = require("../../../service/errorsService")

const deleteDeviceController = async (req, res) => {
    try {
        const id = req.body.id
        await Token.findByIdAndDelete(id)
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteDeviceController