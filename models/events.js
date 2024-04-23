const { Schema, model, Types } = require("mongoose");

const eventSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, 
  },
  newEvent: {
    type: String,
    required: true
  }
});

const Event = model("Event", eventSchema);
module.exports = Event;