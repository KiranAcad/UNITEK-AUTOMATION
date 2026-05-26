/**
 * Application Constants
 * ---------------------
 * Centralized constants used across the framework.
 * Modify values here rather than scattering magic numbers/strings in tests.
 */

/** Timeout presets (milliseconds) */
export const TIMEOUTS = {
  /** Short timeout for quick UI interactions */
  SHORT: 5_000,
  /** Default timeout for standard operations */
  DEFAULT: 15_000,
  /** Long timeout for page loads, navigation */
  LONG: 30_000,
  /** Navigation timeout */
  NAVIGATION: 45_000,
  /** Polling interval for custom waits */
  POLL_INTERVAL: 500,
} as const;

/** Application URL paths */
export const URLS = {
  HOME: '/',
  PROGRAMS: '/programs/',
  ADMISSIONS: '/admissions/',
  CAMPUSES: '/college-locations/',
  STUDENT_RESOURCES: '/student-resources/',
  CAREER_SERVICES: '/career-services/',
  ABOUT_US: '/about-us/',
  FINANCIAL_AID: '/financial-aid/',
  BSN_PROGRAM: '/programs/bachelors-degree-nursing/',
  ASVN_PROGRAM: '/programs/associate-degree-vocational-nursing/',
  VOCATIONAL_NURSING: '/programs/vocational-nursing/',
  MEDICAL_ASSISTING: '/programs/medical-assisting/',
} as const;

/** Main navigation menu items */
export const NAV_ITEMS = [
  'Programs',
  'Campuses',
  'Admissions',
  'Student Resources',
  'Career Services',
  'About Us',
] as const;

/** Campus dropdown options in the lead capture form */
export const CAMPUS_OPTIONS = [
  'Fremont, CA',
  'Concord, CA',
  'San Jose, CA',
  'Bakersfield, CA',
  'Hayward, CA',
  'Ontario, CA',
  'Reno, NV',
  'Sacramento, CA',
  'South San Francisco, CA',
  'Online Instruction',
] as const;

/** Multi-step form step labels */
export const FORM_STEPS = {
  STEP_1: 'Campus of Interest',
  STEP_2: 'Program of Interest',
  STEP_3: 'First Name',
  STEP_4: 'Last Name',
  STEP_5: 'Phone Number',
  STEP_6: 'Email Address',
  TOTAL_STEPS: 6,
} as const;

/** Programs available per category */
export const PROGRAMS = {
  NURSING: [
    'Associate Degree in Vocational Nursing (ASVN)',
    'Bachelor of Science in Nursing',
    'LVN to BSN Pathway',
    'RN Courses (International)',
    'Vocational Nursing',
  ],
  MEDICAL: [
    'Medical Assisting',
  ],
} as const;

/** Accreditation bodies */
export const ACCREDITATIONS = [
  'ACCSC',
  'CCNE',
  'BPPE',
] as const;

/** FAQ category tabs */
export const FAQ_TABS = [
  'Tuition and Financial Aid',
  'Transfer Credits',
  'Admissions & Enrollment',
  'Job Growth and Career Outlook',
] as const;

/** Footer column headings */
export const FOOTER_COLUMNS = {
  UNITEK_COLLEGE: [
    'About Us',
    'Accreditation',
    'Programs',
    'Admissions',
    'Financial Aid',
    'College Locations',
    'Careers',
  ],
  RESOURCES: [
    'Student Services',
    'Career Services',
    'College Catalog',
  ],
  DISCLOSURES: [
    'All Disclosures',
    'CA Disclosures',
    'Campus Security & Title IX Compliance',
    'Legal Disclaimer',
    'Privacy Policy',
  ],
  TOOLS: [
    'Apply for Transcript Evaluation',
    'Transcript Request',
    'Application',
    'Online Portal',
    'Sitemap',
    'Student Re-Entry Form',
  ],
} as const;

/** Social media platform names */
export const SOCIAL_MEDIA = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'TikTok',
] as const;

/** Statistics displayed on the homepage */
export const HOME_STATS = {
  STAT_1: '98%',
  STAT_2: '100%',
  STAT_3: '143K',
} as const;
