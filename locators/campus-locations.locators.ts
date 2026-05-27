/**
 * Campus Locations Page Locators
 * -----------------------------
 * All locators for the Unitek College Campus Locations page (https://qa.unitekcollege.edu/campus-locations/).
 * Contains semantic and structured selectors with zero inline selectors in the POM.
 */

export const CampusLocationsLocators = {
  // ─── SEO & Meta Elements ──────────────────────────────
  /** Meta robots tag */
  metaRobots: 'meta[name="robots"]',
  /** Meta description tag */
  metaDescription: 'meta[name="description"]',
  /** OpenGraph Title tag */
  ogTitle: 'meta[property="og:title"]',
  /** OpenGraph Description tag */
  ogDescription: 'meta[property="og:description"]',
  /** Canonical Link tag */
  canonicalLink: 'link[rel="canonical"]',
  /** JSON-LD Schema Graph Script */
  schemaGraph: 'script.yoast-schema-graph',

  // ─── Header & Top Bar ─────────────────────────────────
  /** "Get info" link in top bar */
  getInfoLink: 'a.top-bar-link',
  /** Search toggle magnifying glass icon */
  searchToggle: 'button.search-toggle',
  /** Phone number link in top bar */
  topBarPhone: 'a.top-bar-phone',
  /** Desktop language toggle hit area button */
  languageToggleBtn: 'button.top-bar-language-toggle-hitarea',
  /** Desktop language option link (EN) */
  desktopLanguageEN: '.top-bar-language-switcher a[data-gt-lang="en"], .top-bar-language-switcher a:has-text("EN")',
  /** Desktop language option link (ES) */
  desktopLanguageES: '.top-bar-language-switcher a[data-gt-lang="es"], .top-bar-language-switcher a:has-text("ES")',
  
  /** Mobile hidden language select */
  mobileLanguageSelect: 'select#mobile-language-select',
  /** Mobile language selector visual trigger button */
  mobileLanguageTrigger: 'button#mobile-language-trigger',
  /** Mobile language current display text */
  mobileLanguageCurrent: 'span#mobile-language-current',
  /** Mobile language dropdown menu container */
  mobileLanguageMenu: 'ul#mobile-language-menu',
  /** Mobile language option (EN) */
  mobileLanguageEN: 'button.mobile-language-option[data-lang="en"]',
  /** Mobile language option (ES) */
  mobileLanguageES: 'button.mobile-language-option[data-lang="es"]',

  // ─── Primary Navigation & Mega Menu ───────────────────
  /** Desktop Unitek logo link */
  navLogo: 'a.logo-link.desktop-logo',
  /** Primary navigation menu container */
  primaryNav: '#site-primary-navigation',
  /** Menu toggle / Hamburger icon (mobile) */
  mobileMenuToggle: 'button.mobile-menu-toggle',
  /** Mobile menu close button */
  mobileMenuCloseBtn: 'button.mobile-menu-close-btn',
  /** Programs nav menu item (opens mega menu) */
  programsNavItem: 'a.mega-menu-trigger',
  /** Mega menu container */
  megaMenuModal: '.mega-menu-modal',
  /** Mega menu close button */
  megaMenuCloseBtn: 'button.mega-menu-close',
  /** Campuses nav menu item (dropdown trigger) */
  campusesNavItem: '#menu-item-10251 > a',
  /** Campuses submenu list container */
  campusesSubMenu: '#menu-item-10251 > ul.sub-menu',
  
  // ─── Hero / Page Title Block ──────────────────────────
  /** Hero section block region container */
  heroSection: 'section.page-title-block',
  /** Hero H1 page heading */
  heroHeading: 'h1.page-title-headline',
  /** Hero subheadline intro text */
  heroSubheading: 'p.page-title-subheadline',
  /** Breadcrumb navigation container */
  breadcrumbs: 'nav.page-title-breadcrumb',
  /** Breadcrumb individual links */
  breadcrumbLinks: 'ol.page-title-breadcrumb-list a.page-title-breadcrumb-link, ol.page-title-breadcrumb-list span.page-title-breadcrumb-current',
  /** Hero decorative/layout image */
  heroImage: 'img.page-title-image',

  // ─── Page Sub Navigation Bar (Anchor Links) ───────────
  /** Campus sub nav bar block container */
  subNavBarBlock: 'nav.page-sub-nav-bar-block',
  /** Sub nav bar scroll left chevron button */
  subNavBarChevronLeft: 'button.page-sub-nav-bar-chevron--left',
  /** Sub nav bar scroll right chevron button */
  subNavBarChevronRight: 'button.page-sub-nav-bar-chevron--right',
  /** List of anchor link tags */
  subNavBarLinks: 'ul.page-sub-nav-bar-list a.page-sub-nav-bar-link',
  /** Locate sub nav anchor by data-anchor value */
  subNavBarLinkByAnchor: (anchor: string) => `ul.page-sub-nav-bar-list a.page-sub-nav-bar-link[data-anchor="${anchor}"]`,

  // ─── Campus Cards & Sections ──────────────────────────
  /** Generic campus location section container card */
  campusSection: 'div.campus-location-section',
  /** Get individual campus section by ID */
  campusSectionById: (id: string) => `div#${id}.campus-location-section`,
  /** Campus heading title (H2) */
  campusName: 'h2.campus-name',
  /** Campus physical address text */
  campusAddress: 'p.campus-address',
  /** Campus telephone contact link */
  campusContactLink: 'p.campus-contact a.campus-contact',
  /** "Get Started" / "Explore Programs" CTA button */
  campusButton: 'a.campus-button',
  /** Google map parent container element */
  unitekMapContainer: '.unitek-map-container',
  /** Google map interactive viewport element */
  unitekMapDiv: '.unitek-map',

  // ─── "Get Started Today" Lead Capture Form ────────────
  /** Lead form block section element */
  leadFormBlock: 'section.get-started-today-block',
  /** Lead form main H2 heading */
  leadFormHeading: 'h2.get-started-today-heading',
  /** Lead form intro description */
  leadFormDescription: 'p.get-started-today-description',
  /** Contact Form 7 container element */
  leadFormContainer: '.wpcf7-form',
  
  /** First name input text field */
  firstNameInput: 'input#firstname',
  /** Last name input text field */
  lastNameInput: 'input#lastname',
  /** Email address input field */
  emailInput: 'input#email',
  /** Telephone phone input field */
  phoneInput: 'input#phone',
  /** State selection native dropdown */
  stateSelect: 'select#state',
  /** Zipcode postal code input field */
  zipcodeInput: 'input#zipcode',
  /** Campus selection native dropdown */
  campusSelect: 'select#campus',
  /** Program selection native dropdown */
  programSelect: 'select#programOfInterest',
  /** Privacy policy acceptance checkbox */
  acceptanceCheckbox: 'input#acceptance',
  /** Form submission button */
  submitButton: 'button.get-started-today-submit',

  /** Validation error messages fields */
  firstNameError: 'span#firstname-error',
  lastNameError: 'span#lastname-error',
  emailError: 'span#email-error',
  phoneError: 'span#phone-error',
  stateError: 'span#state-error',
  zipcodeError: 'span#zipcode-error',
  campusError: 'span#campus-error',
  programError: 'span#program-error',
  acceptanceError: 'span#acceptance-error',

  // ─── Latest News Section ──────────────────────────────
  /** News section container */
  newsSection: 'section.news',
  /** News section main H2 headline */
  newsHeadline: 'h2.news-headline',
  /** Individual news card articles */
  newsCards: 'article.news-card',
  /** News card heading title */
  newsTitle: '.news-title',
  /** News card division/category tag */
  newsCategory: '.category-tag',
  /** News card publication date */
  newsDate: '.article-card__date',
  /** News card author name */
  newsAuthor: '.article-card__author',
  /** News card outer hyper-link wrapper */
  newsLink: 'article.news-card a',

  // ─── Footer Section ───────────────────────────────────
  /** Footer element landmark */
  footerBlock: 'footer.footer',
  /** Footer Unitek logo image */
  footerLogo: 'img.footer-logo-img',
  /** Footer columns grid containing lists */
  footerColumns: '.footer-column',
  /** Footer column heading */
  footerColumnHeading: 'h2.footer-column-links',
  /** Individual link inside footer columns list */
  footerLinks: '.footer-link',
  /** Social icon channels buttons */
  socialIcons: '.footer-social a.social-icon',
} as const;
