"use strict";
var env = process.env.ENVIRONMENT || "development";
var conf = require("../../knexfile.js")[env];
module.exports = require("knex")(config);
