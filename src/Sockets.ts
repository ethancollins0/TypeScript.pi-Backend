const jwt = require("jsonwebtoken");

class Sockets {
  checkToken = (token: any) => {
    if (!token) throw Error("Missing token");
    return jwt.verify(token, process.env.SECRET);
  };
}

const sockets = new Sockets();

const handleSockets = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("checkToken", (data: any) => {
      try {
        const result = sockets.checkToken(data.token);
        result.pi_id ? (socket.type = "pi") : (socket.type = "user");
        socket.type == "pi"
          ? socket.join(`${result.user_id}${result.pi_id}`)
          : socket.join(`${result.user_id}${socket.pi_id}`);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

export default handleSockets;
