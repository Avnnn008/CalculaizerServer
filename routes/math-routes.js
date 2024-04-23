const { Router } = require("express");
const auth = require('../middleware/auth-middleware')
const saveMathResultController = require('../controllers/MathCalcControllers/saveMathResultController')
const getMathHistoryController = require('../controllers/MathCalcControllers/getMathHistoryController')
const clearMathHistoryController = require('../controllers/MathCalcControllers/clearMathHistoryController');
const deleteMathExpressionController = require("../controllers/MathCalcControllers/deleteMathExpressionController");

const router = Router()

router.get('/get', auth, getMathHistoryController)
router.post('/save', auth, saveMathResultController)
router.get('/delete', auth, deleteMathExpressionController) 
router.get('/clear', auth, clearMathHistoryController)


module.exports = router