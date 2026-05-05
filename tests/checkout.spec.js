import { test } from "../test-setup/test-setup.js";
import { users, checkoutErrors, products } from "../test-data";
import { expectSameMembers } from "../test-utils/sortExpectations.js";

test.describe("Checkout", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("redirect to checkout complete page after successful checkout", async ({
    productsPage,
    cartPage,
    checkoutYourInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await productsPage.clickAddToCartButtonFor(products.backpack.testId);
    await cartPage.open();
    await cartPage.clickCheckoutButton();
    await checkoutYourInfoPage.fillCustomerInfoForm({
      firstName: "John",
      lastName: "Doe",
      postalCode: "12345",
    });
    await checkoutYourInfoPage.clickContinueButton();
    await checkoutOverviewPage.clickFinishButton();
    await checkoutCompletePage.completeHeader.expectToContainText(
      "Thank you for your order!",
    );
  });

  test("display correct items in checkout overview page", async ({
    cartPage,
    productsPage,
    checkoutYourInfoPage,
    checkoutOverviewPage,
  }) => {
    const items = [products.backpack, products.bikeLight, products.boltTShirt];

    for (const item of items) {
      await productsPage.clickAddToCartButtonFor(item.testId);
    }

    await cartPage.open();
    await cartPage.clickCheckoutButton();
    await checkoutYourInfoPage.fillCustomerInfoForm({
      firstName: "John",
      lastName: "Doe",
      postalCode: "12345",
    });
    await checkoutYourInfoPage.clickContinueButton();

    expectSameMembers(
      await checkoutOverviewPage.getProductNames(),
      items.map((p) => p.name),
    );
  });

  test.describe("Error messages", () => {
    test.beforeEach(async ({ productsPage, cartPage }) => {
      await productsPage.clickAddToCartButtonFor(products.backpack.testId);
      await cartPage.open();
      await cartPage.clickCheckoutButton();
    });

    test("display first name required error when submitting empty form", async ({
      checkoutYourInfoPage,
    }) => {
      await checkoutYourInfoPage.clickContinueButton();
      await checkoutYourInfoPage.checkoutError.expectToContainText(
        checkoutErrors.requiredFirstName,
      );
    });

    test("display first name required error when submitting form with empty first name", async ({
      checkoutYourInfoPage,
    }) => {
      await checkoutYourInfoPage.fillCustomerInfoForm({
        lastName: "Doe",
        postalCode: "12345",
      });
      await checkoutYourInfoPage.clickContinueButton();
      await checkoutYourInfoPage.checkoutError.expectToContainText(
        checkoutErrors.requiredFirstName,
      );
    });

    test("display last name required error when submitting form with empty last name", async ({
      checkoutYourInfoPage,
    }) => {
      await checkoutYourInfoPage.fillCustomerInfoForm({
        firstName: "John",
        postalCode: "12345",
      });
      await checkoutYourInfoPage.clickContinueButton();
      await checkoutYourInfoPage.checkoutError.expectToContainText(
        checkoutErrors.requiredLastName,
      );
    });

    test("display postal code required error when submitting form with empty postal code", async ({
      checkoutYourInfoPage,
    }) => {
      await checkoutYourInfoPage.fillCustomerInfoForm({
        firstName: "John",
        lastName: "Doe",
      });
      await checkoutYourInfoPage.clickContinueButton();
      await checkoutYourInfoPage.checkoutError.expectToContainText(
        checkoutErrors.requiredPostalCode,
      );
    });
  });
});
