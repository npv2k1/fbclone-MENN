var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const flash = require("connect-flash");

// require("./config/passport")(passport);
require("dotenv").config();

var app = express();
// Production React

// app.use(express.static("./../client/build"));

// view engine setup
app.use(cors());

// app.use(passport.initialize());

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/home", require("./routes/home"));
app.use("/chats", require("./routes/chats"));
module.exports = app;
