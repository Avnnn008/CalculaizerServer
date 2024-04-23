const { ExpenseCategories, Expense } = require("../../models/expenses")
const ErrorService = require("../../service/errorsService")


const getUserExpenseCategories = async (req, res) => {
    try {
        const user = req.user.userId
        const categories = await ExpenseCategories.findOne({user})
        if (!categories) {
           return res.status(200).json({categories: []})
        }
        res.status(200).json({categories: categories.categories})
    } catch (e) {
        ErrorService(e, res)
    }
}

const newUserExpenseCategory = async (req, res) => {
    try {
        const user = req.user.userId
        const {newCategory} = req.body
        await ExpenseCategories.findOneAndUpdate({user}, {$push: {categories: newCategory}}, {upsert: true, new: true})
        res.status(201).json({message: 'success'})
    } catch(e) {
        ErrorService(e, res)
    }
}

const deleteUserExpenseCategory = async (req,res) => {
    try {
        const user = req.user.userId
        const {name} = req.body
        await ExpenseCategories.findOneAndUpdate({user}, {$pull: {categories: name}}) 
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

const updateUserExpenseCategory = async (req, res) => {
    try {
        const user = req.user.userId
        const {edit, newName} = req.body
        await ExpenseCategories.findOneAndUpdate({user, 'categories': edit}, {$set: {'categories.$': newName}})
        await Expense.updateMany({user, category: edit}, {category: newName})
        return res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = {getUserExpenseCategories, newUserExpenseCategory, deleteUserExpenseCategory, updateUserExpenseCategory}