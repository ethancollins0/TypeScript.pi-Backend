"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Authenticate_1 = require("../knex/queries/Authenticate");
var auth = new Authenticate_1.Authenticate();
var router = express_1.Router();
exports.default = router;
