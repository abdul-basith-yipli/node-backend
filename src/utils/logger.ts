import { createLogger, format, transports } from "winston";
import configs from "../config/intex";

const logger = createLogger({
  level: configs.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    configs.NODE_ENV === "production" ? format.json() : format.prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
