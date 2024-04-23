const Token = require("../../models/token");
const ErrorService = require("../../service/errorsService");

const logoutController = async (req, res) => {
  try {
    const tokenId = req.cookies.TID;
    await Token.findByIdAndDelete(tokenId);
      res
      .clearCookie("refreshToken", { path: "/api/auth/refresh" })
      .clearCookie("TID", { path: "/api/auth/logout" })
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Выход из системы выполнен успешно" });
 
    
  } catch (e) {
    ErrorService(e, res);
  }
};

module.exports = logoutController;
