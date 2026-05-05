import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: `test-results`,
  fullyParallel: true,
  retries: 1,
  workers: 2,

  reporter: [["html", { outputFolder: `playwright-report` }]],

  use: {
    baseURL: process.env.BASE_URL,

    screenshot: "only-on-failure",
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

  ],
});
