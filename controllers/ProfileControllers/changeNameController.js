
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const changeNameController = async (req,res) => {
    
    try {
        const {name} = req.body
        const id = req.user.userId

        await User.findByIdAndUpdate(id, {name:name})

        res.status(201).json({message: 'Имя успешно изменено!'})


    } catch(e) {
        ErrorService(e, res)
    }

}

module.exports = changeNameController