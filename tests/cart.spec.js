import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";

test.describe("Cart", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("display 1 product in cart after adding it from products page ", async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.clickAddToCartButtonFor("sauce-labs-backpack");
    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(1);
  });

  test("display correct number of products in cart after adding multiple items from products page", async ({
    productsPage,
    cartPage,
  }) => {
    const products = ["sauce-labs-backpack", "sauce-labs-bike-light", "sauce-labs-bolt-t-shirt"];

    for (const product of products) {
      await productsPage.clickAddToCartButtonFor(product);
    }

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(products.length);
  });

  test("display empty cart after removing product from cart page", async ({
    productsPage,
    cartPage,
  }) => {
    const product = "sauce-labs-backpack";
    await productsPage.clickAddToCartButtonFor(product);
    await cartPage.open();
    await cartPage.clickRemoveButtonFor(product);
    await cartPage.cartProduct.expectToHaveCount(0);
  });
});
