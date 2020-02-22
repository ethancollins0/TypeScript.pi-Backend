"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var Sockets = /** @class */ (function () {
    function Sockets() {
        this.checkToken = function (token) {
            if (!token)
                throw Error("Missing token");
            return jwt.verify(token, process.env.SECRET);
        };
    }
    return Sockets;
}());
var sockets = new Sockets();
var handleSockets = function (io) {
    io.on("connection", function (socket) {
        socket.on("checkToken", function (data) {
            try {
                var result = sockets.checkToken(data.token);
                result.pi_id ? (socket.type = "pi") : (socket.type = "user");
                socket.type == "pi"
                    ? socket.join("" + result.user_id + result.pi_id)
                    : socket.join("" + result.user_id + socket.pi_id);
                var clients = io.sockets.adapter.rooms["" + result.user_id + socket.pi_id];
                console.log(clients.sockets);
            }
            catch (err) {
                console.log(err);
            }
        });
    });
};
exports.default = handleSockets;
