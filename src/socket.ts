import socketIo from "socket.io";
import redisAdapter from "socket.io-redis";
import os from "os";

export default class WSServer {
  private io: socketIo.Server;

  public constructor(server: any) {
    const REDIS_HOST: string = process.env["REDIS_HOST"] || "127.0.0.1";
    const REDIS_PORT = 6379;

    this.io = socketIo(server, { path: "/ws" });
    const adapter = redisAdapter({ host: REDIS_HOST, port: REDIS_PORT });
    adapter.pubClient.on("error", () => {
      console.log("Redis connection error");
    });
    this.io.adapter(adapter);
    this.initSocket();
  }

  private initSocket() {
    this.io.on("connection", (socket: any) => {
      console.log(`connected: ${os.hostname()} connected, id: ${socket.id}`);

      socket.on("ping", (message: any) => {
        console.log("pong");

        socket.broadcast.emit("message", "pong");
      });

      socket.on("message", (message: any) => {
        console.log(message);

        socket.broadcast.emit("message", `${message}`);
      });

      socket.on("disconnect", () => {
        console.log(`disconnected, id: ${socket.id}`);
      });
    });
  }
}
