const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const createFakeUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  department: faker.name.jobArea()
});

exports.seed = async function(knex, promise) {
  const fakeUsers = [];
  for (let i = 0; i < 100; i++) {
    fakeUsers.push(createFakeUser());
  }
  fs.writeFileSync("./fakeUserInfo.json", JSON.stringify({ users: fakeUsers }));

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 4);
  });

  return await knex("users").insert(fakeUsers);
};
