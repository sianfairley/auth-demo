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


/********* REGISTER  *********/

router.post("/register", async (req, res) => {
   //0. get user info from request body
   let {name, username, email, password } = req.body;

   try {
   //1. encrypt password (⇒ `bcrypt.hash()`)
   let encryptedPwd = await bcrypt.hash(password, saltRounds);

   //2. create new user on DB to store user credentials
   await db(`INSERT into users (name, email, username, password) VALUES ("${name}", "${email}", "${username}", "${encryptedPwd}" );` );
   //3. respond with ok
   res.status(200).send({message: "Registration successful"});

} catch (err) {
      res.status(400).send(err);
   }

});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
   //0. get user info from request body
   let {username, password} = req.body;

   try {
   //1. check if user exists on DB
      //hint: SQL query returns an array, our user should be the first item
      let results = await db(`SELECT * FROM users WHERE username = "${username}"`);
      const user = results.data[0];

   //if user found...   
   if (user) {
      //2. check if pwd correct (compare passwords ⇒ `bcrypt.compare()`)
      const isCorrect = await bcrypt.compare(password, user.password);
      //3.1 if not correct send back error message
      if(!isCorrect) res.status(401).send({message: "Password incorrect"});

      //3.2 if correct create token using user id (⇒ `sign()`)
      let payload = {userID: user.id};
      const token = jwt.sign(payload, supersecret)
      //4. respond with token
      res.status(200).send({token});
   //if no user found... 
   } else {
      res.status(401).send({message: "User not found"});
   }
   } catch(err) {
      res.status(400).send(err);
   }

});


/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", async (req, res) => {

  //1. check if user logged in by extracting token

  // check "authorization" header, it has the format: "Bearer <token>"
  // and split the string to get only the <token> part
  let authHeader = req.headers["authorization"];

  try {
  //2. extract from token payload the user id (to identify logged in user)
  
  //3. respond requested data for specific user


}catch(error) {
    res.status(500).send({message: "error"});
  }
   
});

module.exports = router;
