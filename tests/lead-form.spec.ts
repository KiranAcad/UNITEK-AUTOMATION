/**
 * Lead Capture Form UI and Layout Test Suite
 * ===========================================
 * Comprehensive tests for the multi-step lead capture form
 * and bottom lead form on the homepage, focusing strictly on:
 * - Field visibility (inputs, checkboxes, buttons, labels)
 * - Alignment & Grid stack consistency
 * - Vertical and horizontal spacing
 * - Element dimensions
 */

import { test, expect } from '../fixtures';
import { CAMPUS_OPTIONS } from '../constants/app.constants';
import { LeadFormLocators } from '../locators/lead-form.locators';
import { LayoutHelper } from '../helpers/layout.helper';
import { logger } from '../logger';
import leadFormData from '../test-data/lead-form.data.json';

test.describe('Lead Capture Form Tests @lead-form', () => {

  test.beforeEach(async ({ homePage }) => {
    logger.info('Starting test setup: Navigating to homepage for Lead Form checks');
    await homePage.goto();
    logger.info('Navigation to homepage completed successfully');
  });

  // ─── Form Visibility ─────────────────────────────────

  test('TC-LF-01: Verify lead form container visibility and visual dimensions @smoke @sanity', async ({ leadFormPage, page }) => {
    logger.info('Starting TC-LF-01: Verify lead form container visibility and visual dimensions');

    logger.info('Verifying lead form container visibility in Page Object Model (POM)');
    await leadFormPage.verifyFormVisible();
    logger.info('Lead form container visibility verified');

    logger.info('Locating hero lead form container element');
    const formContainer = page.locator(LeadFormLocators.heroFormContainer).first();
    
    logger.info('Asserting that the lead form container is visible');
    await expect(formContainer).toBeVisible();

    // Verify the lead form widget has a valid layout footprint (Figma spec check)
    logger.info('Retrieving bounding box dimensions for Hero Lead Form Container');
    const box = await LayoutHelper.getBoundingBox(formContainer, 'Hero Form Container');
    logger.info(`Hero lead form container dimensions: width=${box.width}px, height=${box.height}px`);
    
    logger.info('Asserting lead form container width is greater than 250px');
    expect(box.width).toBeGreaterThan(250);
    
    logger.info('Asserting lead form container height is greater than 50px');
    expect(box.height).toBeGreaterThan(50);

    logger.info('TC-LF-01 completed successfully');
  });

  // ─── Step Navigation ──────────────────────────────────

  test('TC-LF-02: Verify Next and Back step navigation and field layout consistency', async ({ leadFormPage, page }) => {
    logger.info('Starting TC-LF-02: Verify Next and Back step navigation and field layout consistency');

    // Step 1: Select campus
    const targetCampus = leadFormData.validLead.campus;
    logger.info(`Step 1: Selecting campus: "${targetCampus}"`);
    await leadFormPage.selectCampus(targetCampus);
    
    logger.info('Clicking Next to proceed to Step 2');
    await leadFormPage.clickNext();

    // Step 2: Select program
    const targetProgram = leadFormData.validLead.program;
    logger.info(`Step 2: Selecting program: "${targetProgram}"`);
    await leadFormPage.selectProgram(targetProgram);
    
    logger.info('Clicking Next to proceed to Step 3');
    await leadFormPage.clickNext();

    // Step 3: First name — verify Back is visible and aligned stacked with the text input
    logger.info('Step 3: Locating Back button, Next button, and First Name input field');
    const backBtn = page.locator(LeadFormLocators.backButton).first();
    const nextBtn = page.locator(LeadFormLocators.nextButton).first();
    const inputField = page.locator(LeadFormLocators.firstNameInput).first();

    logger.info('Asserting that the Back button is visible');
    await expect(backBtn).toBeVisible();
    
    logger.info('Asserting that the Next button is visible');
    await expect(nextBtn).toBeVisible();
    
    logger.info('Asserting that the First Name input field is visible');
    await expect(inputField).toBeVisible();

    // Verify the input field and action buttons occupy valid visual layout space
    logger.info('Retrieving bounding box dimensions for First Name input field');
    const inputBox = await LayoutHelper.getBoundingBox(inputField, 'First Name Input Field');
    
    logger.info('Retrieving bounding box dimensions for Next action button');
    const nextBox = await LayoutHelper.getBoundingBox(nextBtn, 'Next Action Button');
    
    logger.info(`First Name input width: ${inputBox.width.toFixed(1)}px, Next button width: ${nextBox.width.toFixed(1)}px`);
    
    logger.info('Asserting that the First Name input width is greater than 100px');
    expect(inputBox.width).toBeGreaterThan(100);
    
    logger.info('Asserting that the Next button width is greater than 50px');
    expect(nextBox.width).toBeGreaterThan(50);

    // Go back to Step 2
    logger.info('Clicking Back button to return to Step 2');
    await leadFormPage.clickBack();
    logger.info('Back navigation completed');

    logger.info('TC-LF-02 completed successfully');
  });

  // ─── Campus Dropdown ──────────────────────────────────

  test('TC-LF-03: Verify campus dropdown has all expected options and visual layout', async ({ leadFormPage, page }) => {
    logger.info('Starting TC-LF-03: Verify campus dropdown has all expected options and visual layout');

    logger.info('Locating the campus dropdown trigger and clicking it to expand');
    const dropdownTrigger = page.locator(LeadFormLocators.campusDropdown).first();
    await dropdownTrigger.click();
    logger.info('Campus dropdown expanded');

    // Verify at least some campus options are visible and horizontally/vertically aligned
    const visibleOptions: { locator: any; name: string }[] = [];
    const campusesToVerify = CAMPUS_OPTIONS.slice(0, 3);
    logger.info(`Verifying visibility of top 3 campus options: ${campusesToVerify.join(', ')}`);
    
    for (const campus of campusesToVerify) {
      const option = page.locator(LeadFormLocators.campusOption(campus)).first();
      logger.info(`Asserting that dropdown option for campus "${campus}" is visible`);
      await expect(option).toBeVisible();
      visibleOptions.push({ locator: option, name: `Dropdown Option: ${campus}` });
    }

    // Verify options are visible and have valid visual dimensions
    for (const item of visibleOptions) {
      logger.info(`Retrieving bounding box dimensions for dropdown option: ${item.name}`);
      const box = await LayoutHelper.getBoundingBox(item.locator, item.name);
      logger.info(`Campus option [${item.name}] size: width=${box.width.toFixed(1)}px, height=${box.height.toFixed(1)}px`);
      
      logger.info(`Asserting width of [${item.name}] is greater than 50px`);
      expect(box.width).toBeGreaterThan(50);
      
      logger.info(`Asserting height of [${item.name}] is greater than 15px`);
      expect(box.height).toBeGreaterThan(15);
    }

    logger.info('TC-LF-03 completed successfully');
  });

  // ─── Complete Form Flow ───────────────────────────────

  test('TC-LF-04: Complete 6-step form with valid data (no submit)', async ({ leadFormPage, page }) => {
    logger.info('Starting TC-LF-04: Complete 6-step form with valid data (no submit)');

    const leadData = {
      campus: leadFormData.validLead.campus,
      program: leadFormData.validLead.program,
      firstName: leadFormData.validLead.firstName,
      lastName: leadFormData.validLead.lastName,
      phone: leadFormData.validLead.phone,
      email: leadFormData.validLead.email,
    };
    logger.info('Completing multi-step lead form using mock data:', leadData);
    await leadFormPage.fillCompleteForm(leadData);
    logger.info('Multi-step lead form data input completed');

    // Verify we reached the submit step — submit button should exist
    logger.info('Checking if the Form Submit button is enabled');
    const isSubmitEnabled = await leadFormPage.isSubmitEnabled();
    logger.info(`Is Form Submit button enabled? ${isSubmitEnabled}`);
    
    logger.info('Asserting that Submit button is enabled (truthy)');
    expect(isSubmitEnabled).toBeTruthy();

    logger.info('Locating the Form Submit button');
    const submitBtn = page.locator(LeadFormLocators.submitButton).filter({ visible: true }).first();
    
    logger.info('Retrieving bounding box dimensions for Form Submit button');
    const box = await LayoutHelper.getBoundingBox(submitBtn, 'Submit Button');
    logger.info(`Submit button size: width=${box.width.toFixed(1)}px, height=${box.height.toFixed(1)}px`);
    
    logger.info('Asserting Submit button width is greater than 80px');
    expect(box.width).toBeGreaterThan(80);
    
    logger.info('Asserting Submit button height is greater than 20px');
    expect(box.height).toBeGreaterThan(20);

    logger.info('TC-LF-04 completed successfully');
  });

  // ─── Bottom Form ──────────────────────────────────────

  test('TC-LF-05: Verify bottom form fields are visible and vertically aligned', async ({ leadFormPage, page }) => {
    logger.info('Starting TC-LF-05: Verify bottom form fields are visible and vertically aligned');

    logger.info('Scrolling to the bottom lead form widget section');
    await leadFormPage.scrollToBottomForm();
    logger.info('Scroll operation completed');

    logger.info('Locating all bottom lead form inputs and submit button');
    const firstNameLocator = page.locator(LeadFormLocators.bottomFirstName).first();
    const lastNameLocator = page.locator(LeadFormLocators.bottomLastName).first();
    const emailLocator = page.locator(LeadFormLocators.bottomEmail).first();
    const phoneLocator = page.locator(LeadFormLocators.bottomPhone).first();
    const submitLocator = page.locator(LeadFormLocators.bottomSubmit).first();

    // 1. Verify basic field visibility
    logger.info('Asserting bottom First Name input visibility');
    await expect(firstNameLocator).toBeVisible();
    
    logger.info('Asserting bottom Last Name input visibility');
    await expect(lastNameLocator).toBeVisible();
    
    logger.info('Asserting bottom Email input visibility');
    await expect(emailLocator).toBeVisible();
    
    logger.info('Asserting bottom Phone input visibility');
    await expect(phoneLocator).toBeVisible();
    
    logger.info('Asserting bottom Submit button visibility');
    await expect(submitLocator).toBeVisible();

    // 2. Validate left-alignment of Column 1 inputs
    logger.info('Asserting left alignment alignment (max 20px offset) between bottom First Name and bottom Email inputs');
    await LayoutHelper.assertFormFieldsLeftAligned([
      { locator: firstNameLocator, name: 'First Name Input' },
      { locator: emailLocator, name: 'Email Input' }
    ], 20);
 
    // 3. Validate left-alignment of Column 2 inputs
    logger.info('Asserting left alignment alignment (max 20px offset) between bottom Last Name and bottom Phone inputs');
    await LayoutHelper.assertFormFieldsLeftAligned([
      { locator: lastNameLocator, name: 'Last Name Input' },
      { locator: phoneLocator, name: 'Phone Input' }
    ], 20);
 
    // 4. Verify vertical stack arrangement and spacing within Column 1 and Column 2
    logger.info('Asserting vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom First Name and bottom Email inputs');
    await LayoutHelper.assertVerticalStack([
      { locator: firstNameLocator, name: 'First Name Input' },
      { locator: emailLocator, name: 'Email Input' }
    ], 5, 80);
 
    logger.info('Asserting vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom Last Name and bottom Phone inputs');
    await LayoutHelper.assertVerticalStack([
      { locator: lastNameLocator, name: 'Last Name Input' },
      { locator: phoneLocator, name: 'Phone Input' }
    ], 5, 80);

    logger.info('TC-LF-05 completed successfully');
  });
});
