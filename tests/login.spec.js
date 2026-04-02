import { test } from "../test-setup/test-setup.js";
import { users, loginErrors, generators } from "../test-data";
test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test("Login succeeds with valid credentials", async ({ loginPage, productsPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await productsPage.pageTitle.expectToContainText("Products");
  });

  test("Login fails with invalid password", async ({ loginPage }) => {
    await loginPage.login(users.standard.username, generators.randomPassword());

    await loginPage.loginError.expectToContainText(loginErrors.invalidCredentials);
  });

  test("Login fails with invalid username", async ({ loginPage }) => {
    await loginPage.login(generators.randomUserName(), users.standard.username);

    await loginPage.loginError.expectToContainText(loginErrors.invalidCredentials);
  });

  test("Login fails without credentials", async ({ loginPage }) => {
    await loginPage.clickLoginButton();

    await loginPage.loginError.expectToContainText(loginErrors.requiredUsername);
  });

  test("Login fails for locked out user", async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);

    await loginPage.loginError.expectToContainText(loginErrors.lockedUser);
  });

  test("Password field masks entered characters", async ({ loginPage }) => {
    await loginPage.enterPassword(generators.randomPassword());

    await loginPage.passwordField.expectToHaveAttribute("type", "password");
  });
});
