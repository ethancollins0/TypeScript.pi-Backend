const knex = require("../knex");

export default class Pis {
  create = () => {};

  get = (user_id: number) => {
    return knex("pis").where({ user_id });
  };
}
