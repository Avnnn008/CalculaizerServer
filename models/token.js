const { Schema, model, Types } = require("mongoose");

const tokenSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  date: Number,
  updated: Number,
  device :String,
  os: String,
  browser: String,
  location: String,
  refreshToken: {
    type: String, 
    required: true
  },
});

const Token = model("Token", tokenSchema);
module.exports = Token;
