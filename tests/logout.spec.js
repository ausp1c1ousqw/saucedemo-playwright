import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";
test.describe("Logout Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("User can logout successfully", async ({ productsPage, loginPage }) => {
    await productsPage.header.logout();

    await loginPage.loginLogo.expectToContainText("Swag Labs");
  });
});
