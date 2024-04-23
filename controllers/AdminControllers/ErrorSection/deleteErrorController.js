const Error = require("../../../models/errors")
const ErrorService = require("../../../service/errorsService") 

const deleteErrorController = async (req, res) => {
    try {
        const id = req.body.id
        await Error.findByIdAndDelete(id)
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteErrorController