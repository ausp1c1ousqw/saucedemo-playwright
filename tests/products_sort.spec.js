import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";
import { assertWithLog } from "../utils/assertWithLog.js";

test.describe("Sort Products Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("Sort products by name from A to Z", async ({ productsPage }) => {
    await productsPage.sortDropdown.selectOption("az");
    const productNames = await productsPage.productName.allTextContents();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

    assertWithLog(productNames, sortedNames, "Comparing product names from page with sorted: ");
  });

  test("Sort products by name from Z to A", async ({ productsPage }) => {
    await productsPage.sortDropdown.selectOption("za");
    const productNames = await productsPage.productName.allTextContents();
    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));

    assertWithLog(productNames, sortedNames, "Comparing product names from page with sorted: ");
  });

  test("Sort products by price from low to high", async ({ productsPage }) => {
    await productsPage.sortDropdown.selectOption("lohi");
    const prices = await productsPage.productPrice.allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace(/[^0-9.]/g, "")));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    assertWithLog(numericPrices, sortedPrices, "Comparing product prices from page with sorted: ");
  });

  test("Sort products by price from high to low", async ({ productsPage }) => {
    await productsPage.sortDropdown.selectOption("hilo");
    const prices = await productsPage.productPrice.allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace(/[^0-9.]/g, "")));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    assertWithLog(numericPrices, sortedPrices, "Comparing product prices from page with sorted: ");
  });
});
