import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("Add single product to cart", async ({ productsPage, cartPage }) => {
    await productsPage.clickAddToCartButtonFor("sauce-labs-backpack");
    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(1);
  });

  test("Add multiple products to cart", async ({ productsPage, cartPage }) => {
    const products = ["sauce-labs-backpack", "sauce-labs-bike-light", "sauce-labs-bolt-t-shirt"];

    for (const product of products) {
      await productsPage.clickAddToCartButtonFor(product);
    }

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(products.length);
  });

  test("Remove product from cart", async ({ productsPage, cartPage }) => {
    const product = "sauce-labs-backpack";
    await productsPage.clickAddToCartButtonFor(product);
    await cartPage.open();
    await cartPage.clickRemoveButtonFor(product);
    await cartPage.cartProduct.expectToHaveCount(0);
  });
});
