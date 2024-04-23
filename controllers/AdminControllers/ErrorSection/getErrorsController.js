const Error = require("../../../models/errors");
const ErrorService = require("../../../service/errorsService");

const getErrorsController = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const errors = await Error.find({})
    .sort({date: -1})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ errors });
  } catch (e) {
    ErrorService(e, res);
  }
};

module.exports = getErrorsController;
