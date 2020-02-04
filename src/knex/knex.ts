const env = process.env.ENVIRONMENT || "development";
const conf = require("../../knexfile.js")[env];
module.exports = require("knex")(conf);
