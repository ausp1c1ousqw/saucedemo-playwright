import { Button, BasePage, BaseLocator } from "../framework/gui";
import Header from "./components/Header";

class CartPage extends BasePage {
  constructor(page) {
    super(page, "/cart.html");
    this.locators = {
      cartProduct: this.page.getByTestId("inventory-item"),
      removeButton: (productId) => this.page.getByTestId(`remove-${productId}`),
    };
    this.header = new Header(page);
  }

  getRemoveButtonFor(productId) {
    return new Button(this.locators.removeButton(productId), "Remove Button");
  }

  get cartProduct() {
    return new BaseLocator(this.locators.cartProduct, "Cart Product", "Locator");
  }

  async clickRemoveButtonFor(productId) {
    await this.getRemoveButtonFor(productId).click();
  }
}
export default CartPage;
