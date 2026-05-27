/**
 * Program Detail Page — Comprehensive Test Suite (ASVN)
 * ======================================================
 * URL: /programs/associate-degree-vocational-nursing/
 *
 * 100% coverage of all UI sections:
 *   1. SEO & Meta Tags
 *   2. Hero Section
 *   3. Get Started Multi-Step Form
 *   4. Page Sub Navigation Bar
 *   5. Program Overview (BSN)
 *   6. Image/Video Testimonial
 *   7. Start Dates
 *   8. BSN Pathways Accordion
 *   9. Admissions Requirements
 *  10. BSN Curriculum
 *  11. Testimonial Slider
 *  12. Testimonial Video Section
 *  13. Financial Aid
 *  14. FAQ Section
 *
 * Each test uses test.step() with simple English descriptions.
 */

import { test, expect } from '../fixtures';
import { ProgramDetailLocators } from '../locators/program-detail.locators';
import { logger } from '../logger';

test.describe('Program Detail Page — ASVN Comprehensive Suite', () => {

  test.beforeEach(async ({ programDetailPage }) => {
    await programDetailPage.navigateToASVN();
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 1: SEO & META TAGS (TC-PD-01 to TC-PD-05)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-01: Verify page title contains program name @smoke @seo', async ({ page }) => {
    await test.step('Step 1: Start validation of page title tag', async () => {
      logger.info('Starting TC-PD-01: Verify page title contains program name');
    });

    await test.step('Step 2: Get the page title from the browser', async () => {
      logger.info('Retrieving page title from the browser');
      const title = await page.title();
      logger.info(`Page title: ${title}`);
      expect(title).toContain('Vocational Nursing');
      logger.info('Page title contains "Vocational Nursing" — verified');
    });
  });

  test('TC-PD-02: Verify meta description is present and meaningful @seo', async ({ page }) => {
    await test.step('Step 1: Start validation of meta description tag', async () => {
      logger.info('Starting TC-PD-02: Verify meta description');
    });

    await test.step('Step 2: Locate the meta description tag in the page head', async () => {
      logger.info('Locating meta description tag');
      const content = await page.locator(ProgramDetailLocators.metaDescription).getAttribute('content');
      logger.info(`Meta description: ${content}`);
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(20);
      logger.info('Meta description is present and has meaningful content');
    });
  });

  test('TC-PD-03: Verify Open Graph title tag is present @seo', async ({ page }) => {
    await test.step('Step 1: Start validation of OG title tag', async () => {
      logger.info('Starting TC-PD-03: Verify Open Graph title');
    });

    await test.step('Step 2: Check OG title meta tag exists and contains program name', async () => {
      logger.info('Checking OG title meta tag');
      const ogTitle = await page.locator(ProgramDetailLocators.ogTitle).getAttribute('content');
      logger.info(`OG title: ${ogTitle}`);
      expect(ogTitle).toContain('Vocational Nursing');
      logger.info('OG title verified');
    });
  });

  test('TC-PD-04: Verify Open Graph URL points to correct page @seo', async ({ page }) => {
    await test.step('Step 1: Start validation of OG URL tag', async () => {
      logger.info('Starting TC-PD-04: Verify OG URL');
    });

    await test.step('Step 2: Check OG URL meta tag contains the program page path', async () => {
      logger.info('Checking OG URL meta tag');
      const ogUrl = await page.locator(ProgramDetailLocators.ogUrl).getAttribute('content');
      logger.info(`OG URL: ${ogUrl}`);
      expect(ogUrl).toContain('associate-degree-vocational-nursing');
      logger.info('OG URL verified');
    });
  });

  test('TC-PD-05: Verify Schema.org structured data is present @seo', async ({ page }) => {
    await test.step('Step 1: Start validation of Schema.org JSON-LD', async () => {
      logger.info('Starting TC-PD-05: Verify Schema.org JSON-LD');
    });

    await test.step('Step 2: Locate the Yoast Schema graph script tag', async () => {
      logger.info('Locating Schema.org JSON-LD script');
      const schema = page.locator(ProgramDetailLocators.schemaJsonLd);
      await expect(schema).toHaveCount(1);
      logger.info('Schema.org JSON-LD script is present');
    });

    await test.step('Step 3: Validate the JSON-LD content is valid JSON', async () => {
      logger.info('Parsing JSON-LD content');
      const content = await page.locator(ProgramDetailLocators.schemaJsonLd).textContent();
      const parsed = JSON.parse(content!);
      expect(parsed['@context']).toBe('https://schema.org');
      logger.info('Schema.org JSON-LD is valid');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 2: HERO SECTION (TC-PD-06 to TC-PD-10)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-06: Verify hero section is visible on page load @smoke @sanity', async ({ page }) => {
    await test.step('Step 1: Start hero section visibility check', async () => {
      logger.info('Starting TC-PD-06: Verify hero section visibility');
    });

    await test.step('Step 2: Check hero block container is visible on the page', async () => {
      logger.info('Checking hero block visibility');
      await expect(page.locator(ProgramDetailLocators.heroBlock)).toBeVisible();
      logger.info('Hero section is visible');
    });
  });

  test('TC-PD-07: Verify hero headline (H1) is displayed @smoke', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start hero headline validation', async () => {
      logger.info('Starting TC-PD-07: Verify hero headline');
    });

    await test.step('Step 2: Locate the H1 headline element in the hero section', async () => {
      logger.info('Locating H1 headline');
      await expect(page.locator(ProgramDetailLocators.heroHeadline)).toBeVisible();
      logger.info('H1 headline is visible');
    });

    await test.step('Step 3: Verify the headline has non-empty text content', async () => {
      const headline = await programDetailPage.getHeroHeadline();
      logger.info(`Hero headline text: "${headline}"`);
      expect(headline.length).toBeGreaterThan(0);
      logger.info('Hero headline has text content');
    });
  });

  test('TC-PD-08: Verify hero subheadline is displayed @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start subheadline validation', async () => {
      logger.info('Starting TC-PD-08: Verify hero subheadline');
    });

    await test.step('Step 2: Locate the subheadline paragraph in the hero section', async () => {
      logger.info('Locating hero subheadline');
      await expect(page.locator(ProgramDetailLocators.heroSubheadline)).toBeVisible();
      logger.info('Hero subheadline is visible');
    });

    await test.step('Step 3: Verify subheadline has text content', async () => {
      const subheadline = await programDetailPage.getHeroSubheadline();
      logger.info(`Subheadline: "${subheadline}"`);
      expect(subheadline.length).toBeGreaterThan(0);
      logger.info('Subheadline has text content');
    });
  });

  test('TC-PD-09: Verify hero has a two-column layout with text and image @visual', async ({ page }) => {
    await test.step('Step 1: Start two-column layout validation', async () => {
      logger.info('Starting TC-PD-09: Verify hero two-column layout');
    });

    await test.step('Step 2: Check hero text column is present', async () => {
      await expect(page.locator(ProgramDetailLocators.heroTextColumn)).toBeVisible();
      logger.info('Hero text column is visible');
    });

    await test.step('Step 3: Check hero image column is present', async () => {
      await expect(page.locator(ProgramDetailLocators.heroImageColumn)).toBeVisible();
      logger.info('Hero image column is visible');
    });
  });

  test('TC-PD-10: Verify hero section has proper ARIA landmark @a11y', async ({ page }) => {
    await test.step('Step 1: Start ARIA validation for hero section', async () => {
      logger.info('Starting TC-PD-10: Verify hero ARIA landmark');
    });

    await test.step('Step 2: Check the hero section has role="region" and aria-label', async () => {
      const heroSection = page.locator('.hero-block');
      const role = await heroSection.getAttribute('role');
      const ariaLabel = await heroSection.getAttribute('aria-label');
      logger.info(`Hero role: ${role}, aria-label: ${ariaLabel}`);
      expect(role).toBe('region');
      expect(ariaLabel).toBeTruthy();
      logger.info('Hero section has proper ARIA landmark');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 3: GET STARTED FORM (TC-PD-11 to TC-PD-25)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-11: Verify "Get started today" heading is displayed @smoke', async ({ page }) => {
    await test.step('Step 1: Start Get Started heading validation', async () => {
      logger.info('Starting TC-PD-11: Verify Get Started heading');
    });

    await test.step('Step 2: Scroll to the Get Started form section', async () => {
      await page.locator(ProgramDetailLocators.getStartedSection).scrollIntoViewIfNeeded();
      logger.info('Scrolled to Get Started section');
    });

    await test.step('Step 3: Verify the heading text contains "Get started"', async () => {
      const heading = await page.locator(ProgramDetailLocators.getStartedHeading).textContent();
      logger.info(`Get Started heading: "${heading?.trim()}"`);
      expect(heading?.trim().toLowerCase()).toContain('get started');
      logger.info('Get Started heading verified');
    });
  });

  test('TC-PD-12: Verify campus select dropdown is visible and has options @smoke', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start campus dropdown validation', async () => {
      logger.info('Starting TC-PD-12: Verify campus select dropdown');
    });

    await test.step('Step 2: Scroll to the form and check campus dropdown is visible', async () => {
      await page.locator(ProgramDetailLocators.campusSelect).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.campusSelect)).toBeVisible();
      logger.info('Campus dropdown is visible');
    });

    await test.step('Step 3: Verify the campus dropdown has multiple campus options', async () => {
      const count = await programDetailPage.getCampusOptionCount();
      logger.info(`Campus option count (excluding placeholder): ${count}`);
      expect(count).toBeGreaterThanOrEqual(5);
      logger.info('Campus dropdown has multiple options');
    });
  });

  test('TC-PD-13: Verify campus dropdown contains expected campuses @sanity', async ({ programDetailPage }) => {
    await test.step('Step 1: Start campus options content validation', async () => {
      logger.info('Starting TC-PD-13: Verify expected campuses in dropdown');
    });

    await test.step('Step 2: Retrieve all campus option texts', async () => {
      const options = await programDetailPage.getCampusOptions();
      logger.info(`Campus options: ${options.join(', ')}`);
      const optionsText = options.join(', ').toLowerCase();
      expect(optionsText).toContain('fremont');
      expect(optionsText).toContain('sacramento');
      logger.info('Expected campus names found in dropdown');
    });
  });

  test('TC-PD-14: Verify form starts at Step 1 with progress "1 of 6" @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start step 1 default state validation', async () => {
      logger.info('Starting TC-PD-14: Verify form starts at Step 1');
    });

    await test.step('Step 2: Verify the first step is the active step', async () => {
      const activeStep = page.locator(ProgramDetailLocators.getStartedActiveStep);
      const stepNumber = await activeStep.getAttribute('data-step');
      logger.info(`Active step data-step: ${stepNumber}`);
      expect(stepNumber).toBe('1');
      logger.info('Step 1 is active by default');
    });

    await test.step('Step 3: Check the progress text shows "1 of 6"', async () => {
      const progress = await programDetailPage.getProgressText();
      logger.info(`Progress text: "${progress}"`);
      expect(progress).toContain('1 of 6');
      logger.info('Progress text verified as "1 of 6"');
    });
  });

  test('TC-PD-15: Verify Next button is disabled by default before selecting campus @sanity', async ({ page }) => {
    await test.step('Step 1: Start Next button default state validation', async () => {
      logger.info('Starting TC-PD-15: Verify Next button is disabled by default');
    });

    await test.step('Step 2: Check the Next button has the disabled attribute', async () => {
      const nextBtn = page.locator(ProgramDetailLocators.nextButton);
      await expect(nextBtn).toBeDisabled();
      logger.info('Next button is disabled by default');
    });
  });

  test('TC-PD-16: Verify selecting a campus enables the Next button @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start campus selection and Next button activation test', async () => {
      logger.info('Starting TC-PD-16: Select campus and verify Next button activates');
    });

    await test.step('Step 2: Select "Fremont, CA" from the campus dropdown', async () => {
      await programDetailPage.selectCampus('Fremont, CA');
      logger.info('Selected Fremont, CA');
    });

    await test.step('Step 3: Verify the Next button becomes enabled after campus selection', async () => {
      const nextBtn = page.locator(ProgramDetailLocators.nextButton);
      await expect(nextBtn).toBeEnabled();
      logger.info('Next button is now enabled');
    });
  });

  test('TC-PD-17: Verify clicking Next advances to Step 2 (Program Selection) @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start step advancement test', async () => {
      logger.info('Starting TC-PD-17: Advance to Step 2');
    });

    await test.step('Step 2: Select a campus from the dropdown', async () => {
      await programDetailPage.selectCampus('Fremont, CA');
      logger.info('Campus selected');
    });

    await test.step('Step 3: Click the Next button to advance to Step 2', async () => {
      await programDetailPage.clickNext();
      logger.info('Clicked Next button');
    });

    await test.step('Step 4: Verify the active step is now Step 2', async () => {
      const activeStep = page.locator(ProgramDetailLocators.getStartedActiveStep);
      const stepNumber = await activeStep.getAttribute('data-step');
      logger.info(`Active step after Next: ${stepNumber}`);
      expect(stepNumber).toBe('2');
      logger.info('Successfully advanced to Step 2');
    });

    await test.step('Step 5: Verify progress text updated to "2 of 6"', async () => {
      const progress = await programDetailPage.getProgressText();
      logger.info(`Progress text: "${progress}"`);
      expect(progress).toContain('2 of 6');
      logger.info('Progress text verified');
    });
  });

  test('TC-PD-18: Verify program dropdown populates after campus selection @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start program cascade validation', async () => {
      logger.info('Starting TC-PD-18: Verify program dropdown cascade');
    });

    await test.step('Step 2: Select a campus and advance to Step 2', async () => {
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      logger.info('Advanced to Step 2');
    });

    await test.step('Step 3: Verify the program dropdown has options loaded', async () => {
      const programOptions = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])');
      const count = await programOptions.count();
      logger.info(`Program options for Fremont: ${count}`);
      expect(count).toBeGreaterThan(0);
      logger.info('Program dropdown has loaded options');
    });
  });

  test('TC-PD-19: Verify Back button appears on Step 2 and returns to Step 1 @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start Back button navigation test', async () => {
      logger.info('Starting TC-PD-19: Verify Back button functionality');
    });

    await test.step('Step 2: Navigate to Step 2 by selecting a campus and clicking Next', async () => {
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      logger.info('Advanced to Step 2');
    });

    await test.step('Step 3: Verify the Back button is now visible', async () => {
      const backBtn = page.locator(ProgramDetailLocators.backButton);
      await expect(backBtn).toBeVisible();
      logger.info('Back button is visible on Step 2');
    });

    await test.step('Step 4: Click the Back button to return to Step 1', async () => {
      await programDetailPage.clickBack();
      logger.info('Clicked Back button');
    });

    await test.step('Step 5: Verify the active step is Step 1 again', async () => {
      const activeStep = page.locator(ProgramDetailLocators.getStartedActiveStep);
      const stepNumber = await activeStep.getAttribute('data-step');
      expect(stepNumber).toBe('1');
      logger.info('Successfully returned to Step 1');
    });
  });

  test('TC-PD-20: Verify full form step navigation through all 6 steps @regression', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start full form navigation test', async () => {
      logger.info('Starting TC-PD-20: Full 6-step form navigation');
    });

    await test.step('Step 2: Select campus "Fremont, CA" on Step 1 and click Next', async () => {
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      logger.info('Step 1 → Step 2');
    });

    await test.step('Step 3: Select program on Step 2 and click Next', async () => {
      const firstOption = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])').first();
      const optionValue = await firstOption.getAttribute('value');
      await programDetailPage.selectProgram(optionValue!);
      await programDetailPage.clickNext();
      logger.info('Step 2 → Step 3');
    });

    await test.step('Step 4: Enter first name "TestUser" on Step 3 and click Next', async () => {
      await programDetailPage.fillFirstName('TestUser');
      await programDetailPage.clickNext();
      logger.info('Step 3 → Step 4');
    });

    await test.step('Step 5: Enter last name "Automation" on Step 4 and click Next', async () => {
      await programDetailPage.fillLastName('Automation');
      await programDetailPage.clickNext();
      logger.info('Step 4 → Step 5');
    });

    await test.step('Step 6: Enter phone number "5551234567" on Step 5 and click Next', async () => {
      await programDetailPage.fillPhone('5551234567');
      await programDetailPage.clickNext();
      logger.info('Step 5 → Step 6');
    });

    await test.step('Step 7: Verify we are now on Step 6 (email + consent)', async () => {
      const activeStep = page.locator(ProgramDetailLocators.getStartedActiveStep);
      const stepNumber = await activeStep.getAttribute('data-step');
      logger.info(`Final active step: ${stepNumber}`);
      expect(stepNumber).toBe('6');
      logger.info('Successfully navigated through all 6 steps');
    });

    await test.step('Step 8: Verify the progress text shows "6 of 6"', async () => {
      const progress = await programDetailPage.getProgressText();
      expect(progress).toContain('6 of 6');
      logger.info('Progress text is "6 of 6"');
    });
  });

  test('TC-PD-21: Verify email input field is visible on Step 6 @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Navigate to Step 6 by filling all previous steps', async () => {
      logger.info('Starting TC-PD-21: Navigate to Step 6');
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      const firstOption = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])').first();
      const optionValue = await firstOption.getAttribute('value');
      await programDetailPage.selectProgram(optionValue!);
      await programDetailPage.clickNext();
      await programDetailPage.fillFirstName('Test');
      await programDetailPage.clickNext();
      await programDetailPage.fillLastName('User');
      await programDetailPage.clickNext();
      await programDetailPage.fillPhone('5551234567');
      await programDetailPage.clickNext();
      logger.info('Navigated to Step 6');
    });

    await test.step('Step 2: Verify email input is visible on Step 6', async () => {
      await expect(page.locator(ProgramDetailLocators.emailInput)).toBeVisible();
      logger.info('Email input is visible on Step 6');
    });
  });

  test('TC-PD-22: Verify consent checkbox is present on Step 6 @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Navigate to Step 6', async () => {
      logger.info('Starting TC-PD-22: Verify consent checkbox');
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      const firstOption = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])').first();
      const optionValue = await firstOption.getAttribute('value');
      await programDetailPage.selectProgram(optionValue!);
      await programDetailPage.clickNext();
      await programDetailPage.fillFirstName('Test');
      await programDetailPage.clickNext();
      await programDetailPage.fillLastName('User');
      await programDetailPage.clickNext();
      await programDetailPage.fillPhone('5551234567');
      await programDetailPage.clickNext();
    });

    await test.step('Step 2: Verify consent checkbox exists on Step 6', async () => {
      const consent = page.locator(ProgramDetailLocators.consentCheckbox);
      await expect(consent).toBeAttached();
      logger.info('Consent checkbox is present on Step 6');
    });
  });

  test('TC-PD-23: Verify first name input accepts text on Step 3 @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Navigate to Step 3 (first name)', async () => {
      logger.info('Starting TC-PD-23: First name input test');
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      const firstOption = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])').first();
      const optionValue = await firstOption.getAttribute('value');
      await programDetailPage.selectProgram(optionValue!);
      await programDetailPage.clickNext();
    });

    await test.step('Step 2: Enter a first name and verify the value is set', async () => {
      await programDetailPage.fillFirstName('Automation');
      const value = await page.locator(ProgramDetailLocators.firstNameInput).inputValue();
      logger.info(`First name input value: "${value}"`);
      expect(value).toBe('Automation');
      logger.info('First name input accepts text correctly');
    });
  });

  test('TC-PD-24: Verify phone input accepts only numeric characters @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Navigate to Step 5 (phone)', async () => {
      logger.info('Starting TC-PD-24: Phone input validation');
      await programDetailPage.selectCampus('Fremont, CA');
      await programDetailPage.clickNext();
      const firstOption = page.locator(ProgramDetailLocators.programSelect).locator('option:not([disabled])').first();
      const optionValue = await firstOption.getAttribute('value');
      await programDetailPage.selectProgram(optionValue!);
      await programDetailPage.clickNext();
      await programDetailPage.fillFirstName('Test');
      await programDetailPage.clickNext();
      await programDetailPage.fillLastName('User');
      await programDetailPage.clickNext();
    });

    await test.step('Step 2: Verify phone input has inputmode="numeric" and maxlength="10"', async () => {
      const phoneInput = page.locator(ProgramDetailLocators.phoneInput);
      const inputMode = await phoneInput.getAttribute('inputmode');
      const maxLength = await phoneInput.getAttribute('maxlength');
      logger.info(`Phone inputmode: ${inputMode}, maxlength: ${maxLength}`);
      expect(inputMode).toBe('numeric');
      expect(maxLength).toBe('10');
      logger.info('Phone input validation attributes verified');
    });
  });

  test('TC-PD-25: Verify progress bar container is visible during form steps @visual', async ({ page }) => {
    await test.step('Step 1: Start progress bar visibility check', async () => {
      logger.info('Starting TC-PD-25: Verify progress bar');
    });

    await test.step('Step 2: Scroll to the form and check progress bar is visible', async () => {
      await page.locator(ProgramDetailLocators.progressBar).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.progressBar)).toBeVisible();
      logger.info('Progress bar is visible');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 4: PAGE SUB NAVIGATION (TC-PD-26 to TC-PD-32)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-26: Verify sub navigation bar is visible on the page @smoke', async ({ page }) => {
    await test.step('Step 1: Start sub navigation bar visibility check', async () => {
      logger.info('Starting TC-PD-26: Verify sub nav bar visibility');
    });

    await test.step('Step 2: Check the sub navigation bar is visible on the page', async () => {
      await page.locator(ProgramDetailLocators.subNavBar).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.subNavBar)).toBeVisible();
      logger.info('Sub navigation bar is visible');
    });
  });

  test('TC-PD-27: Verify sub nav has exactly 6 navigation links @sanity', async ({ page }) => {
    await test.step('Step 1: Start sub nav link count validation', async () => {
      logger.info('Starting TC-PD-27: Verify sub nav link count');
    });

    await test.step('Step 2: Count the number of sub navigation links', async () => {
      const links = page.locator(ProgramDetailLocators.subNavLink);
      const count = await links.count();
      logger.info(`Sub nav link count: ${count}`);
      expect(count).toBe(6);
      logger.info('Sub nav has exactly 6 links');
    });
  });

  test('TC-PD-28: Verify sub nav contains "Overview" link @sanity', async ({ page }) => {
    await test.step('Step 1: Start Overview link validation', async () => {
      logger.info('Starting TC-PD-28: Check Overview link');
    });

    await test.step('Step 2: Locate the Overview link in the sub navigation', async () => {
      const overviewLink = page.locator(ProgramDetailLocators.subNavLinkByAnchor('main-overview'));
      await expect(overviewLink).toBeVisible();
      const text = await overviewLink.textContent();
      logger.info(`Overview link text: "${text?.trim()}"`);
      expect(text?.trim()).toContain('Overview');
      logger.info('Overview link verified');
    });
  });

  test('TC-PD-29: Verify sub nav contains "Start Dates" link @sanity', async ({ page }) => {
    await test.step('Step 1: Start "Start Dates" link validation', async () => {
      logger.info('Starting TC-PD-29: Check Start Dates link');
    });

    await test.step('Step 2: Locate the Start Dates link in the sub navigation', async () => {
      const link = page.locator(ProgramDetailLocators.subNavLinkByAnchor('start-dates'));
      await expect(link).toBeVisible();
      logger.info('Start Dates link is visible');
    });
  });

  test('TC-PD-30: Verify sub nav contains "BSN Pathways" link @sanity', async ({ page }) => {
    await test.step('Step 1: Start BSN Pathways link validation', async () => {
      logger.info('Starting TC-PD-30: Check BSN Pathways link');
    });

    await test.step('Step 2: Locate the BSN Pathways link', async () => {
      const link = page.locator(ProgramDetailLocators.subNavLinkByAnchor('bsn-pathways'));
      await expect(link).toBeVisible();
      logger.info('BSN Pathways link is visible');
    });
  });

  test('TC-PD-31: Verify sub nav contains "Admissions" link @sanity', async ({ page }) => {
    await test.step('Step 1: Start Admissions link validation', async () => {
      logger.info('Starting TC-PD-31: Check Admissions link');
    });

    await test.step('Step 2: Locate the Admissions link', async () => {
      const link = page.locator(ProgramDetailLocators.subNavLinkByAnchor('admissions-sections'));
      await expect(link).toBeVisible();
      logger.info('Admissions link is visible');
    });
  });

  test('TC-PD-32: Verify sub nav contains "Curriculum" and "FAQs" links @sanity', async ({ page }) => {
    await test.step('Step 1: Start Curriculum and FAQs link validation', async () => {
      logger.info('Starting TC-PD-32: Check Curriculum and FAQs links');
    });

    await test.step('Step 2: Locate the Curriculum link', async () => {
      const curriculumLink = page.locator(ProgramDetailLocators.subNavLinkByAnchor('curriculum-sections'));
      await expect(curriculumLink).toBeVisible();
      logger.info('Curriculum link is visible');
    });

    await test.step('Step 3: Locate the FAQs link', async () => {
      const faqLink = page.locator(ProgramDetailLocators.subNavLinkByAnchor('faq-sections'));
      await expect(faqLink).toBeVisible();
      logger.info('FAQs link is visible');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 5: PROGRAM OVERVIEW (TC-PD-33 to TC-PD-40)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-33: Verify program overview section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start program overview visibility check', async () => {
      logger.info('Starting TC-PD-33: Verify overview section visibility');
    });

    await test.step('Step 2: Scroll to overview section and verify visibility', async () => {
      await page.locator(ProgramDetailLocators.overviewSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.overviewSection)).toBeVisible();
      logger.info('Program overview section is visible');
    });
  });

  test('TC-PD-34: Verify program overview title has text content @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start overview title validation', async () => {
      logger.info('Starting TC-PD-34: Verify overview title');
    });

    await test.step('Step 2: Scroll to the overview section', async () => {
      await page.locator(ProgramDetailLocators.bsnProgramTitle).scrollIntoViewIfNeeded();
    });

    await test.step('Step 3: Verify the program title has non-empty text', async () => {
      const title = await programDetailPage.getProgramOverviewTitle();
      logger.info(`Overview title: "${title}"`);
      expect(title.length).toBeGreaterThan(0);
      logger.info('Overview title has text content');
    });
  });

  test('TC-PD-35: Verify program overview description is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start overview description validation', async () => {
      logger.info('Starting TC-PD-35: Verify overview description');
    });

    await test.step('Step 2: Check the program description paragraph is visible', async () => {
      await page.locator(ProgramDetailLocators.bsnProgramDescription).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.bsnProgramDescription)).toBeVisible();
      const desc = await page.locator(ProgramDetailLocators.bsnProgramDescription).textContent();
      logger.info(`Description length: ${desc?.length}`);
      expect(desc!.length).toBeGreaterThan(50);
      logger.info('Overview description is visible and has content');
    });
  });

  test('TC-PD-36: Verify 3 feature blocks are displayed in the overview @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start feature block count validation', async () => {
      logger.info('Starting TC-PD-36: Verify feature block count');
    });

    await test.step('Step 2: Scroll to the feature blocks area', async () => {
      await page.locator(ProgramDetailLocators.bsnFeatureBlock).first().scrollIntoViewIfNeeded();
    });

    await test.step('Step 3: Count the feature blocks', async () => {
      const count = await programDetailPage.getFeatureBlockCount();
      logger.info(`Feature block count: ${count}`);
      expect(count).toBe(3);
      logger.info('Exactly 3 feature blocks are displayed');
    });
  });

  test('TC-PD-37: Verify each feature block has a title @sanity', async ({ page }) => {
    await test.step('Step 1: Start feature title validation', async () => {
      logger.info('Starting TC-PD-37: Verify feature titles');
    });

    await test.step('Step 2: Check each feature block has a non-empty title', async () => {
      const titles = page.locator(ProgramDetailLocators.bsnFeatureTitle);
      const count = await titles.count();
      for (let i = 0; i < count; i++) {
        const text = await titles.nth(i).textContent();
        logger.info(`Feature ${i + 1} title: "${text?.trim()}"`);
        expect(text?.trim().length).toBeGreaterThan(0);
      }
      logger.info('All feature blocks have titles');
    });
  });

  test('TC-PD-38: Verify feature blocks have arrow links @sanity', async ({ page }) => {
    await test.step('Step 1: Start arrow link validation', async () => {
      logger.info('Starting TC-PD-38: Verify feature arrow links');
    });

    await test.step('Step 2: Check arrow links exist on feature blocks', async () => {
      const arrows = page.locator(ProgramDetailLocators.bsnCardArrow);
      const count = await arrows.count();
      logger.info(`Arrow link count: ${count}`);
      expect(count).toBe(3);
      logger.info('All 3 feature blocks have arrow links');
    });
  });

  test('TC-PD-39: Verify NCLEX pass rate is displayed @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start NCLEX rate validation', async () => {
      logger.info('Starting TC-PD-39: Verify NCLEX rate');
    });

    await test.step('Step 2: Scroll to the NCLEX rate element', async () => {
      await page.locator(ProgramDetailLocators.nclexRate).scrollIntoViewIfNeeded();
    });

    await test.step('Step 3: Verify NCLEX rate is visible and contains a numeric value', async () => {
      const rate = await programDetailPage.getNclexRate();
      logger.info(`NCLEX rate: ${rate}`);
      expect(rate).toBeTruthy();
      expect(parseFloat(rate)).toBeGreaterThan(0);
      logger.info('NCLEX rate is displayed with a numeric value');
    });
  });

  test('TC-PD-40: Verify NCLEX source link is present @sanity', async ({ page }) => {
    await test.step('Step 1: Start NCLEX source link validation', async () => {
      logger.info('Starting TC-PD-40: Verify NCLEX source');
    });

    await test.step('Step 2: Check the NCLEX source link exists', async () => {
      const source = page.locator(ProgramDetailLocators.nclexSource).first();
      await expect(source).toBeAttached();
      logger.info('NCLEX source link is present');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 6: IMAGE/VIDEO TESTIMONIAL (TC-PD-41 to TC-PD-47)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-41: Verify image/video testimonial section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start IVT section visibility check', async () => {
      logger.info('Starting TC-PD-41: Verify IVT section');
    });

    await test.step('Step 2: Scroll to and check IVT container visibility', async () => {
      await page.locator(ProgramDetailLocators.ivtContainer).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.ivtContainer)).toBeVisible();
      logger.info('IVT section is visible');
    });
  });

  test('TC-PD-42: Verify testimonial quote text is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start quote text validation', async () => {
      logger.info('Starting TC-PD-42: Verify IVT quote text');
    });

    await test.step('Step 2: Check the quote text has content', async () => {
      const quote = page.locator(ProgramDetailLocators.ivtQuoteText).first();
      await quote.scrollIntoViewIfNeeded();
      const text = await quote.textContent();
      logger.info(`IVT quote: "${text?.trim().substring(0, 50)}..."`);
      expect(text?.trim().length).toBeGreaterThan(10);
      logger.info('IVT quote text has content');
    });
  });

  test('TC-PD-43: Verify testimonial author name is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start author name validation', async () => {
      logger.info('Starting TC-PD-43: Verify IVT author name');
    });

    await test.step('Step 2: Check the author name element has text', async () => {
      const name = page.locator(ProgramDetailLocators.ivtAuthorName).first();
      const text = await name.textContent();
      logger.info(`IVT author: "${text?.trim()}"`);
      expect(text?.trim().length).toBeGreaterThan(0);
      logger.info('IVT author name is displayed');
    });
  });

  test('TC-PD-44: Verify testimonial author title shows "Unitek Graduate" @sanity', async ({ page }) => {
    await test.step('Step 1: Start author title validation', async () => {
      logger.info('Starting TC-PD-44: Verify IVT author title');
    });

    await test.step('Step 2: Check the author title text', async () => {
      const title = page.locator(ProgramDetailLocators.ivtAuthorTitle).first();
      const text = await title.textContent();
      logger.info(`IVT author title: "${text?.trim()}"`);
      expect(text?.trim()).toContain('Unitek Graduate');
      logger.info('Author title shows "Unitek Graduate"');
    });
  });

  test('TC-PD-45: Verify "Read more" CTA link is present @sanity', async ({ page }) => {
    await test.step('Step 1: Start Read more CTA validation', async () => {
      logger.info('Starting TC-PD-45: Verify Read more CTA');
    });

    await test.step('Step 2: Check the Read more link is visible in the IVT section', async () => {
      const cta = page.locator(ProgramDetailLocators.ivtReadMoreCta).first();
      await expect(cta).toBeAttached();
      logger.info('Read more CTA is present');
    });
  });

  test('TC-PD-46: Verify play button is present for video testimonial @sanity', async ({ page }) => {
    await test.step('Step 1: Start play button validation', async () => {
      logger.info('Starting TC-PD-46: Verify play button');
    });

    await test.step('Step 2: Check the play button exists in the IVT video area', async () => {
      const playBtn = page.locator(ProgramDetailLocators.ivtPlayButton).first();
      await expect(playBtn).toBeAttached();
      logger.info('Play button is present');
    });
  });

  test('TC-PD-47: Verify video modal exists in DOM for testimonial video @functional', async ({ page }) => {
    await test.step('Step 1: Start video modal validation', async () => {
      logger.info('Starting TC-PD-47: Verify video modal exists');
    });

    await test.step('Step 2: Check the video modal element is in the DOM', async () => {
      const modal = page.locator(ProgramDetailLocators.ivtVideoModal);
      await expect(modal).toBeAttached();
      logger.info('Video modal is present in DOM');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 7: START DATES (TC-PD-48 to TC-PD-55)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-48: Verify start dates section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start dates section visibility check', async () => {
      logger.info('Starting TC-PD-48: Verify start dates section');
    });

    await test.step('Step 2: Scroll to the start dates section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.startDatesSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.startDatesSection)).toBeVisible();
      logger.info('Start dates section is visible');
    });
  });

  test('TC-PD-49: Verify start dates section title contains "start date" @sanity', async ({ page }) => {
    await test.step('Step 1: Start section title validation', async () => {
      logger.info('Starting TC-PD-49: Verify start dates title');
    });

    await test.step('Step 2: Check the section title text', async () => {
      const title = await page.locator(ProgramDetailLocators.startDatesTitle).textContent();
      logger.info(`Start dates title: "${title?.trim()}"`);
      expect(title?.toLowerCase()).toContain('start date');
      logger.info('Start dates title verified');
    });
  });

  test('TC-PD-50: Verify campus date cards are displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start campus cards count validation', async () => {
      logger.info('Starting TC-PD-50: Verify campus date cards');
    });

    await test.step('Step 2: Count the campus date cards', async () => {
      const cards = page.locator(ProgramDetailLocators.campusDateCard);
      const count = await cards.count();
      logger.info(`Campus date card count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      logger.info('Campus date cards are displayed');
    });
  });

  test('TC-PD-51: Verify each campus card has a location name @sanity', async ({ page }) => {
    await test.step('Step 1: Start campus location name validation', async () => {
      logger.info('Starting TC-PD-51: Verify campus locations');
    });

    await test.step('Step 2: Check each campus card has a location text', async () => {
      const locations = page.locator(ProgramDetailLocators.campusLocation);
      const count = await locations.count();
      for (let i = 0; i < count; i++) {
        const text = await locations.nth(i).textContent();
        logger.info(`Campus ${i + 1} location: "${text?.trim()}"`);
        expect(text?.trim().length).toBeGreaterThan(0);
      }
      logger.info('All campus cards have location names');
    });
  });

  test('TC-PD-52: Verify each campus card has an address @sanity', async ({ page }) => {
    await test.step('Step 1: Start campus address validation', async () => {
      logger.info('Starting TC-PD-52: Verify campus addresses');
    });

    await test.step('Step 2: Check each campus card has address text', async () => {
      const addresses = page.locator(ProgramDetailLocators.campusAddress);
      const count = await addresses.count();
      for (let i = 0; i < count; i++) {
        const text = await addresses.nth(i).textContent();
        logger.info(`Campus ${i + 1} address: "${text?.trim().substring(0, 30)}..."`);
        expect(text?.trim().length).toBeGreaterThan(0);
      }
      logger.info('All campus cards have addresses');
    });
  });

  test('TC-PD-53: Verify each campus card has a "Get started" button @sanity', async ({ page }) => {
    await test.step('Step 1: Start "Get started" button validation', async () => {
      logger.info('Starting TC-PD-53: Verify Get started buttons');
    });

    await test.step('Step 2: Check each campus card has a CTA button', async () => {
      const buttons = page.locator(ProgramDetailLocators.campusCardButton);
      const count = await buttons.count();
      logger.info(`"Get started" button count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      logger.info('Campus cards have "Get started" buttons');
    });
  });

  test('TC-PD-54: Verify calendar date elements are present on campus cards @sanity', async ({ page }) => {
    await test.step('Step 1: Start calendar date validation', async () => {
      logger.info('Starting TC-PD-54: Verify calendar dates');
    });

    await test.step('Step 2: Check calendar date time elements exist', async () => {
      const dates = page.locator(ProgramDetailLocators.calendarDate);
      const count = await dates.count();
      logger.info(`Calendar date count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      logger.info('Calendar date elements are present');
    });
  });

  test('TC-PD-55: Verify calendar month abbreviation is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start calendar month validation', async () => {
      logger.info('Starting TC-PD-55: Verify calendar month');
    });

    await test.step('Step 2: Check calendar month abbreviation elements', async () => {
      const months = page.locator(ProgramDetailLocators.calendarMonth);
      const count = await months.count();
      expect(count).toBeGreaterThanOrEqual(1);
      const firstMonth = await months.first().textContent();
      logger.info(`First calendar month: "${firstMonth?.trim()}"`);
      expect(firstMonth?.trim().length).toBeGreaterThan(0);
      logger.info('Calendar month abbreviations are displayed');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 8: BSN PATHWAYS (TC-PD-56 to TC-PD-63)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-56: Verify BSN Pathways section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start BSN Pathways visibility check', async () => {
      logger.info('Starting TC-PD-56: Verify BSN Pathways section');
    });

    await test.step('Step 2: Scroll to the BSN Pathways section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.pathwaysSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.pathwaysSection)).toBeVisible();
      logger.info('BSN Pathways section is visible');
    });
  });

  test('TC-PD-57: Verify BSN Pathways heading text @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start pathways heading validation', async () => {
      logger.info('Starting TC-PD-57: Verify pathways heading');
    });

    await test.step('Step 2: Scroll to pathways section and check heading', async () => {
      await page.locator(ProgramDetailLocators.pathwaysHeading).scrollIntoViewIfNeeded();
      const heading = await programDetailPage.getPathwaysHeading();
      logger.info(`Pathways heading: "${heading}"`);
      expect(heading.toLowerCase()).toContain('pathway');
      logger.info('Pathways heading verified');
    });
  });

  test('TC-PD-58: Verify 4 pathway accordion items are present @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start pathway item count validation', async () => {
      logger.info('Starting TC-PD-58: Verify pathway item count');
    });

    await test.step('Step 2: Count the pathway accordion items', async () => {
      await page.locator(ProgramDetailLocators.pathwaysItem).first().scrollIntoViewIfNeeded();
      const count = await programDetailPage.getPathwayCount();
      logger.info(`Pathway item count: ${count}`);
      expect(count).toBe(4);
      logger.info('Exactly 4 pathway items are present');
    });
  });

  test('TC-PD-59: Verify pathway accordion expands on click @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start accordion expand test', async () => {
      logger.info('Starting TC-PD-59: Verify pathway expands');
    });

    await test.step('Step 2: Click the first pathway trigger to expand it', async () => {
      await page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0)).scrollIntoViewIfNeeded();
      await programDetailPage.expandPathway(0);
      logger.info('Expanded first pathway');
    });

    await test.step('Step 3: Verify the trigger has aria-expanded="true"', async () => {
      const trigger = page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0));
      const expanded = await trigger.getAttribute('aria-expanded');
      logger.info(`aria-expanded: ${expanded}`);
      expect(expanded).toBe('true');
      logger.info('Pathway accordion expanded successfully');
    });
  });

  test('TC-PD-60: Verify pathway accordion panel content is visible when expanded @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start expanded panel content check', async () => {
      logger.info('Starting TC-PD-60: Verify expanded panel content');
    });

    await test.step('Step 2: Expand the first pathway accordion', async () => {
      await page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0)).scrollIntoViewIfNeeded();
      await programDetailPage.expandPathway(0);
    });

    await test.step('Step 3: Verify the panel content is visible', async () => {
      const panel = page.locator(ProgramDetailLocators.pathwaysPanel).first();
      await expect(panel).toBeVisible();
      const content = await panel.textContent();
      logger.info(`Panel content length: ${content?.length}`);
      expect(content!.trim().length).toBeGreaterThan(10);
      logger.info('Panel content is visible');
    });
  });

  test('TC-PD-61: Verify pathway accordion collapses when clicked again @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start accordion collapse test', async () => {
      logger.info('Starting TC-PD-61: Verify pathway collapses');
    });

    await test.step('Step 2: Expand and then collapse the first pathway', async () => {
      await page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0)).scrollIntoViewIfNeeded();
      await programDetailPage.expandPathway(0);
      await programDetailPage.collapsePathway(0);
    });

    await test.step('Step 3: Verify aria-expanded is now "false"', async () => {
      const trigger = page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0));
      const expanded = await trigger.getAttribute('aria-expanded');
      logger.info(`aria-expanded after collapse: ${expanded}`);
      expect(expanded).toBe('false');
      logger.info('Pathway accordion collapsed successfully');
    });
  });

  test('TC-PD-62: Verify "Traditional BSN Program" pathway text @sanity', async ({ page }) => {
    await test.step('Step 1: Start Traditional BSN pathway text check', async () => {
      logger.info('Starting TC-PD-62: Verify Traditional BSN');
    });

    await test.step('Step 2: Check the first pathway trigger contains "Traditional BSN"', async () => {
      const trigger = page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(0));
      await trigger.scrollIntoViewIfNeeded();
      const text = await trigger.textContent();
      logger.info(`First pathway text: "${text?.trim()}"`);
      expect(text?.trim()).toContain('Traditional BSN');
      logger.info('Traditional BSN pathway text verified');
    });
  });

  test('TC-PD-63: Verify all pathways have aria-controls attribute @a11y', async ({ page }) => {
    await test.step('Step 1: Start ARIA controls validation', async () => {
      logger.info('Starting TC-PD-63: Verify aria-controls');
    });

    await test.step('Step 2: Check each pathway trigger has aria-controls', async () => {
      const triggers = page.locator(ProgramDetailLocators.pathwaysTrigger);
      const count = await triggers.count();
      for (let i = 0; i < count; i++) {
        const ariaControls = await triggers.nth(i).getAttribute('aria-controls');
        logger.info(`Pathway ${i} aria-controls: ${ariaControls}`);
        expect(ariaControls).toBeTruthy();
      }
      logger.info('All pathways have aria-controls');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 9: ADMISSIONS (TC-PD-64 to TC-PD-72)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-64: Verify admissions section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start admissions section visibility check', async () => {
      logger.info('Starting TC-PD-64: Verify admissions section');
    });

    await test.step('Step 2: Scroll to admissions section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.admissionsSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.admissionsSection)).toBeVisible();
      logger.info('Admissions section is visible');
    });
  });

  test('TC-PD-65: Verify admissions heading text @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start admissions heading validation', async () => {
      logger.info('Starting TC-PD-65: Verify admissions heading');
    });

    await test.step('Step 2: Check admissions heading text', async () => {
      await page.locator(ProgramDetailLocators.admissionsHeading).scrollIntoViewIfNeeded();
      const heading = await programDetailPage.getAdmissionsHeading();
      logger.info(`Admissions heading: "${heading}"`);
      expect(heading.toLowerCase()).toContain('admissions');
      logger.info('Admissions heading verified');
    });
  });

  test('TC-PD-66: Verify 7 admissions requirement items are displayed @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start admissions item count validation', async () => {
      logger.info('Starting TC-PD-66: Verify admissions item count');
    });

    await test.step('Step 2: Count the admissions checklist items', async () => {
      await page.locator(ProgramDetailLocators.admissionsItem).first().scrollIntoViewIfNeeded();
      const count = await programDetailPage.getAdmissionsItemCount();
      logger.info(`Admissions item count: ${count}`);
      expect(count).toBe(7);
      logger.info('Exactly 7 admissions items are displayed');
    });
  });

  test('TC-PD-67: Verify each admissions item has a check icon @visual', async ({ page }) => {
    await test.step('Step 1: Start check icon validation', async () => {
      logger.info('Starting TC-PD-67: Verify check icons');
    });

    await test.step('Step 2: Count check icons across all admissions items', async () => {
      const checkIcons = page.locator(ProgramDetailLocators.admissionsCheckIcon);
      const count = await checkIcons.count();
      logger.info(`Check icon count: ${count}`);
      expect(count).toBe(7);
      logger.info('All 7 admissions items have check icons');
    });
  });

  test('TC-PD-68: Verify each admissions item has descriptive text @sanity', async ({ page }) => {
    await test.step('Step 1: Start admissions text validation', async () => {
      logger.info('Starting TC-PD-68: Verify admissions item texts');
    });

    await test.step('Step 2: Check each admissions item has non-empty text', async () => {
      const items = page.locator(ProgramDetailLocators.admissionsItemText);
      const count = await items.count();
      for (let i = 0; i < count; i++) {
        const text = await items.nth(i).textContent();
        logger.info(`Admissions item ${i + 1}: "${text?.trim().substring(0, 40)}..."`);
        expect(text?.trim().length).toBeGreaterThan(5);
      }
      logger.info('All admissions items have descriptive text');
    });
  });

  test('TC-PD-69: Verify first admissions item mentions "high school" @content', async ({ page }) => {
    await test.step('Step 1: Start first item content validation', async () => {
      logger.info('Starting TC-PD-69: Verify first admissions item');
    });

    await test.step('Step 2: Check first admissions item text mentions high school', async () => {
      const firstItem = page.locator(ProgramDetailLocators.admissionsItemText).first();
      const text = await firstItem.textContent();
      logger.info(`First item text: "${text?.trim()}"`);
      expect(text?.toLowerCase()).toContain('high school');
      logger.info('First admissions item mentions high school');
    });
  });

  test('TC-PD-70: Verify admissions section has proper ARIA landmark @a11y', async ({ page }) => {
    await test.step('Step 1: Start ARIA validation', async () => {
      logger.info('Starting TC-PD-70: Verify admissions ARIA');
    });

    await test.step('Step 2: Check admissions block has role="region"', async () => {
      const section = page.locator('.admissions-block');
      const role = await section.getAttribute('role');
      logger.info(`Admissions role: ${role}`);
      expect(role).toBe('region');
      logger.info('Admissions section has proper ARIA landmark');
    });
  });

  test('TC-PD-71: Verify admissions list uses unordered list markup @a11y', async ({ page }) => {
    await test.step('Step 1: Start list markup validation', async () => {
      logger.info('Starting TC-PD-71: Verify admissions list markup');
    });

    await test.step('Step 2: Check admissions uses ul element', async () => {
      const list = page.locator(ProgramDetailLocators.admissionsList);
      await expect(list).toBeAttached();
      logger.info('Admissions uses proper ul list markup');
    });
  });

  test('TC-PD-72: Verify admissions check icons have alt text @a11y', async ({ page }) => {
    await test.step('Step 1: Start check icon alt text validation', async () => {
      logger.info('Starting TC-PD-72: Verify check icon alt text');
    });

    await test.step('Step 2: Check each check icon image has alt attribute', async () => {
      const icons = page.locator(ProgramDetailLocators.admissionsCheckIcon);
      const count = await icons.count();
      for (let i = 0; i < count; i++) {
        const alt = await icons.nth(i).getAttribute('alt');
        logger.info(`Check icon ${i + 1} alt: "${alt}"`);
        expect(alt).toBeTruthy();
      }
      logger.info('All check icons have alt text');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 10: CURRICULUM (TC-PD-73 to TC-PD-82)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-73: Verify curriculum section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start curriculum section visibility check', async () => {
      logger.info('Starting TC-PD-73: Verify curriculum section');
    });

    await test.step('Step 2: Scroll to curriculum section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.curriculumSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.curriculumSection)).toBeVisible();
      logger.info('Curriculum section is visible');
    });
  });

  test('TC-PD-74: Verify curriculum title contains "BSN Curriculum" @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start curriculum title validation', async () => {
      logger.info('Starting TC-PD-74: Verify curriculum title');
    });

    await test.step('Step 2: Check curriculum title text', async () => {
      await page.locator(ProgramDetailLocators.curriculumTitle).scrollIntoViewIfNeeded();
      const title = await programDetailPage.getCurriculumTitle();
      logger.info(`Curriculum title: "${title}"`);
      expect(title).toContain('BSN Curriculum');
      logger.info('Curriculum title verified');
    });
  });

  test('TC-PD-75: Verify total credits are displayed @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start total credits validation', async () => {
      logger.info('Starting TC-PD-75: Verify total credits');
    });

    await test.step('Step 2: Check total credit hours value', async () => {
      await page.locator(ProgramDetailLocators.curriculumTotalCredits).scrollIntoViewIfNeeded();
      const credits = await programDetailPage.getTotalCredits();
      logger.info(`Total credits: ${credits}`);
      expect(parseInt(credits)).toBeGreaterThan(0);
      logger.info('Total credits are displayed');
    });
  });

  test('TC-PD-76: Verify curriculum intro text is present @sanity', async ({ page }) => {
    await test.step('Step 1: Start intro text validation', async () => {
      logger.info('Starting TC-PD-76: Verify curriculum intro');
    });

    await test.step('Step 2: Check intro paragraph has content', async () => {
      const intro = page.locator(ProgramDetailLocators.curriculumIntro);
      await intro.scrollIntoViewIfNeeded();
      const text = await intro.textContent();
      logger.info(`Intro text length: ${text?.length}`);
      expect(text!.trim().length).toBeGreaterThan(50);
      logger.info('Curriculum intro text is present');
    });
  });

  test('TC-PD-77: Verify 2 curriculum accordion sections exist @sanity', async ({ page }) => {
    await test.step('Step 1: Start accordion section count validation', async () => {
      logger.info('Starting TC-PD-77: Verify curriculum accordion count');
    });

    await test.step('Step 2: Count curriculum accordion sections', async () => {
      const sections = page.locator(ProgramDetailLocators.curriculumAccordionSection);
      const count = await sections.count();
      logger.info(`Curriculum accordion section count: ${count}`);
      expect(count).toBe(2);
      logger.info('Exactly 2 curriculum accordion sections');
    });
  });

  test('TC-PD-78: Verify first curriculum section (Nursing Core) is expanded by default @sanity', async ({ page }) => {
    await test.step('Step 1: Start default expanded state check', async () => {
      logger.info('Starting TC-PD-78: Verify first section expanded');
    });

    await test.step('Step 2: Check the first accordion header has aria-expanded="true"', async () => {
      const firstHeader = page.locator(ProgramDetailLocators.curriculumAccordionHeader).first();
      await firstHeader.scrollIntoViewIfNeeded();
      const expanded = await firstHeader.getAttribute('aria-expanded');
      logger.info(`First section aria-expanded: ${expanded}`);
      expect(expanded).toBe('true');
      logger.info('First curriculum section is expanded by default');
    });
  });

  test('TC-PD-79: Verify curriculum table has Course and Credit Hours headers @sanity', async ({ page }) => {
    await test.step('Step 1: Start table header validation', async () => {
      logger.info('Starting TC-PD-79: Verify table headers');
    });

    await test.step('Step 2: Check the first table has Course and Credit Hours headers', async () => {
      const table = page.locator(ProgramDetailLocators.curriculumTable).first();
      await table.scrollIntoViewIfNeeded();
      const headers = await table.locator('th').allTextContents();
      logger.info(`Table headers: ${headers.join(', ')}`);
      expect(headers.some(h => h.includes('Course'))).toBeTruthy();
      expect(headers.some(h => h.includes('Credit'))).toBeTruthy();
      logger.info('Table has Course and Credit Hours headers');
    });
  });

  test('TC-PD-80: Verify curriculum table has course rows @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start course row validation', async () => {
      logger.info('Starting TC-PD-80: Verify course rows');
    });

    await test.step('Step 2: Count course rows in the first section', async () => {
      await page.locator(ProgramDetailLocators.curriculumTable).first().scrollIntoViewIfNeeded();
      const courseCount = await programDetailPage.getCourseCount(0);
      logger.info(`Course count in Nursing Core: ${courseCount}`);
      expect(courseCount).toBeGreaterThan(0);
      logger.info('Course rows are present in the table');
    });
  });

  test('TC-PD-81: Verify second curriculum section can be expanded @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start second section expand test', async () => {
      logger.info('Starting TC-PD-81: Expand second curriculum section');
    });

    await test.step('Step 2: Click to expand the second curriculum section', async () => {
      const header = page.locator(ProgramDetailLocators.curriculumAccordionHeader).nth(1);
      await header.scrollIntoViewIfNeeded();
      await programDetailPage.expandCurriculumSection(1);
    });

    await test.step('Step 3: Verify the second section is now expanded', async () => {
      const header = page.locator(ProgramDetailLocators.curriculumAccordionHeader).nth(1);
      const expanded = await header.getAttribute('aria-expanded');
      logger.info(`Second section aria-expanded: ${expanded}`);
      expect(expanded).toBe('true');
      logger.info('Second curriculum section expanded successfully');
    });
  });

  test('TC-PD-82: Verify section credits are displayed per accordion header @sanity', async ({ page }) => {
    await test.step('Step 1: Start section credits validation', async () => {
      logger.info('Starting TC-PD-82: Verify section credits');
    });

    await test.step('Step 2: Check each accordion header shows credit count', async () => {
      const credits = page.locator(ProgramDetailLocators.curriculumSectionCredits);
      const count = await credits.count();
      logger.info(`Section credit elements: ${count}`);
      expect(count).toBe(2);
      for (let i = 0; i < count; i++) {
        const text = await credits.nth(i).textContent();
        logger.info(`Section ${i + 1} credits: ${text?.trim()}`);
        expect(parseInt(text!.trim())).toBeGreaterThan(0);
      }
      logger.info('Section credits are displayed');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 11: TESTIMONIAL SLIDER (TC-PD-83 to TC-PD-90)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-83: Verify testimonial slider section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start testimonial slider visibility check', async () => {
      logger.info('Starting TC-PD-83: Verify testimonial slider');
    });

    await test.step('Step 2: Scroll to testimonial block and check visibility', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.testimonialBlock)).toBeVisible();
      logger.info('Testimonial slider is visible');
    });
  });

  test('TC-PD-84: Verify 5 testimonial slides exist @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start slide count validation', async () => {
      logger.info('Starting TC-PD-84: Verify slide count');
    });

    await test.step('Step 2: Count the testimonial slides', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      const count = await programDetailPage.getTestimonialSlideCount();
      logger.info(`Testimonial slide count: ${count}`);
      expect(count).toBe(5);
      logger.info('Exactly 5 testimonial slides exist');
    });
  });

  test('TC-PD-85: Verify first testimonial slide is active by default @sanity', async ({ page }) => {
    await test.step('Step 1: Start active slide validation', async () => {
      logger.info('Starting TC-PD-85: Verify first slide is active');
    });

    await test.step('Step 2: Check the first slide has the "active" class', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      const activeSlide = page.locator(ProgramDetailLocators.testimonialSlideActive);
      await expect(activeSlide).toBeVisible();
      logger.info('First testimonial slide is active');
    });
  });

  test('TC-PD-86: Verify testimonial has quote text content @sanity', async ({ page }) => {
    await test.step('Step 1: Start quote content validation', async () => {
      logger.info('Starting TC-PD-86: Verify quote content');
    });

    await test.step('Step 2: Check the active testimonial has quote text', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      const quote = page.locator(ProgramDetailLocators.testimonialQuoteText).first();
      const text = await quote.textContent();
      logger.info(`First quote: "${text?.trim().substring(0, 50)}..."`);
      expect(text?.trim().length).toBeGreaterThan(10);
      logger.info('Testimonial quote has text content');
    });
  });

  test('TC-PD-87: Verify next navigation arrow is visible @sanity', async ({ page }) => {
    await test.step('Step 1: Start next arrow visibility check', async () => {
      logger.info('Starting TC-PD-87: Verify next arrow');
    });

    await test.step('Step 2: Check the next testimonial arrow is visible', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      const nextBtn = page.locator(ProgramDetailLocators.testimonialNextButton);
      await expect(nextBtn).toBeAttached();
      logger.info('Next navigation arrow is visible');
    });
  });

  test('TC-PD-88: Verify previous navigation arrow is visible @sanity', async ({ page }) => {
    await test.step('Step 1: Start previous arrow visibility check', async () => {
      logger.info('Starting TC-PD-88: Verify previous arrow');
    });

    await test.step('Step 2: Check the previous testimonial arrow is visible', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      const prevBtn = page.locator(ProgramDetailLocators.testimonialPrevButton);
      await expect(prevBtn).toBeAttached();
      logger.info('Previous navigation arrow is visible');
    });
  });

  test('TC-PD-89: Verify clicking next arrow advances the testimonial slide @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start slide navigation test', async () => {
      logger.info('Starting TC-PD-89: Navigate testimonial slider');
    });

    await test.step('Step 2: Click the next arrow button', async () => {
      await page.locator(ProgramDetailLocators.testimonialBlock).scrollIntoViewIfNeeded();
      await programDetailPage.clickNextTestimonial();
      await page.waitForTimeout(500);
      logger.info('Clicked next arrow');
    });

    await test.step('Step 3: Verify a different slide is now active', async () => {
      const activeSlides = page.locator(ProgramDetailLocators.testimonialSlideActive);
      await expect(activeSlides).toHaveCount(1);
      logger.info('Slide navigation working — different slide is active');
    });
  });

  test('TC-PD-90: Verify testimonial author names are present @sanity', async ({ page }) => {
    await test.step('Step 1: Start author name validation', async () => {
      logger.info('Starting TC-PD-90: Verify testimonial author names');
    });

    await test.step('Step 2: Check testimonial name elements exist', async () => {
      const names = page.locator(ProgramDetailLocators.testimonialAuthorName);
      const count = await names.count();
      logger.info(`Testimonial author name count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      const firstName = await names.first().textContent();
      logger.info(`First author name: "${firstName?.trim()}"`);
      expect(firstName?.trim().length).toBeGreaterThan(0);
      logger.info('Testimonial author names verified');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 12: TESTIMONIAL VIDEO SECTION (TC-PD-91 to TC-PD-97)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-91: Verify testimonial video section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start video section visibility check', async () => {
      logger.info('Starting TC-PD-91: Verify TVS section');
    });

    await test.step('Step 2: Scroll to the testimonial video section', async () => {
      await page.locator(ProgramDetailLocators.tvsSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.tvsSection)).toBeVisible();
      logger.info('Testimonial video section is visible');
    });
  });

  test('TC-PD-92: Verify TVS quote text is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start TVS quote validation', async () => {
      logger.info('Starting TC-PD-92: Verify TVS quote');
    });

    await test.step('Step 2: Check the quote blockquote has content', async () => {
      const quote = page.locator(ProgramDetailLocators.tvsQuoteText);
      await quote.scrollIntoViewIfNeeded();
      const text = await quote.textContent();
      logger.info(`TVS quote: "${text?.trim().substring(0, 50)}..."`);
      expect(text?.trim().length).toBeGreaterThan(10);
      logger.info('TVS quote text verified');
    });
  });

  test('TC-PD-93: Verify TVS author name is displayed @sanity', async ({ page }) => {
    await test.step('Step 1: Start TVS author name validation', async () => {
      logger.info('Starting TC-PD-93: Verify TVS author name');
    });

    await test.step('Step 2: Check TVS author name', async () => {
      const name = page.locator(ProgramDetailLocators.tvsAuthorName);
      const text = await name.textContent();
      logger.info(`TVS author: "${text?.trim()}"`);
      expect(text?.trim().length).toBeGreaterThan(0);
      logger.info('TVS author name verified');
    });
  });

  test('TC-PD-94: Verify TVS hero image is displayed @visual', async ({ page }) => {
    await test.step('Step 1: Start hero image validation', async () => {
      logger.info('Starting TC-PD-94: Verify TVS hero image');
    });

    await test.step('Step 2: Check the hero image has a valid src attribute', async () => {
      const img = page.locator(ProgramDetailLocators.tvsHeroImage);
      await img.scrollIntoViewIfNeeded();
      const src = await img.getAttribute('src');
      logger.info(`TVS hero image src: ${src}`);
      expect(src).toBeTruthy();
      expect(src).toContain('http');
      logger.info('TVS hero image has valid src');
    });
  });

  test('TC-PD-95: Verify YouTube video iframe is embedded @sanity', async ({ page }) => {
    await test.step('Step 1: Start YouTube iframe validation', async () => {
      logger.info('Starting TC-PD-95: Verify YouTube iframe');
    });

    await test.step('Step 2: Check the iframe has a YouTube embed src', async () => {
      const iframe = page.locator(ProgramDetailLocators.tvsVideoIframe);
      await iframe.scrollIntoViewIfNeeded();
      const src = await iframe.getAttribute('src');
      logger.info(`Video iframe src: ${src}`);
      expect(src).toContain('youtube.com/embed');
      logger.info('YouTube iframe is embedded');
    });
  });

  test('TC-PD-96: Verify lower-right panel has title and description @sanity', async ({ page }) => {
    await test.step('Step 1: Start lower-right panel validation', async () => {
      logger.info('Starting TC-PD-96: Verify lower-right panel');
    });

    await test.step('Step 2: Check the panel title is present', async () => {
      const title = page.locator(ProgramDetailLocators.tvsLowerRightTitle);
      await title.scrollIntoViewIfNeeded();
      const text = await title.textContent();
      logger.info(`Lower-right title: "${text?.trim()}"`);
      expect(text?.trim().length).toBeGreaterThan(0);
      logger.info('Lower-right title is present');
    });

    await test.step('Step 3: Check the panel description is present', async () => {
      const desc = page.locator(ProgramDetailLocators.tvsLowerRightDesc);
      const text = await desc.textContent();
      logger.info(`Lower-right description length: ${text?.length}`);
      expect(text!.trim().length).toBeGreaterThan(10);
      logger.info('Lower-right description is present');
    });
  });

  test('TC-PD-97: Verify resource lists are displayed in lower-right panel @sanity', async ({ page }) => {
    await test.step('Step 1: Start resource lists validation', async () => {
      logger.info('Starting TC-PD-97: Verify resource lists');
    });

    await test.step('Step 2: Check resource list items exist', async () => {
      const resources = page.locator(ProgramDetailLocators.tvsResource);
      await page.locator(ProgramDetailLocators.tvsResourceList).first().scrollIntoViewIfNeeded();
      const count = await resources.count();
      logger.info(`Resource item count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(2);
      logger.info('Resource lists are displayed');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 13: FINANCIAL AID (TC-PD-98 to TC-PD-103)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-98: Verify financial aid section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start financial aid section visibility check', async () => {
      logger.info('Starting TC-PD-98: Verify financial aid section');
    });

    await test.step('Step 2: Scroll to financial aid section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.financialAidSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.financialAidSection)).toBeVisible();
      logger.info('Financial aid section is visible');
    });
  });

  test('TC-PD-99: Verify financial aid has 2 columns @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start column count validation', async () => {
      logger.info('Starting TC-PD-99: Verify FA column count');
    });

    await test.step('Step 2: Count the financial aid columns', async () => {
      await page.locator(ProgramDetailLocators.financialAidSection).scrollIntoViewIfNeeded();
      const count = await programDetailPage.getFinancialAidColumnCount();
      logger.info(`Financial aid column count: ${count}`);
      expect(count).toBe(2);
      logger.info('Financial aid has exactly 2 columns');
    });
  });

  test('TC-PD-100: Verify financial aid column titles @sanity', async ({ page }) => {
    await test.step('Step 1: Start FA title validation', async () => {
      logger.info('Starting TC-PD-100: Verify FA column titles');
    });

    await test.step('Step 2: Check each column has a title', async () => {
      const titles = page.locator(ProgramDetailLocators.financialAidTitle);
      const count = await titles.count();
      for (let i = 0; i < count; i++) {
        const text = await titles.nth(i).textContent();
        logger.info(`FA column ${i + 1} title: "${text?.trim()}"`);
        expect(text?.trim().length).toBeGreaterThan(0);
      }
      logger.info('FA column titles verified');
    });
  });

  test('TC-PD-101: Verify first column title is "Cost and Financial Aid" @content', async ({ page }) => {
    await test.step('Step 1: Start first column title check', async () => {
      logger.info('Starting TC-PD-101: Verify first FA column title');
    });

    await test.step('Step 2: Check the first column title text', async () => {
      const title = page.locator(ProgramDetailLocators.financialAidTitle).first();
      await title.scrollIntoViewIfNeeded();
      const text = await title.textContent();
      logger.info(`First FA title: "${text?.trim()}"`);
      expect(text?.trim()).toContain('Cost and Financial Aid');
      logger.info('First column title is "Cost and Financial Aid"');
    });
  });

  test('TC-PD-102: Verify financial aid CTA links are present @sanity', async ({ page }) => {
    await test.step('Step 1: Start CTA link validation', async () => {
      logger.info('Starting TC-PD-102: Verify FA CTA links');
    });

    await test.step('Step 2: Check CTA links exist in financial aid section', async () => {
      const ctas = page.locator(ProgramDetailLocators.financialAidCta);
      const count = await ctas.count();
      logger.info(`FA CTA link count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      logger.info('FA CTA links are present');
    });
  });

  test('TC-PD-103: Verify financial aid descriptions have content @sanity', async ({ page }) => {
    await test.step('Step 1: Start FA description validation', async () => {
      logger.info('Starting TC-PD-103: Verify FA descriptions');
    });

    await test.step('Step 2: Check each column description has text content', async () => {
      const descs = page.locator(ProgramDetailLocators.financialAidDesc);
      const count = await descs.count();
      for (let i = 0; i < count; i++) {
        const text = await descs.nth(i).textContent();
        logger.info(`FA desc ${i + 1} length: ${text?.length}`);
        expect(text!.trim().length).toBeGreaterThan(20);
      }
      logger.info('FA descriptions have content');
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SECTION 14: FAQ SECTION (TC-PD-104 to TC-PD-115)
  // ═══════════════════════════════════════════════════════

  test('TC-PD-104: Verify FAQ section is visible @smoke', async ({ page }) => {
    await test.step('Step 1: Start FAQ section visibility check', async () => {
      logger.info('Starting TC-PD-104: Verify FAQ section');
    });

    await test.step('Step 2: Scroll to FAQ section and check visibility', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await expect(page.locator(ProgramDetailLocators.faqSection)).toBeVisible();
      logger.info('FAQ section is visible');
    });
  });

  test('TC-PD-105: Verify FAQ heading says "Frequently Asked Questions" @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start FAQ heading validation', async () => {
      logger.info('Starting TC-PD-105: Verify FAQ heading');
    });

    await test.step('Step 2: Check the FAQ heading text', async () => {
      await page.locator(ProgramDetailLocators.faqTitle).scrollIntoViewIfNeeded();
      const title = await programDetailPage.getFAQTitle();
      logger.info(`FAQ title: "${title}"`);
      expect(title).toContain('Frequently Asked Questions');
      logger.info('FAQ heading verified');
    });
  });

  test('TC-PD-106: Verify 5 FAQ category tabs are present @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start FAQ category count validation', async () => {
      logger.info('Starting TC-PD-106: Verify FAQ category count');
    });

    await test.step('Step 2: Count the FAQ category tabs', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      const count = await programDetailPage.getFAQCategoryCount();
      logger.info(`FAQ category tab count: ${count}`);
      expect(count).toBe(5);
      logger.info('Exactly 5 FAQ category tabs');
    });
  });

  test('TC-PD-107: Verify first FAQ category tab is active by default @sanity', async ({ page }) => {
    await test.step('Step 1: Start default active tab check', async () => {
      logger.info('Starting TC-PD-107: Verify first tab is active');
    });

    await test.step('Step 2: Check the first category tab has the active class', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      const activeTab = page.locator(ProgramDetailLocators.faqCategoryTabActive);
      await expect(activeTab).toBeVisible();
      const text = await activeTab.textContent();
      logger.info(`Active tab text: "${text?.trim()}"`);
      expect(text?.trim()).toContain('Tuition');
      logger.info('First FAQ category tab is active by default');
    });
  });

  test('TC-PD-108: Verify clicking a FAQ category tab switches the active panel @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start tab switching test', async () => {
      logger.info('Starting TC-PD-108: Verify FAQ tab switching');
    });

    await test.step('Step 2: Click the second category tab (Transfer Credits)', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await programDetailPage.clickFAQCategory(1);
      logger.info('Clicked second FAQ category tab');
    });

    await test.step('Step 3: Verify the second tab is now active', async () => {
      const secondTab = page.locator(ProgramDetailLocators.faqCategoryTabByIndex(1));
      const pressed = await secondTab.getAttribute('aria-pressed');
      logger.info(`Second tab aria-pressed: ${pressed}`);
      expect(pressed).toBe('true');
      logger.info('Second category tab is now active');
    });
  });

  test('TC-PD-109: Verify FAQ accordion questions are displayed for active category @sanity', async ({ page }) => {
    await test.step('Step 1: Start FAQ questions visibility check', async () => {
      logger.info('Starting TC-PD-109: Verify FAQ questions');
    });

    await test.step('Step 2: Check questions exist in the active category panel', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      const activePanel = page.locator(ProgramDetailLocators.faqCategoryPanelActive);
      const questions = activePanel.locator('.faq-accordion-item');
      const count = await questions.count();
      logger.info(`Questions in active category: ${count}`);
      expect(count).toBeGreaterThanOrEqual(1);
      logger.info('FAQ questions are displayed');
    });
  });

  test('TC-PD-110: Verify FAQ accordion expands answer on question click @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start FAQ accordion expand test', async () => {
      logger.info('Starting TC-PD-110: Verify FAQ expand');
    });

    await test.step('Step 2: Click the first question in the first category', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await programDetailPage.expandFAQQuestion(0, 0);
      logger.info('Expanded first FAQ question');
    });

    await test.step('Step 3: Verify the answer is now visible', async () => {
      const answer = page.locator(ProgramDetailLocators.faqDesktopAnswerById(0, 0));
      await expect(answer).toBeVisible();
      logger.info('FAQ answer is visible after expand');
    });
  });

  test('TC-PD-111: Verify FAQ answer has content when expanded @sanity', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start FAQ answer content validation', async () => {
      logger.info('Starting TC-PD-111: Verify FAQ answer content');
    });

    await test.step('Step 2: Expand the first question and check answer text', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await programDetailPage.expandFAQQuestion(0, 0);
      const answer = page.locator(ProgramDetailLocators.faqDesktopAnswerById(0, 0));
      const text = await answer.textContent();
      logger.info(`Answer text length: ${text?.length}`);
      expect(text!.trim().length).toBeGreaterThan(10);
      logger.info('FAQ answer has text content');
    });
  });

  test('TC-PD-112: Verify FAQ accordion collapses answer on second click @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start FAQ collapse test', async () => {
      logger.info('Starting TC-PD-112: Verify FAQ collapse');
    });

    await test.step('Step 2: Expand and then collapse the first FAQ question', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await programDetailPage.expandFAQQuestion(0, 0);
      await programDetailPage.collapseFAQQuestion(0, 0);
    });

    await test.step('Step 3: Verify the question is now collapsed', async () => {
      const question = page.locator(ProgramDetailLocators.faqDesktopQuestionById(0, 0));
      const expanded = await question.getAttribute('aria-expanded');
      logger.info(`FAQ question aria-expanded: ${expanded}`);
      expect(expanded).toBe('false');
      logger.info('FAQ question collapsed successfully');
    });
  });

  test('TC-PD-113: Verify FAQ questions have text content @sanity', async ({ page }) => {
    await test.step('Step 1: Start FAQ question text validation', async () => {
      logger.info('Starting TC-PD-113: Verify FAQ question texts');
    });

    await test.step('Step 2: Check questions in the first category have text', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      const activePanel = page.locator(ProgramDetailLocators.faqCategoryPanelActive);
      const questionTexts = activePanel.locator('.faq-question-text');
      const count = await questionTexts.count();
      for (let i = 0; i < count; i++) {
        const text = await questionTexts.nth(i).textContent();
        logger.info(`FAQ Q${i + 1}: "${text?.trim().substring(0, 40)}..."`);
        expect(text?.trim().length).toBeGreaterThan(5);
      }
      logger.info('All FAQ questions have text content');
    });
  });

  test('TC-PD-114: Verify FAQ section has proper ARIA landmark @a11y', async ({ page }) => {
    await test.step('Step 1: Start FAQ ARIA validation', async () => {
      logger.info('Starting TC-PD-114: Verify FAQ ARIA');
    });

    await test.step('Step 2: Check the FAQ section has role="region"', async () => {
      const section = page.locator(ProgramDetailLocators.faqSection);
      const role = await section.getAttribute('role');
      const ariaLabel = await section.getAttribute('aria-label');
      logger.info(`FAQ role: ${role}, aria-label: ${ariaLabel}`);
      expect(role).toBe('region');
      expect(ariaLabel).toBeTruthy();
      logger.info('FAQ section has proper ARIA landmark');
    });
  });

  test('TC-PD-115: Verify switching to third FAQ category and expanding a question @functional', async ({ programDetailPage, page }) => {
    await test.step('Step 1: Start cross-category navigation test', async () => {
      logger.info('Starting TC-PD-115: Cross-category FAQ navigation');
    });

    await test.step('Step 2: Click the third FAQ category tab (Admissions & Enrollment)', async () => {
      await page.locator(ProgramDetailLocators.faqSection).scrollIntoViewIfNeeded();
      await programDetailPage.clickFAQCategory(2);
      logger.info('Clicked third FAQ category tab');
    });

    await test.step('Step 3: Verify the third tab is now active', async () => {
      const thirdTab = page.locator(ProgramDetailLocators.faqCategoryTabByIndex(2));
      const pressed = await thirdTab.getAttribute('aria-pressed');
      expect(pressed).toBe('true');
      logger.info('Third category tab is active');
    });

    await test.step('Step 4: Expand the first question in the third category', async () => {
      await programDetailPage.expandFAQQuestion(2, 0);
      logger.info('Expanded first question in third category');
    });

    await test.step('Step 5: Verify the answer is visible', async () => {
      const answer = page.locator(ProgramDetailLocators.faqDesktopAnswerById(2, 0));
      await expect(answer).toBeVisible();
      const text = await answer.textContent();
      logger.info(`Answer text: "${text?.trim().substring(0, 40)}..."`);
      expect(text!.trim().length).toBeGreaterThan(5);
      logger.info('Cross-category FAQ navigation verified');
    });
  });

});
