const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../dbConfig.js");
const Users = require("../Helpers/usersHelper.js");
const secret = require("../secrets.js")

router.get("/", (req, res) => {
 
});

module.exports = router;