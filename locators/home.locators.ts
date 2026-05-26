/**
 * Homepage Locators
 * -----------------
 * All locators for the Unitek College homepage.
 * Locators are separated from page actions for clean POM architecture.
 *
 * Naming convention: camelCase, descriptive of element purpose.
 * Prefer semantic selectors (role, aria) over CSS classes when possible.
 */

export const HomeLocators = {
  // ─── Top Bar ──────────────────────────────────────────
  /** "Get info" CTA link in the top bar */
  getInfoLink: 'a.top-bar-link',

  /** Search toggle button (magnifying glass icon) */
  searchToggle: 'button.search-toggle',

  /** Phone call link in the top bar */
  phoneLink: 'a.top-bar-phone',

  /** Language toggle button (EN/ES) */
  languageToggle: 'button.top-bar-language-toggle-hitarea',

  /** Language label text (EN or ES) */
  languageLabelEN: 'a.glink:has-text("EN"), button.top-bar-language-toggle-hitarea:has-text("EN"), a[title="English"]',
  languageLabelES: 'a.glink:has-text("ES"), button.top-bar-language-toggle-hitarea:has-text("ES"), a[title="Spanish"]',

  // ─── Main Navigation ─────────────────────────────────
  /** Unitek College logo link */
  navLogo: 'a.logo-link.desktop-logo',

  /** Programs nav item (triggers mega menu) */
  programsNavItem: 'a.mega-menu-trigger',

  /** Generic nav item by text — use with page.getByRole('link', { name }) */
  navItemByName: (name: string) => `nav >> a:has-text("${name}")`,

  /** Mega menu container */
  megaMenu: '.mega-menu',

  /** Mega menu close button */
  megaMenuClose: '.mega-menu-close',

  /** Mega menu — Nursing section header */
  megaMenuNursing: 'text=Nursing',

  /** Mega menu — Medical section header */
  megaMenuMedical: 'text=Medical',

  // ─── Hero Section ─────────────────────────────────────
  /** Main hero heading (H1) */
  heroHeading: 'h1',

  /** Hero subheading / tagline */
  heroSubheading: '.hero-subheading',

  // ─── Stats Section ────────────────────────────────────
  /** Stats section container */
  statsSection: '.stats-section',

  /** Individual stat value elements */
  statValues: '.stat-value',

  // ─── Healthcare Programs Section ──────────────────────
  /** Programs section heading */
  programsSectionHeading: 'text=Healthcare programs focused on your future',

  /** "All programs" link */
  allProgramsLink: 'a[href="/programs/"]',

  /** Program tab buttons */
  programTabs: '.program-tab',

  // ─── Testimonials Section ─────────────────────────────
  /** Testimonial quote card */
  testimonialCard: '.testimonial-card',

  /** Testimonial "Read more" link */
  testimonialReadMore: 'text=Read more',

  // ─── FAQ Section ──────────────────────────────────────
  /** FAQ section container */
  faqSection: '.faq-section',

  /** FAQ category tab buttons */
  faqTabs: '.faq-tab',

  /** FAQ tab by text */
  faqTabByName: (name: string) => `.faq-tab:has-text("${name}")`,

  /** FAQ accordion trigger buttons */
  faqAccordionTrigger: '.faq-accordion-trigger',

  /** FAQ accordion content panels */
  faqAccordionContent: '.faq-accordion-content',

  // ─── Accreditations Section ───────────────────────────
  /** Accreditation badges */
  accreditationBadges: '.accreditation-badge',

  /** "View all" accreditations link */
  accreditationViewAll: 'a[href*="about-accreditations"]',

  // ─── Navigating Costs Section ─────────────────────────
  /** Section heading */
  costsSectionHeading: 'text=The support you need to navigate the costs',

  /** Action links in costs section */
  costsLinks: '.costs-section a',

  // ─── Story Banner ────────────────────────────────────
  /** "NURSING NEEDS YOU" banner */
  storyBanner: 'text=NURSING NEEDS YOU',

  /** Story banner CTA link */
  storyBannerCTA: 'text=Get started today',

  // ─── Find My Path ────────────────────────────────────
  /** "Find my path" CTA link */
  findMyPath: 'text=Find my path',

  /** Empowering tagline */
  empoweringTagline: 'text=Empowering the next generation of healthcare professionals',
} as const;
