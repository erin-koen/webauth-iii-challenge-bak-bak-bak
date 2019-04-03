exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    // username, string, required, unique
    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.string("department", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
