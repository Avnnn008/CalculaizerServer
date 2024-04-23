const { Schema, model, Types } = require("mongoose");

const UserRequestsToOpenAISchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
      },
      remainingPoints: {
        type: Number
    },
    nextRequestTime: {
        type: Number
    }
})

const UserRequestsToOpenAI = model('UserRequestToOpenAI', UserRequestsToOpenAISchema)

module.exports = UserRequestsToOpenAI