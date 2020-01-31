exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .first()
    .then(user => {
      return knex("pis").insert([
        {
          name: "First Pi",
          description: "For the tomatoes",
          model: "3A+",
          user_id: user.id
        }
      ]);
    });
};
