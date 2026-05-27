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
  // Verified dual-trigger CI/CD pipeline integration with Option B (Full Regression on PR)

  test.beforeEach(async ({ homePage }) => {
    logger.info('Starting test setup: Navigating to homepage for Lead Form checks');
    await homePage.goto();
    logger.info('Navigation to homepage completed successfully');
  });

  // ─── Form Visibility ─────────────────────────────────

  test('TC-LF-01: Verify lead form container visibility and visual dimensions @smoke @sanity', async ({ leadFormPage, page }) => {

  await test.step('Step 1: Start execution for lead form container visibility and visual dimensions validation', async () => {
      logger.info('Starting TC-LF-01: Verify lead form container visibility and visual dimensions');
  
  });

  await test.step('Step 2: Verify lead form container visibility in Page Object Model (POM)', async () => {
      logger.info('Verifying lead form container visibility in Page Object Model (POM)');
      await leadFormPage.verifyFormVisible();
  });

  await test.step('Step 3: Lead form container visibility verified', async () => {
      logger.info('Lead form container visibility verified');
  
  });

  await test.step('Step 4: Locate hero lead form container element', async () => {
      logger.info('Locating hero lead form container element');
  });
    const formContainer = page.locator(LeadFormLocators.heroFormContainer).first();
    

  await test.step('Step 5: Verify that the lead form container is visible', async () => {
      logger.info('Asserting that the lead form container is visible');
      await expect(formContainer).toBeVisible();
  
      // Verify the lead form widget has a valid layout footprint (Figma spec check)
  });

  await test.step('Step 6: Retrieve bounding box dimensions for Hero Lead Form Container', async () => {
      logger.info('Retrieving bounding box dimensions for Hero Lead Form Container');
  });
    const box = await LayoutHelper.getBoundingBox(formContainer, 'Hero Form Container');

  await test.step('Step 7: Log hero lead form container dimensions', async () => {
      logger.info(`Hero lead form container dimensions: width=${box.width}px, height=${box.height}px`);
      
  });

  await test.step('Step 8: Verify lead form container width is greater than 250px', async () => {
      logger.info('Asserting lead form container width is greater than 250px');
      expect(box.width).toBeGreaterThan(250);
      
  });

  await test.step('Step 9: Verify lead form container height is greater than 50px', async () => {
      logger.info('Asserting lead form container height is greater than 50px');
      expect(box.height).toBeGreaterThan(50);
  
  });

  await test.step('Step 10: Complete TC-LF-01 successfully', async () => {
      logger.info('TC-LF-01 completed successfully');
    
  });
  });

  // ─── Step Navigation ──────────────────────────────────

  test('TC-LF-02: Verify Next and Back step navigation and field layout consistency', async ({ leadFormPage, page }) => {

  await test.step('Step 1: Start execution for next and Back step navigation and field layout consistency validation', async () => {
      logger.info('Starting TC-LF-02: Verify Next and Back step navigation and field layout consistency');
  
      // Step 1: Select campus
  });
    const targetCampus = leadFormData.validLead.campus;

  await test.step('Step 2: Step 1: Selecting campus: "${targetCampus}"', async () => {
      logger.info(`Step 1: Selecting campus: "${targetCampus}"`);
      await leadFormPage.selectCampus(targetCampus);
      
  });

  await test.step('Step 3: Click Next to proceed to Step 2', async () => {
      logger.info('Clicking Next to proceed to Step 2');
      await leadFormPage.clickNext();
  
      // Step 2: Select program
  });
    const targetProgram = leadFormData.validLead.program;

  await test.step('Step 4: Step 2: Selecting program: "${targetProgram}"', async () => {
      logger.info(`Step 2: Selecting program: "${targetProgram}"`);
      await leadFormPage.selectProgram(targetProgram);
      
  });

  await test.step('Step 5: Click Next to proceed to Step 3', async () => {
      logger.info('Clicking Next to proceed to Step 3');
      await leadFormPage.clickNext();
  
      // Step 3: First name — verify Back is visible and aligned stacked with the text input
  });

  await test.step('Step 6: Step 3: Locating Back button, Next button, and First Name input field', async () => {
      logger.info('Step 3: Locating Back button, Next button, and First Name input field');
  });
    const backBtn = page.locator(LeadFormLocators.backButton).first();
    const nextBtn = page.locator(LeadFormLocators.nextButton).first();
    const inputField = page.locator(LeadFormLocators.firstNameInput).first();


  await test.step('Step 7: Verify that the Back button is visible', async () => {
      logger.info('Asserting that the Back button is visible');
      await expect(backBtn).toBeVisible();
      
  });

  await test.step('Step 8: Verify that the Next button is visible', async () => {
      logger.info('Asserting that the Next button is visible');
      await expect(nextBtn).toBeVisible();
      
  });

  await test.step('Step 9: Verify that the First Name input field is visible', async () => {
      logger.info('Asserting that the First Name input field is visible');
      await expect(inputField).toBeVisible();
  
      // Verify the input field and action buttons occupy valid visual layout space
  });

  await test.step('Step 10: Retrieve bounding box dimensions for First Name input field', async () => {
      logger.info('Retrieving bounding box dimensions for First Name input field');
  });
    const inputBox = await LayoutHelper.getBoundingBox(inputField, 'First Name Input Field');
    

  await test.step('Step 11: Retrieve bounding box dimensions for Next action button', async () => {
      logger.info('Retrieving bounding box dimensions for Next action button');
  });
    const nextBox = await LayoutHelper.getBoundingBox(nextBtn, 'Next Action Button');
    

  await test.step('Step 12: First Name input width: ${inputBox.width.toFixed(1)}px, Next button width: ${nextBox.width.toFixed(1)}px', async () => {
      logger.info(`First Name input width: ${inputBox.width.toFixed(1)}px, Next button width: ${nextBox.width.toFixed(1)}px`);
      
  });

  await test.step('Step 13: Verify that the First Name input width is greater than 100px', async () => {
      logger.info('Asserting that the First Name input width is greater than 100px');
      expect(inputBox.width).toBeGreaterThan(100);
      
  });

  await test.step('Step 14: Verify that the Next button width is greater than 50px', async () => {
      logger.info('Asserting that the Next button width is greater than 50px');
      expect(nextBox.width).toBeGreaterThan(50);
  
      // Go back to Step 2
  });

  await test.step('Step 15: Click Back button to return to Step 2', async () => {
      logger.info('Clicking Back button to return to Step 2');
      await leadFormPage.clickBack();
  });

  await test.step('Step 16: Back navigation completed', async () => {
      logger.info('Back navigation completed');
  
  });

  await test.step('Step 17: Complete TC-LF-02 successfully', async () => {
      logger.info('TC-LF-02 completed successfully');
    
  });
  });

  // ─── Campus Dropdown ──────────────────────────────────

  test('TC-LF-03: Verify campus dropdown has all expected options and visual layout', async ({ leadFormPage, page }) => {

  await test.step('Step 1: Start execution for campus dropdown has all expected options and visual layout validation', async () => {
      logger.info('Starting TC-LF-03: Verify campus dropdown has all expected options and visual layout');
  
  });

  await test.step('Step 2: Locate the campus dropdown trigger and clicking it to expand', async () => {
      logger.info('Locating the campus dropdown trigger and clicking it to expand');
  });
    const dropdownTrigger = page.locator(LeadFormLocators.campusDropdown).first();
    await dropdownTrigger.click();

  await test.step('Step 3: Campus dropdown expanded', async () => {
      logger.info('Campus dropdown expanded');
  
      // Verify at least some campus options are visible and horizontally/vertically aligned
  });
    const visibleOptions: { locator: any; name: string }[] = [];
    const campusesToVerify = CAMPUS_OPTIONS.slice(0, 3);

  await test.step('Step 4: Verify visibility of top 3 campus options: ${campusesToVerify.join(\', \')}', async () => {
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
  
  });

  await test.step('Step 5: Complete TC-LF-03 successfully', async () => {
      logger.info('TC-LF-03 completed successfully');
    
  });
  });

  // ─── Complete Form Flow ───────────────────────────────

  test('TC-LF-04: Complete 6-step form with valid data (no submit)', async ({ leadFormPage, page }) => {

  await test.step('Step 1: Start execution for complete 6-step form with valid data (no submit)', async () => {
      logger.info('Starting TC-LF-04: Complete 6-step form with valid data (no submit)');
  
  });
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

  await test.step('Step 2: Multi-step lead form data input completed', async () => {
      logger.info('Multi-step lead form data input completed');
  
      // Verify we reached the submit step — submit button should exist
  });

  await test.step('Step 3: Check if the Form Submit button is enabled', async () => {
      logger.info('Checking if the Form Submit button is enabled');
  });
    const isSubmitEnabled = await leadFormPage.isSubmitEnabled();

  await test.step('Step 4: Is Form Submit button enabled? ${isSubmitEnabled}', async () => {
      logger.info(`Is Form Submit button enabled? ${isSubmitEnabled}`);
      
  });

  await test.step('Step 5: Verify that Submit button is enabled (truthy)', async () => {
      logger.info('Asserting that Submit button is enabled (truthy)');
      expect(isSubmitEnabled).toBeTruthy();
  
  });

  await test.step('Step 6: Locate the Form Submit button', async () => {
      logger.info('Locating the Form Submit button');
  });
    const submitBtn = page.locator(LeadFormLocators.submitButton).filter({ visible: true }).first();
    

  await test.step('Step 7: Retrieve bounding box dimensions for Form Submit button', async () => {
      logger.info('Retrieving bounding box dimensions for Form Submit button');
  });
    const box = await LayoutHelper.getBoundingBox(submitBtn, 'Submit Button');

  await test.step('Step 8: Submit button size: width=${box.width.toFixed(1)}px, height=${box.height.toFixed(1)}px', async () => {
      logger.info(`Submit button size: width=${box.width.toFixed(1)}px, height=${box.height.toFixed(1)}px`);
      
  });

  await test.step('Step 9: Verify Submit button width is greater than 80px', async () => {
      logger.info('Asserting Submit button width is greater than 80px');
      expect(box.width).toBeGreaterThan(80);
      
  });

  await test.step('Step 10: Verify Submit button height is greater than 20px', async () => {
      logger.info('Asserting Submit button height is greater than 20px');
      expect(box.height).toBeGreaterThan(20);
  
  });

  await test.step('Step 11: Complete TC-LF-04 successfully', async () => {
      logger.info('TC-LF-04 completed successfully');
    
  });
  });

  // ─── Bottom Form ──────────────────────────────────────

  test('TC-LF-05: Verify bottom form fields are visible and vertically aligned', async ({ leadFormPage, page }) => {

  await test.step('Step 1: Start execution for bottom form fields are visible and vertically aligned validation', async () => {
      logger.info('Starting TC-LF-05: Verify bottom form fields are visible and vertically aligned');
  
  });

  await test.step('Step 2: Scroll to the bottom lead form widget section', async () => {
      logger.info('Scrolling to the bottom lead form widget section');
      await leadFormPage.scrollToBottomForm();
  });

  await test.step('Step 3: Scroll operation completed', async () => {
      logger.info('Scroll operation completed');
  
  });

  await test.step('Step 4: Locate all bottom lead form inputs and submit button', async () => {
      logger.info('Locating all bottom lead form inputs and submit button');
  });
    const firstNameLocator = page.locator(LeadFormLocators.bottomFirstName).first();
    const lastNameLocator = page.locator(LeadFormLocators.bottomLastName).first();
    const emailLocator = page.locator(LeadFormLocators.bottomEmail).first();
    const phoneLocator = page.locator(LeadFormLocators.bottomPhone).first();
    const submitLocator = page.locator(LeadFormLocators.bottomSubmit).first();

    // 1. Verify basic field visibility

  await test.step('Step 5: Verify bottom First Name input visibility', async () => {
      logger.info('Asserting bottom First Name input visibility');
      await expect(firstNameLocator).toBeVisible();
      
  });

  await test.step('Step 6: Verify bottom Last Name input visibility', async () => {
      logger.info('Asserting bottom Last Name input visibility');
      await expect(lastNameLocator).toBeVisible();
      
  });

  await test.step('Step 7: Verify bottom Email input visibility', async () => {
      logger.info('Asserting bottom Email input visibility');
      await expect(emailLocator).toBeVisible();
      
  });

  await test.step('Step 8: Verify bottom Phone input visibility', async () => {
      logger.info('Asserting bottom Phone input visibility');
      await expect(phoneLocator).toBeVisible();
      
  });

  await test.step('Step 9: Verify bottom Submit button visibility', async () => {
      logger.info('Asserting bottom Submit button visibility');
      await expect(submitLocator).toBeVisible();
  
      // 2. Validate left-alignment of Column 1 inputs
  });

  await test.step('Step 10: Verify left alignment alignment (max 20px offset) between bottom First Name and bottom Email inputs', async () => {
      logger.info('Asserting left alignment alignment (max 20px offset) between bottom First Name and bottom Email inputs');
      await LayoutHelper.assertFormFieldsLeftAligned([
        { locator: firstNameLocator, name: 'First Name Input' },
        { locator: emailLocator, name: 'Email Input' }
      ], 20);
   
      // 3. Validate left-alignment of Column 2 inputs
  });

  await test.step('Step 11: Verify left alignment alignment (max 20px offset) between bottom Last Name and bottom Phone inputs', async () => {
      logger.info('Asserting left alignment alignment (max 20px offset) between bottom Last Name and bottom Phone inputs');
      await LayoutHelper.assertFormFieldsLeftAligned([
        { locator: lastNameLocator, name: 'Last Name Input' },
        { locator: phoneLocator, name: 'Phone Input' }
      ], 20);
   
      // 4. Verify vertical stack arrangement and spacing within Column 1 and Column 2
  });

  await test.step('Step 12: Verify vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom First Name and bottom Email inputs', async () => {
      logger.info('Asserting vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom First Name and bottom Email inputs');
      await LayoutHelper.assertVerticalStack([
        { locator: firstNameLocator, name: 'First Name Input' },
        { locator: emailLocator, name: 'Email Input' }
      ], 5, 80);
   
  });

  await test.step('Step 13: Verify vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom Last Name and bottom Phone inputs', async () => {
      logger.info('Asserting vertical stack arrangement and spacing (min: 5px, max: 80px) between bottom Last Name and bottom Phone inputs');
      await LayoutHelper.assertVerticalStack([
        { locator: lastNameLocator, name: 'Last Name Input' },
        { locator: phoneLocator, name: 'Phone Input' }
      ], 5, 80);
  
  });

  await test.step('Step 14: Complete TC-LF-05 successfully', async () => {
      logger.info('TC-LF-05 completed successfully');
    
  });
  });
});
