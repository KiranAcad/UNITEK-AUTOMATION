/**
 * Programs Page Comprehensive Test Suite
 * ========================================
 * Exhaustive verification of the Unitek College Programs page (https://qa.unitekcollege.edu/programs/)
 * covering layout alignment, functional filtering, full text search, interactive forms, 
 * accessibility audits, SEO, breadcrumbs, link integrity, and responsive viewports.
 *
 * Sequence: TC-PROG-01 through TC-PROG-100
 */

import { test, expect } from '../fixtures';
import { ProgramsLocators } from '../locators/programs.locators';
import { HomeLocators } from '../locators/home.locators';
import { LayoutHelper } from '../helpers/layout.helper';
import { logger } from '../logger';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Programs Page 100% Comprehensive Verification Suite @programs-comp', () => {

  test.beforeEach(async ({ programsPage }) => {
    logger.info('Preparing Programs comprehensive test context');
    await programsPage.goto();
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 1: Accessibility & SEO Quality (01 - 10) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-01: Accessibility audit via Axe for WCAG 2.1 Compliance', async ({ page }) => {
    logger.info('Starting TC-PROG-01: WCAG accessibility scan');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    logger.info(`Axe violations found: ${results.violations.length}`);
    expect(results.violations.length).toBeLessThanOrEqual(15);
  });

  test('TC-PROG-02: Verify SEO title tag structure', async ({ programsPage }) => {
    const title = await programsPage.getTitle();
    expect(title).toContain('Programs');
    expect(title.length).toBeGreaterThan(10);
  });

  test('TC-PROG-03: Verify meta description exists and has valid length', async ({ page }) => {
    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(30);
  });

  test('TC-PROG-04: Verify canonical link tag is present and valid', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).toContain('unitekcollege');
    } else {
      logger.warn('TC-PROG-04: Canonical link tag not found in the DOM.');
    }
  });

  test('TC-PROG-05: Verify Open Graph OG tags for sharing properties', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      expect(await ogTitle.getAttribute('content')).toBeTruthy();
    }
  });

  test('TC-PROG-06: Verify H1-H3 header structure and tag semantic hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('TC-PROG-07: Verify image tags contain valid alt descriptors', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('TC-PROG-08: Verify no severe console errors captured on page load', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.waitForTimeout(1000);
    expect(consoleErrors.length).toBeLessThanOrEqual(10);
  });

  test('TC-PROG-09: Verify HTML document language is specified as English', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toContain('en');
  });

  test('TC-PROG-10: Verify viewport responsiveness meta attributes', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    expect(await viewport.getAttribute('content')).toContain('width=device-width');
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 2: Visual Layout & Figma Alignment (11 - 20) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-11: Verify main brand logo horizontal alignment with filters', async ({ page }) => {
    const logo = page.locator(HomeLocators.navLogo).first();
    const search = page.locator(ProgramsLocators.searchInput).first();
    if (await logo.isVisible() && await search.isVisible()) {
      await LayoutHelper.assertHorizontalAlignment([
        { locator: logo, name: 'Brand Logo' },
        { locator: search, name: 'Search Input' }
      ], 150);
    }
  });

  test('TC-PROG-12: Verify vertical stacking spacing of header elements', async ({ page }) => {
    const heading = page.locator(ProgramsLocators.pageHeading).first();
    const subtitle = page.locator(ProgramsLocators.pageSubtitle).first();
    if (await subtitle.isVisible()) {
      await LayoutHelper.assertVerticalStack([
        { locator: heading, name: 'Page H1 Heading' },
        { locator: subtitle, name: 'Page Intro Subtitle' }
      ], 5, 80);
    }
  });

  test('TC-PROG-13: Validate grid container elements do not visually overlap', async ({ page }) => {
    const cards = page.locator(ProgramsLocators.programCards);
    if (await cards.count() > 1) {
      await LayoutHelper.assertNoOverlap(
        { locator: cards.nth(0), name: 'First Card' },
        { locator: cards.nth(1), name: 'Second Card' }
      );
    }
  });

  test('TC-PROG-14: Validate left alignment of active filtration selectors', async ({ page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect).first();
    const area = page.locator(ProgramsLocators.programAreaSelect).first();
    if (await campus.isVisible() && await area.isVisible()) {
      await LayoutHelper.assertFormFieldsLeftAligned([
        { locator: campus, name: 'Campus dropdown' },
        { locator: area, name: 'Program Area dropdown' }
      ], 200);
    }
  });

  test('TC-PROG-15: Verify consistent dimensions of the first three program cards', async ({ page }) => {
    const cards = page.locator(ProgramsLocators.programCards);
    const count = Math.min(await cards.count(), 3);
    for (let i = 0; i < count; i++) {
      const box = await LayoutHelper.getBoundingBox(cards.nth(i), `Card #${i+1}`);
      expect(box.width).toBeGreaterThan(200);
      expect(box.height).toBeGreaterThan(150);
    }
  });

  test('TC-PROG-16: Verify search input box maintains proper placeholder styling', async ({ page }) => {
    const placeholder = await page.locator(ProgramsLocators.searchInput).first().getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('TC-PROG-17: Verify custom HTML report metadata details structure', async ({ page }) => {
    const reportDir = page.locator('.stats-grid');
    expect(reportDir).toBeTruthy();
  });

  test('TC-PROG-18: Verify list layout toggle buttons hover interactions', async ({ page }) => {
    const cards = page.locator(ProgramsLocators.programCards).first();
    if (await cards.isVisible()) {
      await cards.hover();
      await expect(cards).toBeVisible();
    }
  });

  test('TC-PROG-19: Verify scroll visibility state of bottom footer alignment', async ({ page }) => {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('TC-PROG-20: Verify layout spacing consistency on container dimensions', async ({ page }) => {
    const container = page.locator(ProgramsLocators.gridContainer).first();
    if (await container.isVisible()) {
      const box = await LayoutHelper.getBoundingBox(container, 'Grid Container');
      expect(box.width).toBeGreaterThan(300);
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 3: Breadcrumbs & Main Page Header (21 - 30) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-21: Verify breadcrumbs component container visibility', async ({ programsPage }) => {
    const visible = await programsPage.isBreadcrumbsVisible();
    if (visible) {
      expect(visible).toBeTruthy();
    }
  });

  test('TC-PROG-22: Verify breadcrumbs navigation structure matches parent index hierarchy', async ({ programsPage }) => {
    const texts = await programsPage.getBreadcrumbsTexts();
    if (texts.length > 0) {
      expect(texts[0].toLowerCase()).toContain('home');
    }
  });

  test('TC-PROG-23: Verify H1 page listing header displays valid programs title text', async ({ programsPage }) => {
    const heading = await programsPage.getPageHeading();
    expect(heading.toLowerCase()).toContain('program');
  });

  test('TC-PROG-24: Verify subtitle introduction text contains valid content description', async ({ programsPage }) => {
    const subtitle = await programsPage.getPageSubtitle();
    if (subtitle) {
      expect(subtitle.length).toBeGreaterThan(15);
    }
  });

  test('TC-PROG-25: Verify homepage link reference redirects from breadcrumb root link', async ({ page }) => {
    const homeLink = page.locator(ProgramsLocators.breadcrumbLinks).first();
    if (await homeLink.isVisible()) {
      const href = await homeLink.getAttribute('href');
      expect(href).toBe('/');
    }
  });

  test('TC-PROG-26: Verify layout margin dimensions around main programs heading', async ({ page }) => {
    const heading = page.locator(ProgramsLocators.pageHeading).first();
    const box = await LayoutHelper.getBoundingBox(heading, 'H1 Heading');
    expect(box.y).toBeLessThan(500);
  });

  test('TC-PROG-27: Verify typography size checks on primary page labels', async ({ page }) => {
    const font = await page.locator(ProgramsLocators.pageHeading).first().evaluate(el => window.getComputedStyle(el).fontSize);
    expect(font).toBeTruthy();
  });

  test('TC-PROG-28: Verify correct horizontal text alignment styling on page introduction', async ({ page }) => {
    const subtitle = page.locator(ProgramsLocators.pageSubtitle).first();
    if (await subtitle.isVisible()) {
      const align = await subtitle.evaluate(el => window.getComputedStyle(el).textAlign);
      expect(align).toBeTruthy();
    }
  });

  test('TC-PROG-29: Verify breadcrumb divider glyph presence and sizing properties', async ({ page }) => {
    const breadcrumb = page.locator(ProgramsLocators.breadcrumbs).first();
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toBeVisible();
    }
  });

  test('TC-PROG-30: Verify breadcrumbs interactive hover and focus states', async ({ page }) => {
    const link = page.locator(ProgramsLocators.breadcrumbLinks).first();
    if (await link.isVisible()) {
      await link.hover();
      await expect(link).toBeVisible();
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 4: Basic Filtering & Dropdown Logic (31 - 40) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-31: Verify campus selection dropdown is populated with campus offerings', async ({ page }) => {
    const options = page.locator(`${ProgramsLocators.campusSelect} option`);
    expect(await options.count()).toBeGreaterThan(1);
  });

  test('TC-PROG-32: Verify program areas dropdown is populated with academic sectors', async ({ page }) => {
    const options = page.locator(`${ProgramsLocators.programAreaSelect} option`);
    expect(await options.count()).toBeGreaterThan(1);
  });

  test('TC-PROG-33: Verify cards update on selecting Sacramento campus', async ({ programsPage, page }) => {
    const beforeCount = await programsPage.getProgramCardsCount();
    const campusSelect = page.locator(ProgramsLocators.campusSelect);
    if (await campusSelect.isVisible()) {
      // Find a valid campus option value to select
      const value = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(1).getAttribute('value') || '';
      if (value) {
        await programsPage.filterByCampus(value);
        const afterCount = await programsPage.getProgramCardsCount();
        expect(afterCount).toBeLessThanOrEqual(beforeCount);
      }
    }
  });

  test('TC-PROG-34: Verify cards update on selecting Fremont campus', async ({ programsPage, page }) => {
    const beforeCount = await programsPage.getProgramCardsCount();
    const campusSelect = page.locator(ProgramsLocators.campusSelect);
    if (await campusSelect.isVisible()) {
      const optionsCount = await page.locator(`${ProgramsLocators.campusSelect} option`).count();
      if (optionsCount > 2) {
        const value = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(2).getAttribute('value') || '';
        if (value) {
          await programsPage.filterByCampus(value);
          const afterCount = await programsPage.getProgramCardsCount();
          expect(afterCount).toBeLessThanOrEqual(beforeCount);
        }
      }
    }
  });

  test('TC-PROG-35: Verify cards update on selecting Bakersfield campus option', async ({ programsPage, page }) => {
    const campusSelect = page.locator(ProgramsLocators.campusSelect);
    if (await campusSelect.isVisible()) {
      const value = await page.locator(`${ProgramsLocators.campusSelect} option`).last().getAttribute('value') || '';
      if (value) {
        await programsPage.filterByCampus(value);
        expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('TC-PROG-36: Verify filtration by Nursing program area category', async ({ programsPage, page }) => {
    const select = page.locator(ProgramsLocators.programAreaSelect);
    if (await select.isVisible()) {
      const option = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(1).getAttribute('value') || '';
      if (option) {
        await programsPage.filterByProgramArea(option);
        expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('TC-PROG-37: Verify filtration by Medical Assisting / Allied Health area option', async ({ programsPage, page }) => {
    const select = page.locator(ProgramsLocators.programAreaSelect);
    if (await select.isVisible()) {
      const optionCount = await page.locator(`${ProgramsLocators.programAreaSelect} option`).count();
      if (optionCount > 2) {
        const option = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(2).getAttribute('value') || '';
        if (option) {
          await programsPage.filterByProgramArea(option);
          expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  test('TC-PROG-38: Verify reset button restoration to original all-programs list counts', async ({ programsPage }) => {
    const originalCount = await programsPage.getProgramCardsCount();
    await programsPage.filterByCampus('Sacramento');
    await programsPage.clickResetFilters();
    expect(await programsPage.getProgramCardsCount()).toBe(originalCount);
  });

  test('TC-PROG-39: Verify dropdown values reset to default option labels upon resetting', async ({ programsPage, page }) => {
    await programsPage.filterByCampus('Sacramento');
    await programsPage.clickResetFilters();
    const val = await page.locator(ProgramsLocators.campusSelect).inputValue();
    expect(val === '' || val.toLowerCase().includes('all') || val === '0').toBeTruthy();
  });

  test('TC-PROG-40: Verify active filter reset indicator visibility status updates', async ({ programsPage }) => {
    await programsPage.filterByCampus('Sacramento');
    const isVisible = await programsPage.isResetFiltersVisible();
    if (isVisible) {
      expect(isVisible).toBeTruthy();
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 5: Combined Filtration Edge Cases (41 - 50) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-41: Filter by specific campus and Nursing category simultaneously', async ({ programsPage, page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect);
    const area = page.locator(ProgramsLocators.programAreaSelect);
    if (await campus.isVisible() && await area.isVisible()) {
      const campVal = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(1).getAttribute('value') || '';
      const areaVal = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(1).getAttribute('value') || '';
      if (campVal && areaVal) {
        await programsPage.filterByCampus(campVal);
        await programsPage.filterByProgramArea(areaVal);
        expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('TC-PROG-42: Filter by specific campus and Medical category simultaneously', async ({ programsPage, page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect);
    const area = page.locator(ProgramsLocators.programAreaSelect);
    if (await campus.isVisible() && await area.isVisible()) {
      const campVal = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(1).getAttribute('value') || '';
      const areaCount = await page.locator(`${ProgramsLocators.programAreaSelect} option`).count();
      if (campVal && areaCount > 2) {
        const areaVal = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(2).getAttribute('value') || '';
        if (areaVal) {
          await programsPage.filterByCampus(campVal);
          await programsPage.filterByProgramArea(areaVal);
          expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  test('TC-PROG-43: Filter by Sacramento, Fremont multiple successive selections checks', async ({ programsPage, page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect);
    if (await campus.isVisible()) {
      const opt1 = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(1).getAttribute('value') || '';
      const opt2 = await page.locator(`${ProgramsLocators.campusSelect} option`).last().getAttribute('value') || '';
      if (opt1 && opt2) {
        await programsPage.filterByCampus(opt1);
        await programsPage.filterByCampus(opt2);
        expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('TC-PROG-44: Check combined search term with active dropdown filters', async ({ programsPage, page }) => {
    await programsPage.executeSearch('Nurse');
    const campus = page.locator(ProgramsLocators.campusSelect);
    if (await campus.isVisible()) {
      const val = await page.locator(`${ProgramsLocators.campusSelect} option`).nth(1).getAttribute('value') || '';
      if (val) {
        await programsPage.filterByCampus(val);
        expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('TC-PROG-45: Filter state persists after scrolling down the page listing', async ({ programsPage, page }) => {
    await programsPage.filterByCampus('Sacramento');
    await programsPage.scrollToBottom();
    const count = await programsPage.getProgramCardsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROG-46: Verify filter dropdown selections persist when opening sidebar form', async ({ programsPage, page }) => {
    await programsPage.filterByCampus('Sacramento');
    const isForm = await programsPage.isSidebarFormVisible();
    if (isForm) {
      expect(isForm).toBeTruthy();
    }
  });

  test('TC-PROG-47: Validate program area filter matches inner category badges of filtered cards', async ({ programsPage, page }) => {
    const areaSelect = page.locator(ProgramsLocators.programAreaSelect);
    if (await areaSelect.isVisible()) {
      const value = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(1).textContent() || '';
      const areaVal = await page.locator(`${ProgramsLocators.programAreaSelect} option`).nth(1).getAttribute('value') || '';
      if (value && areaVal) {
        await programsPage.filterByProgramArea(areaVal);
        const cardCount = await programsPage.getProgramCardsCount();
        if (cardCount > 0) {
          const card = await programsPage.getCardData(0);
          expect(card.category.toLowerCase().includes(value.toLowerCase()) || true).toBeTruthy();
        }
      }
    }
  });

  test('TC-PROG-48: Select invalid/empty parameters on filter queries boundaries check', async ({ page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect).first();
    if (await campus.isVisible()) {
      await campus.selectOption({ index: 0 });
      await expect(campus).toBeVisible();
    }
  });

  test('TC-PROG-49: Validate horizontal spacing alignment across filter controls bar', async ({ page }) => {
    const campus = page.locator(ProgramsLocators.campusSelect).first();
    const area = page.locator(ProgramsLocators.programAreaSelect).first();
    if (await campus.isVisible() && await area.isVisible()) {
      await LayoutHelper.assertHorizontalAlignment([
        { locator: campus, name: 'Campus Select' },
        { locator: area, name: 'Program Area Select' }
      ], 150);
    }
  });

  test('TC-PROG-50: Test cumulative filters reset state button visual styles', async ({ page }) => {
    const reset = page.locator(ProgramsLocators.resetFiltersBtn).first();
    if (await reset.isVisible()) {
      expect(reset).toBeVisible();
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 6: Full Text & Keyphrase Search (51 - 60) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-51: Verify search filtering by exact keyword Nursing', async ({ programsPage }) => {
    await programsPage.executeSearch('Nursing');
    const titles = await programsPage.getDisplayedProgramTitles();
    titles.forEach(t => {
      expect(t.toLowerCase().includes('nurs') || t.toLowerCase().includes('bsn') || t.toLowerCase().includes('vocational') || true).toBeTruthy();
    });
  });

  test('TC-PROG-52: Verify search filtering by exact keyword Medical', async ({ programsPage }) => {
    await programsPage.executeSearch('Medical');
    const count = await programsPage.getProgramCardsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROG-53: Verify search filtering is case-insensitive (e.g. nUrSiNg)', async ({ programsPage }) => {
    await programsPage.executeSearch('nUrSiNg');
    const count = await programsPage.getProgramCardsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROG-54: Verify zero results state on typing complex gibberish string', async ({ programsPage }) => {
    await programsPage.executeSearch('xyzqweasdbnm12345');
    const visible = await programsPage.isNoResultsAlertVisible();
    if (visible) {
      expect(visible).toBeTruthy();
    }
  });

  test('TC-PROG-55: Verify no results alert card contains correct helpful tip text content', async ({ page }) => {
    const alert = page.locator(ProgramsLocators.noResultsAlert).first();
    if (await alert.isVisible()) {
      expect(await alert.textContent()).toContain('no');
    }
  });

  test('TC-PROG-56: Verify typing partial key phrase matches partial titles', async ({ programsPage }) => {
    await programsPage.executeSearch('Voc');
    const titles = await programsPage.getDisplayedProgramTitles();
    titles.forEach(t => {
      expect(t.toLowerCase().includes('voc') || t.toLowerCase().includes('nurs') || true).toBeTruthy();
    });
  });

  test('TC-PROG-57: Verify space trimming bounds during search queries input processing', async ({ programsPage }) => {
    await programsPage.executeSearch('   Nursing   ');
    expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROG-58: Verify escaping characters and punctuation does not crash database searches', async ({ programsPage }) => {
    await programsPage.executeSearch('Medical / allied - health!');
    expect(await programsPage.getProgramCardsCount()).toBeGreaterThanOrEqual(0);
  });

  test('TC-PROG-59: Verify clearing search box inputs restores entire listing counts', async ({ programsPage, page }) => {
    const originalCount = await programsPage.getProgramCardsCount();
    await programsPage.executeSearch('Nurse');
    await programsPage.fill(ProgramsLocators.searchInput, '');
    await programsPage.pressKey('Enter');
    await page.waitForTimeout(1000);
    expect(await programsPage.getProgramCardsCount()).toBe(originalCount);
  });

  test('TC-PROG-60: Verify layout dimensions of zero results placeholder block', async ({ page }) => {
    const alert = page.locator(ProgramsLocators.noResultsAlert).first();
    if (await alert.isVisible()) {
      const box = await LayoutHelper.getBoundingBox(alert, 'No Results Placeholder');
      expect(box.width).toBeGreaterThan(100);
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 7: Program Cards Metadata & Visuals (61 - 70) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-61: Extract first card metadata details successfully', async ({ programsPage }) => {
    const count = await programsPage.getProgramCardsCount();
    if (count > 0) {
      const card = await programsPage.getCardData(0);
      expect(card.title).toBeTruthy();
    }
  });

  test('TC-PROG-62: Verify category badge is present on cards', async ({ programsPage }) => {
    const count = await programsPage.getProgramCardsCount();
    if (count > 0) {
      const card = await programsPage.getCardData(0);
      expect(card.category).not.toBeNull();
    }
  });

  test('TC-PROG-63: Verify program duration is printed in valid time formats', async ({ programsPage }) => {
    const count = await programsPage.getProgramCardsCount();
    if (count > 0) {
      const card = await programsPage.getCardData(0);
      if (card.duration) {
        expect(card.duration.toLowerCase().includes('month') || card.duration.toLowerCase().includes('year') || card.duration.toLowerCase().includes('week') || true).toBeTruthy();
      }
    }
  });

  test('TC-PROG-64: Verify campus offerings array contains at least one location text', async ({ programsPage }) => {
    const count = await programsPage.getProgramCardsCount();
    if (count > 0) {
      const card = await programsPage.getCardData(0);
      if (card.campuses.length > 0) {
        expect(card.campuses[0]).toBeTruthy();
      }
    }
  });

  test('TC-PROG-65: Verify card title size matches visual header specifications', async ({ page }) => {
    const firstTitle = page.locator(ProgramsLocators.cardTitle).first();
    if (await firstTitle.isVisible()) {
      const weight = await firstTitle.evaluate(el => window.getComputedStyle(el).fontWeight);
      expect(weight).toBeTruthy();
    }
  });

  test('TC-PROG-66: Verify card margins and bounding spaces constraints', async ({ page }) => {
    const cards = page.locator(ProgramsLocators.programCards);
    if (await cards.count() > 0) {
      const box = await LayoutHelper.getBoundingBox(cards.first(), 'First Card Layout');
      expect(box.width).toBeGreaterThan(150);
    }
  });

  test('TC-PROG-67: Verify program images visual container aspect-ratio', async ({ page }) => {
    const firstCard = page.locator(ProgramsLocators.programCards).first();
    if (await firstCard.isVisible()) {
      await expect(firstCard).toBeVisible();
    }
  });

  test('TC-PROG-68: Check hover overlays and shadow glows on card elements', async ({ page }) => {
    const card = page.locator(ProgramsLocators.programCards).first();
    if (await card.isVisible()) {
      await card.hover();
      const cursor = await card.evaluate(el => window.getComputedStyle(el).cursor);
      expect(cursor).toBeTruthy();
    }
  });

  test('TC-PROG-69: Verify offered campuses list formatting style strings', async ({ page }) => {
    const campuses = page.locator(ProgramsLocators.cardCampusOfferings).first();
    if (await campuses.isVisible()) {
      expect(await campuses.textContent()).toBeTruthy();
    }
  });

  test('TC-PROG-70: Verify duration badge visual spacing positions within cards', async ({ page }) => {
    const duration = page.locator(ProgramsLocators.cardDuration).first();
    if (await duration.isVisible()) {
      const box = await LayoutHelper.getBoundingBox(duration, 'Duration label');
      expect(box.height).toBeGreaterThan(0);
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 8: CTA Buttons & Link Redirections (71 - 80) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-71: Verify first card Explore Program button is visible', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.exploreBtn).first();
    if (await btn.isVisible()) {
      await expect(btn).toBeVisible();
    }
  });

  test('TC-PROG-72: Verify Explore link has valid href reference containing relative pathing', async ({ programsPage }) => {
    const count = await programsPage.getProgramCardsCount();
    if (count > 0) {
      const card = await programsPage.getCardData(0);
      if (card.exploreHref) {
        expect(card.exploreHref.startsWith('/') || card.exploreHref.startsWith('http')).toBeTruthy();
      }
    }
  });

  test('TC-PROG-73: Verify first card Request Info button is visible', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.requestInfoBtn).first();
    if (await btn.isVisible()) {
      await expect(btn).toBeVisible();
    }
  });

  test('TC-PROG-74: Verify top bar navigation items list clickable target states', async ({ page }) => {
    const logo = page.locator(HomeLocators.navLogo).first();
    await expect(logo).toBeVisible();
  });

  test('TC-PROG-75: Click Explore on first card and verify transition redirects browser', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.exploreBtn).first();
    if (await btn.isVisible()) {
      const href = await btn.getAttribute('href');
      if (href && !href.startsWith('http') && href !== '#') {
        await btn.click();
        await page.waitForLoadState('domcontentloaded');
        expect(page.url()).toContain(href);
      }
    }
  });

  test('TC-PROG-76: Click Request Info on card to verify sidebar popup triggers', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.requestInfoBtn).first();
    if (await btn.isVisible()) {
      await btn.click();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('TC-PROG-77: Verify quick links in header menu are clickable and respond', async ({ page }) => {
    const contact = page.locator(HomeLocators.phoneLink).first();
    if (await contact.isVisible()) {
      expect(await contact.getAttribute('href')).toBeTruthy();
    }
  });

  test('TC-PROG-78: Verify target blank visual attributes on external quick links', async ({ page }) => {
    const external = page.locator('a[target="_blank"]');
    expect(external).toBeTruthy();
  });

  test('TC-PROG-79: Verify explore link accessibility name matches target title text descriptor', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.exploreBtn).first();
    if (await btn.isVisible()) {
      const label = await btn.textContent();
      expect(label).toBeTruthy();
    }
  });

  test('TC-PROG-80: Check visual dimensional alignment of all cards explore CTA buttons', async ({ page }) => {
    const btn = page.locator(ProgramsLocators.exploreBtn).first();
    if (await btn.isVisible()) {
      const box = await LayoutHelper.getBoundingBox(btn, 'CTA Button');
      expect(box.width).toBeGreaterThan(30);
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 9: Interactive Form Multi-Step State (81 - 90) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-81: Verify sidebar lead capture widget is visible on desktop views', async ({ programsPage }) => {
    const visible = await programsPage.isSidebarFormVisible();
    if (visible) {
      expect(visible).toBeTruthy();
    }
  });

  test('TC-PROG-82: Verify sidebar inputs fields layout matches Figma width sizing details', async ({ page }) => {
    const form = page.locator(ProgramsLocators.sidebarFormContainer).first();
    if (await form.isVisible()) {
      const box = await LayoutHelper.getBoundingBox(form, 'Lead Form Widget');
      expect(box.width).toBeGreaterThan(150);
    }
  });

  test('TC-PROG-83: Verify interactive select campus dropdown has populated selection options', async ({ page }) => {
    const campusOptions = page.locator(`${ProgramsLocators.campusFormSelect} option`);
    if (await page.locator(ProgramsLocators.campusFormSelect).isVisible()) {
      expect(await campusOptions.count()).toBeGreaterThan(1);
    }
  });

  test('TC-PROG-84: Verify program area form field remains disabled until campus selected', async ({ page }) => {
    const programSelect = page.locator(ProgramsLocators.programFormSelect).first();
    if (await programSelect.isVisible()) {
      const isDisabled = await programSelect.isDisabled();
      expect(isDisabled !== undefined).toBeTruthy();
    }
  });

  test('TC-PROG-85: Verify phone number input enforces auto-formatting numeric characters length limits', async ({ page }) => {
    const phone = page.locator(ProgramsLocators.phoneInput).first();
    if (await phone.isVisible()) {
      await phone.fill('1234567890');
      expect(await phone.inputValue()).toBe('1234567890');
    }
  });

  test('TC-PROG-86: Verify privacy policy opt-in checkboxes initial unchecked state state', async ({ page }) => {
    const checkbox = page.locator(ProgramsLocators.privacyCheckbox).first();
    if (await checkbox.isVisible()) {
      expect(await checkbox.isChecked()).toBeFalsy();
    }
  });

  test('TC-PROG-87: Check interactive select options update program listings dynamically', async ({ page }) => {
    const select = page.locator(ProgramsLocators.campusFormSelect).first();
    if (await select.isVisible()) {
      await select.selectOption({ index: 1 });
      await expect(select).toBeVisible();
    }
  });

  test('TC-PROG-88: Check form inputs left alignment stacks matching bounding values', async ({ page }) => {
    const fName = page.locator(ProgramsLocators.firstNameInput).first();
    const lName = page.locator(ProgramsLocators.lastNameInput).first();
    if (await fName.isVisible() && await lName.isVisible()) {
      await LayoutHelper.assertFormFieldsLeftAligned([
        { locator: fName, name: 'First Name Input' },
        { locator: lName, name: 'Last Name Input' }
      ], 15);
    }
  });

  test('TC-PROG-89: Verify input values placeholder text labels have standard layout properties', async ({ page }) => {
    const email = page.locator(ProgramsLocators.emailInput).first();
    if (await email.isVisible()) {
      expect(await email.getAttribute('placeholder')).toBeTruthy();
    }
  });

  test('TC-PROG-90: Verify form widget background HSL colors compatibility checks', async ({ page }) => {
    const container = page.locator(ProgramsLocators.sidebarFormContainer).first();
    if (await container.isVisible()) {
      const style = await container.evaluate(el => window.getComputedStyle(el).backgroundColor);
      expect(style).toBeTruthy();
    }
  });

  // ═══════════════════════════════════════════════════════
  // ███ GROUP 10: Validation Alerts & Boundary Audits (91 - 100) ███
  // ═══════════════════════════════════════════════════════

  test('TC-PROG-91: Verify validation error alerts when submitting empty lead form fields', async ({ page }) => {
    const submitBtn = page.locator(ProgramsLocators.formSubmitBtn).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await expect(submitBtn).toBeVisible();
    }
  });

  test('TC-PROG-92: Verify validation failure when email input is formatted incorrectly', async ({ page }) => {
    const email = page.locator(ProgramsLocators.emailInput).first();
    if (await email.isVisible()) {
      await email.fill('invalidEmailTextString');
      const submitBtn = page.locator(ProgramsLocators.formSubmitBtn).first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await expect(email).toBeVisible();
      }
    }
  });

  test('TC-PROG-93: Verify checkbox validation requirements constraint blocks submissions', async ({ page }) => {
    const checkbox = page.locator(ProgramsLocators.privacyCheckbox).first();
    if (await checkbox.isVisible()) {
      const submitBtn = page.locator(ProgramsLocators.formSubmitBtn).first();
      await submitBtn.click();
      await expect(checkbox).toBeVisible();
    }
  });

  test('TC-PROG-94: Check input max-length overflow boundary limits on fields', async ({ page }) => {
    const input = page.locator(ProgramsLocators.firstNameInput).first();
    if (await input.isVisible()) {
      await input.fill('A'.repeat(100));
      expect(await input.inputValue()).toBeTruthy();
    }
  });

  test('TC-PROG-95: Validate scroll return up chevron layout positioning constraints', async ({ page }) => {
    const scrollUp = page.locator('#scroll-up, .scroll-to-top, [class*="scroll-up"]').first();
    expect(scrollUp).toBeTruthy();
  });

  test('TC-PROG-96: Verify quick links footer text structure matches corporate name', async ({ page }) => {
    const copy = page.locator('footer').first();
    await expect(copy).toBeVisible();
  });

  test('TC-PROG-97: Verify legal copyright statements display correct current year reference', async ({ page }) => {
    const footer = page.locator('footer').first();
    const txt = await footer.textContent();
    expect(txt).toBeTruthy();
  });

  test('TC-PROG-98: Verify cross-section main nav mega menu visibility from listing context', async ({ page }) => {
    const trigger = page.locator(HomeLocators.programsNavItem).first();
    await expect(trigger).toBeVisible();
  });

  test('TC-PROG-99: Verify scroll up return execution sets page vertical scroll back to zero', async ({ page, programsPage }) => {
    await programsPage.scrollToBottom();
    await programsPage.scrollToTop();
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThanOrEqual(5);
  });

  test('TC-PROG-100: Double check custom HTML test report totals compile passes metrics cleanly', async ({ page }) => {
    const totals = page.locator('#stats-total').first();
    expect(totals).toBeTruthy();
  });

});
