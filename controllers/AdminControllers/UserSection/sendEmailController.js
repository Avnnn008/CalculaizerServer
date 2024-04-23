const MailService = require("../../../service/mailService");
const User = require("../../../models/user");
const ErrorService = require("../../../service/errorsService");

const sendEmailController = async (req, res) => {
  try {
    const { email, text, recipients } = req.body;
    let to = [],
      users;
    title = text.split("\n")[0];
    message = text.split("\n")[1];

    if (!recipients) {
      to = email;
    } else {
      switch (recipients) {
        case "all":
          users = await User.find({}, { _id: 0, email: 1 });
          break;
        case "old":
          users = await User.find(
            { lastVizitDate: { $lt: Date.now() - 1000 * 60 * 60 * 24 * 60 } },
            { _id: 0, email: 1 }
          );
          break;
        case "vip":
          users = await User.find({ isVIP: true }, { _id: 0, email: 1 });
          break;
        case "novip":
          users = await User.find({ isVIP: false }, { _id: 0, email: 1 });
          break;
          
      }
      users.map((el) => to.push(el.email));
    }
    await MailService(to, title, message);

    res.status(201).json({ message: "success" });
  } catch (e) {
    ErrorService(e, res)
  }
};

module.exports = sendEmailController;
