const {Router} = require('express')
const auth = require('../middleware/auth-middleware')
const {newExpenseController, getExpensesForAllYearsController, getExpensesInYearController, getExpensesInMonthController, getExpensesInDayController, deleteExpenseController, editExpenseController} = require('../controllers/ExpenseCalcControllers/expensesControllers')
const { getUserExpenseCategories, newUserExpenseCategory, deleteUserExpenseCategory, updateUserExpenseCategory } = require('../controllers/ExpenseCalcControllers/userExpenseCategoriesControllers')

const router = Router()

router.post('/new', auth, newExpenseController)
router.get('/allyears', auth, getExpensesForAllYearsController)
router.get('/inyear', auth, getExpensesInYearController)
router.get('/inmonth', auth, getExpensesInMonthController)
router.get('/inday', auth, getExpensesInDayController)
router.get('/delete', auth, deleteExpenseController)
router.post('/edit', auth, editExpenseController)
router.get('/categories/get', auth, getUserExpenseCategories)
router.post('/categories/new', auth, newUserExpenseCategory)
router.post('/categories/delete', auth, deleteUserExpenseCategory)
router.post('/categories/update', auth, updateUserExpenseCategory)

module.exports = router