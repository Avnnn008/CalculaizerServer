const bcrypt = require('bcryptjs')
const User = require("../../models/user");
const Token = require("../../models/token");
const ErrorService = require('../../service/errorsService');

const deleteDeviceController = async (req,res) => {
    try {
     const userId = req.user.userId
     const {password, id} = req.body

     const user = await User.findById(userId)
     const passwordIsMatch = await bcrypt.compare(password, user.password);
     if (!passwordIsMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль. Попробуйте снова!" });
      }
    await Token.findByIdAndDelete(id)
    return res.status(201).json({message: 'Сессия удалена!'})

    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = deleteDeviceController