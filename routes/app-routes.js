const { Router } = require("express");
const auth = require('../middleware/auth-middleware')
const sendReviewController = require('../controllers/AppControllers/sendReviewController');
const {getAppInfoController, getContent} = require("../controllers/AppControllers/getAppInfoController");


const router = Router()

router.post('/review', auth, sendReviewController)
router.get('/appinfo', getAppInfoController)
router.get('/content', getContent)

module.exports = router