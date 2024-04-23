const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const Token = require("../../models/token");
const MailService = require("../../service/mailService");
const Note = require("../../models/notes");
const Event = require("../../models/events");
const OAIImg = require("../../models/openaiImages");
const Math = require("../../models/math-calc");
const ErrorService = require("../../service/errorsService");
const { s3RemoveImg } = require("../../service/yandexS3");
const EmailMessageCreator = require("../../service/emailMessageCreator");

const deleteProfileController = async (req, res) => {
  try {
    const id = req.user.userId;
    const { password } = req.body;
    const email = req.user.email;
    const user = await User.findById(id);
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Неверный пароль!" });
    }

    await User.findByIdAndDelete(id);
    await Token.deleteMany({ user: id });
    await Note.deleteMany({ user: id });
    await Event.deleteMany({ user: id });
    const openaiImages = await OAIImg.find({user: id})
    openaiImages.map(async (el)=> await s3RemoveImg(el.url))
    await OAIImg.deleteMany({ user: id });
    await Math.deleteMany({ user: id });

    const {subject, text} = EmailMessageCreator.deleteProfile()

    MailService(
      email,
      subject, text
    );

    res
    .clearCookie("refreshToken", { path: "/auth/refresh" })
    .clearCookie("TID", { path: "/auth/logout" })
    .clearCookie("accessToken")
      .status(201)
      .json({ message: "Аккаунт удален" });
  } catch (e) {
    ErrorService(e, res)
};}

module.exports = deleteProfileController;
