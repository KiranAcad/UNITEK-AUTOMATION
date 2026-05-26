/**
 * Home Page Object
 * ----------------
 * Page actions for the Unitek College homepage.
 * Uses HomeLocators — no inline selectors.
 *
 * Covers: Top bar, navigation, hero section, stats, programs, FAQ,
 * accreditations, testimonials, and footer interactions.
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { HomeLocators } from '../locators/home.locators';
import { logger } from '../logger';
import { WaitUtils } from '../utils/wait.utils';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Page Navigation ──────────────────────────────────

  /** Navigate to the homepage */
  async goto(): Promise<void> {
    await this.navigate('/');
    logger.info('Navigated to Unitek College homepage');
  }

  // ─── Top Bar Actions ──────────────────────────────────

  /** Click the "Get info" link in the top bar */
  async clickGetInfo(): Promise<void> {
    await this.click(HomeLocators.getInfoLink);
    logger.info('Clicked "Get info" link');
  }

  /** Click the phone link */
  async getPhoneLinkHref(): Promise<string | null> {
    return this.getAttribute(HomeLocators.phoneLink, 'href');
  }

  /** Check if the "Get info" link is visible */
  async isGetInfoVisible(): Promise<boolean> {
    return this.isVisible(HomeLocators.getInfoLink);
  }

  /** Toggle language between EN and ES */
  async toggleLanguage(): Promise<void> {
    await this.click(HomeLocators.languageToggle);
    logger.info('Toggled language');
  }

  /** Check if EN label is active */
  async isEnglishActive(): Promise<boolean> {
    return this.page.locator(HomeLocators.languageLabelEN).first().isVisible();
  }

  // ─── Search Actions ───────────────────────────────────

  /** Open the search overlay */
  async openSearch(): Promise<void> {
    await this.click(HomeLocators.searchToggle);
    logger.info('Opened search overlay');
  }

  /** Check if search toggle is visible */
  async isSearchToggleVisible(): Promise<boolean> {
    return this.isVisible(HomeLocators.searchToggle);
  }

  // ─── Navigation Menu ──────────────────────────────────

  /** Click on a specific nav item by name */
  async clickNavItem(name: string): Promise<void> {
    const selector = HomeLocators.navItemByName(name);
    await this.click(selector);
    logger.info(`Clicked nav item: ${name}`);
  }

  /** Open the Programs mega menu */
  async openProgramsMegaMenu(): Promise<void> {
    await this.click(HomeLocators.programsNavItem);
    logger.info('Opened Programs mega menu');
    // Wait adaptively for mega menu or alternative containers to be visible
    try {
      await this.page.locator('.mega-menu, #mega-menu-primary, [class*="mega-menu"]').first().waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      logger.warn('Mega menu element did not become visible within 3s, proceeding.');
    }
  }

  /** Close the mega menu */
  async closeMegaMenu(): Promise<void> {
    const closeBtn = this.page.locator(HomeLocators.megaMenuClose);
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      logger.info('Closed mega menu');
    } else {
      await this.pressKey('Escape');
      logger.info('Closed mega menu via Escape key');
    }
  }

  /** Check if mega menu is visible */
  async isMegaMenuVisible(): Promise<boolean> {
    const selector = '.mega-menu, #mega-menu-primary, [class*="mega-menu"]';
    return this.page.locator(selector).first().isVisible();
  }

  /** Check if the Unitek logo is visible */
  async isLogoVisible(): Promise<boolean> {
    return this.isVisible(HomeLocators.navLogo);
  }

  /** Verify all navigation items are visible */
  async verifyAllNavItemsVisible(navItems: readonly string[]): Promise<void> {
    for (const item of navItems) {
      const locator = this.page.locator(HomeLocators.navItemByName(item));
      await expect(locator.first()).toBeVisible();
      logger.debug(`Nav item visible: ${item}`);
    }
    logger.info('All navigation items verified visible');
  }

  // ─── Hero Section ─────────────────────────────────────

  /** Get the hero heading text */
  async getHeroHeading(): Promise<string> {
    return this.getText(HomeLocators.heroHeading);
  }

  /** Verify hero heading contains expected text */
  async verifyHeroHeading(expectedText: string): Promise<void> {
    await this.assertElementText(HomeLocators.heroHeading, expectedText);
    logger.info(`Hero heading verified: "${expectedText}"`);
  }

  /** Check if hero section is visible */
  async isHeroSectionVisible(): Promise<boolean> {
    return this.isVisible(HomeLocators.heroHeading);
  }

  // ─── Stats Section ────────────────────────────────────

  /** Get all stat values displayed on the page */
  async getStatValues(): Promise<string[]> {
    await this.scrollToElement(HomeLocators.statsSection);
    const stats = this.page.locator(HomeLocators.statValues);
    const count = await stats.count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await stats.nth(i).textContent();
      values.push(text?.trim() || '');
    }
    logger.info(`Retrieved ${values.length} stat values`, { values });
    return values;
  }

  /** Verify stats section is visible */
  async isStatsSectionVisible(): Promise<boolean> {
    return this.isVisible(HomeLocators.statsSection);
  }

  // ─── Programs Section ─────────────────────────────────

  /** Verify programs section heading is visible */
  async verifyProgramsSection(): Promise<void> {
    await this.scrollToElement(HomeLocators.programsSectionHeading);
    await this.assertElementVisible(HomeLocators.programsSectionHeading);
    logger.info('Programs section heading verified');
  }

  /** Click "All programs" link */
  async clickAllPrograms(): Promise<void> {
    await this.scrollToElement(HomeLocators.allProgramsLink);
    await this.click(HomeLocators.allProgramsLink);
    logger.info('Clicked "All programs" link');
  }

  // ─── FAQ Section ──────────────────────────────────────

  /** Click a FAQ tab by name */
  async clickFaqTab(tabName: string): Promise<void> {
    const selector = HomeLocators.faqTabByName(tabName);
    await this.scrollToElement(selector);
    await this.click(selector);
    logger.info(`Clicked FAQ tab: ${tabName}`);
  }

  /** Expand a FAQ accordion item by index (0-based) */
  async expandFaqItem(index: number): Promise<void> {
    const triggers = this.page.locator(HomeLocators.faqAccordionTrigger);
    await triggers.nth(index).click();
    logger.info(`Expanded FAQ item at index: ${index}`);
  }

  /** Check if FAQ accordion content is visible at index */
  async isFaqContentVisible(index: number): Promise<boolean> {
    const content = this.page.locator(HomeLocators.faqAccordionContent);
    return content.nth(index).isVisible();
  }

  /** Get FAQ tab count */
  async getFaqTabCount(): Promise<number> {
    return this.getElementCount(HomeLocators.faqTabs);
  }

  // ─── Accreditations Section ───────────────────────────

  /** Get the count of accreditation badges */
  async getAccreditationBadgeCount(): Promise<number> {
    await this.page.locator(HomeLocators.accreditationViewAll).filter({ visible: true }).first().scrollIntoViewIfNeeded();
    return this.getElementCount(HomeLocators.accreditationBadges);
  }

  /** Verify accreditation section is visible */
  async verifyAccreditationsVisible(): Promise<void> {
    const locator = this.page.locator(HomeLocators.accreditationViewAll).filter({ visible: true }).first();
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
    logger.info('Accreditations section verified visible');
  }

  // ─── Story Banner ─────────────────────────────────────

  /** Verify the "NURSING NEEDS YOU" story banner */
  async verifyStoryBanner(): Promise<void> {
    await this.scrollToElement(HomeLocators.storyBanner);
    await this.assertElementVisible(HomeLocators.storyBanner);
    logger.info('Story banner verified visible');
  }

  // ─── Empowering Section ───────────────────────────────

  /** Verify the empowering tagline */
  async verifyEmpoweringTagline(): Promise<void> {
    await this.assertElementVisible(HomeLocators.empoweringTagline);
    logger.info('Empowering tagline verified');
  }

  /** Click "Find my path" CTA */
  async clickFindMyPath(): Promise<void> {
    await this.click(HomeLocators.findMyPath);
    logger.info('Clicked "Find my path"');
  }
}
