import { BasePage, Button, BaseLocator } from "../framework/gui";

class CheckoutOverviewPage extends BasePage {
	constructor(page) {
		super(page, "/checkout-step-two.html");
		this.locators = {
			finishButton: this.page.getByTestId("finish"),
			productName: this.page.getByTestId("inventory-item-name"),
		};
	}

	get finishButton() {
		return new Button(this.locators.finishButton, "Finish Button");
	}

	get productName() {
		return new BaseLocator(this.locators.productName, "Overview Product Name", "Locator");
	}

	async getProductNames() {
		return await this.productName.allTextContents();
	}

	async clickFinishButton() {
		await this.finishButton.click();
	}
}

export default CheckoutOverviewPage;
