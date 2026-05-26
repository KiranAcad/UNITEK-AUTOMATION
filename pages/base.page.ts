/**
 * Base Page Object
 * ----------------
 * Abstract base class providing shared actions for all page objects.
 * All interactions use Playwright's auto-waiting — no hard waits.
 *
 * Features:
 * - Smart click with retry
 * - Fill with clear
 * - Scroll to element
 * - Screenshot capture
 * - Integrated logging
 */

import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../logger';
import { WaitUtils } from '../utils/wait.utils';
import { TIMEOUTS } from '../constants/app.constants';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────

  /**
   * Navigate to a specific path relative to base URL.
   * @param path - URL path (e.g., '/programs/')
   */
  async navigate(path: string = '/'): Promise<void> {
    logger.info(`Navigating to: ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await WaitUtils.waitForLoadState(this.page, 'domcontentloaded');
  }

  /**
   * Get the current page URL.
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // ─── Click Actions ─────────────────────────────────────

  /**
   * Click an element with auto-waiting.
   * @param selector - CSS selector string
   */
  async click(selector: string): Promise<void> {
    logger.info(`Clicking element: ${selector}`);
    await this.page.locator(selector).click();
  }

  /**
   * Click a Locator with auto-waiting.
   * @param locator - Playwright Locator
   */
  async clickLocator(locator: Locator): Promise<void> {
    logger.info(`Clicking locator`);
    await locator.click();
  }

  /**
   * Click with retry mechanism for flaky interactions.
   * @param selector - CSS selector
   * @param retries - Number of retry attempts
   */
  async clickWithRetry(selector: string, retries: number = 3): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        logger.debug(`Click attempt ${attempt}/${retries}: ${selector}`);
        await this.page.locator(selector).click({ timeout: TIMEOUTS.SHORT });
        return;
      } catch (error) {
        if (attempt === retries) {
          logger.error(`Failed to click after ${retries} attempts: ${selector}`);
          throw error;
        }
        logger.warn(`Click attempt ${attempt} failed, retrying...`, { selector });
        await this.page.waitForLoadState('domcontentloaded');
      }
    }
  }

  /**
   * Force-click an element (bypasses actionability checks).
   * Use sparingly — only when normal click doesn't work.
   */
  async forceClick(selector: string): Promise<void> {
    logger.warn(`Force clicking element: ${selector}`);
    await this.page.locator(selector).click({ force: true });
  }

  // ─── Input Actions ─────────────────────────────────────

  /**
   * Clear an input field and type new text.
   * @param selector - CSS selector for the input
   * @param text - Text to type
   */
  async fill(selector: string, text: string): Promise<void> {
    logger.info(`Filling input: ${selector}`, { value: text });
    const locator = this.page.locator(selector);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Type text character by character (useful for inputs with real-time validation).
   * @param selector - CSS selector for the input
   * @param text - Text to type
   * @param delay - Delay between keystrokes in ms
   */
  async typeSlowly(selector: string, text: string, delay: number = 50): Promise<void> {
    logger.info(`Typing slowly into: ${selector}`);
    await this.page.locator(selector).pressSequentially(text, { delay });
  }

  /**
   * Clear an input field.
   */
  async clearInput(selector: string): Promise<void> {
    logger.info(`Clearing input: ${selector}`);
    await this.page.locator(selector).clear();
  }

  // ─── Dropdown Actions ──────────────────────────────────

  /**
   * Select an option from a native <select> dropdown.
   * @param selector - CSS selector for the <select>
   * @param value - Option value or label
   */
  async selectOption(selector: string, value: string): Promise<void> {
    logger.info(`Selecting option: "${value}" from ${selector}`);
    await this.page.locator(selector).selectOption(value);
  }

  // ─── Checkbox / Radio ──────────────────────────────────

  /**
   * Check a checkbox if it's not already checked.
   */
  async check(selector: string): Promise<void> {
    logger.info(`Checking checkbox: ${selector}`);
    await this.page.locator(selector).check();
  }

  /**
   * Uncheck a checkbox if it's checked.
   */
  async uncheck(selector: string): Promise<void> {
    logger.info(`Unchecking checkbox: ${selector}`);
    await this.page.locator(selector).uncheck();
  }

  // ─── Element State ─────────────────────────────────────

  /**
   * Check if an element is visible.
   */
  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  /**
   * Check if an element is enabled.
   */
  async isEnabled(selector: string): Promise<boolean> {
    return this.page.locator(selector).isEnabled();
  }

  /**
   * Check if a checkbox is checked.
   */
  async isChecked(selector: string): Promise<boolean> {
    return this.page.locator(selector).isChecked();
  }

  /**
   * Get the text content of an element.
   */
  async getText(selector: string): Promise<string> {
    const text = await this.page.locator(selector).textContent();
    return text?.trim() || '';
  }

  /**
   * Get the value of an input element.
   */
  async getInputValue(selector: string): Promise<string> {
    return this.page.locator(selector).inputValue();
  }

  /**
   * Get an attribute value from an element.
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return this.page.locator(selector).getAttribute(attribute);
  }

  /**
   * Count the number of elements matching a selector.
   */
  async getElementCount(selector: string): Promise<number> {
    return this.page.locator(selector).count();
  }

  // ─── Scroll Actions ────────────────────────────────────

  /**
   * Scroll an element into view.
   */
  async scrollToElement(selector: string): Promise<void> {
    logger.debug(`Scrolling to element: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to the bottom of the page.
   */
  async scrollToBottom(): Promise<void> {
    logger.debug('Scrolling to bottom of page');
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * Scroll to the top of the page.
   */
  async scrollToTop(): Promise<void> {
    logger.debug('Scrolling to top of page');
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  // ─── Keyboard Actions ─────────────────────────────────

  /**
   * Press a keyboard key.
   */
  async pressKey(key: string): Promise<void> {
    logger.debug(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  // ─── Hover Actions ─────────────────────────────────────

  /**
   * Hover over an element.
   */
  async hover(selector: string): Promise<void> {
    logger.debug(`Hovering over: ${selector}`);
    await this.page.locator(selector).hover();
  }

  // ─── Screenshots ───────────────────────────────────────

  /**
   * Take a screenshot and save to screenshots directory.
   * @param name - Descriptive name for the screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
    logger.info(`Taking screenshot: ${screenshotPath}`);
    return this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  // ─── Assertions ────────────────────────────────────────

  /**
   * Assert that the page URL contains a substring.
   */
  async assertUrlContains(urlPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  /**
   * Assert that the page title contains text.
   */
  async assertTitleContains(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(title));
  }

  /**
   * Assert that an element is visible.
   */
  async assertElementVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert that an element contains specific text.
   */
  async assertElementText(selector: string, text: string | RegExp): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Assert that an element has a specific count.
   */
  async assertElementCount(selector: string, count: number): Promise<void> {
    await expect(this.page.locator(selector)).toHaveCount(count);
  }

  // ─── Retry Mechanism ───────────────────────────────────

  /**
   * Retry an action with configurable attempts and delay.
   * @param action - Async function to retry
   * @param retries - Number of retry attempts
   * @param delayMs - Delay between retries in ms
   */
  async retryAction<T>(
    action: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await action();
      } catch (error) {
        if (attempt === retries) {
          logger.error(`Action failed after ${retries} retries`);
          throw error;
        }
        logger.warn(`Attempt ${attempt}/${retries} failed, retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw new Error('Retry action exhausted all attempts');
  }

  /**
   * Get the underlying Playwright Page instance.
   */
  getPage(): Page {
    return this.page;
  }
}
