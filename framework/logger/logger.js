import winston from "winston";
import { ensureDirExists } from "../utils";

const logLevel = process.env.LOG_LEVEL ?? "info";
const logToConsole = (process.env.LOG_TO_CONSOLE ?? "true") === "true";
const logToFile = (process.env.LOG_TO_FILE ?? "true") === "true";

const logDir = ensureDirExists(`${process.env.DEBUG_DIR}/logs`);

const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSS";
const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
	return stack
		? `${timestamp}|${process.pid}|${level.toUpperCase()}|${message}\n${stack}`
		: `${timestamp}|${process.pid}|${level.toUpperCase()}|${message}`;
});

const transports = [];
if (logToConsole) transports.push(new winston.transports.Console());
if (logToFile)
	transports.push(
		new winston.transports.File({
			filename: `${logDir}/general.log`,
		}),
	);

const logger = winston.createLogger({
	level: logLevel,
	format: winston.format.combine(
		winston.format.timestamp({ format: timestampFormat }),
		winston.format.errors({ stack: true }),
		logFormat,
	),
	transports,
});

export { logger };
