const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");

require("dotenv").config();

// Load User model
const chats = require("../../model/chats");

router.post("/create", (req, res) => {
  const { chatName, image } = req.body;
  chats.create({ chatName, image }).then((dt) => {
    res.send(dt);
  });
});
router.get("/", (req, res) => {
  chats.find({}, { _id: 1, chatName: 1, image: 1 }).then((dt) => {
    res.status(200).send(dt);
  });
});
module.exports = router;
