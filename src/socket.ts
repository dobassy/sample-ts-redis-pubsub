import socketIo from "socket.io";
import redisAdapter from "socket.io-redis";
import os from "os";
import logger from "./utils/logger";

export default class WSServer {
  private io: socketIo.Server;

  public constructor(server: any, listenPath: string = "/ws") {
    const REDIS_HOST: string = process.env["REDIS_HOST"] || "127.0.0.1";
    const REDIS_PORT = 6379;

    this.io = socketIo(server, { path: listenPath });
    const adapter = redisAdapter({ host: REDIS_HOST, port: REDIS_PORT });
    adapter.pubClient.on("error", () => {
      logger.fatal("Redis connection error");
      process.exit(-1);
    });
    this.io.adapter(adapter);
    this.initSocket();
  }

  private initSocket() {
    this.io.on("connection", (socket: any) => {
      logger.info(
        `[WS_LOG] connected: id: ${socket.id}, hostname: ${os.hostname()}`
      );

      socket.on("ping", () => {
        logger.debug("pong.");

        socket.broadcast.emit("ping", "pong");
      });

      socket.on("message", (message: any) => {
        logger.debug("message received.");

        socket.broadcast.emit("message", `${message}`);
      });

      socket.on("disconnect", () => {
        logger.info(`[WS_LOG] disconnected: id: ${socket.id}`);
      });
    });
  }
}
