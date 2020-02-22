"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Authenticate_1 = require("../knex/queries/Authenticate");
var Pis_1 = __importDefault(require("../knex/queries/Pis"));
var auth = new Authenticate_1.Authenticate();
var pis = new Pis_1.default();
var router = express_1.Router();
router.get("/", function (req, res) {
    var token = req.cookies.token;
    if (!token) {
        res.status(401).send();
        return;
    }
    var decrypted = auth.decryptToken(token);
    pis
        .get(decrypted.user_id)
        .then(function (systems) {
        systems ? res.status(200).json({ systems: systems }) : res.status(404).send(); // no results
    })
        .catch(function () {
        res.status(500).send();
    });
});
exports.default = router;
