const OAIImg = require("../../models/openaiImages")
const ErrorService = require("../../service/errorsService")

const getGalleryController = async (req, res) => {
    try {
        const id = req.user.userId
        const {limit, skip} = req.query
        const gallery = await OAIImg.find({user: id}, {user: 0}).sort({date: -1}).skip(skip).limit(limit)
        if (!gallery) {
            return res.status(201).json({gallery: ''})
        }
        return res.status(201).json({gallery})
    } catch (e) {
        ErrorService(e, res)

    }
}

module.exports = getGalleryController