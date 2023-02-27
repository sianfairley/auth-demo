var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

//string needed from the json web token so as to encode the token
const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    //we hash the password (encrypt it) using bcrypt
    const hash = await bcrypt.hash(password, saltRounds);

    //insert the new user and encrypted password on db
    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    //find the user that tries to login
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];

    //if user is found
    if (user) {
      //check if password submitted through the form matches the one stored in DB
      //we compare using bcrypt, so as to compare the encrypted
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id: user.id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;
