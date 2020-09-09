import winston from "winston";
import path from "path";
const { format, transports } = winston;

const prettyJson = format.printf(info => {
    if (typeof info.message === "object") {
        info.message = JSON.stringify(info.message, null, 4);
    }
    return `${info.level}: ${info.message}`;
});

const logFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.prettyPrint(),
    format.printf(
        info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
    ),
    prettyJson
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: format.combine(
        format.label({ label: path.basename(require.main?.filename || "") }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        // Format the metadata object
        format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"]
        })
    ),
    transports: [
        new transports.Console({ format: logFormat }),
        new transports.File({
            filename: "logs/combined.log",
            format: format.combine(
                // Render in one line in your log file.
                // If you use prettyPrint() here it will be really
                // difficult to exploit your logs files afterwards.
                format.json()
            )
        })
    ],
    exitOnError: false
});

export default logger;
