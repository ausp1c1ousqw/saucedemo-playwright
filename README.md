## saucedemo-playwright

UI tests for **Sauce Demo** (`https://www.saucedemo.com/`) using **Playwright** and a **Page Object Model** structure. Includes CI-ready HTML reporting. Last report: https://ausp1c1ousqw.github.io/saucedemo-playwright/

## Tech stack

- **JavaScript (ES modules)** + **Playwright Test**
- **dotenv** (local env), **winston** (logging)
- **Playwright HTML report** + artifacts (screenshots/traces)

## Quick start

### Requirements

- **Node.js**: 20+
- **Package manager**: npm

### Install

```bash
npm ci
npx playwright install
```

### Run

```bash
npm test
```

### CI run

```bash
npm run test:ci
```

### Debug

```bash
npm run test:debug
```

### Open HTML report

```bash
npm run report
```

## Structure

- **`tests/`**: specs
- **`pages/`**: Page Objects
- **`test-setup/`**: shared hooks (extended `test`)
- **`test-data/`**: users + fixtures
- **`playwright.config.js`**: local (loads `.env.local`, writes under `DEBUG_DIR`)
- **`playwright.config.ci.js`**: CI (writes to `playwright-report/`, `test-results/`)

## Environment variables

Local overrides go in **`.env.local`**.

- **`BASE_URL`**: target URL
- **`DEBUG_DIR`**: local artifacts/report folder (auto-created under `./artifacts/` if not set)
- **`LOG_LEVEL`**, **`LOG_TO_CONSOLE`**, **`LOG_TO_FILE`**: logging controls

## Reporting

- **HTML report**:
  - Local: `${DEBUG_DIR}/playwright-report`
  - CI: `./playwright-report`

## CI/CD

- **GitHub Actions (included)**: runs on push/PR, uploads artifacts, and publishes the HTML report to GitHub Pages.

## Example test

```js
import { test } from "../test-setup/test-setup.js";
import { users } from "../test-data";

test("login redirects to Products", async ({ loginPage, productsPage }) => {
	await loginPage.open();
	await loginPage.login(users.standard.username, users.standard.password);
	await productsPage.pageTitle.expectToContainText("Products");
});
```
