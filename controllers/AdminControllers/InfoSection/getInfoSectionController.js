const { Chapter} = require("../../../models/infoSection");
const ErrorService = require("../../../service/errorsService");

const getInfoSectionController = async (req, res) => {
    try {
        const infoSection = await Chapter.aggregate([{$lookup: {from: 'subsections', localField: '_id', foreignField: 'chapter', as: 'subsections'}},{$sort: {order: 1}}])
 
        res.status(200).json({infoSection})
    }
    catch (e) {
        ErrorService(e, res)
    }
}

module.exports = getInfoSectionController