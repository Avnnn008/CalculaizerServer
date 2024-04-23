
const ErrorService = require('../../service/errorsService')
const MailService = require('../../service/mailService')


const sendReviewController = async (req, res) => {
    try {
        const {review} = req.body
        const email = req.user.email
        
        await MailService('ohnnohnn@yandex.ru', 'ОТЗЫВ', `От: ${email} Сообщение: ${review}`)
          
        
        res.status(201).json({message: 'Успешно'})
        
    } catch(e) {
        ErrorService(e, res)
    }
}

module.exports = sendReviewController