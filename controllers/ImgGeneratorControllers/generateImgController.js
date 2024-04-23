const {translate} = require('@vitalets/google-translate-api') ;
const GenerateImage = require('../../service/openAIService');
const OAIApiRequest = require('../../models/oaiApiRequest');
const ErrorService = require('../../service/errorsService');
const startGeneration = require('../../service/KandinskyService');
require('dotenv').config()

const generateImgController = async (req,res) => {
    if (process.env.AI === 'OAI') return generateImgWithOpenAI(req, res)
    if (process.env.AI === 'Kandinsky') return generateImgWithKandinsky(req, res)
    else return res.status(500).json({message: 'Что-то пошло не так! Напишите нам, мы все исправим!'})
}

async function generateImgWithOpenAI(req, res)  {
    try {
        /* Получение и перевод на английский запроса пользователя */
          const text = await translate(req.body.prompt, {to: 'en'})
          const size = req.body.size
          const keys = await OAIApiRequest.find({}).sort({time: 1}) /* объекты из бд с номерами api ключей и временем последнего использования, отсортированные по возрастанию времени  */
          const key = keys[0].key /* номер api ключа, который использовался раньше всех */
          /* Получение url изображения от OpenAI или ошибки */
          const {url, error} = await GenerateImage(text.text, size, key, -1)
          
          if (error === 'safety') {
              return res.status(400).json({message: 'Запрос содержит текст, не разрешенный системой безопасности openAI!'})
          }
  
          if (error === 'limit') {
              return res.status(429).json({message: 'В настоящее время генерируется слишком много картинок. Попробуйте позже!'})
          }
  
          if (error) {
              throw new Error(error)
          }
  
          if (!url)  {
              throw new Error
          }
          /* Отправка ссылки на изображение на фронтенд */
          res.status(200).json({message: [url, req.body.prompt, size]})
      } catch (e) {
          ErrorService(e, res)
      }
}

async function generateImgWithKandinsky(req, res) {
    try {
        const {prompt, size} = req.body
        const url = await startGeneration(prompt, size)
        return res.status(200).json({message: [url, prompt, size]})
    } catch(e) {
        if (e==='censored') return res.status(400).json({message: 'Запрос содержит текст, не разрешенный системой безопасности!'})
        ErrorService(e, res)
    }
}

module.exports = generateImgController