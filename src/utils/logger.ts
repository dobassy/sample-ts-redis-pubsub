import * as log4js from "log4js";

const stdoutLayout: string =
  process.env.NODE_ENV === "production" ? "basic" : "coloured";
const logLevel: string =
  process.env.NODE_ENV === "production" ? "info" : "debug";

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: { type: stdoutLayout }
    }
  },
  categories: {
    default: {
      appenders: ["out"],
      level: "info"
    }
  }
});

const logger = log4js.getLogger();
logger.level = logLevel;

export = logger;
