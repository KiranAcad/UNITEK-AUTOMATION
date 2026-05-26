/**
 * Lead Form Locators
 * ------------------
 * Locators for both the hero 6-step multi-step lead capture form
 * and the bottom comprehensive lead form on the homepage.
 */

export const LeadFormLocators = {
  // ─── Hero Multi-Step Form (6 Steps) ──────────────────
  /** Form container */
  heroFormContainer: '#hgs-form, .hgs-form, .hero-get-started-form',

  /** Step 1: Campus dropdown trigger */
  campusDropdown: '.hgs-campus-trigger',

  /** Campus dropdown option by text */
  campusOption: (campus: string) => `.hgs-campus-option[data-value="${campus}"], .hgs-campus-option:text-is("${campus}")`,

  /** Step 2: Program dropdown trigger */
  programDropdown: '.hgs-program-trigger',

  /** Program dropdown option by text */
  programOption: (program: string) => `.hgs-program-option[data-value="${program}"], .hgs-program-option:text-is("${program}")`,

  /** Step 3: First name input */
  firstNameInput: 'input#hgs-first',

  /** Step 4: Last name input */
  lastNameInput: 'input#hgs-last',

  /** Step 5: Phone input */
  phoneInput: 'input#hgs-phone',

  /** Step 6: Email input */
  emailInput: 'input#hgs-email',

  /** Consent checkbox */
  consentCheckbox: 'input#hgs-consent',

  /** Submit button ("Get started") */
  submitButton: 'button#hgs-submit:visible, #hgs-submit:visible, #hgs-submit-mobile:visible',

  /** Next button */
  nextButton: 'button#hgs-next, #hgs-next',

  /** Back button */
  backButton: 'button#hgs-back, #hgs-back',

  /** Progress indicator (e.g., "1 of 6") */
  progressIndicator: '.hgs-progress',

  /** Step counter text */
  stepCounter: '.hgs-step-counter',

  /** "Get started today." heading */
  formHeading: 'text=Get started today.',

  /** Hero form confirmation message wrapper */
  heroConfirmationMessage: '#confirmation-message, .confirmation-message',

  // ─── Bottom Full Form ────────────────────────────────
  /** Bottom form container */
  bottomFormContainer: '.get-started-today-form',

  /** Bottom form heading */
  bottomFormHeading: 'text=Get started today!',

  /** First name */
  bottomFirstName: '.get-started-today-form input[name="firstname"]',

  /** Last name */
  bottomLastName: '.get-started-today-form input[name="lastname"]',

  /** Email */
  bottomEmail: '.get-started-today-form input[name="email"]',

  /** Phone */
  bottomPhone: '.get-started-today-form input[name="phone"]',

  /** State dropdown */
  bottomState: '.get-started-today-form select[name="state"]',

  /** Zipcode */
  bottomZipcode: 'input#zipcode',

  /** Campus of interest dropdown */
  bottomCampus: 'select#campus',

  /** Program of interest dropdown (disabled until campus is selected) */
  bottomProgram: 'select#programOfInterest, select.program-of-interest',

  /** Consent/Acceptance checkbox */
  bottomConsent: '.get-started-today-form-checkbox input[type="checkbox"]',

  /** Submit button */
  bottomSubmit: 'button.get-started-today-submit',

  /** Form submission success message */
  bottomSuccessMessage: '.get-started-today-form .wpcf7-response-output',
} as const;
