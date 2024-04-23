const { Schema, model} = require("mongoose");

const oaiApiRequestSchema = new Schema({
    key: Number,
    time: Number
})

const OAIApiRequest = model('oaiApiRequest', oaiApiRequestSchema)
module.exports = OAIApiRequest