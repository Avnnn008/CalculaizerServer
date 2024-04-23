const jwt = require("jsonwebtoken");
const Token = require('../../models/token');
const ErrorService = require("../../service/errorsService");
const TokenService = require("../../service/tokenService");
const { REFRESH_MAX_AGE, ACCESS_MAX_AGE } = require("../../constants");
require("dotenv").config();

const refreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        /* Нет токена или он просрочен */
        if (!token) {
            return res.status(401).json({message: 'Время сессии истекло! Необходимо заново войти в систему!'})
        }
        /* Рсшифровка токена, его поиск в БД */
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const tokenInDB = await Token.findOne({refreshToken: token})
    /* Токен не валидный/его нет в БД */
    if (!decoded || !tokenInDB) {
      return res.clearCookie('refreshToken')
      .status(401)
      .json({
        message: "Пользователь не авторизован!",
      });
    }
    /* Если попытка входа с данным токеном с другого устройства, он удаляется */
    if (tokenInDB.device !== req.device || tokenInDB.browser !== req.browser || tokenInDB.os !== req.os) {
        await Token.findOneAndDelete({refreshToken: token})
        return res.clearCookie('refreshToken')
      .status(401)
      .json({
        message: "Пользователь не авторизован!",
      });
    }

    const date = Date.now()
    const {accessToken, refreshToken} = TokenService.generateTokens({userId: decoded.userId, email: decoded.email})
    const tokenId = await TokenService.saveToken({newToken: refreshToken, oldToken: token, tokenInfo: {user: decoded.userId}}) 
    res.cookie("refreshToken", refreshToken, {
        maxAge: REFRESH_MAX_AGE,
        httpOnly: true,
        sameSite: "Strict",
        path: '/api/auth/refresh'
      });
  
      res.cookie('accessToken', accessToken, {
        maxAge: ACCESS_MAX_AGE,
        httpOnly: true,
        sameSite: 'Strict'
      })

      res.cookie('TID', tokenId, {
        maxAge: REFRESH_MAX_AGE,
        httpOnly: true,
        sameSite: 'Strict',
        path: '/api/auth/logout'
      })
  
      res.status(201).json({ access_expires_in: date+ACCESS_MAX_AGE, refresh_expires_in: date+REFRESH_MAX_AGE});

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = refreshTokenController