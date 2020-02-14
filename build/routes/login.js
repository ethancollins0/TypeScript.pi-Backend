"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Authenticate_1 = require("../knex/queries/Authenticate");
var auth = new Authenticate_1.Authenticate();
var router = express_1.Router();
router.post("/signup", function (req, res) {
    var _a = req.body, email = _a.email, name = _a.name, password = _a.password;
    if (!email || !name || !password)
        res.status(401).send();
    auth
        .signup(email, name, password)
        .then(function (result) {
        if (!result)
            res.status(401).send();
        var token = "token=" + result;
        res
            .writeHead(200, {
            "Set-Cookie": token,
            "Access-Control-Allow-Credentials": "true"
        })
            .send();
    })
        .catch(function () { return res.status(500).send; });
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
