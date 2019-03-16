import socketio from "socket.io";

export default (server: any) => {
  let io = socketio(server, {path: "/ws"});

  io.on("connection", function(socket: any) {
    console.log("connected");

    socket.on("message", function(message: any) {
      console.log(message);

      socket.emit("message", `pong ${message}`);
    });

  });
}
