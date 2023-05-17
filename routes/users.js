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
      //SQL query returns an array, our user should be the first item
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


// MIDDLEWARE - GUARD FUNCTION 
function userIsLoggedIn(req, res, next) {
  //1. check if user logged in by extracting token
  // check "authorization" header, it has the format: "Bearer <token>"
  // and split the string to get only the <token> part
  let authHeader = req.headers["authorization"];
  let arrayHeader = authHeader.split(" "); 
  let token = arrayHeader[1];

  //2. get from token payload the user id to know which user is logged in
  try {
    // remember, payload includes the user_id we added to it when we created the token
    let payload = jwt.verify(token, supersecret);
    
    //get from the payload the user_id and store in the req so we can use later
    req.userID = payload.userID;
    //call next so that we go to the next function in the chain
    next();
  }catch(err) {
    //respond with the error and DON'T CALL next, so that the communication stops here
    res.status(401).send({ error: "Wrong token, unauthorized user" });
  }
}


/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", userIsLoggedIn, async (req, res) => {
  //FIRST TWO STEPS ARE MOVED TO THE MIDDLEWARE FUNCTION userIsLoggedIn
  //1. check if user is logged in
  //2. get userID from token
  
  //I know user is logged in because the userIsLoggedIn guard did the check
  //and the userId was stored inside the req.userID
  
  //3. respond requested data for specific user
  try {
    let results = await db(`SELECT * from users WHERE id = ${req.userID}`);
    console.log(results.data[0]);
    res.send(results.data[0]);
  }catch(error) {
    res.status(500).send({message: "error"});
  }
  
});

module.exports = router;
