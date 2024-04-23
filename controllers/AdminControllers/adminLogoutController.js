const ErrorService = require("../../service/errorsService")

const adminLogoutController = async (req, res) =>{
    try {
        res.clearCookie('adminRefreshToken', { path: "/admin/refresh" }).clearCookie('adminAccessToken', { path: "/admin" }).json({message: 'admin exit'})
    } catch (e){
        ErrorService(e, res)
    }
}

module.exports = adminLogoutController