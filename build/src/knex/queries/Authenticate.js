"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("../knex");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Authenticate = /** @class */ (function () {
    function Authenticate() {
        var _this = this;
        this.login = function (email, password) {
            return knex("users")
                .where({ email: email })
                .first()
                .then(function (res) {
                if (!res)
                    return false;
                var result = bcrypt.compareSync(password, res.password, function (err, result) {
                    if (err)
                        return err;
                    return result;
                });
                return result ? _this.issueToken(res.id) : result;
            });
        };
        this.signup = function (email, name, password) { };
        this.checkToken = function (token) {
            console.log(token);
        };
        //issues a 30 day token
        this.issueToken = function (user_id) {
            var token = jwt.sign({ user_id: user_id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 }, process.env.SECRET);
            console.log(token);
            return token;
        };
    }
    return Authenticate;
}());
exports.Authenticate = Authenticate;
