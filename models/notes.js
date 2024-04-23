const { Schema, model, Types } = require("mongoose");

const noteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, 
  },
  text: {
    type: String,
    required: true
  }
});

const Note = model("Note", noteSchema);
module.exports = Note;