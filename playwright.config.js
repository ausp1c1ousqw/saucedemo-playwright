import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "./framework/utils";
loadEnv(".env.local");

export default defineConfig({
  testDir: "./tests",
  outputDir: `${process.env.DEBUG_DIR}/test-results`,
  fullyParallel: true,
  retries: 1,
  workers: 1,

  reporter: [["html", { outputFolder: `${process.env.DEBUG_DIR}/playwright-report` }]],

  use: {
    baseURL: process.env.BASE_URL,

    screenshot: "only-on-failure",
    trace: "on-first-retry",
    testIdAttribute: "data-test",
    httpCredentials: {
      username: "admin",
      password: "admin",
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
