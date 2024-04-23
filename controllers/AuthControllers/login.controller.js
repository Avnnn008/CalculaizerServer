const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const EmailConfirm = require("../../models/emailConfirm");
const ErrorService = require("../../service/errorsService");
const TokenService = require("../../service/tokenService");
const { ACCESS_MAX_AGE, REFRESH_MAX_AGE } = require("../../constants");
const Token = require("../../models/token");
require("dotenv").config();

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Некорректные данные при входе в систему",
        errors: errors.array(),
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email не зарегистрирован!" });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль. Попробуйте снова!" });
    }

    const date = Date.now()
    const {accessToken, refreshToken} = TokenService.generateTokens({userId: user._id, email: user.email})
    /* saveToken возвращает id сохраненного токена */
    const tokenId = await TokenService.saveToken({newToken: refreshToken, tokenInfo: {user: user._id, device: req.device, os: req.os, browser: req.browser, location: req.location}})
   

    await EmailConfirm.findOneAndDelete({ email: email });

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

    res.status(201).json({ access_expires_in: `${date+ACCESS_MAX_AGE}`, refresh_expires_in: `${date+REFRESH_MAX_AGE}`});

  } catch (e) {
    ErrorService(e, res);
  }
};

module.exports = loginController;
