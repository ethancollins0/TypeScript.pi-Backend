exports.up = function(knex) {
  return knex.schema.createTable("pi_model_info", t => {
    t.increments("id");
    t.string("model");
    t.number("ram"); // amount of ram in mb
    t.integer("user_id")
      .unsigned()
      .references("users.id");
  });
};

exports.down = function(knex) {};
