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
  
});


/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
  
});

/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", (req, res) => {

});

module.exports = router;
