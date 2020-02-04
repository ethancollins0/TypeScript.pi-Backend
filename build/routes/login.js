"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Authenticate_1 = require("../knex/queries/Authenticate");
var auth = new Authenticate_1.Authenticate();
var router = express_1.Router();
router.get("/signup", function (req, res) {
    res.json("smoketest");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    auth
        .login(email, password)
        .then(function (result) {
        if (result) {
            console.log(result);
            res
                .writeHead(200, {
                "Set-Cookie": "token=" + result
            })
                .end();
        }
        else {
            res.status(401).send();
        }
    })
        .catch(function () { return res.status(500).send(); });
});
exports.default = router;
