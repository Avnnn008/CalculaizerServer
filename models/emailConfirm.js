const {Schema, model, Types} = require('mongoose')

const emailConfirmSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    confirmCode: {type: String},
    dateTo: Number
})

const EmailConfirm = model('EmailConfirm ', emailConfirmSchema)
module.exports = EmailConfirm