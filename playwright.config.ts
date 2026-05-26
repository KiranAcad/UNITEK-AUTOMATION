/**
 * Playwright Configuration
 * ========================
 * Enterprise-grade configuration supporting:
 * - Multi-browser parallel execution (Chromium, Firefox, WebKit)
 * - Environment-aware settings via .env files
 * - Allure + HTML + List reporters
 * - Screenshot on failure, video on retry, trace on retry
 * - CI/CD optimized defaults
 */

import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './config/env.config';

export default defineConfig({
  /* Test directory */
  testDir: './tests',

  /* Output directory for test artifacts */
  outputDir: './test-results',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI to handle flaky tests */
  retries: process.env.CI ? envConfig.RETRY_COUNT : 1,

  /* Parallel workers */
  workers: process.env.CI ? 2 : envConfig.WORKERS,

  /* Global timeout per test */
  timeout: envConfig.TIMEOUT,

  /* Expect timeout */
  expect: {
    timeout: envConfig.EXPECT_TIMEOUT,
  },

  /* Reporter configuration */
  reporter: [
    ['./utils/custom-reporter.ts'],
    ['list']
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL for all tests */
    baseURL: envConfig.BASE_URL,

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video recording on failure */
    video: 'retain-on-failure',

    /* Headless mode */
    headless: process.env.CI ? true : envConfig.HEADLESS,

    /* Navigation timeout */
    navigationTimeout: 45_000,

    /* Action timeout */
    actionTimeout: 15_000,

    /* Viewport */
    viewport: { width: 1920, height: 1080 },

    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,

    /* Locale */
    locale: 'en-US',

    /* Timezone */
    timezoneId: 'America/Los_Angeles',
  },

  /* Configure browser projects for cross-browser testing */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
