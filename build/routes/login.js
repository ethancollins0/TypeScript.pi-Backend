"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/signup", function (req, res) {
    res.json("smoketest");
});
// router.post("/login", (req: Request, res: Response) => {
// });
exports.default = router;
