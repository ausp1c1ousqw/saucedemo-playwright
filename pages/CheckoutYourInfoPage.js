import { BasePage, Button, Input, Label } from "../framework/gui";

class CheckoutYourInfoPage extends BasePage {
  constructor(page) {
    super(page, "/checkout-step-one.html");
    this.locators = {
      firstNameField: this.page.getByTestId("firstName"),
      lastNameField: this.page.getByTestId("lastName"),
      postalCodeField: this.page.getByTestId("postalCode"),
      continueButton: this.page.getByTestId("continue"),
      checkoutError: this.page.getByTestId("error"),
    };
  }

  get firstNameField() {
    return new Input(this.locators.firstNameField, "First Name");
  }

  get lastNameField() {
    return new Input(this.locators.lastNameField, "Last Name");
  }

  get postalCodeField() {
    return new Input(this.locators.postalCodeField, "Postal Code");
  }

  get continueButton() {
    return new Button(this.locators.continueButton, "Continue Button");
  }

  get checkoutError() {
    return new Label(this.locators.checkoutError, "Checkout Error");
  }

  async enterFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeField.fill(postalCode);
  }

  async fillCustomerInfoForm({ firstName, lastName, postalCode } = {}) {
    if (firstName !== undefined) await this.enterFirstName(firstName);
    if (lastName !== undefined) await this.enterLastName(lastName);
    if (postalCode !== undefined) await this.enterPostalCode(postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}

export default CheckoutYourInfoPage;