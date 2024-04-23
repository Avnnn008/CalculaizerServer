const Math = require("../../models/math-calc");
const User = require('../../models/user');
const ErrorService = require("../../service/errorsService");

const saveMathResultController = async (req, res) => {
  try {
    const id = req.user.userId;
    const { expression, date } = req.body;
    const math = new Math({
      user: id,
      date: new Date(date).toUTCString(),
      expression,
    });
    await math.save();
    await User.findByIdAndUpdate(id, {$inc: {maths: 1}})
    res.status(201).json({ message: "Успешно" });
  } catch (e) {
    ErrorService(e, res)
  }
};

module.exports = saveMathResultController;
