const User = require('../../models/user')
const UserRequestsToOpenAI = require('../../models/userRequestsToOpenAI')
const ErrorService = require('../../service/errorsService')

const getUserLimitController = async (req, res) => {
    try {
        const id = req.user.userId
        const user = await User.findById(id, {isVIP: 1})
        const userRequests = await UserRequestsToOpenAI.findOne({user: id}) /* поиск данных о пользовательских запросах в БД */
        let maxPoints
        user.isVIP ? maxPoints =20 : maxPoints = 5
        /* если данных нет или прошло время ограничения лимита - возврат максимального лимита */
        if (!userRequests || Number(userRequests.nextRequestTime) < Date.now()) {
            return res.status(200).json({points: `${maxPoints}/${maxPoints}`, time: 'через 24 часа после 1 запроса'}) 
        } 
        /* или возврат актуального лимита */
        else {
             return res.status(200).json({points: `${userRequests.remainingPoints}/${maxPoints}`, time: new Date(userRequests.nextRequestTime).toLocaleString().replace(',', '')})
        }
        
    } catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getUserLimitController