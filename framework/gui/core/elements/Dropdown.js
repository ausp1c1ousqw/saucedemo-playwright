import BaseLocator from "../BaseLocator.js";

class Dropdown extends BaseLocator {
	constructor(locator, name) {
		super(locator, name, "Dropdown");
	}

	async selectOption(option) {
		this._log(`Selecting option: "${option}"`);
		await this._locator.selectOption(option);
	}
}
export default Dropdown;
