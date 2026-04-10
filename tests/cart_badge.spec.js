import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";

test.describe.only("Cart Badge", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test.describe("Visibility", () => {
    test("hide cart badge by default after login", async ({ productsPage }) => {
      await productsPage.header.cartBadge.expectToHaveCount(0);
    });

    test("show cart badge after adding a product", async ({ productsPage }) => {
      const product = "sauce-labs-backpack";
      await productsPage.clickAddToCartButtonFor(product);

      await productsPage.header.cartBadge.expectToHaveCount(1);
      await productsPage.header.cartBadge.expectToHaveText("1");
    });

    test("hide cart badge after removing last product from cart page", async ({
      productsPage,
      cartPage,
    }) => {
      const product = "sauce-labs-backpack";
      await productsPage.clickAddToCartButtonFor(product);

      await cartPage.open();
      await cartPage.clickRemoveButtonFor(product);

      await cartPage.header.cartBadge.expectToHaveCount(0);
    });
  });

  test.describe("Count correctness", () => {
    test("display correct count after adding multiple products", async ({
      productsPage,
    }) => {
      const products = [
        "sauce-labs-backpack",
        "sauce-labs-bike-light",
        "sauce-labs-bolt-t-shirt",
      ];
      for (const product of products) {
        await productsPage.clickAddToCartButtonFor(product);
      }
      await productsPage.header.cartBadge.expectToHaveText(
        String(products.length),
      );
    });

    test("display correct count after removing multiple products", async ({
      productsPage,
    }) => {
      const products = [
        "sauce-labs-backpack",
        "sauce-labs-bike-light",
        "sauce-labs-bolt-t-shirt",
      ];
      for (const product of products) {
        await productsPage.clickAddToCartButtonFor(product);
      }

      await productsPage.clickRemoveButtonFor(products[0]);
      await productsPage.clickRemoveButtonFor(products[2]);

      await productsPage.header.cartBadge.expectToHaveText(
        String(products.length - 2),
      );
    });

    test("display correct count after adding/removing products across pages", async ({
      productsPage,
      cartPage,
    }) => {
      const products = [
        "sauce-labs-backpack",
        "sauce-labs-bike-light",
        "sauce-labs-bolt-t-shirt",
      ];
      for (const product of products) {
        await productsPage.clickAddToCartButtonFor(product);
      }

      await cartPage.open();
      await cartPage.clickRemoveButtonFor(products[0]);
      await cartPage.clickRemoveButtonFor(products[2]);

      await productsPage.header.cartBadge.expectToHaveText(
        String(products.length - 2),
      );
    });
  });

  test.describe("State after page actions", () => {
    test("keep cart badge state after reloading page", async ({
      productsPage,
    }) => {
      const product = "sauce-labs-backpack";
      await productsPage.clickAddToCartButtonFor(product);

      await productsPage.refresh();
      await productsPage.header.cartBadge.expectToHaveText("1");
    });

    test("keep cart badge state after navigating to another page", async ({
      productsPage,
      cartPage,
    }) => {
      const product = "sauce-labs-backpack";
      await productsPage.clickAddToCartButtonFor(product);

      await cartPage.open();
      await cartPage.header.cartBadge.expectToHaveText("1");

      await productsPage.open();
      await productsPage.header.cartBadge.expectToHaveText("1");
    });

    test("keep cart badge state after logout and login", async ({
      productsPage,
      loginPage,
    }) => {
      const product = "sauce-labs-backpack";
      await productsPage.clickAddToCartButtonFor(product);

      await productsPage.header.logout();

      await loginPage.login(users.standard.username, users.standard.password);
      await productsPage.header.cartBadge.expectToHaveText("1");
    });
  });

});
