/**
 * Lead Form Page Object
 * ---------------------
 * Covers 6-step hero form and bottom comprehensive form.
 */

import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LeadFormLocators } from '../locators/lead-form.locators';
import { logger } from '../logger';

export interface LeadFormData {
  campus: string;
  program: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface BottomFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state?: string;
  zipcode: string;
  campus?: string;
  program?: string;
}

export class LeadFormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyFormVisible(): Promise<void> {
    await this.assertElementVisible(LeadFormLocators.formHeading);
    logger.info('Lead form heading is visible');
  }

  async selectCampus(campus: string): Promise<void> {
    await this.click(LeadFormLocators.campusDropdown);
    await this.click(LeadFormLocators.campusOption(campus));
    logger.info(`Campus selected: ${campus}`);
  }

  async selectProgram(program: string): Promise<void> {
    await this.click(LeadFormLocators.programDropdown);
    await this.click(LeadFormLocators.programOption(program));
    logger.info(`Program selected: ${program}`);
  }

  async enterFirstName(name: string): Promise<void> {
    await this.fill(LeadFormLocators.firstNameInput, name);
  }

  async enterLastName(name: string): Promise<void> {
    await this.fill(LeadFormLocators.lastNameInput, name);
  }

  async enterPhone(phone: string): Promise<void> {
    await this.fill(LeadFormLocators.phoneInput, phone);
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(LeadFormLocators.emailInput, email);
  }

  async acceptConsent(): Promise<void> {
    await this.check(LeadFormLocators.consentCheckbox);
  }

  async clickNext(): Promise<void> {
    await this.click(LeadFormLocators.nextButton);
  }

  async clickBack(): Promise<void> {
    await this.click(LeadFormLocators.backButton);
  }

  async clickSubmit(): Promise<void> {
    await this.click(LeadFormLocators.submitButton);
  }

  async getStepIndicator(): Promise<string> {
    return this.getText(LeadFormLocators.progressIndicator);
  }

  async isSubmitEnabled(): Promise<boolean> {
    return this.isEnabled(LeadFormLocators.submitButton);
  }

  async isNextButtonVisible(): Promise<boolean> {
    return this.isVisible(LeadFormLocators.nextButton);
  }

  async isBackButtonVisible(): Promise<boolean> {
    return this.isVisible(LeadFormLocators.backButton);
  }

  async fillCompleteForm(data: LeadFormData): Promise<void> {
    logger.info('Filling complete 6-step lead form', { data });
    await this.selectCampus(data.campus);
    await this.clickNext();
    await this.selectProgram(data.program);
    await this.clickNext();
    await this.enterFirstName(data.firstName);
    await this.clickNext();
    await this.enterLastName(data.lastName);
    await this.clickNext();
    await this.enterPhone(data.phone);
    await this.clickNext();
    await this.enterEmail(data.email);
    await this.acceptConsent();
    logger.info('All 6 steps filled successfully');
  }

  async scrollToBottomForm(): Promise<void> {
    await this.scrollToElement(LeadFormLocators.bottomFormContainer);
  }

  async isBottomFormVisible(): Promise<boolean> {
    return this.isVisible(LeadFormLocators.bottomFormContainer);
  }

  async fillBottomForm(data: BottomFormData): Promise<void> {
    await this.scrollToBottomForm();
    await this.fill(LeadFormLocators.bottomFirstName, data.firstName);
    await this.fill(LeadFormLocators.bottomLastName, data.lastName);
    await this.fill(LeadFormLocators.bottomEmail, data.email);
    await this.fill(LeadFormLocators.bottomPhone, data.phone);
    if (data.state) await this.selectOption(LeadFormLocators.bottomState, data.state);
    await this.fill(LeadFormLocators.bottomZipcode, data.zipcode);
    if (data.campus) {
      await this.selectOption(LeadFormLocators.bottomCampus, data.campus);
      logger.info(`Campus selected: ${data.campus}`);
    }
    if (data.program) {
      // Program dropdown is disabled until a campus is selected;
      // wait for JS to enable it and populate options
      const programSelector = LeadFormLocators.bottomProgram.split(',')[0].trim();
      await this.page.waitForFunction(
        (sel) => {
          const el = document.querySelector(sel) as HTMLSelectElement;
          return el && !el.disabled && el.options.length > 1;
        },
        programSelector,
        { timeout: 15000 }
      );
      await this.selectOption(LeadFormLocators.bottomProgram, data.program);
      logger.info(`Program selected: ${data.program}`);
    }
    await this.check(LeadFormLocators.bottomConsent);
    logger.info('Bottom form filled successfully');
  }

  async isBottomFirstNameVisible(): Promise<boolean> {
    return this.isVisible(LeadFormLocators.bottomFirstName);
  }

  async isBottomSubmitVisible(): Promise<boolean> {
    return this.isVisible(LeadFormLocators.bottomSubmit);
  }
}
