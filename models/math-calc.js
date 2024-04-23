const {Schema, model, Types} = require('mongoose')

const mathSchema = new Schema({
    user: {
        type: Types.ObjectId, ref: 'User',
        required: true
    },
    date: {type: String},
    expression: {type: String}
})

const Math = model('Math', mathSchema)
module.exports = Math