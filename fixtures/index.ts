import { test as base } from '@playwright/test';
import { rootLogger, loggerStorage } from '../logger';
import { HomePage } from '../pages/home.page';
import { LeadFormPage } from '../pages/lead-form.page';
import { SearchPage } from '../pages/search.page';

import * as fs from 'fs';
import * as path from 'path';

/** Define custom fixture types */
type CustomFixtures = {
  homePage: HomePage;
  leadFormPage: LeadFormPage;
  searchPage: SearchPage;
};

/**
 * Extended Playwright test with automatic Winston child logger setup,
 * page console/network/error event capturing,
 * and standard page object fixtures.
 */
export const test = base.extend<CustomFixtures & { _loggerAuto: void }>({
  // Automatic fixture to set up test logging context and page listeners
  _loggerAuto: [async ({ page }, use, testInfo) => {
    const testId = testInfo.testId;
    const testName = testInfo.title;

    // Create child logger context for the current test
    const childLogger = rootLogger.child({
      testName,
      testId,
      workerIndex: testInfo.workerIndex,
    });

    // Attach listeners to page console & errors
    page.on('console', (msg) => {
      childLogger.info(`[browser] ${msg.text()}`);
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure();
      childLogger.error(`[network] Request failed: ${req.url()} (${failure ? failure.errorText : 'unknown'})`);
    });

    page.on('pageerror', (err) => {
      childLogger.error(`[page error] ${err.message}`, { stack: err.stack });
    });

    // Execute the test block under the child logger AsyncLocalStorage context
    await loggerStorage.run(childLogger, async () => {
      childLogger.info('Starting test');
      await use();
      childLogger.info('Finished test');
    });
  }, { auto: true }],

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  leadFormPage: async ({ page }, use) => {
    const leadFormPage = new LeadFormPage(page);
    await use(leadFormPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
});

export { expect } from '@playwright/test';
