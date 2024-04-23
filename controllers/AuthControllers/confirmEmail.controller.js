const {validationResult} = require('express-validator')
const User = require('../../models/user')
const EmailConfirm = require('../../models/emailConfirm')
const MailService = require('../../service/mailService')
const ErrorService = require('../../service/errorsService')
const EmailMessageCreator = require('../../service/emailMessageCreator')


const confirmEmailController = async (req, res) => {
    try {
        const {email} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Некорректный email'})
        }

        const candidate = await User.findOne({email})
        if (candidate) {
           return res.status(400).json({message: 'Пользователь с таким email уже существует!'})
        }
        const code = `${Math.floor(Math.random()*1000000)}` 
        const searchedEmail = await EmailConfirm.findOne({email})
        const dateTo = Date.now() + 1000*60*15
        if (searchedEmail) {
            await EmailConfirm.findOneAndUpdate({email}, {confirmCode: code, dateTo})
        } else {
           const confirm = new EmailConfirm({email, confirmCode: code, dateTo})
        await confirm.save() 
        }

        const {subject, text} = EmailMessageCreator.confirmEmail(code)

        await MailService(email, subject, text )
          
        
        res.status(201).json({message: 'Успешно'})
        
    } catch(e) {
        ErrorService(e, res)
    }
}

module.exports = confirmEmailController