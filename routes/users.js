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

/********* REGISTER - done through postman, no frontend form provided *********/

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    //we hash the password (encrypt it) using bcrypt
    const hash = await bcrypt.hash(password, saltRounds);

    //insert the new user and encrypted password on db
    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
    );

    res.status(200).send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    //find on the DB the user that tries to login
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];

    //if user is found on DB
    if (user) {
      //check if password submitted through the form matches the one stored in DB
      //use bcrypt cause stored password is encrypted
      const correctPassword = await bcrypt.compare(password, user.password);
      
      //if not matching
      if (!correctPassword) throw new Error("Incorrect password");

      //else, create and send token
      const token = jwt.sign({ user_id: user.id }, supersecret);
      res.status(200).send({ message: "Login successful, here is your token", token, user_id: user.id});
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", userShouldBeLoggedIn, (req, res) => {
  res.status(200).send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;
