import ioRedis from "ioredis";
import logger from "./utils/logger";

export default class SubscribeCapture {
  private subscriber: ioRedis.Redis;
  private psubKey: string;

  public constructor() {
    const REDIS_HOST: string = process.env["REDIS_HOST"] || "127.0.0.1";
    const REDIS_PORT = 6379;
    this.subscriber = new ioRedis(REDIS_PORT, REDIS_HOST);
    this.psubKey = "socket.io*";
  }

  public start() {
    this.initSubscriber();
  }

  private initSubscriber() {
    this.subscriber.psubscribe(this.psubKey);

    this.subscriber.on(
      "pmessage",
      (pattern: string, channel: string, message: string) => {
        logger.info(
          "[CAPTURE_LOG] pattern: %s, channel: %s, message: %s",
          pattern,
          channel,
          message
        );
      }
    );
  }
}
