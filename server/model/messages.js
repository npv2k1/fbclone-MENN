const mongoose = require("./initdb").mongoose;

const messagesSchema = new mongoose.Schema({
  chatId: {
    type: String,
  },
  image: {
    type: String,
  },
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  email:{
      type:String
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// tạo model
const messages = mongoose.model("messages", messagesSchema);

module.exports = messages;
