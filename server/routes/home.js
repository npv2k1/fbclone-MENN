const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");

require("dotenv").config();
const app = require("../app");

// Load User model
router.get("/", (req, res) => {
  //    res.send("hello")
  return app.render(req, res, "/a", {...req.query,bm:"hello"});
});
router.get("/aaa", (req, res) => {
  res.send("sdcndfs");
});

router.get("/ab", (req, res) => {
  res.send("sdcndfs");
});

router.post("/ab", (req, res) => {
  res.send("sdcndfs");
});
module.exports = router;
