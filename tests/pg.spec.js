import { test, expect } from "allure-playwright";
test.describe("Dialogs", () => {
  test("handle alert", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (dialog) => {
      try {
        expect(dialog.message()).toContain("I am a JS Alert");
        await dialog.accept();
      } catch (err) {
        await dialog.dismiss();
        throw err;
      }
    });

    await page.getByText("Click for JS Alert").click();

    await expect(page.locator("#result")).toContainText("You successfully clicked an alert");
  });

  test("handle confirm", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (dialog) => {
      try {
        expect(dialog.message()).toContain("I am a JS Confirm");
        await dialog.accept();
      } catch (err) {
        await dialog.dismiss();
        throw err;
      }
    });

    await page.getByText("Click for JS Confirm").click();

    await expect(page.locator("#result")).toHaveText("You clicked: Ok");
  });

  test("handle prompt", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (dialog) => {
      try {
        expect(dialog.message()).toContain("I am a JS prompt");
        await dialog.accept("Sergey");
      } catch (err) {
        await dialog.dismiss();
        throw err;
      }
    });

    await page.getByText("Click for JS Prompt").click();

    await expect(page.locator("#result")).toHaveText("You entered: Sergey");
  });
});

test.describe("Frames", () => {
  test("working with iframe", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/iframe");

    const frameLocator = page.frameLocator("#mce_0_ifr");
    await expect(frameLocator.locator("#tinymce")).toContainText("Your content goes here.");
  });
});

test("working with tabs", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");

  const [newTab] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByText("Click Here").click(),
  ]);

  await expect(newTab.getByText("New Window")).toHaveText("New Window");

  await page.bringToFront();
  await expect(page.getByText("Opening a new window")).toHaveText("Opening a new window");
});

test("Basic authentication", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/basic_auth");
  await expect(page.getByText("Basic Auth")).toHaveText("Basic Auth");
});
