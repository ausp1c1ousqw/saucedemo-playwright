import { test } from "../test-setup/test-setup.js";
import { users, loginErrors, generators } from "../test-data";
test.describe("Login", () => {
	test.beforeEach(async ({ loginPage }) => {
		await loginPage.open();
	});

	test("redirects to products page after successful login", async ({ loginPage, productsPage }) => {
		await loginPage.login(users.standard.username, users.standard.password);

		await productsPage.pageTitle.expectToContainText("Products");
	});

	test("hide password input characters in password field", async ({ loginPage }) => {
		await loginPage.enterPassword(generators.randomPassword());

		await loginPage.passwordField.expectToHaveAttribute("type", "password");
	});

	test.describe("Error messages", () => {
		test("display invalid credentials error for incorrect password", async ({ loginPage }) => {
			await loginPage.login(users.standard.username, generators.randomPassword());

			await loginPage.loginError.expectToContainText(loginErrors.invalidCredentials);
		});

		test("display invalid credentials error for incorrect username", async ({ loginPage }) => {
			await loginPage.login(generators.randomUserName(), users.standard.password);

			await loginPage.loginError.expectToContainText(loginErrors.invalidCredentials);
		});

		test("display username required error when submitting empty form", async ({ loginPage }) => {
			await loginPage.clickLoginButton();

			await loginPage.loginError.expectToContainText(loginErrors.requiredUsername);
		});

		test("display locked user error when logging in with locked account", async ({ loginPage }) => {
			await loginPage.login(users.locked.username, users.locked.password);

			await loginPage.loginError.expectToContainText(loginErrors.lockedUser);
		});
	});
});
