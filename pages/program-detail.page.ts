/**
 * Program Detail Page Object (ASVN)
 * -----------------------------------
 * Page Object Model for the Associate Degree in Vocational Nursing program detail page.
 * URL: /programs/associate-degree-vocational-nursing/
 *
 * Extends BasePage for shared actions. All methods use Playwright auto-waiting.
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { ProgramDetailLocators } from '../locators/program-detail.locators';
import { logger } from '../logger';

export class ProgramDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ────────────────────────────────────────

  /** Navigate to the ASVN program detail page */
  async navigateToASVN(): Promise<void> {
    logger.info('Navigating to ASVN program detail page');
    await this.navigate('/programs/associate-degree-vocational-nursing/');
  }

  // ─── Hero Section ─────────────────────────────────────

  /** Get hero headline text */
  async getHeroHeadline(): Promise<string> {
    return this.getText(ProgramDetailLocators.heroHeadline);
  }

  /** Get hero subheadline text */
  async getHeroSubheadline(): Promise<string> {
    return this.getText(ProgramDetailLocators.heroSubheadline);
  }

  /** Verify hero section is visible */
  async verifyHeroVisible(): Promise<void> {
    await this.assertElementVisible(ProgramDetailLocators.heroBlock);
  }

  // ─── Get Started Multi-Step Form ──────────────────────

  /** Get the "Get started today." heading text */
  async getGetStartedHeading(): Promise<string> {
    return this.getText(ProgramDetailLocators.getStartedHeading);
  }

  /** Select a campus from the dropdown */
  async selectCampus(campusValue: string): Promise<void> {
    logger.info(`Selecting campus: ${campusValue}`);
    await this.page.locator(ProgramDetailLocators.campusSelect).selectOption(campusValue);
  }

  /** Select a program from the dropdown */
  async selectProgram(programValue: string): Promise<void> {
    logger.info(`Selecting program: ${programValue}`);
    await this.page.locator(ProgramDetailLocators.programSelect).selectOption(programValue);
  }

  /** Fill first name */
  async fillFirstName(name: string): Promise<void> {
    logger.info(`Filling first name: ${name}`);
    await this.page.locator(ProgramDetailLocators.firstNameInput).fill(name);
  }

  /** Fill last name */
  async fillLastName(name: string): Promise<void> {
    logger.info(`Filling last name: ${name}`);
    await this.page.locator(ProgramDetailLocators.lastNameInput).fill(name);
  }

  /** Fill phone number */
  async fillPhone(phone: string): Promise<void> {
    logger.info(`Filling phone: ${phone}`);
    await this.page.locator(ProgramDetailLocators.phoneInput).fill(phone);
  }

  /** Fill email */
  async fillEmail(email: string): Promise<void> {
    logger.info(`Filling email: ${email}`);
    await this.page.locator(ProgramDetailLocators.emailInput).fill(email);
  }

  /** Click the Next button */
  async clickNext(): Promise<void> {
    logger.info('Clicking Next button');
    await this.page.locator(ProgramDetailLocators.nextButton).click();
  }

  /** Click the Back button */
  async clickBack(): Promise<void> {
    logger.info('Clicking Back button');
    await this.page.locator(ProgramDetailLocators.backButton).click();
  }

  /** Get the current progress text (e.g., "1 of 6") */
  async getProgressText(): Promise<string> {
    return this.getText(ProgramDetailLocators.progressText);
  }

  /** Get the count of campus options (excluding placeholder) */
  async getCampusOptionCount(): Promise<number> {
    const options = this.page.locator(ProgramDetailLocators.campusSelect).locator('option:not([disabled])');
    return options.count();
  }

  /** Get all campus option values */
  async getCampusOptions(): Promise<string[]> {
    const options = this.page.locator(ProgramDetailLocators.campusSelect).locator('option:not([disabled])');
    return options.allTextContents();
  }

  // ─── Page Sub Navigation ──────────────────────────────

  /** Get all sub nav link texts */
  async getSubNavLinkTexts(): Promise<string[]> {
    const links = this.page.locator(ProgramDetailLocators.subNavLink);
    return links.allTextContents();
  }

  /** Click a sub nav link by its anchor */
  async clickSubNavLink(anchor: string): Promise<void> {
    logger.info(`Clicking sub nav link: ${anchor}`);
    await this.page.locator(ProgramDetailLocators.subNavLinkByAnchor(anchor)).click();
  }

  // ─── Program Overview ─────────────────────────────────

  /** Get program overview title */
  async getProgramOverviewTitle(): Promise<string> {
    return this.getText(ProgramDetailLocators.bsnProgramTitle);
  }

  /** Get feature block count */
  async getFeatureBlockCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.bsnFeatureBlock).count();
  }

  /** Get NCLEX pass rate text */
  async getNclexRate(): Promise<string> {
    return this.getText(ProgramDetailLocators.nclexRate);
  }

  // ─── BSN Pathways Accordion ───────────────────────────

  /** Get pathways heading text */
  async getPathwaysHeading(): Promise<string> {
    return this.getText(ProgramDetailLocators.pathwaysHeading);
  }

  /** Expand a pathway accordion by index */
  async expandPathway(index: number): Promise<void> {
    logger.info(`Expanding pathway accordion at index: ${index}`);
    const trigger = this.page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(index));
    const isExpanded = await trigger.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await trigger.click();
    }
  }

  /** Collapse a pathway accordion by index */
  async collapsePathway(index: number): Promise<void> {
    logger.info(`Collapsing pathway accordion at index: ${index}`);
    const trigger = this.page.locator(ProgramDetailLocators.pathwaysTriggerByIndex(index));
    const isExpanded = await trigger.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      await trigger.click();
    }
  }

  /** Get the count of pathway items */
  async getPathwayCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.pathwaysItem).count();
  }

  // ─── Admissions ───────────────────────────────────────

  /** Get admissions heading text */
  async getAdmissionsHeading(): Promise<string> {
    return this.getText(ProgramDetailLocators.admissionsHeading);
  }

  /** Get admission items count */
  async getAdmissionsItemCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.admissionsItem).count();
  }

  // ─── Curriculum ───────────────────────────────────────

  /** Get curriculum title text */
  async getCurriculumTitle(): Promise<string> {
    return this.getText(ProgramDetailLocators.curriculumTitle);
  }

  /** Get total credits text */
  async getTotalCredits(): Promise<string> {
    return this.getText(ProgramDetailLocators.curriculumTotalCredits);
  }

  /** Expand a curriculum accordion section by header index (0-based) */
  async expandCurriculumSection(index: number): Promise<void> {
    logger.info(`Expanding curriculum section at index: ${index}`);
    const header = this.page.locator(ProgramDetailLocators.curriculumAccordionHeader).nth(index);
    const isExpanded = await header.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await header.click();
    }
  }

  /** Collapse a curriculum accordion section by header index */
  async collapseCurriculumSection(index: number): Promise<void> {
    logger.info(`Collapsing curriculum section at index: ${index}`);
    const header = this.page.locator(ProgramDetailLocators.curriculumAccordionHeader).nth(index);
    const isExpanded = await header.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      await header.click();
    }
  }

  /** Get course count in a curriculum section */
  async getCourseCount(sectionIndex: number): Promise<number> {
    const panel = this.page.locator(ProgramDetailLocators.curriculumAccordionPanel).nth(sectionIndex);
    return panel.locator('tbody tr').count();
  }

  // ─── Testimonial Slider ───────────────────────────────

  /** Get total testimonial slide count */
  async getTestimonialSlideCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.testimonialSlide).count();
  }

  /** Click next testimonial arrow */
  async clickNextTestimonial(): Promise<void> {
    logger.info('Clicking next testimonial');
    await this.page.locator(ProgramDetailLocators.testimonialNextButton).click();
  }

  /** Click previous testimonial arrow */
  async clickPrevTestimonial(): Promise<void> {
    logger.info('Clicking previous testimonial');
    await this.page.locator(ProgramDetailLocators.testimonialPrevButton).click();
  }

  // ─── FAQ Section ──────────────────────────────────────

  /** Get FAQ title text */
  async getFAQTitle(): Promise<string> {
    return this.getText(ProgramDetailLocators.faqTitle);
  }

  /** Get FAQ category tab count */
  async getFAQCategoryCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.faqCategoryTab).count();
  }

  /** Click a FAQ category tab by index */
  async clickFAQCategory(index: number): Promise<void> {
    logger.info(`Clicking FAQ category tab at index: ${index}`);
    await this.page.locator(ProgramDetailLocators.faqCategoryTabByIndex(index)).click();
  }

  /** Expand a FAQ question on desktop */
  async expandFAQQuestion(catIndex: number, qIndex: number): Promise<void> {
    logger.info(`Expanding FAQ question: category=${catIndex}, question=${qIndex}`);
    const question = this.page.locator(ProgramDetailLocators.faqDesktopQuestionById(catIndex, qIndex));
    const isExpanded = await question.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await question.click();
    }
  }

  /** Collapse a FAQ question on desktop */
  async collapseFAQQuestion(catIndex: number, qIndex: number): Promise<void> {
    logger.info(`Collapsing FAQ question: category=${catIndex}, question=${qIndex}`);
    const question = this.page.locator(ProgramDetailLocators.faqDesktopQuestionById(catIndex, qIndex));
    const isExpanded = await question.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      await question.click();
    }
  }

  // ─── Financial Aid ────────────────────────────────────

  /** Get financial aid column count */
  async getFinancialAidColumnCount(): Promise<number> {
    return this.page.locator(ProgramDetailLocators.financialAidColumn).count();
  }
}
