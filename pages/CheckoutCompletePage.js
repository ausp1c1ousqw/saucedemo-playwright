import { BasePage, Button, Label } from "../framework/gui";

class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page, "/checkout-complete.html");
    this.locators = {
      pageTitle: this.page.getByTestId("title"),    
      backHomeButton: this.page.getByTestId("back-to-products"),
      completeHeader: this.page.getByTestId("complete-header"),
    };
  }

  get pageTitle() {
    return new Label(this.locators.pageTitle, "Checkout Complete Title");
  }

  get completeHeader() {
    return new Label(this.locators.completeHeader, "Checkout Complete Header");
  }

  get backHomeButton() {
    return new Button(this.locators.backHomeButton, "Back Home Button");
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }
}

export default CheckoutCompletePage;