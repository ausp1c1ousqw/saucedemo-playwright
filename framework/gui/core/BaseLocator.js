import { logger } from "../../logger";
import { expect } from "@playwright/test";

class BaseLocator {
  constructor(locator, name, type) {
    this._locator = locator;
    this._name = name;
    this._type = type;
  }

  async click() {
    this._log("Clicking");
    await this._locator.click();
  }

  async fill(text) {
    this._log(`Typing '${text}'`);
    await this._locator.fill(text);
  }

  async expectToContainText(text) {
    this._log(`Expecting to contain text: '${text}'`);
    await expect(this._locator).toContainText(text);
  }

  async expectToHaveAttribute(type, value) {
    this._log(`Expecting to have attribute: '${type}' with '${value}`);
    await expect(this._locator).toHaveAttribute(type, value);
  }
  async expectToHaveCount(number) {
    this._log(`Expecting to have Count: ${number}`);
    await expect(this._locator).toHaveCount(number);
  }

  async expectToHaveText(text) {
    this._log(`Expecting to have Text: ${text}`);
    await expect(this._locator).toHaveText(text);
  }

  async allTextContents() {
    this._log(`Getting List of Elements`);
    return this._locator.allTextContents();
  }

  _log(message, level = "info") {
    const fullMessage = `${this._type} '${this._name}' :: ${message}`;

    if (level === "info") logger.info(fullMessage);
    if (level === "warn") logger.warn(fullMessage);
    if (level === "error") logger.error(fullMessage);
  }
}
export default BaseLocator;
