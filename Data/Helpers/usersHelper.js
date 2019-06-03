const db = require("../dbConfig.js");

module.exports = {
  addUser,
  getUsers,
  findUserByFilter
};

function findUserByFilter(filter) {
  return db("users").where(filter);
}

function getUsers() {
  return db("users").select("username", "password", "department");
}

async function addUser(user) {
  const [id] = await db("users").insert(user);
  return findUserByFilter({ id });
}
