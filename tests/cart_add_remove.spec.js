import { test } from "../test-setup/test-setup.js";
import { users, products } from "../test-data";

test.describe("Cart add/remove", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("add 1 product from products page", async ({ productsPage, cartPage }) => {
    await productsPage.clickAddToCartButtonFor(products.backpack.testId);

    await productsPage.header.cartBadge.expectToHaveText("1");

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(1);
    await cartPage.header.cartBadge.expectToHaveText("1");
  });

  test("add multiple products from products page", async ({ productsPage, cartPage }) => {
    const items = [
      products.backpack.testId,
      products.bikeLight.testId,
      products.boltTShirt.testId,
    ];

    for (const item of items) {
      await productsPage.clickAddToCartButtonFor(item);
    }

    await productsPage.header.cartBadge.expectToHaveText(String(items.length));

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(items.length);
  });

  test("add 1 product from product details page", async ({
    productDetailsPage,
    cartPage,
  }) => {
    await productDetailsPage.openByItemId(products.backpack.itemId);
    await productDetailsPage.clickAddToCartButtonFor(products.backpack.testId);

    await productDetailsPage.header.cartBadge.expectToHaveText("1");

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(1);
  });

  test("remove all products from products page", async ({ productsPage, cartPage }) => {
    const items = [
      products.backpack.testId,
      products.bikeLight.testId,
      products.boltTShirt.testId,
    ];

    for (const item of items) {
      await productsPage.clickAddToCartButtonFor(item);
    }
    await productsPage.header.cartBadge.expectToHaveText(String(items.length));

    for (const item of items) {
      await productsPage.clickRemoveButtonFor(item);
    }
    await productsPage.header.cartBadge.expectToHaveCount(0);

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(0);
    await cartPage.header.cartBadge.expectToHaveCount(0);
  });

  test("remove some products from cart page", async ({ productsPage, cartPage }) => {
    const items = [
      products.backpack.testId,
      products.bikeLight.testId,
      products.boltTShirt.testId,
    ];

    for (const item of items) {
      await productsPage.clickAddToCartButtonFor(item);
    }

    await cartPage.open();
    await cartPage.clickRemoveButtonFor(items[0]);
    await cartPage.clickRemoveButtonFor(items[2]);

    await cartPage.header.cartBadge.expectToHaveText(String(items.length - 2));
    await cartPage.cartProduct.expectToHaveCount(items.length - 2);
  });

  test("keep cart state consistent across pages", async ({
    productsPage,
    productDetailsPage,
    cartPage,
  }) => {
    await productsPage.clickAddToCartButtonFor(products.backpack.testId);
    await productsPage.header.cartBadge.expectToHaveText("1");

    await productDetailsPage.openByItemId(products.bikeLight.itemId);
    await productDetailsPage.clickAddToCartButtonFor(products.bikeLight.testId);
    await productDetailsPage.header.cartBadge.expectToHaveText("2");

    await cartPage.open();
    await cartPage.cartProduct.expectToHaveCount(2);

    await cartPage.clickRemoveButtonFor(products.backpack.testId);
    await cartPage.header.cartBadge.expectToHaveText("1");
    await cartPage.cartProduct.expectToHaveCount(1);

    await productsPage.open();
    await productsPage.header.cartBadge.expectToHaveText("1");
  });
});

