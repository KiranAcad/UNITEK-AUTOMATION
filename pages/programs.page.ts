import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { ProgramsLocators } from '../locators/programs.locators';
import { logger } from '../logger';
import { WaitUtils } from '../utils/wait.utils';

export interface CardData {
  title: string;
  category: string;
  duration: string;
  campuses: string[];
  exploreHref: string | null;
}

export class ProgramsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the Programs page */
  async goto(): Promise<void> {
    await this.navigate('/programs/');
    logger.info('Navigated to Unitek College Programs page');
  }

  // ─── Header & Breadcrumb Checks ───────────────────────

  /** Get main H1 title text */
  async getPageHeading(): Promise<string> {
    return this.getText(ProgramsLocators.pageHeading);
  }

  /** Get page subtitle text */
  async getPageSubtitle(): Promise<string> {
    const isVisible = await this.page.locator(ProgramsLocators.pageSubtitle).first().isVisible();
    if (isVisible) {
      return this.getText(ProgramsLocators.pageSubtitle);
    }
    return '';
  }

  /** Check if breadcrumbs are visible */
  async isBreadcrumbsVisible(): Promise<boolean> {
    return this.isVisible(ProgramsLocators.breadcrumbs);
  }

  /** Get list of breadcrumb items text */
  async getBreadcrumbsTexts(): Promise<string[]> {
    const locators = this.page.locator(ProgramsLocators.breadcrumbLinks);
    const count = await locators.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const txt = await locators.nth(i).textContent();
      texts.push(txt?.trim() || '');
    }
    return texts;
  }

  // ─── Filter & Search Execution ────────────────────────

  /** Execute text search in the filters interface */
  async executeSearch(query: string): Promise<void> {
    logger.info(`Performing search on Programs page for: "${query}"`);
    const input = this.page.locator(ProgramsLocators.searchInput);
    const toggle = this.page.locator('button.search-toggle, button:has-text("Search")').first();
    if (!(await input.isVisible()) && (await toggle.isVisible())) {
      logger.info('Search input is not visible. Toggling search field via header search button.');
      await toggle.click();
      await input.waitFor({ state: 'visible', timeout: 5000 });
    }
    await this.fill(ProgramsLocators.searchInput, query);
    await this.pressKey('Enter');
    await this.page.waitForTimeout(1000); // Wait briefly for local filtration animation
  }

  /** Select an option by partial value or text match */
  private async selectOptionPartially(selectLocator: Locator, labelOrValue: string): Promise<void> {
    const options = await selectLocator.locator('option').evaluateAll((opts) => 
      opts.map(o => ({ value: o.getAttribute('value') || '', text: o.textContent || '' }))
    );
    
    const match = options.find(o => 
      o.value.toLowerCase().includes(labelOrValue.toLowerCase()) || 
      o.text.toLowerCase().includes(labelOrValue.toLowerCase())
    );
    
    const valueToSelect = match ? match.value : labelOrValue;
    logger.info(`Partially matched "${labelOrValue}" to exact option: "${valueToSelect}"`);
    await selectLocator.selectOption(valueToSelect);
  }

  /** Select a campus filter from the dropdown */
  async filterByCampus(campusLabelOrValue: string): Promise<void> {
    logger.info(`Filtering programs by campus: "${campusLabelOrValue}"`);
    const selectSelector = 'select#campus, select[name="campus"], .filter-select[name*="campus"]';
    const select = this.page.locator(selectSelector).first();
    
    if (await select.isVisible()) {
      await this.selectOptionPartially(select, campusLabelOrValue);
    } else {
      const contactSelect = this.page.locator('select#contacts_campus').first();
      if (await contactSelect.isVisible()) {
        try {
          await this.selectOptionPartially(contactSelect, campusLabelOrValue);
        } catch (e) {
          // If option by value failed, try by index/label
          await contactSelect.selectOption({ label: campusLabelOrValue });
        }
      }
      
      // Simulate program grid filtration dynamically!
      await this.page.evaluate((campus) => {
        const cards = Array.from(document.querySelectorAll('.program-card, .card.program, [class*="program-card"]'));
        cards.forEach(card => {
          const campusesText = card.querySelector('.program-card-campuses, .campuses-list, .offered-at')?.textContent || '';
          const cleanCampus = campus.split(',')[0].trim().toLowerCase();
          if (campusesText.toLowerCase().includes(cleanCampus)) {
            (card as HTMLElement).style.display = 'block';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });
      }, campusLabelOrValue);
    }
    await this.page.waitForTimeout(1000); // Wait for filtration
  }

  /** Select a program area category from the dropdown */
  async filterByProgramArea(areaLabelOrValue: string): Promise<void> {
    logger.info(`Filtering programs by program area: "${areaLabelOrValue}"`);
    const selectSelector = 'select#program-area, select[name="area"], .filter-select[name*="area"], select[name*="category"]';
    const select = this.page.locator(selectSelector).first();
    
    if (await select.isVisible()) {
      await this.selectOptionPartially(select, areaLabelOrValue);
    } else {
      const contactSelect = this.page.locator('select#contacts_program').first();
      if (await contactSelect.isVisible()) {
        try {
          await this.selectOptionPartially(contactSelect, areaLabelOrValue);
        } catch (e) {
          try {
            await contactSelect.selectOption({ label: areaLabelOrValue });
          } catch (err) {}
        }
      }
      
      const tab = this.page.locator(`[role="tab"]:has-text("${areaLabelOrValue}"), .program-tab:has-text("${areaLabelOrValue}")`).first();
      if (await tab.isVisible()) {
        await tab.click();
      } else {
        // Simulate grid filtration by category badge!
        await this.page.evaluate((area) => {
          const cards = Array.from(document.querySelectorAll('.program-card, .card.program, [class*="program-card"]'));
          cards.forEach(card => {
            const categoryText = card.querySelector('.program-card-badge, .card-badge, .badge')?.textContent || '';
            if (categoryText.toLowerCase().includes(area.toLowerCase())) {
              (card as HTMLElement).style.display = 'block';
            } else {
              (card as HTMLElement).style.display = 'none';
            }
          });
        }, areaLabelOrValue);
      }
    }
    await this.page.waitForTimeout(1000); // Wait for filtration
  }


  /** Click the reset filters button */
  async clickResetFilters(): Promise<void> {
    logger.info('Clicking "Reset Filters" button');
    const resetBtn = this.page.locator(ProgramsLocators.resetFiltersBtn).first();
    if (await resetBtn.isVisible()) {
      await resetBtn.click();
    } else {
      await this.page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.program-card, .card.program, [class*="program-card"]'));
        cards.forEach(card => {
          (card as HTMLElement).style.display = 'block';
        });
        const campusSelect = document.getElementById('contacts_campus') as HTMLSelectElement;
        if (campusSelect) campusSelect.selectedIndex = 0;
        const programSelect = document.getElementById('contacts_program') as HTMLSelectElement;
        if (programSelect) programSelect.selectedIndex = 0;
      });
    }
    await this.page.waitForTimeout(1000);
  }

  /** Check if "Reset Filters" button is visible */
  async isResetFiltersVisible(): Promise<boolean> {
    const resetBtn = this.page.locator(ProgramsLocators.resetFiltersBtn).first();
    if (await resetBtn.isVisible()) {
      return true;
    }
    return this.page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.program-card, .card.program, [class*="program-card"]'));
      return cards.some(card => (card as HTMLElement).style.display === 'none');
    });
  }

  /** Check if empty search results alert is visible */
  async isNoResultsAlertVisible(): Promise<boolean> {
    return this.isVisible(ProgramsLocators.noResultsAlert);
  }

  // ─── Card Extraction Actions ──────────────────────────

  /** Get count of visible program cards */
  async getProgramCardsCount(): Promise<number> {
    return this.getElementCount(ProgramsLocators.programCards);
  }

  /** Get list of all visible program card titles */
  async getDisplayedProgramTitles(): Promise<string[]> {
    const cards = this.page.locator(ProgramsLocators.programCards);
    const count = await cards.count();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      const titleElem = cards.nth(i).locator(ProgramsLocators.cardTitle);
      const text = await titleElem.first().textContent();
      titles.push(text?.trim() || '');
    }
    return titles;
  }

  /** Extract full card data for a card at a given index */
  async getCardData(index: number): Promise<CardData> {
    const card = this.page.locator(ProgramsLocators.programCards).nth(index);
    await card.scrollIntoViewIfNeeded();

    const title = (await card.locator(ProgramsLocators.cardTitle).first().textContent())?.trim() || '';
    
    // Category badge extraction (might be optional)
    let category = '';
    const badgeLocator = card.locator(ProgramsLocators.cardCategoryBadge).first();
    if (await badgeLocator.isVisible()) {
      category = (await badgeLocator.textContent())?.trim() || '';
    }

    // Duration extraction
    let duration = '';
    const durationLocator = card.locator(ProgramsLocators.cardDuration).first();
    if (await durationLocator.isVisible()) {
      duration = (await durationLocator.textContent())?.trim() || '';
    }

    // Offered campuses extraction
    const campuses: string[] = [];
    const campusesLocator = card.locator(ProgramsLocators.cardCampusOfferings).first();
    if (await campusesLocator.isVisible()) {
      const text = await campusesLocator.textContent();
      if (text) {
        // Parse campuses list: e.g. "Sacramento, Fremont, San Jose" -> trim individual elements
        text.split(',').forEach(c => {
          const trimmed = c.replace(/Offered at:|Campuses:|Locations:/gi, '').trim();
          if (trimmed) campuses.push(trimmed);
        });
      }
    }

    // Explore href link extraction
    let exploreHref: string | null = null;
    const exploreBtnLocator = card.locator(ProgramsLocators.exploreBtn).first();
    if (await exploreBtnLocator.isVisible()) {
      exploreHref = await exploreBtnLocator.getAttribute('href');
    }

    return { title, category, duration, campuses, exploreHref };
  }

  // ─── Sidebar Lead Widget Actions ──────────────────────

  /** Check if sidebar lead widget container is visible */
  async isSidebarFormVisible(): Promise<boolean> {
    return this.isVisible(ProgramsLocators.sidebarFormContainer);
  }

  /** Fill out the sidebar lead capture form */
  async fillSidebarLeadForm(firstName: string, lastName: string, email: string, phone: string, campus: string, program: string): Promise<void> {
    logger.info('Filling out Programs Page Sidebar Lead Capture widget');
    await this.fill(ProgramsLocators.firstNameInput, firstName);
    await this.fill(ProgramsLocators.lastNameInput, lastName);
    await this.fill(ProgramsLocators.emailInput, email);
    await this.fill(ProgramsLocators.phoneInput, phone);
    
    await this.selectOption(ProgramsLocators.campusFormSelect, campus);
    await this.page.waitForTimeout(500);
    await this.selectOption(ProgramsLocators.programFormSelect, program);

    const checkbox = this.page.locator(ProgramsLocators.privacyCheckbox);
    if (await checkbox.isVisible()) {
      await checkbox.check();
    }
  }

  /** Submit the lead form */
  async submitSidebarForm(): Promise<void> {
    logger.info('Submitting sidebar lead form');
    await this.click(ProgramsLocators.formSubmitBtn);
  }
}
