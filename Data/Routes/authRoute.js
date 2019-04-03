const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../dbConfig.js");
const Users = require("../Helpers/usersHelper.js");
const jwt = require("jsonwebtoken");
const secretPhrase = require("../secrets.js")

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 4);
  try {
    const newUser = await Users.addUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body; //pull the stuff you'll need off the req.body
  console.log(username, password);
  Users.findUserByFilter({ username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Good, good.",
          token
        });
      } else {
        res.status(401).send("Bad creds, gtfo");
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//   try {
//     const user = await Users.findUserByFilter({ username }); //find the user based on username
//     if (user && bcrypt.compareSync(password, user.password)) {//if you've found it, compare the password to what's on file and if that's true...
//       const token = generateToken(user); ///generate a token specific to the user using the function below
//       res.status(200).json({//send a message back letting them know it's good, along with the token for testing purposes
//         message: `Seems like it's working, ${user.username}`,
//         token
//       });
//     } else {
//       res.status(401).send(`Bad creds, gtfo`);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const secret = secretPhrase;
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
};  

module.exports = router;
