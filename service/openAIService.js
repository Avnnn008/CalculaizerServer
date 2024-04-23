const {OpenAI} = require('openai');
const OAIApiRequest = require('../models/oaiApiRequest');
require('dotenv').config()

const KEYS = {0: process.env.OPENAI_API_KEY, 
  1: process.env.OPENAI_API_KEY2, 
  2: process.env.OPENAI_API_KEY3, 
  3: process.env.OPENAI_API_KEY4, 
  4: process.env.OPENAI_API_KEY5}

  /* Принимает текст для генерации, размер картинки, 
  изначальный ключ - номер из БД ключа, который использовался раньше всех,
  изначальный индекс - -1, чтобы при возникновении ошибки с изначальным ключом перебирались ключи из объекта с ключами начиная с 0 индекса  */
const GenerateImage = async (prompt, size, key, index) => {
  try {
    const openai = new OpenAI({
    apiKey: KEYS[key]
  });

  /* Получаем 1 изображение с заданным описанием и размером */
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size
  } 
  )

  /* Если запрос выполнен удачно */
  if (response.data) {
    /* Обновляем время запроса по данному ключу в бд */
    await OAIApiRequest.findOneAndUpdate({key}, {time: response.created})
  /* Возвращаем ссылку на изображение */
  return {url: response.data[0].url, error: undefined}
  } else throw new Error
  


  } catch (e) {
    if (/safety system/.test(e.message)) {
       return {url: undefined, error: 'safety'}
    }
    /* если воззникает ошибка с ключом апи, пробуем следующие */
    else if (index< 4) {
     return GenerateImage(prompt, size, key=index+1, index+1)
    } 
    /* если ограничения лимита по всем апи ключам */
    else if (/Rate limit/.test(e.message)) {
      return {url: undefined, error: 'limit'}
    }
    else {
      
      return {url: undefined, error: e}}
    
  }
    

}

module.exports = GenerateImage
