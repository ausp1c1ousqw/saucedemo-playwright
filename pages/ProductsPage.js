import { BasePage, Button, Label, BaseLocator, Dropdown } from "../framework/gui";
import Header from "./components/Header";

class ProductsPage extends BasePage {
	constructor(page) {
		super(page, "/inventory.html");
		this.locators = {
			pageTitle: this.page.getByTestId("title"),
			productName: this.page.getByTestId("inventory-item-name"),
			productPrice: this.page.getByTestId("inventory-item-price"),
			sortDropdown: this.page.getByTestId("product-sort-container"),
			activeSortOption: this.page.getByTestId("active-option"),
			addToCartButton: (testId) => this.page.getByTestId(`add-to-cart-${testId}`),
			removeButton: (testId) => this.page.getByTestId(`remove-${testId}`),
		};
		this.header = new Header(page);
	}

	get pageTitle() {
		return new Label(this.locators.pageTitle, "Page Title");
	}

	get sortDropdown() {
		return new Dropdown(this.locators.sortDropdown, "Sort Dropdown");
	}

	get productName() {
		return new BaseLocator(this.locators.productName, "Product Name", "Locator");
	}

	get productPrice() {
		return new BaseLocator(this.locators.productPrice, "Product Price", "Locator");
	}

	get activeSortOption() {
		return new Label(this.locators.activeSortOption, "Active Sort Option");
	}

	getAddToCartButtonFor(testId) {
		return new Button(this.locators.addToCartButton(testId), `Add To Cart Button on ${testId}`);
	}

	getRemoveButtonFor(testId) {
		return new Button(this.locators.removeButton(testId), `Remove Button on ${testId}`);
	}

	async selectSort(sortOption) {
		await this.sortDropdown.selectOption(sortOption);
	}

	async getProductNames() {
		return await this.productName.allTextContents();
	}

	async getProductPrices() {
		const prices = await this.productPrice.allTextContents();
		return prices.map((p) => parseFloat(p.replace(/[^0-9.]/g, "")));
	}

	async clickAddToCartButtonFor(testId) {
		await this.getAddToCartButtonFor(testId).click();
	}

	async clickRemoveButtonFor(testId) {
		await this.getRemoveButtonFor(testId).click();
	}
}
export default ProductsPage;
