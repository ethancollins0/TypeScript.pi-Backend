"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var login_1 = __importDefault(require("./routes/login"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors_1.default({ origin: "http://localhost:3000" }));
app.use("/", login_1.default);
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});
