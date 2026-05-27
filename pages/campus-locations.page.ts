import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CampusLocationsLocators } from '../locators/campus-locations.locators';
import { logger } from '../logger';
import { WaitUtils } from '../utils/wait.utils';

export interface CampusCardData {
  name: string;
  address: string;
  phone: string;
  buttonText: string;
  buttonHref: string | null;
}

export interface NewsCardData {
  title: string;
  category: string;
  date: string;
  author: string;
  link: string | null;
}

export class CampusLocationsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the Campus Locations page */
  async goto(): Promise<void> {
    await this.navigate('/campus-locations/');
    logger.info('Navigated to Unitek College Campus Locations page');
  }

  // ─── SEO & Meta Verification ──────────────────────────

  /** Verify page title and standard SEO tags */
  async verifySeoMetaTags(): Promise<void> {
    logger.info('Verifying SEO and Meta tags for Campus Locations page');
    
    // Title tag check
    await this.assertTitleContains('9 Convenient Campus Locations');

    // Robots meta check
    const robots = await this.getAttribute(CampusLocationsLocators.metaRobots, 'content');
    logger.info(`Robots meta tag value: ${robots}`);

    // Description meta check
    const description = await this.getAttribute(CampusLocationsLocators.metaDescription, 'content');
    logger.info(`Meta description value: ${description}`);
    expect(description).toContain('9 convenient college campuses');

    // OpenGraph meta tags
    const ogTitle = await this.getAttribute(CampusLocationsLocators.ogTitle, 'content');
    const ogDesc = await this.getAttribute(CampusLocationsLocators.ogDescription, 'content');
    logger.info(`OG Title: "${ogTitle}", OG Description: "${ogDesc}"`);
    expect(ogTitle).toContain('9 Convenient Campus Locations');

    // Canonical link (make optional since it may not be present in all environments)
    const canonicalLocator = this.page.locator(CampusLocationsLocators.canonicalLink);
    if (await canonicalLocator.count() > 0) {
      const canonical = await canonicalLocator.getAttribute('href');
      logger.info(`Canonical link href: ${canonical}`);
      expect(canonical).toContain('/campus-locations/');
    } else {
      logger.warn('Canonical link tag is not present on this page/environment');
    }
  }

  // ─── Header & Top Bar Interactions ────────────────────

  /** Click the top-bar "Get info" CTA link */
  async clickGetInfoLink(): Promise<void> {
    logger.info('Clicking Get Info link in the top bar');
    await this.click(CampusLocationsLocators.getInfoLink);
  }

  /** Toggle the desktop header search input overlay */
  async toggleSearchOverlay(): Promise<void> {
    logger.info('Toggling search overlay via toggle button');
    await this.click(CampusLocationsLocators.searchToggle);
  }

  /** Get top bar phone link text and href */
  async getTopBarPhoneDetails(): Promise<{ text: string; href: string | null }> {
    const text = await this.getText(CampusLocationsLocators.topBarPhone);
    const href = await this.getAttribute(CampusLocationsLocators.topBarPhone, 'href');
    logger.info(`Top bar phone details retrieved: text="${text}", href="${href}"`);
    return { text, href };
  }

  /** Check if the mobile language menu toggle is expanded */
  async isMobileLanguageMenuExpanded(): Promise<boolean> {
    const expanded = await this.getAttribute(CampusLocationsLocators.mobileLanguageTrigger, 'aria-expanded');
    return expanded === 'true';
  }

  /** Click mobile language trigger to toggle visual dropdown */
  async toggleMobileLanguageDropdown(): Promise<void> {
    logger.info('Toggling mobile language custom dropdown menu');
    await this.click(CampusLocationsLocators.mobileLanguageTrigger);
  }

  /** Switch mobile translation language to ES (Spanish) */
  async switchMobileLanguageToES(): Promise<void> {
    logger.info('Switching language switcher selection to ES (Spanish)');
    const select = this.page.locator(CampusLocationsLocators.mobileLanguageSelect);
    if (await select.isVisible()) {
      await select.selectOption('es');
    } else {
      const isExpanded = await this.isMobileLanguageMenuExpanded();
      if (!isExpanded) {
        await this.toggleMobileLanguageDropdown();
      }
      await this.click(CampusLocationsLocators.mobileLanguageES);
    }
    await this.page.waitForTimeout(1000); // Wait for potential local translation animation/actions
  }

  /** Switch mobile translation language to EN (English) */
  async switchMobileLanguageToEN(): Promise<void> {
    logger.info('Switching language switcher selection to EN (English)');
    const select = this.page.locator(CampusLocationsLocators.mobileLanguageSelect);
    if (await select.isVisible()) {
      await select.selectOption('en');
    } else {
      const isExpanded = await this.isMobileLanguageMenuExpanded();
      if (!isExpanded) {
        await this.toggleMobileLanguageDropdown();
      }
      await this.click(CampusLocationsLocators.mobileLanguageEN);
    }
    await this.page.waitForTimeout(1000);
  }

  // ─── Hero Block Verification ──────────────────────────

  /** Verify that the hero elements are visible and properly structured */
  async verifyHeroBlock(): Promise<{ heading: string; subheading: string; breadcrumbs: string[] }> {
    logger.info('Verifying page hero block details');
    await this.assertElementVisible(CampusLocationsLocators.heroSection);
    
    const heading = await this.getText(CampusLocationsLocators.heroHeading);
    const subheading = await this.getText(CampusLocationsLocators.heroSubheading);
    
    const breadcrumbLocs = this.page.locator(CampusLocationsLocators.breadcrumbLinks);
    const count = await breadcrumbLocs.count();
    const breadcrumbs: string[] = [];
    for (let i = 0; i < count; i++) {
      const txt = await breadcrumbLocs.nth(i).textContent();
      breadcrumbs.push(txt?.trim() || '');
    }

    logger.info(`Hero verified. Heading: "${heading}", Breadcrumbs: ${JSON.stringify(breadcrumbs)}`);
    return { heading, subheading, breadcrumbs };
  }

  // ─── Sub Navigation Bar Interactions ──────────────────

  /** Check if campus sub nav bar block is visible */
  async isSubNavBarVisible(): Promise<boolean> {
    return this.isVisible(CampusLocationsLocators.subNavBarBlock);
  }

  /** Get list of all anchor texts displayed in the sub-nav menu */
  async getSubNavBarLinkTexts(): Promise<string[]> {
    const links = this.page.locator(CampusLocationsLocators.subNavBarLinks);
    const count = await links.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const txt = await links.nth(i).textContent();
      texts.push(txt?.trim() || '');
    }
    return texts;
  }

  /** Scroll and click a specific campus anchor sub nav link by anchor ID */
  async clickSubNavLink(anchor: string): Promise<void> {
    logger.info(`Clicking sub nav anchor link for: #${anchor}`);
    const selector = CampusLocationsLocators.subNavBarLinkByAnchor(anchor);
    await this.scrollToElement(selector);
    await this.click(selector);
    await this.page.waitForTimeout(800); // Wait for scroll animation to settle
  }

  // ─── Campus Card details & Map viewports ──────────────

  /** Get count of all visible campus sections */
  async getCampusCardsCount(): Promise<number> {
    return this.getElementCount(CampusLocationsLocators.campusSection);
  }

  /** Extract full detail details of a campus section card at a given index */
  async getCampusCardData(index: number): Promise<CampusCardData> {
    const card = this.page.locator(CampusLocationsLocators.campusSection).nth(index);
    await card.scrollIntoViewIfNeeded();

    const name = (await card.locator(CampusLocationsLocators.campusName).first().textContent())?.trim() || '';
    const address = (await card.locator(CampusLocationsLocators.campusAddress).first().textContent())?.trim() || '';
    const phone = (await card.locator(CampusLocationsLocators.campusContactLink).first().textContent())?.trim() || '';
    
    const btn = card.locator(CampusLocationsLocators.campusButton).first();
    const buttonText = (await btn.textContent())?.trim() || '';
    const buttonHref = await btn.getAttribute('href');

    logger.info(`Campus card details at index ${index} extracted: name="${name}", phone="${phone}"`);
    return { name, address, phone, buttonText, buttonHref };
  }

  /** Click the "Get Started" / CTA button on a campus card at a given index */
  async clickCampusCTA(index: number): Promise<void> {
    logger.info(`Clicking Get Started CTA button on campus card at index ${index}`);
    const card = this.page.locator(CampusLocationsLocators.campusSection).nth(index);
    const btn = card.locator(CampusLocationsLocators.campusButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /** Verify that the Google Map elements for a campus section are fully visible */
  async verifyMapVisible(index: number): Promise<boolean> {
    logger.info(`Verifying map viewport visibility for campus section index ${index}`);
    const card = this.page.locator(CampusLocationsLocators.campusSection).nth(index);
    const container = card.locator(CampusLocationsLocators.unitekMapContainer).first();
    const mapDiv = card.locator(CampusLocationsLocators.unitekMapDiv).first();

    const containerVisible = await container.isVisible();
    const mapDivVisible = await mapDiv.isVisible();

    logger.info(`Map container visible: ${containerVisible}, Map interactive viewport visible: ${mapDivVisible}`);
    return containerVisible && mapDivVisible;
  }

  // ─── "Get Started Today" Lead Capture Form ────────────

  /** Check if the main lead form block section is visible */
  async isLeadFormVisible(): Promise<boolean> {
    return this.isVisible(CampusLocationsLocators.leadFormBlock);
  }

  /** Fill out the lead form fields */
  async fillLeadForm(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    state?: string;
    zipcode?: string;
    campus?: string;
    program?: string;
    acceptConsent?: boolean;
  }): Promise<void> {
    logger.info('Filling out Unitek Lead Capture form with values', data);

    if (data.firstName !== undefined) {
      await this.fill(CampusLocationsLocators.firstNameInput, data.firstName);
    }
    if (data.lastName !== undefined) {
      await this.fill(CampusLocationsLocators.lastNameInput, data.lastName);
    }
    if (data.email !== undefined) {
      await this.fill(CampusLocationsLocators.emailInput, data.email);
    }
    if (data.phone !== undefined) {
      await this.fill(CampusLocationsLocators.phoneInput, data.phone);
    }
    if (data.state !== undefined) {
      await this.selectOption(CampusLocationsLocators.stateSelect, data.state);
    }
    if (data.zipcode !== undefined) {
      await this.fill(CampusLocationsLocators.zipcodeInput, data.zipcode);
    }
    if (data.campus !== undefined) {
      await this.selectOption(CampusLocationsLocators.campusSelect, data.campus);
      await this.page.waitForTimeout(500); // Wait for dynamic program options to refresh
    }
    if (data.program !== undefined) {
      await this.selectOption(CampusLocationsLocators.programSelect, data.program);
    }
    if (data.acceptConsent !== undefined) {
      const checkbox = this.page.locator(CampusLocationsLocators.acceptanceCheckbox);
      const isChecked = await checkbox.isChecked();
      if (data.acceptConsent !== isChecked) {
        await checkbox.click();
      }
    }
  }

  /** Click the form submit button */
  async submitLeadForm(): Promise<void> {
    logger.info('Submitting Lead Capture form');
    await this.click(CampusLocationsLocators.submitButton);
  }

  /** Retrieve dynamic dropdown programs list text values based on the currently selected campus */
  async getProgramDropdownOptions(): Promise<string[]> {
    const select = this.page.locator(CampusLocationsLocators.programSelect);
    const options = await select.locator('option').evaluateAll((opts) =>
      opts.map((o) => o.textContent || '')
    );
    logger.info(`Retrieved program dropdown options: ${JSON.stringify(options)}`);
    return options;
  }

  /** Get error message validation text by field name */
  async getValidationError(fieldName: 'firstName' | 'lastName' | 'email' | 'phone' | 'state' | 'zipcode' | 'campus' | 'program' | 'acceptance'): Promise<string> {
    let locatorStr = '';
    switch (fieldName) {
      case 'firstName':
        locatorStr = CampusLocationsLocators.firstNameError;
        break;
      case 'lastName':
        locatorStr = CampusLocationsLocators.lastNameError;
        break;
      case 'email':
        locatorStr = CampusLocationsLocators.emailError;
        break;
      case 'phone':
        locatorStr = CampusLocationsLocators.phoneError;
        break;
      case 'state':
        locatorStr = CampusLocationsLocators.stateError;
        break;
      case 'zipcode':
        locatorStr = CampusLocationsLocators.zipcodeError;
        break;
      case 'campus':
        locatorStr = CampusLocationsLocators.campusError;
        break;
      case 'program':
        locatorStr = CampusLocationsLocators.programError;
        break;
      case 'acceptance':
        locatorStr = CampusLocationsLocators.acceptanceError;
        break;
    }

    const isVisible = await this.page.locator(locatorStr).isVisible();
    if (isVisible) {
      const text = await this.getText(locatorStr);
      logger.info(`Validation error text for field [${fieldName}]: "${text}"`);
      return text;
    }
    return '';
  }

  // ─── Latest News Section ──────────────────────────────

  /** Get count of all visible news article cards */
  async getNewsCardsCount(): Promise<number> {
    return this.getElementCount(CampusLocationsLocators.newsCards);
  }

  /** Extract full detail details of a news article card at a given index */
  async getNewsCardData(index: number): Promise<NewsCardData> {
    const card = this.page.locator(CampusLocationsLocators.newsCards).nth(index);
    await card.scrollIntoViewIfNeeded();

    const title = (await card.locator(CampusLocationsLocators.newsTitle).first().textContent())?.trim() || '';
    const category = (await card.locator(CampusLocationsLocators.newsCategory).first().textContent())?.trim() || '';
    const date = (await card.locator(CampusLocationsLocators.newsDate).first().textContent())?.trim() || '';
    const author = (await card.locator(CampusLocationsLocators.newsAuthor).first().textContent())?.trim() || '';
    
    const linkElem = card.locator('a').first();
    const link = await linkElem.getAttribute('href');

    logger.info(`News card details at index ${index} extracted: title="${title}"`);
    return { title, category, date, author, link };
  }

  // ─── Footer Section ───────────────────────────────────

  /** Get count of columns displayed in the sitemap footer */
  async getFooterColumnsCount(): Promise<number> {
    return this.getElementCount(CampusLocationsLocators.footerColumns);
  }

  /** Get all footer links names and references */
  async getFooterLinks(): Promise<{ text: string; href: string | null }[]> {
    const links = this.page.locator(CampusLocationsLocators.footerLinks);
    const count = await links.count();
    const results: { text: string; href: string | null }[] = [];
    for (let i = 0; i < count; i++) {
      const txt = await links.nth(i).textContent();
      const href = await links.nth(i).getAttribute('href');
      results.push({ text: txt?.trim() || '', href });
    }
    return results;
  }
}
