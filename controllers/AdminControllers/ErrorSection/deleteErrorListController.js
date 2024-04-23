const Error = require("../../../models/errors")
const ErrorService = require("../../../service/errorsService")

const deleteErrorListController = async (req, res) => {
    try {
        const {errorsList} = req.body
        errorsList.map(async (id) => {
            await Error.findByIdAndDelete(id)
        })
        res.status(201).json({message: 'Успешно!'})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteErrorListController