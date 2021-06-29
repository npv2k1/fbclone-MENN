const mongoose = require("./initdb").mongoose;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthday:{
    type: Date,
  },
  image:{
    type: String,
  },
  gender:{
    type:Boolean,
  },
  email: {
    type: String,
    required: true
  },
  phone:{
    type:Number,
  },
  address:{
    type:String,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  token:{
    type:String
  },
  role:{
    type:Number,
    default: 2,
  }
});
// tạo model
const Users = mongoose.model("users", usersSchema);


module.exports = Users
