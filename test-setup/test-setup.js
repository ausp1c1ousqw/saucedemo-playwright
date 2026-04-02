import { test as base } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import { afterEachHook, beforeEachHook } from "./hooks";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

test.beforeEach(beforeEachHook);
test.afterEach(afterEachHook);
