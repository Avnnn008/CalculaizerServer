const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const {
  ACCESS_EXPIRESIN,
  REFRESH_EXPIRESIN,
  ADMIN_REFRESH_EXPIRESIN,
  REFRESH_MAX_AGE
} = require("../constants");
require("dotenv").config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRESIN,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRESIN,
    });
    return { accessToken, refreshToken };
  }

  generateAdminTokens(payload) {
    const adminAccessToken = jwt.sign(
      payload,
      process.env.JWT_ADMIN_ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRESIN }
    );
    const adminRefreshToken = jwt.sign(
      payload,
      process.env.JWT_ADMIN_REFRESH_SECRET,
      { expiresIn: ADMIN_REFRESH_EXPIRESIN }
    );
    return { adminAccessToken, adminRefreshToken };
  }

  refreshAdminToken(payload) {
    const adminAccessToken = jwt.sign(
      payload,
      process.env.JWT_ADMIN_ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRESIN }
    );
    return adminAccessToken;
  }

  async saveToken({ newToken, oldToken, tokenInfo }) {
    try {
      const date = Date.now();
      /* удаляются все просроченные токены */
      await Token.deleteMany({
          user: tokenInfo.user,
          updated: { $lt: Date.now() - REFRESH_MAX_AGE },
        });
      if (oldToken) {
        const updateToken = await Token.findOneAndUpdate(
          { refreshToken: oldToken },
          { refreshToken: newToken, updated: date }
        );
        return updateToken._id
      } else {
        const createdToken = new Token({
          user: tokenInfo.user,
          date: date,
          updated: date,
          device: tokenInfo.device,
          os: tokenInfo.os,
          browser: tokenInfo.browser,
          location: tokenInfo.location,
          refreshToken: newToken,
        });
        await createdToken.save()
        return createdToken._id     
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new TokenService();
