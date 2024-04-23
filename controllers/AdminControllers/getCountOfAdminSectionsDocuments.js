const Error = require('../../models/errors')
const User = require('../../models/user')
const ErrorService = require('../../service/errorsService')

const getCountOfAdminSectionsDocuments = async (req, res) => {
    try {
        const usersCount= await User.countDocuments({})
        const errorsCount = await Error.countDocuments({})
        return res.status(200).json({usersCount, errorsCount})
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getCountOfAdminSectionsDocuments