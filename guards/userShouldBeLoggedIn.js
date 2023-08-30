var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  // Get token from the "authorization" header with format "Bearer <token>"
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token to keep only the token
  let token = authHeader.split(" ")[1];

  try {
    // Throws error on invalid/missing token
    // remember, payload includes the userID we added to it when we created the token
    let payload = jwt.verify(token, supersecret);

    //everything is awesome!
    //get from the payload the userID and store in the req so we can use later
    req.userID = payload.userID;
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

module.exports = userShouldBeLoggedIn;
