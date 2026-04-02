import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";

test.describe("Cart Badge Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("Cart badge updates when product is added", async ({ productsPage }) => {
    const product = "sauce-labs-backpack";
    await productsPage.clickAddToCartButtonFor(product);
    await productsPage.header.cartBadge.expectToHaveText("1");
  });

  test("Cart badge dissappeared when products quantity zero", async ({
    productsPage,
    cartPage,
  }) => {
    const product = "sauce-labs-backpack";
    await productsPage.clickAddToCartButtonFor(product);
    await cartPage.open();
    await cartPage.header.cartBadge.expectToHaveText("1");
    await cartPage.clickRemoveButtonFor(product);
    await cartPage.header.cartBadge.expectToHaveCount(0);
  });
});
