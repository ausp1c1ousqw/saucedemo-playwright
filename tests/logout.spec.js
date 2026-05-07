import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";
test.describe("Logout Tests", () => {
	test.beforeEach(async ({ loginPage }) => {
		await loginPage.open();
		await loginPage.login(users.standard.username, users.standard.password);
	});

	test("redirect to login page after succesful logout", async ({ productsPage, loginPage }) => {
		await productsPage.header.logout();

		await loginPage.loginLogo.expectToContainText("Swag Labs");
	});
});
