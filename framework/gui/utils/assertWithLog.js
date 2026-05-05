import { logger } from "../../logger";
import { expect } from "@playwright/test";

export function assertWithLog(actual, expected, message) {
  const fullMessage = `${message}
Actual: '${actual}' 
Expected: '${expected}'`;

  logger.info(fullMessage);
  expect(actual).toEqual(expected);
}
