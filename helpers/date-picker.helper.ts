/**
 * Date Picker Helper
 * ------------------
 * Generic date picker interaction utility.
 */

import { Page } from '@playwright/test';
import { logger } from '../logger';

export class DatePickerHelper {
  /**
   * Select a date from a standard date picker.
   * Opens picker → navigates to month/year → clicks day.
   */
  static async selectDate(
    page: Page,
    pickerTrigger: string,
    targetDate: Date
  ): Promise<void> {
    const day = targetDate.getDate();
    const month = targetDate.toLocaleString('default', { month: 'long' });
    const year = targetDate.getFullYear();

    logger.info(`Selecting date: ${month} ${day}, ${year}`);
    await page.locator(pickerTrigger).click();

    // Navigate to correct month/year using prev/next buttons
    const maxAttempts = 24;
    for (let i = 0; i < maxAttempts; i++) {
      const displayed = await page.locator('.datepicker-header').textContent();
      if (displayed?.includes(month) && displayed?.includes(String(year))) break;
      await page.locator('.datepicker-next').click();
    }

    // Click the target day
    await page.locator(`.datepicker-day:has-text("${day}")`).first().click();
    logger.info(`Date selected: ${month} ${day}, ${year}`);
  }

  /**
   * Fill a native date input (type="date") with ISO format.
   */
  static async fillNativeDateInput(
    page: Page,
    inputSelector: string,
    date: Date
  ): Promise<void> {
    const iso = date.toISOString().split('T')[0]; // YYYY-MM-DD
    logger.info(`Filling native date input: ${iso}`);
    await page.locator(inputSelector).fill(iso);
  }
}
