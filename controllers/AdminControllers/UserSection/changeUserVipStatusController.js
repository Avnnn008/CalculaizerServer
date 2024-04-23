const User = require("../../../models/user")
const EmailMessageCreator = require("../../../service/emailMessageCreator")
const ErrorService = require("../../../service/errorsService")
const MailService = require("../../../service/mailService")

const changeUserVipStatusController = async (req, res) => {
    try {
        const {id, status} = req.body
       const user =  await User.findById(id)
       user.isVIP = status
       await user.save()
    if (status) {
        const {subject, text} = EmailMessageCreator.setVip()
        MailService(user.email, subject, text)
    } else {
        const {subject, text} = EmailMessageCreator.unsetVip()
        MailService(user.email, subject, text)
    }
    res.status(201).json({message: 'success'})
    } catch (e) {
        ErrorService(e, res)
    }
    
}

module.exports = changeUserVipStatusController