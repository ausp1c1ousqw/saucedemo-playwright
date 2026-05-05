# saucedemo-playwright

Playwright UI tests for `https://www.saucedemo.com/`.

## Requirements

- Node.js 20+

## Install

```bash
npm ci
npx playwright install
```

## Run tests

```bash
npm test
```

Useful commands:

```bash
npm run test:headed
npm run test:ui
npm run test:debug
npm run report
```

## Environment variables

- **`BASE_URL`**: target URL (default in CI is `https://www.saucedemo.com/`)
- **`DEBUG_DIR`**: output folder for run artifacts (if not set locally, a timestamped folder under `./artifacts/` is created)

Local overrides can be placed in **`.env.local`** (ignored by git).

## CI

GitHub Actions workflow runs on pushes to `main` and on pull requests and uploads the Playwright HTML report as an artifact.

