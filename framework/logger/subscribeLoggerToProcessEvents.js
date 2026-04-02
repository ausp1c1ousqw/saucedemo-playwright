import { logger } from "./logger.js";

export function subscribeLoggerToProcessEvents() {
  process.on("exit", (code) => {
    logger.info(`Process exiting with code ${code}`);
  });

  ["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
    process.on(signal, () => {
      logger.info(`Received signal: ${signal}`);
      process.exit(0);
    });
  });

  process.on("uncaughtException", async (err) => {
    logger.error(`Uncaught exception: ${err.stack || err.message}`);
    process.exit(1);
  });

  process.on("unhandledRejection", async (reason) => {
    logger.error(`Unhandled rejection: ${reason}`);
    process.exit(1);
  });
}
