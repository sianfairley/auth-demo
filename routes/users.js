var express = require("express");
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
// variables needed for bcrypt to do the encryption
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;


/********* REGISTER - done through postman, no frontend form provided *********/

router.post("/register", async (req, res) => {
   //0. get user info from request body
   //1. encrypt password (⇒ `bcrypt.hash()`)
   //2. create new user on DB to store user credentials
   //3. respond with ok
});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
   //1. check if user exists on DB
   //2. check if pwd correct (compare passwords ⇒ `bcrypt.compare()`)
   //3. create token using user id (⇒ `sign()`)
   //4. respond with token
});



/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", (req, res) => {

  //1. check if user logged in ⇒ get token from header and check it (⇒ `verify()`)
  //2. get from token payload the user id to know which user is logged in
  //3. respond requested data for specific user
});

module.exports = router;
