import socketIo from "socket.io";
import socketIoRedis from "socket.io-redis";
import os from "os"

export default (server: any) => {
  let io = socketIo(server, {path: "/ws"});
  io.adapter(socketIoRedis({host: '127.0.0.1', port: 6379}));

  io.on("connection", function(socket: any) {
    console.log(`connected: ${os.hostname()} connected, id: ${socket.id}`);

    socket.on("ping", function(message: any) {
      console.log("pong");

      socket.broadcast.emit("message", "pong");
    });

    socket.on("message", function(message: any) {
      console.log(message);

      socket.broadcast.emit("message", `${message}`);
    });

    socket.on('disconnect', () => {
      console.log(`disconnected, id: ${socket.id}`);
    });
  });
}
