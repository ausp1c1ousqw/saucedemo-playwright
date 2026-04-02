import { logger } from "../framework/logger";
import { expect } from "allure-playwright";

export function assertWithLog(actual, expected, message) {
  const fullMessage = `${message}
Actual: '${actual}' 
Expected: '${expected}'`;

  logger.info(fullMessage);
  expect(actual).toEqual(expected);
}
