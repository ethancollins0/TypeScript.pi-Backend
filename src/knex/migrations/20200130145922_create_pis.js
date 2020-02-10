exports.up = function(knex) {
  return knex.schema.createTable("pis", t => {
    t.increments("id");
    t.string("name");
    t.string("description");
    t.integer("model_id")
      .unsigned()
      .references("pi_model_info.id");
    t.integer("user_id")
      .unsigned()
      .references("users.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("pis");
};
