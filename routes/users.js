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

   try {
   //1. encrypt password (⇒ `bcrypt.hash()`)

   //2. create new user on DB to store user credentials
   
   //3. respond with ok

   
} catch (err) {
      res.status(400).send(err);
   }

});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
   //0. get user info from request body

   try {
   //1. check if user exists on DB
      //hint: SQL query returns an array, our user should be the first item

   //if user found...   
   if (user) {
      //2. check if pwd correct (compare passwords ⇒ `bcrypt.compare()`)

      //3.1 if not correct send error

      //3.2 else create token using user id (⇒ `jwt.sign()`)

      //...and respond with token
   
   //if no user found... 
   } else {
      res.status(401).send({error: "User not found"});
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
  //2. verify token and extract payload that includes user id (⇒ `jwt.verify()`)  

  //3. get requested data from DB and respond

  }catch(err) {
    res.status(500).send(err);
  }
   
});


module.exports = router;
