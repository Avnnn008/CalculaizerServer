const {Schema, model} = require('mongoose')

const errorSchema = new Schema({
    date: Number,
    error: Object
})

const Error = model('error', errorSchema)
module.exports = Error