import BaseLocator from "../BaseLocator.js";

class Checkbox extends BaseLocator {
  constructor(locator, name) {
    super(locator, name, "Checkbox");
  }

  async isChecked() {
    return this.isSelected();
  }

  async check() {
    if (!(await this.isChecked())) {
      await this.click();
    }
  }

  async uncheck() {
    if (await this.isChecked()) {
      await this.click();
    }
  }
}
export default Checkbox;
