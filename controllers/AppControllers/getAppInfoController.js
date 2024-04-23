const {Chapter, Content}= require("../../models/infoSection")
const ErrorService = require("../../service/errorsService")

const getAppInfoController = async (req, res) => {
    try {
      const data = await Chapter.aggregate([{$lookup: {from: 'subsections', localField: '_id', foreignField: 'chapter', as: 'subsections'}},{$sort: {order: 1}}])
      res.status(201).json({data})
    } catch (e) {
        ErrorService(e, res)
    }
}

const getContent = async (req, res) => {
  try {
      const {id} = req.query
      const content = await Content.find({subsection: id}).sort({order: 1})
      res.status(200).json({content})
  } catch (e) {
      ErrorService(e, res)
  }
}

module.exports = {getAppInfoController, getContent}