/**
 * Program Detail Page Locators (ASVN)
 * ------------------------------------
 * All locators for the Associate Degree in Vocational Nursing program detail page.
 * URL: /programs/associate-degree-vocational-nursing/
 *
 * Organized by page section for easy maintainability.
 */

export const ProgramDetailLocators = {
  // ─── SEO & Meta ──────────────────────────────────────
  /** Page title tag */
  pageTitle: 'title',

  /** Meta description */
  metaDescription: 'meta[name="description"]',

  /** OG title */
  ogTitle: 'meta[property="og:title"]',

  /** OG description */
  ogDescription: 'meta[property="og:description"]',

  /** OG URL */
  ogUrl: 'meta[property="og:url"]',

  /** OG image */
  ogImage: 'meta[property="og:image"]',

  /** Canonical URL */
  canonicalLink: 'link[rel="canonical"]',

  /** Schema.org JSON-LD */
  schemaJsonLd: 'script.yoast-schema-graph',

  // ─── Hero Section ─────────────────────────────────────
  /** Hero block container */
  heroBlock: '.hero-block',

  /** Main headline (H1) */
  heroHeadline: 'h1.hero-headline',

  /** Subheadline */
  heroSubheadline: 'p.hero-subheadline',

  /** Hero text column */
  heroTextColumn: '.hero-text-column',

  /** Hero image column */
  heroImageColumn: '.hero-image-column',

  /** Hero image placeholder */
  heroImagePlaceholder: '.hero-image-placeholder',

  // ─── Get Started Multi-Step Form ──────────────────────
  /** Form wrapper section */
  getStartedSection: '.hero-get-started-block',

  /** "Get started today." heading text */
  getStartedHeading: '.hero-get-started-text',

  /** Form container with data attributes */
  getStartedForm: '#hgs-form',

  /** Step containers */
  getStartedStep: '.hgs-step',

  /** Active step */
  getStartedActiveStep: '.hgs-step.active',

  /** Campus select dropdown */
  campusSelect: '#hgs-campus',

  /** Program select dropdown */
  programSelect: '#hgs-program',

  /** First name input */
  firstNameInput: '#hgs-first',

  /** Last name input */
  lastNameInput: '#hgs-last',

  /** Phone input */
  phoneInput: '#hgs-phone',

  /** Email input */
  emailInput: '#hgs-email',

  /** Consent checkbox */
  consentCheckbox: '#hgs-consent',

  /** Next button */
  nextButton: '#hgs-next',

  /** Back button */
  backButton: '#hgs-back',

  /** Submit button (desktop) */
  submitButton: '#hgs-submit',

  /** Submit button (mobile) */
  submitButtonMobile: '#hgs-submit-mobile',

  /** Progress bar */
  progressBar: '.hgs-progress-bar',

  /** Progress text (e.g., "1 of 6") */
  progressText: '#hgs-progress-text',

  /** Confirmation message */
  confirmationMessage: '#confirmation-message',

  // ─── Page Sub Navigation Bar ──────────────────────────
  /** Sub nav container */
  subNavBar: '.page-sub-nav-bar-block',

  /** Sub nav list */
  subNavList: '.page-sub-nav-bar-list',

  /** Sub nav items */
  subNavItem: '.page-sub-nav-bar-item',

  /** Sub nav links */
  subNavLink: '.page-sub-nav-bar-link',

  /** Sub nav link by anchor name */
  subNavLinkByAnchor: (anchor: string) => `.page-sub-nav-bar-link[data-anchor="${anchor}"]`,

  /** Left scroll chevron */
  subNavChevronLeft: '.page-sub-nav-bar-chevron--left',

  /** Right scroll chevron */
  subNavChevronRight: '.page-sub-nav-bar-chevron--right',

  // ─── Program Overview (BSN Program) ───────────────────
  /** Overview section container */
  overviewSection: '#main-overview',

  /** BSN program section */
  bsnProgramSection: '.bsn-program-section',

  /** Program overview title */
  bsnProgramTitle: '.bsn-program-title',

  /** Program overview description */
  bsnProgramDescription: '.bsn-program-desc',

  /** Feature blocks */
  bsnFeatureBlock: '.bsn-feature-block',

  /** Feature title */
  bsnFeatureTitle: '.bsn-feature-title',

  /** Feature description */
  bsnFeatureDescription: '.bsn-feature-desc',

  /** Feature arrow links */
  bsnCardArrow: '.bsn-card-arrow',

  /** NCLEX rate value */
  nclexRate: '.bsn-nclex-rate',

  /** NCLEX label */
  nclexLabel: '.bsn-nclex-label',

  /** NCLEX source link */
  nclexSource: '.bsn-nclex-source',

  // ─── Image/Video Testimonial ──────────────────────────
  /** IVT container */
  ivtContainer: '.ivt-container',

  /** IVT card */
  ivtCard: '.ivt-card',

  /** IVT quote text */
  ivtQuoteText: '.ivt-container .ivt-quote-main',

  /** IVT author name */
  ivtAuthorName: '.ivt-container .ivt-name',

  /** IVT author title */
  ivtAuthorTitle: '.ivt-container .ivt-title',

  /** IVT "Read more" CTA */
  ivtReadMoreCta: '.ivt-container .ivt-cta-link',

  /** IVT play button */
  ivtPlayButton: '.ivt-container .ivt-play-btn',

  /** IVT video modal */
  ivtVideoModal: '#ivtVideoModal',

  /** IVT video modal close button */
  ivtVideoModalClose: '.ivt-video-modal-close',

  /** IVT video container */
  ivtVideoContainer: '#ivtVideoContainer',

  // ─── Start Dates ──────────────────────────────────────
  /** Start dates section */
  startDatesSection: '#start-dates',

  /** Start dates block title */
  startDatesTitle: '.campus-dates-block-title',

  /** Campus date cards */
  campusDateCard: '.campus-dates-card',

  /** Campus location text */
  campusLocation: '.campus-location',

  /** Campus address text */
  campusAddress: '.campus-address',

  /** Campus "Get started" button */
  campusCardButton: '.campus-card-btn',

  /** Calendar date element */
  calendarDate: '.lg-calendar time',

  /** Calendar month abbreviation */
  calendarMonth: '.lg-calendar .abc',

  /** Calendar day number */
  calendarDay: '.lg-calendar ._00',

  // ─── BSN Pathways Accordion ───────────────────────────
  /** Pathways section */
  pathwaysSection: '#bsn-pathways',

  /** Pathways heading */
  pathwaysHeading: '.pathways-left h2',

  /** Pathways accordion items */
  pathwaysItem: '.pathways-item',

  /** Pathways accordion trigger buttons */
  pathwaysTrigger: '.pathways-trigger',

  /** Pathways accordion panels */
  pathwaysPanel: '.pathways-panel',

  /** Pathways trigger by index */
  pathwaysTriggerByIndex: (index: number) => `.pathways-trigger[data-index="${index}"]`,

  // ─── Admissions Requirements ──────────────────────────
  /** Admissions section */
  admissionsSection: '#admissions-sections',

  /** Admissions heading */
  admissionsHeading: '.admissions-block h2',

  /** Admissions list */
  admissionsList: '.admissions-list',

  /** Admissions items */
  admissionsItem: '.admissions-item',

  /** Admissions item text */
  admissionsItemText: '.admissions-item-text',

  /** Admissions check icon */
  admissionsCheckIcon: '.admissions-check img',

  // ─── BSN Curriculum ───────────────────────────────────
  /** Curriculum section */
  curriculumSection: '#curriculum-sections',

  /** Curriculum block */
  curriculumBlock: '.bsn-curriculum-block',

  /** Curriculum title */
  curriculumTitle: '.bsn-curriculum-title',

  /** Curriculum strapline (credits) */
  curriculumStrapline: '.bsn-curriculum-strapline',

  /** Curriculum intro text */
  curriculumIntro: '.bsn-curriculum-intro-col',

  /** Course totals label */
  curriculumTotalsLabel: '.bsn-curriculum-totals-label',

  /** Total credit hours (bold number) */
  curriculumTotalCredits: '.bsn-curriculum-totalcredits-bar b',

  /** Curriculum accordion sections */
  curriculumAccordionSection: '.bsn-curriculum-accordion-section',

  /** Curriculum accordion headers */
  curriculumAccordionHeader: '.bsn-curriculum-accordion-header',

  /** Curriculum accordion panels */
  curriculumAccordionPanel: '.bsn-curriculum-panel',

  /** Curriculum tables */
  curriculumTable: '.bsn-curriculum-table',

  /** Curriculum table rows */
  curriculumTableRow: '.bsn-curriculum-table tbody tr',

  /** Curriculum section close button */
  curriculumCloseButton: '.bsn-curriculum-footer .close',

  /** Section credits */
  curriculumSectionCredits: '.section-credits b',

  // ─── Testimonial Slider ───────────────────────────────
  /** Testimonial block */
  testimonialBlock: '.testimonial-block',

  /** Testimonial slides */
  testimonialSlide: '.testimonial-slide',

  /** Active testimonial slide */
  testimonialSlideActive: '.testimonial-slide.active',

  /** Testimonial quote icon */
  testimonialQuoteIcon: '.testimonial-quote-icon',

  /** Testimonial blockquote text */
  testimonialQuoteText: '.testimonial-block blockquote p',

  /** Testimonial author name */
  testimonialAuthorName: '.testimonial-block .testimonial-name',

  /** Testimonial author title */
  testimonialAuthorTitle: '.testimonial-block .testimonial-title',

  /** Previous testimonial button */
  testimonialPrevButton: '.testimonial-block .nav-arrow.prev',

  /** Next testimonial button */
  testimonialNextButton: '.testimonial-block .nav-arrow.next',

  /** Pagination dots */
  testimonialPaginationDot: '.testimonial-block .pagination-dot',

  // ─── Testimonial Video Section ────────────────────────
  /** Video section container */
  tvsSection: '.testimonial-video-section-wrap',

  /** TVS quote text */
  tvsQuoteText: '.tvs-quote',

  /** TVS author name */
  tvsAuthorName: '.tvs-name',

  /** TVS author title */
  tvsAuthorTitle: '.tvs-title',

  /** TVS hero image */
  tvsHeroImage: '.tvs-hero-img',

  /** TVS video iframe */
  tvsVideoIframe: '.tvs-video-outer iframe',

  /** TVS lower-right title */
  tvsLowerRightTitle: '.tvs-lr-title',

  /** TVS lower-right description */
  tvsLowerRightDesc: '.tvs-lr-desc',

  /** TVS resource items */
  tvsResource: '.tvs-resource',

  /** TVS resource lists */
  tvsResourceList: '.tvs-resource-list',

  // ─── Financial Aid Section ────────────────────────────
  /** Financial aid section */
  financialAidSection: '.financial-aid-section',

  /** Financial aid columns */
  financialAidColumn: '.fa-col',

  /** Financial aid titles */
  financialAidTitle: '.fa-title',

  /** Financial aid descriptions */
  financialAidDesc: '.fa-desc',

  /** Financial aid sub-descriptions */
  financialAidSubdesc: '.fa-subdesc',

  /** Financial aid CTA links */
  financialAidCta: '.fa-cta',

  // ─── FAQ Section ──────────────────────────────────────
  /** FAQ section */
  faqSection: '#faq-sections',

  /** FAQ title */
  faqTitle: '.faq-section-title',

  /** FAQ category tabs */
  faqCategoryTab: '.faq-category-tab',

  /** FAQ category tab by index */
  faqCategoryTabByIndex: (index: number) => `#faq-cat-label-${index}`,

  /** Active FAQ category tab */
  faqCategoryTabActive: '.faq-category-tab.active',

  /** FAQ desktop accordion panels (category panels) */
  faqCategoryPanel: '.faq-accordion-category',

  /** Active FAQ category panel */
  faqCategoryPanelActive: '.faq-accordion-category.active',

  /** FAQ desktop accordion questions */
  faqDesktopQuestion: '.faq-accordion-question',

  /** FAQ desktop accordion question by category + question index */
  faqDesktopQuestionById: (catIndex: number, qIndex: number) => `#faq-dq-${catIndex}-${qIndex}`,

  /** FAQ desktop accordion answers */
  faqDesktopAnswer: '.faq-accordion-answer',

  /** FAQ desktop answer by category + question index */
  faqDesktopAnswerById: (catIndex: number, qIndex: number) => `#faq-answer-${catIndex}-${qIndex}`,

  /** FAQ question text */
  faqQuestionText: '.faq-question-text',

  /** FAQ answer content */
  faqAnswerContent: '.faq-accordion-answer-content',

  /** FAQ mobile accordion */
  faqMobileAccordion: '.faq-mobile-accordion',

  /** FAQ mobile question buttons */
  faqMobileQuestion: '.faq-mobile-question',
} as const;
