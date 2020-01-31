const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("pis")
    .del()
    .then(() => knex("users").del())
    .then(function() {
      return knex("users").insert({
        name: "username",
        email: "username@gmail.com",
        password: bcrypt.hashSync("password", 10)
      });
    });
};
