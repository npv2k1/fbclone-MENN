const mongoose = require("./initdb").mongoose;

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
  },
  image: {
    type: String,
  },
  messages: [],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// tạo model
const chats = mongoose.model("chats", chatSchema);

module.exports = chats;
