import { defineConfig, devices } from "@playwright/test";
import { loadEnv, createDebugDirForRun } from "./framework/utils";
loadEnv(".env.local");
createDebugDirForRun();

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
	},

	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
