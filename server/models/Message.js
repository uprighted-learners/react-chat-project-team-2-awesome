const mongoose = require("message");
const messageSchema = new mongoose.Schema({
  when: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  body: { type: string, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
