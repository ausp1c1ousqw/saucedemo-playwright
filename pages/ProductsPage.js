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
      addToCartButton: (productId) => this.page.getByTestId(`add-to-cart-${productId}`),
      removeButton: (productId) => this.page.getByTestId(`remove-${productId}`),
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
    return new BaseLocator(this.locators.productName, "Cart Product Name", "Locator");
  }

  get productPrice() {
    return new BaseLocator(this.locators.productPrice, "Cart Product Price", "Locator");
  }

  getAddToCartButtonFor(productId) {
    return new Button(
      this.locators.addToCartButton(productId),
      `Add To Cart Button on ${productId}`,
    );
  }

  getRemoveButtonFor(productId) {
    return new Button(this.locators.removeButton(productId), `Remove Button on ${productId}`);
  }

  async clickAddToCartButtonFor(productId) {
    await this.getAddToCartButtonFor(productId).click();
  }

  async clickRemoveButtonFor(productId) {
    await this.getRemoveButtonFor(productId).click();
  }
}
export default ProductsPage;
