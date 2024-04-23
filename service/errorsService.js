const Error = require("../models/errors")

const ErrorService = async (e, res) => {
  try {
    console.log(e)
    const error = new Error({date: Date.now(), error: e})
  await error.save()
  res.status(500).json({message: 'Что-то пошло не так... Попробуйте снова!'})
  } catch {
    res.status(503).json({message: 'Сервер недоступен!'})
  }
  
}

module.exports = ErrorService