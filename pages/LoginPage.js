import { BasePage, Input, Button, Label } from "../framework/gui";
class LoginPage extends BasePage {
  constructor(page) {
    super(page, "/");
    this.locators = {
      userNameField: this.page.getByTestId("username"),
      passwordField: this.page.getByTestId("password"),
      loginButton: this.page.locator("#login-button"),
      loginLogo: this.page.locator(".login_logo"),
      loginError: this.page.getByTestId("error"),
    };
  }

  get userNameField() {
    return new Input(this.locators.userNameField, "Username Field");
  }

  get passwordField() {
    return new Input(this.locators.passwordField, "Password Field");
  }

  get loginButton() {
    return new Button(this.locators.loginButton, "Login Button");
  }

  get loginLogo() {
    return new Label(this.locators.loginLogo, "Login Logo");
  }

  get loginError() {
    return new Label(this.locators.loginError, "Login Error");
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async enterPassword(pass) {
    await this.passwordField.fill(pass);
  }

  async enterUserName(username) {
    await this.userNameField.fill(username);
  }

  async login(user, pass) {
    await this.enterUserName(user);
    await this.enterPassword(pass);
    await this.clickLoginButton();
  }
}
export default LoginPage;
