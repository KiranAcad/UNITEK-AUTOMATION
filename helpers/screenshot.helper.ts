/**
 * Screenshot Helper
 * -----------------
 * Screenshot capture and management utility.
 */

import { Page } from '@playwright/test';
import { logger } from '../logger';
import * as path from 'path';
import * as fs from 'fs';

const SCREENSHOTS_DIR = path.resolve(process.cwd(), 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

export class ScreenshotHelper {
  /**
   * Capture a screenshot of the current viewport.
   */
  static async capture(page: Page, name: string): Promise<string> {
    const fileName = `${name}-${Date.now()}.png`;
    const filePath = path.join(SCREENSHOTS_DIR, fileName);
    await page.screenshot({ path: filePath });
    logger.info(`Screenshot captured: ${filePath}`);
    return filePath;
  }

  /**
   * Capture a full-page screenshot.
   */
  static async captureFullPage(page: Page, name: string): Promise<string> {
    const fileName = `${name}-fullpage-${Date.now()}.png`;
    const filePath = path.join(SCREENSHOTS_DIR, fileName);
    await page.screenshot({ path: filePath, fullPage: true });
    logger.info(`Full-page screenshot captured: ${filePath}`);
    return filePath;
  }

  /**
   * Capture a screenshot of a specific element.
   */
  static async captureElement(
    page: Page,
    selector: string,
    name: string
  ): Promise<string> {
    const fileName = `${name}-element-${Date.now()}.png`;
    const filePath = path.join(SCREENSHOTS_DIR, fileName);
    await page.locator(selector).screenshot({ path: filePath });
    logger.info(`Element screenshot captured: ${filePath}`);
    return filePath;
  }

  /**
   * Capture a screenshot on failure — called from test hooks.
   */
  static async captureOnFailure(
    page: Page,
    testName: string
  ): Promise<string> {
    const safeName = testName.replace(/[^a-zA-Z0-9]/g, '_');
    return this.captureFullPage(page, `FAILURE-${safeName}`);
  }
}
