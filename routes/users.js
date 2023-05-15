var express = require("express");
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;


/** all paths start with /api/users  **/


/********* REGISTER - done through postman, no frontend form provided *********/

router.post("/register", async (req, res) => {
   //0. get user info from request body
   const {name, email, username, password} = req.body;

   try {
   //1. encrypt password (⇒ `bcrypt.hash()`)
   const hashedPwd = await bcrypt.hash(password, saltRounds);
   console.log(hashedPwd);
   //2. create new user on DB to store user credentials
   await db (`INSERT into users (name, email, username, password) VALUES ("${name}", "${email}", "${username}", "${hashedPwd}")`);
   //3. respond with ok
   res.status(200).send({message: "Registration successful"});
   } catch (err) {
      res.status(400).send(err);
   }

});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
   const {username, password} = req.body;

   try {
   //1. check if user exists on DB
      const results = await db(`SELECT * FROM users WHERE username = "${username}"`);
      console.log(results);
      const user = results.data[0];
   if (user) {
      //2. check if pwd correct (compare passwords ⇒ `bcrypt.compare()`)
      const isCorrect = await bcrypt.compare(password, user.password);
      if(!isCorrect) res.status(401).send({message: "Password not correct"});

      //3. create token using user id (⇒ `sign()`)
      let payload = {userID: user.id};
      const token = jwt.sign(payload, supersecret);

      //4. respond with token
      res.status(200).send({token: token});
   } else {
      res.status(401).send({message: "User not found"});
   }
   } catch(err) {
      res.status(400).send(err);
   }

});



/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", (req, res) => {

  //1. check if user logged in ⇒ get token from header and check it (⇒ `verify()`)
  //2. get from token payload the user id to know which user is logged in
  //3. respond requested data for specific user
});

module.exports = router;
