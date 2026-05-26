/**
 * Dropdown Helper
 * ---------------
 * Reusable utilities for handling both custom and native dropdowns.
 */

import { Page } from '@playwright/test';
import { logger } from '../logger';

export class DropdownHelper {
  /**
   * Select an option from a custom (non-native) dropdown.
   * Clicks the trigger, waits for options, then clicks the matching option.
   */
  static async selectCustomDropdownOption(
    page: Page,
    triggerSelector: string,
    optionText: string
  ): Promise<void> {
    logger.info(`Custom dropdown: clicking trigger "${triggerSelector}"`);
    await page.locator(triggerSelector).click();
    const option = page.locator(`text="${optionText}"`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    logger.info(`Custom dropdown: selected "${optionText}"`);
  }

  /**
   * Select option from native <select> by visible text.
   */
  static async selectNativeByLabel(
    page: Page,
    selectSelector: string,
    label: string
  ): Promise<void> {
    logger.info(`Native select: "${selectSelector}" → "${label}"`);
    await page.locator(selectSelector).selectOption({ label });
  }

  /**
   * Select option from native <select> by value attribute.
   */
  static async selectNativeByValue(
    page: Page,
    selectSelector: string,
    value: string
  ): Promise<void> {
    logger.info(`Native select: "${selectSelector}" → value="${value}"`);
    await page.locator(selectSelector).selectOption({ value });
  }

  /**
   * Get all options from a native <select> dropdown.
   */
  static async getNativeOptions(
    page: Page,
    selectSelector: string
  ): Promise<string[]> {
    const options = await page.locator(`${selectSelector} option`).allTextContents();
    return options.map((o) => o.trim()).filter((o) => o.length > 0);
  }
}
