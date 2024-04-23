const { Types } = require("mongoose");
const { Expense } = require("../../models/expenses");
const ErrorService = require("../../service/errorsService");

const newExpenseController = async (req, res) => {
  try {
    const { formData } = req.body;
    const user = req.user.userId;
    const price = parseFloat(formData.price).toFixed(2);
    const date = formData.date.split("-");
    await Expense.create({
      user,
      year: date[0],
      month: date[1],
      day: date[2],
      category: formData.category,
      price,
      text: formData.text,
    });
    res.status(201).json({ message: "success" });
  } catch (e) {
    ErrorService(e, res);
  }
};

const getExpensesForAllYearsController = async (req, res) => {
  try {
    const user = req.user.userId;
    const data = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user) } },
      { $group: { _id: "$year", total: { $sum: "$price" } } },
      { $sort: { _id: -1 } },
    ]);
    const categories = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user) } },
      { $group: { _id: "$category", total: { $sum: "$price" } } },
      { $sort: { total: -1 } },
    ]);
    res.status(200).json({ data, categories });
  } catch (e) {
    ErrorService(e, res);
  }
};

const getExpensesInYearController = async (req, res) => {
  try {
    const user = req.user.userId;
    const { year } = req.query;
    const data = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user), year: year } },
      { $group: { _id: "$month", total: { $sum: "$price" } } },
      { $sort: { _id: 1 } },
    ]);
    const categories = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user), year: year } },
      { $group: { _id: "$category", total: { $sum: "$price" } } },
      { $sort: { total: -1 } },
    ]);
    res.status(200).json({ data, categories });
  } catch (e) {
    ErrorService(e, res);
  }
};

const getExpensesInMonthController = async (req, res) => {
  try {
    const user = req.user.userId;
    const { year, month } = req.query;
    const data = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user), year: year, month: month } },
      { $group: { _id: "$day", total: { $sum: "$price" } } },
      { $sort: { _id: 1 } },
    ]);
    const categories = await Expense.aggregate([
      { $match: { user: new Types.ObjectId(user), year: year, month: month } },
      { $group: { _id: "$category", total: { $sum: "$price" } } },
      { $sort: { total: -1 } },
    ]);
    res.status(200).json({ data, categories });
  } catch (e) {
    ErrorService(e, res);
  }
};

const getExpensesInDayController = async (req, res) => {
  try {
    const user = req.user.userId;
    const { year, month, day } = req.query;
    const data = await Expense.find({ user, year, month, day });
    res.status(200).json({ data });
  } catch (e) {
    ErrorService(e, res);
  }
};

const deleteExpenseController = async (req, res) => {
  try {
    const { id } = req.query;
    await Expense.findByIdAndDelete(id);
    res.status(201).json({ message: "success" });
  } catch (e) {
    ErrorService(e, res);
  }
};

const editExpenseController = async (req, res) => {
    try {
        const {id, newText} = req.body
        await Expense.findByIdAndUpdate(id, {text: newText})
        res.status(201).json({ message: "success" });
    } catch (e) {
        ErrorService(e, res);
      }
}

module.exports = {
  newExpenseController,
  getExpensesForAllYearsController,
  getExpensesInYearController,
  getExpensesInMonthController,
  getExpensesInDayController,
  deleteExpenseController,
  editExpenseController
};
