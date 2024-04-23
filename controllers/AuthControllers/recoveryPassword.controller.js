const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const uuid = require('uuid')
const MailService = require('../../service/mailService')
const ErrorService = require('../../service/errorsService')
const EmailMessageCreator = require('../../service/emailMessageCreator')


const recoveryPasswordController = async (req, res) => {
    try {
        const {email} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Некорректные данные при попытке восстановления пароля', errors: errors.array()})
        }

        const user = await User.findOne({email})
        if (!user) {
           return res.status(400).json({message: 'Пользователь с таким email не зарегистрирован!'})
        }

        const arrForNewPassword = uuid.v4().split('-')
        const newPassword = arrForNewPassword[arrForNewPassword.length-1]
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        await User.findOneAndUpdate({email}, {password: hashedPassword})

        const {subject, text} = EmailMessageCreator.recoveryPassword(newPassword)
        
        await MailService(user.email, subject, text)  

        
        res.status(201).json({message: 'Новый пароль отправлен на Вашу почту!'})

    } catch(e) {
        ErrorService(e, res)
    }
}

module.exports = recoveryPasswordController