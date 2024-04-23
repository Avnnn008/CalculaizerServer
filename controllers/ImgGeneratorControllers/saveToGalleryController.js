const OAIImg = require('../../models/openaiImages')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')
const {s3SaveFromURL} = require('../../service/yandexS3')

const saveToGalleryController = async (req, res) => {
    try {
        const id = req.user.userId
        const {url, name, size} = req.body
        const date = Date.now()
        const savedUrl = await s3SaveFromURL(url, `$id${date}`)
        const newImg = new OAIImg({user: id, date, name, size, url: savedUrl})
        await newImg.save()
        await User.findByIdAndUpdate(id, {$inc: {imgs: 1}})
        res.status(201).json({message: 'Успешно'})
    } catch (e) {
        ErrorService(e, res) 
    }
}

module.exports = saveToGalleryController