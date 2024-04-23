const {Schema, model, Types} = require('mongoose')

const expenseSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    year: String,
    month: String,
    day: String,
    category: String,
    price: Number,
    text: {type: String, default: ''}
})

const Expense = model('Expense', expenseSchema)

const expenseCategoriesSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    categories: Array
})

const ExpenseCategories = model('ExpenseCategories', expenseCategoriesSchema)

module.exports = {Expense, ExpenseCategories}