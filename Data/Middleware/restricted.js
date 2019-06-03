const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secrets.js")

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.status(401).send("Wrong creds, gtfo");
      } else {
        req.decodedJWT = decodedToken; //just in case we need it in react app tomorrow
        next();
      }
    });
  } else {
    res.status(400).send("Gimme dat token");
  }
};
