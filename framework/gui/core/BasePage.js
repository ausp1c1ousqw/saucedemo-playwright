import { logger } from "../../logger";

class BasePage {
  constructor(page, pageURL) {
    this.page = page;
    this.pageURL = pageURL;
  }

  async open() {
    logger.info(`Navigating to ${this.pageURL}`);
    await this.page.goto(this.pageURL);
  }

  async refresh() {
    logger.info(`Refreshing page`);
    await this.page.reload();
  }

  async back() {
    logger.info(`Clicking back`);
    await this.page.goBack();
  }

  async forward() {
    logger.info(`Clicking forward`);
    await this.page.goForward();
  }
}

export default BasePage;
