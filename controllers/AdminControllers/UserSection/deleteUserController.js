const User = require("../../../models/user");
const Token = require("../../../models/token");
const MailService = require("../../../service/mailService");
const Note = require("../../../models/notes");
const Event = require("../../../models/events");
const OAIImg = require("../../../models/openaiImages");
const Math = require("../../../models/math-calc");
const ErrorService = require("../../../service/errorsService"); 
const EmailMessageCreator = require("../../../service/emailMessageCreator");

const deleteUserController = async (req, res) => {
    try {
        const id = req.body.id
        const user = await User.findById(id)
        await User.findByIdAndDelete(id)
        await Token.deleteMany({ user: id });
        await Note.deleteMany({ user: id });
        await Event.deleteMany({ user: id });
        await OAIImg.deleteMany({ user: id });
        await Math.deleteMany({ user: id });

        const {subject, text} = EmailMessageCreator.deleteProfileByAdmin()
    
        MailService(
          user.email,
          subject,
          text
        );
        res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteUserController