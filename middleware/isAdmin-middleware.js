const jwt = require("jsonwebtoken");
const ErrorService = require("../service/errorsService");
require('dotenv').config()

module.exports= async (req, res, next) => {
    try {
      const token = req.cookies.adminAccessToken
      /* Если токена нет или он просрочен */
      if (!token) {
        unauthorized()
      }
      const decoded = jwt.verify(token, process.env.JWT_ADMIN_ACCESS_SECRET);
      /* Неверный токен */
      if (!decoded) {
        res.clearCookie('adminAccessToken', { path: "/admin" }).clearCookie('adminRefreshToken', { path: "/admin/api/refresh" })
        unauthorized()
      }

      const useragent = req.fingerprint.components.useragent
      /* Попытка входа с токеном с другого устройства */
      if (useragent.browser.family!==decoded.browser || useragent.os.family !== decoded.os || useragent.device.family !== decoded.device) {
        res.clearCookie('adminAccessToken', { path: "/admin" }).clearCookie('adminRefreshToken', { path: "/admin/api/refresh" })
        unauthorized()
      }

      function unauthorized () {
        return res
        .status(401)
        .json({
          message: "Unauthorized!",
        });
      }
      next()
    } catch (e)  {
      ErrorService(e, res)
    }
}
