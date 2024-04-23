const jwt = require("jsonwebtoken");
require("dotenv").config();
const ErrorService = require("../service/errorsService");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    /* Токена нет в куках или он просроченный */
    if (!token) {
      return res
      .status(401)
      .json({
        message: "Пользователь не авторизован!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    /* Токен не валидный*/
    if (!decoded) {
      return res
      .status(401)
      .json({
        message: "Пользователь не авторизован!",
      });
    }

    req.user = decoded;
    next();
  } catch (e) {
    ErrorService(e, res)
  }
};
