const OAIImg = require("../../models/openaiImages")
const User = require('../../models/user')
const ErrorService = require("../../service/errorsService")
const { s3RemoveImg } = require("../../service/yandexS3")

const deleteFromGalleryController = async (req, res) => {
    try {
        const id = req.user.userId
        const imgId = req.body.id
        let img = await OAIImg.findById(imgId, {url: 1}) /* объект с id и url */
        await s3RemoveImg(img.url)
        await OAIImg.findByIdAndDelete(imgId)
        await User.findByIdAndUpdate(id, {$inc: {imgs: -1}})
        res.status(201).json({message: 'Успешно'})
    } catch (e)  {
        ErrorService(e, res)
    }
}

module.exports = deleteFromGalleryController