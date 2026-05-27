/**
 * Programs Page Locators
 * ----------------------
 * All locators for the Unitek College Programs page (https://qa.unitekcollege.edu/programs/).
 * Zero inline selectors in the POM.
 */

export const ProgramsLocators = {
  // ─── Header & Breadcrumbs ─────────────────────────────
  /** Main H1 heading on the Programs listing page */
  pageHeading: 'h1',

  /** Subtitle / intro description below page heading */
  pageSubtitle: '.page-subtitle, .intro-text, .programs-intro p',

  /** Breadcrumb navigation container */
  breadcrumbs: 'nav.breadcrumbs, .breadcrumbs-container, .breadcrumb',

  /** Breadcrumb individual links */
  breadcrumbLinks: 'nav.breadcrumbs a, .breadcrumbs a',

  // ─── Filtering & Search Interface ─────────────────────
  /** Search input text box */
  searchInput: 'input[placeholder*="Search"], input#search, .search-filters input[type="text"]',

  /** Campus selector dropdown */
  campusSelect: 'select#campus, select[name="campus"], .filter-select[name*="campus"], select#contacts_campus',

  /** Program Area / Category selector dropdown */
  programAreaSelect: 'select#program-area, select[name="area"], .filter-select[name*="area"], select[name*="category"], select#contacts_program, [role="tab"], .program-tab',

  /** Reset / Clear all active filters button */
  resetFiltersBtn: 'button.reset-filters, button.clear-filters, a.clear-filters',

  /** Active filter badges */
  filterBadges: '.filter-badge, .active-filter',

  // ─── Programs Grid & Cards ────────────────────────────
  /** Grid container of program cards */
  gridContainer: '.programs-grid, .grid-container, .programs-container',

  /** Individual program card elements */
  programCards: '.program-card, .card.program, [class*="program-card"]',

  /** Individual program card title (H3 / H4 / link) */
  cardTitle: '.program-card-title, .card-title, h3, h4',

  /** Category badge within each program card */
  cardCategoryBadge: '.program-card-badge, .card-badge, .badge',

  /** Program length / duration label (e.g. 9 months, 3 years) */
  cardDuration: '.program-card-duration, .duration, .length, .program-length',

  /** Campus offering text list / container */
  cardCampusOfferings: '.program-card-campuses, .campuses-list, .offered-at',

  /** "Explore Program" CTA button/link */
  exploreBtn: 'a.explore-button, a:has-text("Explore"), .card-cta, a.card-link',

  /** "Request Info" / "Get Info" CTA button */
  requestInfoBtn: 'button.request-info, button.get-info, .card-info-btn',

  // ─── Sidebar & Lead Capture widget ────────────────────
  /** Sidebar Lead Capture Form container */
  sidebarFormContainer: '.sidebar-form, .lead-form-widget, form.lead-form',

  /** Sidebar form inputs */
  firstNameInput: 'input[name="firstName"], input[name="first_name"]',
  lastNameInput: 'input[name="lastName"], input[name="last_name"]',
  emailInput: 'input[type="email"], input[name="email"]',
  phoneInput: 'input[type="tel"], input[name="phone"]',
  campusFormSelect: 'form select[name="campus"]',
  programFormSelect: 'form select[name="program"]',
  privacyCheckbox: 'input[type="checkbox"], input[name="privacy"]',
  formSubmitBtn: 'form button[type="submit"], form button.submit-button',

  // ─── Zero Results Alert ───────────────────────────────
  /** Element visible when no matching programs are found */
  noResultsAlert: '.no-results, .no-programs-found, .no-results-message',
};
