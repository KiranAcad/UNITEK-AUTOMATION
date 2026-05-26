# 🏥 Unitek College — UI Automation Framework

<p align="center">
  <b>Enterprise-level Playwright + TypeScript UI Automation Framework</b><br/>
  Built for scale, reliability, and CI/CD excellence
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-v1.49-45ba63?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright"/>
  <img src="https://img.shields.io/badge/TypeScript-v5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Allure-Report-FF6B35?style=for-the-badge&logo=qameta&logoColor=white" alt="Allure"/>
</p>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Environment Configuration](#-environment-configuration)
- [Running Tests](#-running-tests)
- [Cross-Browser Testing](#-cross-browser-testing)
- [Reports & Artifacts](#-reports--artifacts)
- [Page Object Model (POM)](#-page-object-model-pom)
- [Locator Strategy](#-locator-strategy)
- [Test Data Management](#-test-data-management)
- [Logging](#-logging)
- [Utilities & Helpers](#-utilities--helpers)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Available NPM Scripts](#-available-npm-scripts)
- [Writing New Tests](#-writing-new-tests)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## Overview

This framework provides a robust, scalable, and maintainable automation solution for testing the [Unitek College QA Environment](https://qa.unitekcollege.edu/). It follows industry best practices including strict Page Object Model (POM), separated locators, centralized configuration, and comprehensive reporting.

### Key Features

| Feature | Description |
|---------|-------------|
| ✅ **Page Object Model** | Strict POM with separated locators and reusable page methods |
| 🌍 **Multi-Environment** | QA, UAT, Staging, Production — switch via env variable |
| 📊 **Rich Reporting** | Allure Report + HTML Report + JSON + Playwright native |
| 📸 **Failure Artifacts** | Screenshots on failure, video on retry, trace on retry |
| 📝 **Centralized Logging** | Winston-based with console, file, and debug transports |
| 🔄 **Smart Retries** | Auto-retry failed tests + intelligent action retry |
| ⏱️ **No Hard Waits** | Custom wait utilities using Playwright auto-waiting |
| 🌐 **Cross-Browser** | Chromium, Firefox, WebKit parallel execution |
| 🚀 **CI/CD Ready** | GitHub Actions with matrix strategy and artifact upload |
| 🎲 **Dynamic Test Data** | Faker.js generator + static JSON data files |

---

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner | ^1.49.1 |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe scripting | ^5.7.2 |
| [Winston](https://github.com/winstonjs/winston) | Centralized logging | ^3.17.0 |
| [Allure](https://allurereport.org/) | Rich test reporting | ^3.0.4 |
| [Faker.js](https://fakerjs.dev/) | Dynamic test data generation | ^9.3.0 |
| [dotenv](https://github.com/motdotla/dotenv) | Environment configuration | ^16.4.7 |

---

## Prerequisites

Before setting up the framework, ensure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Java** (optional, required only for Allure CLI reports)

Verify installations:
```bash
node --version    # v18.x or higher
npm --version     # v9.x or higher
git --version
```

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd UNITEK-AUTOMATION

# 2. Install dependencies
npm install

# 3. Install Playwright browsers with OS dependencies
npx playwright install --with-deps

# 4. Run all tests (defaults to QA environment)
npm test

# 5. View HTML report
npm run report:html
```

---

## 📁 Project Structure

```
UNITEK-AUTOMATION/
│
├── .env.qa                           # QA environment variables
├── .env.uat                          # UAT environment variables
├── .env.staging                      # Staging environment variables
├── .env.prod                         # Production environment variables
│
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions CI/CD pipeline
│
├── config/
│   └── env.config.ts                 # Centralized env/config loader
│
├── constants/
│   └── app.constants.ts              # Global constants (timeouts, URLs, nav items)
│
├── fixtures/
│   └── base.fixture.ts               # Custom Playwright fixtures with page objects
│
├── helpers/
│   ├── api.helper.ts                 # API helper for setup/teardown
│   ├── date-picker.helper.ts         # Date picker interaction utility
│   ├── dropdown.helper.ts            # Custom & native dropdown handling
│   ├── file-upload.helper.ts         # File upload utilities
│   └── screenshot.helper.ts          # Screenshot capture utility
│
├── locators/
│   ├── home.locators.ts              # Homepage element locators
│   ├── lead-form.locators.ts         # Lead capture form locators
│   └── footer.locators.ts            # Footer element locators
│
├── pages/
│   ├── base.page.ts                  # Abstract base page (30+ shared actions)
│   ├── home.page.ts                  # Homepage page object
│   ├── lead-form.page.ts             # Lead form page object
│   └── search.page.ts               # Search overlay page object
│
├── test-data/
│   ├── lead-form.data.json           # Static test data (valid/invalid leads)
│   └── test-data.generator.ts        # Faker.js dynamic data generator
│
├── tests/
│   ├── homepage.spec.ts              # Homepage test suite (11 tests)
│   └── lead-form.spec.ts            # Lead form test suite (5 tests)
│
├── utils/
│   ├── logger.ts                     # Winston centralized logger
│   └── wait.utils.ts                 # Smart wait utilities (no hard waits)
│
├── logs/                             # 📂 Runtime logs (auto-generated)
├── reports/                          # 📂 Test reports (auto-generated)
├── screenshots/                      # 📂 Failure screenshots (auto-generated)
├── videos/                           # 📂 Test recordings (auto-generated)
│
├── package.json                      # Dependencies & NPM scripts
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     TEST SUITES                         │
│              tests/homepage.spec.ts                     │
│              tests/lead-form.spec.ts                    │
├─────────────────────────────────────────────────────────┤
│                    FIXTURES                              │
│              fixtures/base.fixture.ts                    │
│         (auto-instantiates page objects)                 │
├─────────────────────────────────────────────────────────┤
│                  PAGE OBJECTS                            │
│    pages/base.page.ts → home.page.ts                    │
│                       → lead-form.page.ts               │
│                       → search.page.ts                  │
├─────────────────┬───────────────────────────────────────┤
│    LOCATORS     │         HELPERS & UTILS                │
│  home.locators  │  dropdown.helper   │  logger.ts        │
│  lead-form.loc  │  api.helper        │  wait.utils.ts    │
│  footer.loc     │  screenshot.helper │                   │
├─────────────────┴───────────────────────────────────────┤
│              CONFIG & CONSTANTS                          │
│         config/env.config.ts                             │
│         constants/app.constants.ts                       │
│         .env.qa / .env.uat / .env.staging / .env.prod   │
└─────────────────────────────────────────────────────────┘
```

---

## 🌍 Environment Configuration

The framework supports **4 environments**, each with its own `.env` file:

| Environment | File | Base URL | Use Case |
|-------------|------|----------|----------|
| **QA** | `.env.qa` | `https://qa.unitekcollege.edu/` | Primary testing (default) |
| **UAT** | `.env.uat` | `https://uat.unitekcollege.edu/` | User acceptance testing |
| **Staging** | `.env.staging` | `https://staging.unitekcollege.edu/` | Pre-production |
| **Production** | `.env.prod` | `https://www.unitekcollege.edu/` | Smoke tests only |

### Switching Environments

```bash
# Using npm scripts (recommended)
npm run test:qa
npm run test:uat
npm run test:staging
npm run test:prod

# Using environment variable directly
TEST_ENV=uat npx playwright test
```

### Environment Variables

Each `.env` file contains:

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Application base URL | `https://qa.unitekcollege.edu/` |
| `ENV_NAME` | Display name for reports | `QA` |
| `HEADLESS` | Run browsers headless | `true` |
| `TIMEOUT` | Global test timeout (ms) | `30000` |
| `EXPECT_TIMEOUT` | Assertion timeout (ms) | `10000` |
| `RETRY_COUNT` | Failed test retry count | `2` |
| `WORKERS` | Parallel worker count | `4` |

---

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run with Playwright UI mode (interactive)
npm run test:ui

# Run in debug mode (step-through)
npm run test:debug
```

### Run Specific Tests

```bash
# Run a single test file
npx playwright test tests/homepage.spec.ts

# Run tests matching a title
npx playwright test -g "TC-HP-01"

# Run tests with a specific tag
npx playwright test --grep "@homepage"

# Run all except a tag
npx playwright test --grep-invert "@lead-form"
```

### Run with Custom Workers

```bash
# Single worker (sequential)
npx playwright test --workers=1

# Maximum parallelism
npx playwright test --workers=8
```

---

## 🌐 Cross-Browser Testing

The framework is configured for **3 browser engines**:

| Browser | Engine | Command |
|---------|--------|---------|
| Chrome | Chromium | `npm run test:chromium` |
| Firefox | Gecko | `npm run test:firefox` |
| Safari | WebKit | `npm run test:webkit` |

```bash
# Run all browsers (parallel via projects)
npm test

# Run specific browser only
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

---

## 📊 Reports & Artifacts

### Report Types

| Report | Format | Command |
|--------|--------|---------|
| **HTML Report** | Interactive HTML | `npm run report:html` |
| **Allure Report** | Rich dashboard | `npm run allure:report` |
| **JSON Report** | Machine-readable | Auto-generated at `reports/test-results.json` |
| **Console** | Real-time list | Shown during test execution |

### Viewing Reports

```bash
# Playwright HTML Report
npm run report:html

# Allure Report (requires Java)
npm run allure:generate     # Generate from results
npm run allure:open          # Open in browser
npm run allure:report        # Generate + Open
```

### Failure Artifacts

| Artifact | When Captured | Location |
|----------|---------------|----------|
| **Screenshots** | On test failure | `screenshots/` |
| **Video** | On first retry | `videos/` |
| **Trace** | On first retry | `test-results/` |
| **Logs** | Always | `logs/` |

To view a trace file:
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## 📦 Page Object Model (POM)

### Architecture

```
BasePage (abstract)          ← Shared actions: click, fill, scroll, assert, retry
    ├── HomePage             ← Homepage-specific actions
    ├── LeadFormPage         ← Lead form step-by-step actions
    └── SearchPage           ← Search overlay actions
```

### BasePage Capabilities

The `BasePage` class provides **30+ shared methods**:

| Category | Methods |
|----------|---------|
| **Navigation** | `navigate()`, `getCurrentUrl()`, `getTitle()` |
| **Click** | `click()`, `clickWithRetry()`, `forceClick()` |
| **Input** | `fill()`, `typeSlowly()`, `clearInput()` |
| **Dropdown** | `selectOption()` |
| **Checkbox** | `check()`, `uncheck()`, `isChecked()` |
| **State** | `isVisible()`, `isEnabled()`, `getText()`, `getAttribute()` |
| **Scroll** | `scrollToElement()`, `scrollToBottom()`, `scrollToTop()` |
| **Assertions** | `assertUrlContains()`, `assertTitleContains()`, `assertElementVisible()` |
| **Retry** | `retryAction()`, `clickWithRetry()` |
| **Screenshot** | `takeScreenshot()` |

### Example Usage

```typescript
import { test, expect } from '../fixtures/base.fixture';

test('Verify hero section', async ({ homePage }) => {
  await homePage.goto();
  await homePage.verifyHeroHeading('Your Future Starts Here');
  const navItems = ['Programs', 'Campuses', 'Admissions'];
  await homePage.verifyAllNavItemsVisible(navItems);
});
```

---

## 🎯 Locator Strategy

Locators are **separated from page actions** in the `locators/` directory:

```typescript
// locators/home.locators.ts
export const HomeLocators = {
  heroHeading: 'h1',
  searchToggle: 'button.search-toggle',
  programsNavItem: 'a.mega-menu-trigger',
  navItemByName: (name: string) => `nav >> a:has-text("${name}")`,
  faqTabByName: (name: string) => `.faq-tab:has-text("${name}")`,
};
```

**Locator Priority (in order of preference):**
1. Semantic / role-based selectors
2. Data attributes (`data-testid`)
3. ARIA labels
4. CSS class selectors
5. Text-based selectors (last resort)

---

## 📋 Test Data Management

### Static Data (JSON)

```json
// test-data/lead-form.data.json
{
  "validLead": {
    "campus": "Fremont, CA",
    "program": "Medical Assisting",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "5551234567",
    "email": "john.doe@testautomation.com"
  }
}
```

### Dynamic Data (Faker.js)

```typescript
import { TestDataGenerator } from '../test-data/test-data.generator';

// Generate random lead data
const leadData = TestDataGenerator.generateLeadData();

// Generate individual fields
const email = TestDataGenerator.generateRandomEmail();
const phone = TestDataGenerator.generateRandomPhone();
const campus = TestDataGenerator.getRandomCampus();
```

---

## 📝 Logging

Winston-based centralized logging with **4 transports**:

| Transport | File | Level | Rotation |
|-----------|------|-------|----------|
| Console | — | info | — |
| Combined | `logs/combined.log` | info | 10MB × 5 |
| Error | `logs/error.log` | error | 5MB × 3 |
| Debug | `logs/debug.log` | debug | 10MB × 3 |

### Log Format

```
[2026-05-20 12:30:15.123] [INFO ] Navigating to: / | {"framework":"unitek-automation"}
[2026-05-20 12:30:16.456] [INFO ] Clicked nav item: Programs | {"testId":"TC-HP-04"}
[2026-05-20 12:30:17.789] [ERROR] Element not found | {"locator":".hero-heading"}
```

### Usage in Tests

```typescript
import { logger, createTestLogger } from '../utils/logger';

// Standard logging
logger.info('Test started');
logger.error('Assertion failed', { expected: 'A', actual: 'B' });

// Test-scoped logger
const testLogger = createTestLogger('TC-HP-01');
testLogger.info('Verifying hero section');
```

---

## 🛠️ Utilities & Helpers

### Wait Utilities (`utils/wait.utils.ts`)

> **Zero hard waits** — all methods use Playwright auto-waiting or custom polling.

| Method | Purpose |
|--------|---------|
| `waitForElementVisible()` | Wait for element visibility |
| `waitForElementHidden()` | Wait for element to disappear |
| `waitForUrlContains()` | Wait for URL navigation |
| `waitForNetworkIdle()` | Wait for network idle |
| `waitForText()` | Wait for text content |
| `waitForCondition()` | Custom polling wait |

### Helpers

| Helper | Purpose |
|--------|---------|
| `DropdownHelper` | Custom & native `<select>` handling |
| `DatePickerHelper` | Calendar & native date input handling |
| `FileUploadHelper` | Standard, file chooser, and multi-file upload |
| `APIHelper` | REST API calls (GET, POST, PUT, DELETE) |
| `ScreenshotHelper` | Viewport, full-page, and element screenshots |

---

## 🚀 CI/CD Pipeline

### GitHub Actions Configuration

The pipeline is defined in `.github/workflows/playwright.yml`:

| Trigger | Event |
|---------|-------|
| **Push** | To `main` or `develop` branch |
| **PR** | Targeting `main` branch |
| **Schedule** | Daily at 6:00 AM UTC |
| **Manual** | Via `workflow_dispatch` |

### Pipeline Architecture

```
┌──────────────────────────────────────────────────┐
│                    test (matrix)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Chromium  │  │ Firefox  │  │ WebKit   │      │
│  └─────┬────┘  └────┬─────┘  └────┬─────┘      │
│        │            │              │              │
│        └────────────┼──────────────┘              │
│                     ▼                             │
│           ┌─────────────────┐                     │
│           │  report (merge) │                     │
│           └─────────────────┘                     │
│                     ▼                             │
│         Consolidated Allure Report                │
└──────────────────────────────────────────────────┘
```

### Uploaded Artifacts

| Artifact | Retention | Contents |
|----------|-----------|----------|
| `html-report-{browser}` | 30 days | Playwright HTML report |
| `allure-results-{browser}` | 30 days | Allure result files |
| `test-results-{browser}` | 14 days | Traces, screenshots, logs |
| `allure-report-consolidated` | 30 days | Merged cross-browser report |

---

## 📜 Available NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `npx playwright test` | Run all tests |
| `test:qa` | `cross-env TEST_ENV=qa ...` | Run on QA environment |
| `test:uat` | `cross-env TEST_ENV=uat ...` | Run on UAT environment |
| `test:staging` | `cross-env TEST_ENV=staging ...` | Run on Staging environment |
| `test:prod` | `cross-env TEST_ENV=prod ...` | Run on Production environment |
| `test:headed` | `... --headed` | Run with visible browser |
| `test:chromium` | `... --project=chromium` | Chrome only |
| `test:firefox` | `... --project=firefox` | Firefox only |
| `test:webkit` | `... --project=webkit` | Safari only |
| `test:debug` | `... --debug` | Debug mode |
| `test:ui` | `... --ui` | Interactive UI mode |
| `report:html` | `playwright show-report` | Open HTML report |
| `allure:generate` | `allure generate ...` | Generate Allure report |
| `allure:open` | `allure open ...` | Open Allure report |
| `allure:report` | generate + open | Full Allure workflow |
| `lint` | `eslint . --ext .ts` | Run linter |
| `clean` | `rimraf ...` | Clean all generated files |

---

## ✍️ Writing New Tests

### Step 1: Create Locators

```typescript
// locators/my-page.locators.ts
export const MyPageLocators = {
  heading: 'h1.page-title',
  submitBtn: 'button[type="submit"]',
} as const;
```

### Step 2: Create Page Object

```typescript
// pages/my-page.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MyPageLocators } from '../locators/my-page.locators';

export class MyPage extends BasePage {
  constructor(page: Page) { super(page); }

  async getHeading(): Promise<string> {
    return this.getText(MyPageLocators.heading);
  }

  async clickSubmit(): Promise<void> {
    await this.click(MyPageLocators.submitBtn);
  }
}
```

### Step 3: Register in Fixtures

```typescript
// fixtures/base.fixture.ts — add to custom fixtures
myPage: async ({ page }, use) => {
  await use(new MyPage(page));
},
```

### Step 4: Write Tests

```typescript
// tests/my-page.spec.ts
import { test, expect } from '../fixtures/base.fixture';

test.describe('My Page Tests', () => {
  test('Verify heading', async ({ myPage }) => {
    await myPage.navigate('/my-page');
    const heading = await myPage.getHeading();
    expect(heading).toContain('Expected Title');
  });
});
```

---

## ✅ Best Practices

| Practice | Description |
|----------|-------------|
| 🚫 **No Hard Waits** | Never use `page.waitForTimeout()`. Use `WaitUtils` instead. |
| 🔒 **No Inline Selectors** | All selectors live in `locators/` files only. |
| 📦 **Single Responsibility** | Each page object handles one page/component. |
| 🏷️ **Tag Tests** | Use `@homepage`, `@lead-form`, etc. for filtering. |
| 📝 **Log Everything** | Use `logger.info()` for actions, `logger.error()` for failures. |
| 🎲 **Dynamic Data** | Use `TestDataGenerator` for non-deterministic test data. |
| 🔄 **Retry Wisely** | Use `retryAction()` for flaky elements, not entire tests. |
| 📸 **Screenshot on Failure** | Framework auto-captures; use `ScreenshotHelper` for manual. |

---

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `Browser not found` | Run `npx playwright install --with-deps` |
| `Timeout errors` | Increase `TIMEOUT` in `.env` file or check network |
| `Element not found` | Verify locator in browser DevTools, check for iframes |
| `Allure not generating` | Ensure Java is installed: `java --version` |
| `Permission denied` | Run terminal as administrator (Windows) |

### Debug a Failing Test

```bash
# Run with debug mode (step through)
npx playwright test tests/homepage.spec.ts -g "TC-HP-01" --debug

# Run with trace viewer
npx playwright test --trace on
npx playwright show-trace test-results/<folder>/trace.zip

# Run headed with slow motion
npx playwright test --headed --project=chromium
```

---

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Follow the [POM pattern](#-page-object-model-pom) for new pages
3. Add locators to `locators/` (never inline)
4. Add test data to `test-data/`
5. Write tests with descriptive IDs (e.g., `TC-XX-01`)
6. Ensure all tests pass: `npm test`
7. Submit a Pull Request

---

## 📄 License

ISC © QA Team

---

<p align="center">
  <sub>Built with ❤️ using Playwright + TypeScript</sub>
</p>
