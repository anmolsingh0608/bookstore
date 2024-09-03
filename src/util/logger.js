const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "10d", // Keeps logs for 10 days
    }),
  ],
});

module.exports = logger;
