const jwt = require("jsonwebtoken");
const ErrorService = require("../../service/errorsService");
const TokenService = require("../../service/tokenService");
const {ACCESS_MAX_AGE } = require("../../constants");
require("dotenv").config();

const refreshAdminTokenController = async (req, res) => {
    try {
        const token = req.cookies.adminRefreshToken
        /* Нет токена или он просрочен */
        if (!token) {
            return res.status(401).json({message: 'Unauthorized!'})
        }
        /* Рсшифровка токена, его поиск в БД */
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_REFRESH_SECRET);

    /* Токен не валидный */
    if (!decoded) {
      return res.clearCookie('adminRefreshToken', { path: "/admin/refresh" })
      .status(401)
      .json({
        message: "Unauthorized!",
      });
    }
    /* Если попытка входа с данным токеном с другого устройства, он удаляется */
    if (decoded.device !== req.device || decoded.browser !== req.browser || decoded.os !== req.os) {
        return res.clearCookie('adminRefreshToken', { path: "/admin/refresh" })
      .status(401)
      .json({
        message: "Unauthorized!",
      });
    }
    const date = Date.now()
    const adminAccessToken =TokenService.refreshAdminToken({date, device: req.device, os: req.os, browser: req.browser})

    res.cookie("adminAccessToken", adminAccessToken, {
        maxAge: ACCESS_MAX_AGE,
        httpOnly: true,
        sameSite: "Strict",
        path: '/admin'
      });
  
      res.status(201).json({ access: date+ACCESS_MAX_AGE});

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = refreshAdminTokenController