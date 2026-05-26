/**
 * Custom Wait Utilities
 * ---------------------
 * Reusable wait functions that avoid hard waits (page.waitForTimeout).
 * All methods use Playwright's auto-waiting mechanics or custom polling.
 *
 * Usage:
 *   import { WaitUtils } from '../utils/wait.utils';
 *   await WaitUtils.waitForElementVisible(page.locator('.hero'), 10000);
 *   await WaitUtils.waitForUrlContains(page, '/programs/');
 */

import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../logger';
import { TIMEOUTS } from '../constants/app.constants';

export class WaitUtils {
  /**
   * Wait for an element to become visible on the page.
   * @param locator - Playwright Locator
   * @param timeout - Max wait time in ms (default: 15s)
   */
  static async waitForElementVisible(
    locator: Locator,
    timeout: number = TIMEOUTS.DEFAULT
  ): Promise<void> {
    logger.debug('Waiting for element to be visible', { timeout });
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden or detached from the DOM.
   * @param locator - Playwright Locator
   * @param timeout - Max wait time in ms
   */
  static async waitForElementHidden(
    locator: Locator,
    timeout: number = TIMEOUTS.DEFAULT
  ): Promise<void> {
    logger.debug('Waiting for element to be hidden', { timeout });
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for an element to be attached to the DOM (may not be visible).
   * @param locator - Playwright Locator
   * @param timeout - Max wait time in ms
   */
  static async waitForElementAttached(
    locator: Locator,
    timeout: number = TIMEOUTS.DEFAULT
  ): Promise<void> {
    logger.debug('Waiting for element to be attached', { timeout });
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for the page URL to contain a specific substring.
   * @param page - Playwright Page
   * @param urlPart - Expected URL substring
   * @param timeout - Max wait time in ms
   */
  static async waitForUrlContains(
    page: Page,
    urlPart: string,
    timeout: number = TIMEOUTS.NAVIGATION
  ): Promise<void> {
    logger.debug('Waiting for URL to contain', { urlPart, timeout });
    await page.waitForURL(`**${urlPart}**`, { timeout });
  }

  /**
   * Wait for the page to reach network idle state.
   * @param page - Playwright Page
   * @param timeout - Max wait time in ms
   */
  static async waitForNetworkIdle(
    page: Page,
    timeout: number = TIMEOUTS.LONG
  ): Promise<void> {
    logger.debug('Waiting for network idle', { timeout });
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for a specific load state.
   * @param page - Playwright Page
   * @param state - Load state to wait for
   */
  static async waitForLoadState(
    page: Page,
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'
  ): Promise<void> {
    logger.debug('Waiting for load state', { state });
    await page.waitForLoadState(state);
  }

  /**
   * Wait for a specific number of elements to appear.
   * Uses polling instead of hard waits.
   * @param locator - Playwright Locator
   * @param count - Expected minimum count
   * @param timeout - Max wait time in ms
   */
  static async waitForElementCount(
    locator: Locator,
    count: number,
    timeout: number = TIMEOUTS.DEFAULT
  ): Promise<void> {
    logger.debug('Waiting for element count', { expectedCount: count, timeout });
    await expect(locator).toHaveCount(count, { timeout });
  }

  /**
   * Wait for an element to contain specific text.
   * @param locator - Playwright Locator
   * @param text - Expected text content
   * @param timeout - Max wait time in ms
   */
  static async waitForText(
    locator: Locator,
    text: string | RegExp,
    timeout: number = TIMEOUTS.DEFAULT
  ): Promise<void> {
    logger.debug('Waiting for text content', { text: text.toString(), timeout });
    await expect(locator).toContainText(text, { timeout });
  }

  /**
   * Wait for a specific response from the network.
   * @param page - Playwright Page
   * @param urlPattern - URL pattern to match (string or RegExp)
   * @param timeout - Max wait time in ms
   */
  static async waitForResponse(
    page: Page,
    urlPattern: string | RegExp,
    timeout: number = TIMEOUTS.LONG
  ): Promise<void> {
    logger.debug('Waiting for network response', { pattern: urlPattern.toString(), timeout });
    await page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Custom polling wait — repeatedly checks a condition until it's true.
   * Use for complex scenarios where built-in waits aren't sufficient.
   * @param condition - Async function that returns true when condition is met
   * @param timeout - Max wait time in ms
   * @param pollInterval - How often to check the condition in ms
   * @param message - Description for logging/error messages
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = TIMEOUTS.DEFAULT,
    pollInterval: number = TIMEOUTS.POLL_INTERVAL,
    message: string = 'custom condition'
  ): Promise<void> {
    logger.debug('Waiting for condition', { message, timeout, pollInterval });
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        if (await condition()) {
          logger.debug('Condition met', { message });
          return;
        }
      } catch {
        // Condition threw — continue polling
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error(
      `Timeout waiting for condition: "${message}" after ${timeout}ms`
    );
  }
}
