const { Schema, model} = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: { type: String, required: true },
  isVIP: {
    type: Boolean,
    default: false,
  },
  notes: {type: Number, default: 0},
  events: {type: Number, default: 0},
  maths: {type: Number, default: 0},
  imgs: {type: Number, default: 0},
  registrationDate: {
    type: Number
  },
  lastVizitDate: {type: Number}
});

const User = model("User", userSchema);
module.exports = User;
