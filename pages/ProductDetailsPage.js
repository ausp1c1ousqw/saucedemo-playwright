import { BasePage, Button } from "../framework/gui";
import Header from "./components/Header";

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page, "/inventory-item.html");
    this.locators = {
      addToCartButton: (testId) => this.page.getByTestId(`add-to-cart-${testId}`),
      removeButton: (testId) => this.page.getByTestId(`remove-${testId}`),
    };
    this.header = new Header(page);
  }

  async openByItemId(itemId) {
    await this.open(`${this.pageURL}?id=${itemId}`);
  }

  getAddToCartButtonFor(testId) {
    return new Button(this.locators.addToCartButton(testId), "Add To Cart Button");
  }

  getRemoveButtonFor(testId) {
    return new Button(this.locators.removeButton(testId), "Remove Button");
  }

  async clickAddToCartButtonFor(testId) {
    await this.getAddToCartButtonFor(testId).click();
  }

  async clickRemoveButtonFor(testId) {
    await this.getRemoveButtonFor(testId).click();
  }
}

export default ProductDetailsPage;
