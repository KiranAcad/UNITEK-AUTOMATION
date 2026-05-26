/**
 * File Upload Helper
 * ------------------
 * Utilities for handling file upload interactions.
 */

import { Page } from '@playwright/test';
import { logger } from '../logger';
import * as path from 'path';

export class FileUploadHelper {
  /**
   * Upload a file via a standard file input element.
   */
  static async uploadViaInput(
    page: Page,
    inputSelector: string,
    filePath: string
  ): Promise<void> {
    const absolutePath = path.resolve(filePath);
    logger.info(`Uploading file via input: ${absolutePath}`);
    await page.locator(inputSelector).setInputFiles(absolutePath);
    logger.info('File uploaded successfully');
  }

  /**
   * Upload a file when the input is hidden and triggered by a button click.
   * Uses Playwright's fileChooser API.
   */
  static async uploadViaChooser(
    page: Page,
    triggerSelector: string,
    filePath: string
  ): Promise<void> {
    const absolutePath = path.resolve(filePath);
    logger.info(`Uploading file via chooser: ${absolutePath}`);

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator(triggerSelector).click(),
    ]);

    await fileChooser.setFiles(absolutePath);
    logger.info('File uploaded via chooser successfully');
  }

  /**
   * Upload multiple files at once.
   */
  static async uploadMultipleFiles(
    page: Page,
    inputSelector: string,
    filePaths: string[]
  ): Promise<void> {
    const absolutePaths = filePaths.map((fp) => path.resolve(fp));
    logger.info(`Uploading ${absolutePaths.length} files`);
    await page.locator(inputSelector).setInputFiles(absolutePaths);
    logger.info('Multiple files uploaded successfully');
  }

  /**
   * Clear/remove all files from an input.
   */
  static async clearFiles(page: Page, inputSelector: string): Promise<void> {
    logger.info(`Clearing files from: ${inputSelector}`);
    await page.locator(inputSelector).setInputFiles([]);
  }
}
