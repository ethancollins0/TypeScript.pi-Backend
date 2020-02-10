"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Authenticate_1 = require("../knex/queries/Authenticate");
var auth = new Authenticate_1.Authenticate();
var router = express_1.Router();
router.post("/signup", function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    if (!name || !email || !password)
        res.status(401).send();
    // add logic to create user
    res.status(200).send();
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    auth
        .login(email, password)
        .then(function (result) {
        var token = "token=" + result;
        if (result) {
            res
                .writeHead(200, {
                "Set-Cookie": token,
                "Access-Control-Allow-Credentials": "true"
            })
                .send();
        }
        else {
            res.status(401).send();
        }
    })
        .catch(function () { return res.status(500).send(); });
});
exports.default = router;
