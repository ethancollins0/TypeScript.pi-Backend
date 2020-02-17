"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("../knex");
var Pis = /** @class */ (function () {
    function Pis() {
        this.create = function () { };
        this.get = function (user_id) {
            return knex("pis").where({ user_id: user_id });
        };
    }
    return Pis;
}());
exports.default = Pis;
