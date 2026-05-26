/**
 * Search Page Object
 * ------------------
 * Page actions for the search overlay functionality.
 */

import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../logger';

export class SearchPage extends BasePage {
  // Search overlay selectors
  private readonly searchToggle = 'button.search-toggle';
  private readonly searchInput = '.search-input-field';
  private readonly searchCloseBtn = '.search-close-btn';
  private readonly searchOverlay = '.search-overlay';

  constructor(page: Page) {
    super(page);
  }

  async openSearch(): Promise<void> {
    await this.click(this.searchToggle);
    logger.info('Search overlay opened');
  }

  async searchFor(query: string): Promise<void> {
    await this.fill(this.searchInput, query);
    await this.pressKey('Enter');
    logger.info(`Searched for: ${query}`);
  }

  async closeSearch(): Promise<void> {
    await this.click(this.searchCloseBtn);
    logger.info('Search overlay closed');
  }

  async isSearchOverlayVisible(): Promise<boolean> {
    return this.isVisible(this.searchOverlay);
  }

  async isSearchInputVisible(): Promise<boolean> {
    return this.isVisible(this.searchInput);
  }
}
