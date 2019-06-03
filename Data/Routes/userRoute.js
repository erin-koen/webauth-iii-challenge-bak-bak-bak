const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../dbConfig.js");
const Users = require("../Helpers/usersHelper.js");
const secret = require("../secrets.js");
const restricted = require('../Middleware/restricted.js')

router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
