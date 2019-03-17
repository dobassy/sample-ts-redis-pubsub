import ioRedis from "ioredis";

export default class SubscribeCapture {
  private subscriber: ioRedis.Redis;
  private psubKey: string;

  constructor() {
    const REDIS_HOST: string = process.env['REDIS_HOST'] || '127.0.0.1';
    const REDIS_PORT: number = 6379;
    this.subscriber = new ioRedis(REDIS_PORT, REDIS_HOST);
    this.psubKey = 'socket\.io*';
  }

  start() {
    this.initSubscriber();
  }

  initSubscriber() {
    this.subscriber.psubscribe(this.psubKey);

    this.subscriber.on('pmessage', (pattern: string, channel: string, message: string) => {
      console.log('pattern', pattern);
      console.log('channel', channel);
      console.log('message', message);
    });
  }
}
