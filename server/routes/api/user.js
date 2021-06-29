const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");

require("dotenv").config();
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../model/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(200).json({ errors });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(200)
        .json({ errors: { email: "Email already exists" } });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/signin", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  console.log("email :>> ", email);
  console.log(`password`, password);

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists

    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    if (!user.password) {
      return res.status(401).json({ error: "no password" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id: user.id,
          name: user.name,
          gender: user.gender,
          birthday: user.birthday,
          email: user.email,
          phone: user.phone,
          address: user.address,
          image: user.image || "",
        };
        return res.json(payload);

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/update", (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);
  //  if (!isValid) {
  //    return res.status(400).json(errors);
  //  }
  User.updateOne({ email: req.body.email }, { ...req.body }).then((msg) => {
    User.findOne({ email: req.body.email }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      const payload = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 31556926, // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    });
  });
});

module.exports = router;
