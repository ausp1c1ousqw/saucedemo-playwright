import { Button, BasePage, BaseLocator } from "../framework/gui";
import Header from "./components/Header";

class CartPage extends BasePage {
	constructor(page) {
		super(page, "/cart.html");
		this.locators = {
			cartProduct: this.page.getByTestId("inventory-item"),
			removeButton: (productId) => this.page.getByTestId(`remove-${productId}`),
			checkoutButton: this.page.getByTestId("checkout"),
		};
		this.header = new Header(page);
	}

	get checkoutButton() {
		return new Button(this.locators.checkoutButton, "Checkout Button");
	}

	get cartProduct() {
		return new BaseLocator(this.locators.cartProduct, "Cart Product", "Locator");
	}

	getRemoveButtonFor(productId) {
		return new Button(this.locators.removeButton(productId), "Remove Button");
	}

	async clickCheckoutButton() {
		await this.checkoutButton.click();
	}

	async clickRemoveButtonFor(productId) {
		await this.getRemoveButtonFor(productId).click();
	}
}
export default CartPage;
