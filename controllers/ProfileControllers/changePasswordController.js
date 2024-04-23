
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const changePasswordController = async (req,res) => {
    try {
        const {currentPassword, newPassword} = req.body
        const id = req.user.userId

        const user = await User.findById(id)
        
        const passwordIsMatch = await bcrypt.compare(currentPassword, user.password)

        if (!passwordIsMatch) {
            return res.status(400).json({message: 'Текущий пароль указан неверно!'})
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12)
        await User.findByIdAndUpdate(id, {password: hashedNewPassword})
        res.status(201).json({message: 'Пароль успешно изменен!'})


    } catch(e) {
        ErrorService(e, res)
    }

}

module.exports = changePasswordController