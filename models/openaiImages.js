const { Schema, model, Types } = require("mongoose");

const openaiImagesSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, 
  },
  name: {
    type: String,
  },
  size: {
    type: String
  },
  url: {
    type: String
  }
});

const OAIImg = model("OAIImg", openaiImagesSchema);
module.exports = OAIImg;