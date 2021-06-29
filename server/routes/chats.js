const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../app");

const passport = require("passport");

require("dotenv").config();

// Load User model
const chats = require("../model/chats");

router.get("/", (req, res) => {
  chats.find({}, { _id: 1, chatName: 1, image: 1 }).then((dt) => {
    // console.log("chats =>>",dt)
    return app.render(req, res, "/chats", { ...req.query, listChats: dt });
  });
});
module.exports = router;
