var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();

const username = "test";
const password = "test";
const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.post("/login", function(req, res, next) {
  db(
    `SELECT id FROM users WHERE username = "${req.body.username}" AND password = "${req.body.password}"`
  ).then(results => {
    if (results.data[0]) {
      const user_id = results.data[0].id;
      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      res.status(400).send({ message: "Login NOT successful" });
    }
  });
});

router.get("/profile", userShouldBeLoggedIn, function(req, res, next) {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id
  });
});

module.exports = router;
