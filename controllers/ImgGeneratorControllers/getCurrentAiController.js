const ErrorService = require('../../service/errorsService')

require('dotenv').config()

const getCurrentAiController = async (req,res) => {
    try {
       const currentAi = process.env.AI == 'OAI' ? {
        name: 'DALL·E',
        link: 'https://openai.com/dall-e-2',
        policy: 'https://labs.openai.com/policies/content-policy'
       } :
       {
        name: 'Kandinsky',
        link: 'https://fusionbrain.ai/',
        policy: 'https://fusionbrain.ai/static/fusion/docs/agreement.pdf'
       }
       return res.status(200).json({currentAi})
    } catch(e) {
        ErrorService(e, res)
    }
}

module.exports = getCurrentAiController