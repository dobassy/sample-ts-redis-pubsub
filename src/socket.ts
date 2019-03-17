import socketIo from "socket.io";
import redisAdapter from "socket.io-redis";
import os from "os";

export default (server: any) => {
  const io = socketIo(server, {path: "/ws"});
  const adapter = redisAdapter({host: '127.0.0.1', port: 6379})
  adapter.pubClient.on('error', () => {
    console.log("Redis connection error")
  });
  io.adapter(adapter)

  io.on("connection", (socket: any) => {
    console.log(`connected: ${os.hostname()} connected, id: ${socket.id}`);

    socket.on("ping", (message: any) => {
      console.log("pong");

      socket.broadcast.emit("message", "pong");
    });

    socket.on("message", (message: any) => {
      console.log(message);

      socket.broadcast.emit("message", `${message}`);
    });

    socket.on('disconnect', () => {
      console.log(`disconnected, id: ${socket.id}`);
    });
  });

  return io;
}
