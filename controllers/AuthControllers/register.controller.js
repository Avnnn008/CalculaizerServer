const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const EmailConfirm = require('../../models/emailConfirm')
const ErrorService = require('../../service/errorsService')



const registerController = async (req, res) => {
    try {
        const {email, password, name, code} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Некорректные данные при регистрации'})
        }

        const candidate = await User.findOne({email})
        if (candidate) {
           return res.status(400).json({message: 'Пользователь с таким email уже существует!'})
        }

        const confirm = await EmailConfirm.findOne({email})
        if (!confirm) {
            return res.status(400).json({message: 'Не запрошен код подтверждения email!'})
        }
        if (confirm.dateTo < Date.now()) {
            return res.status(400).json({message: 'Истек срок действия кода подтверждения! Запросите код повторно!'})
        }
        if (confirm.confirmCode !== code) {
            return res.status(400).json({message: 'Неверный код подтверждения!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword, name, registrationDate: Date.now()})
        await user.save()
        
        res.status(201).json({message: 'Успешно'})
        
    } catch(e) {
        ErrorService(e, res)
    }
}

module.exports = registerController