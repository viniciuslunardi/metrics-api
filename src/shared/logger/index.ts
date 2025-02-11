import winston from "winston";
import LokiTransport from "winston-loki";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
    new LokiTransport({
        host: "http://localhost:3100", 
        labels: { app: "metrics-logs-loki-sample" }, 
        format: winston.format.json(),
      }),
  ]
});
