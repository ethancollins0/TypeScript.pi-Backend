"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.post("/", function (req, res) {
    console.log(req.cookies);
    res.json("smoketest");
});
exports.default = router;
