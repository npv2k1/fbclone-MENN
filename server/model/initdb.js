const mongoose = require("mongoose");

require("dotenv").config();

// mongoose options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost/menn", options)
  .then((mess) => {
    console.log("connected to database");
  });
module.exports = { mongoose };
