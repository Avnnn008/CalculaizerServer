const {Router} = require('express')
const auth = require('../middleware/auth-middleware')
const generateImgController = require('../controllers/ImgGeneratorControllers/generateImgController')
const openAILimitMiddleware = require('../middleware/openai-limit-middleware')
const getUserLimitController = require('../controllers/ImgGeneratorControllers/getUserLimitController')
const saveToGalleryController = require('../controllers/ImgGeneratorControllers/saveToGalleryController')
const getGalleryController = require('../controllers/ImgGeneratorControllers/getGalleryController')
const deleteFromGalleryController = require('../controllers/ImgGeneratorControllers/deleteFromGalleryController')
const getCurrentAiController = require('../controllers/ImgGeneratorControllers/getCurrentAiController')


const router = Router()

router.get('/currentai', auth, getCurrentAiController)
router.post('/generateimg', auth, openAILimitMiddleware, generateImgController)
router.get('/limit', auth, getUserLimitController)
router.post('/save', auth, saveToGalleryController)
router.get('/gallery', auth, getGalleryController)
router.post('/deleteimg', auth, deleteFromGalleryController)

module.exports = router