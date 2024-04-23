const bcrypt = require("bcryptjs");
const { ADMIN_REFRESH_MAX_AGE, ACCESS_MAX_AGE } = require('../../constants');
const ErrorService = require('../../service/errorsService');
const TokenService = require('../../service/tokenService');
require('dotenv').config()

const adminEnterController = async (req, res) => {
    try {
        const email = req.user.email
      if (email!==process.env.ADMIN_EMAIL) {
        return res.status(403).json({message: 'no admin'})
      }
        const password = req.body.password
        const passwordIsMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)
        if (!passwordIsMatch) {
            return res
              .status(400)
              .json({ message: "Неверный пароль!" });
          }
        const date = Date.now()

        const {adminAccessToken, adminRefreshToken} =TokenService.generateAdminTokens({date, device: req.device, os: req.os, browser: req.browser})

        res.cookie("adminAccessToken", adminAccessToken, {
            maxAge: ACCESS_MAX_AGE,
            httpOnly: true,
            sameSite: "Strict",
            path: '/admin'
          });
          res.cookie("adminRefreshToken", adminRefreshToken, {
            maxAge: ADMIN_REFRESH_MAX_AGE,
            httpOnly: true,
            sameSite: "Strict",
            path: '/admin/refresh'
          });

        return res.status(200).json({time: date+ADMIN_REFRESH_MAX_AGE, access: date+ACCESS_MAX_AGE})
        
    } catch (e){
        ErrorService(e, res)
    }
}

module.exports = adminEnterController