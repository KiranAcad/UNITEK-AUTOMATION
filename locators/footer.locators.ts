/**
 * Footer Locators
 * ---------------
 * Locators for the site-wide footer section.
 */

export const FooterLocators = {
  /** Footer container */
  footerContainer: 'footer',

  /** Footer logo */
  footerLogo: 'footer img[alt*="Unitek"]',

  /** Footer column sections */
  footerColumns: '.footer-column',

  /** Footer link by text */
  footerLinkByText: (text: string) => `footer >> a:has-text("${text}")`,

  /** Unitek College column links */
  unitekColLinks: '.footer-column:nth-child(1) a',

  /** Resources column links */
  resourcesLinks: '.footer-column:nth-child(2) a',

  /** Disclosures column links */
  disclosuresLinks: '.footer-column:nth-child(3) a',

  /** Tools column links */
  toolsLinks: '.footer-column:nth-child(4) a',

  // ─── Social Media Icons ──────────────────────────────
  /** Facebook link */
  facebookLink: 'footer a[href*="facebook"]',

  /** Instagram link */
  instagramLink: 'footer a[href*="instagram"]',

  /** LinkedIn link */
  linkedInLink: 'footer a[href*="linkedin"]',

  /** TikTok link */
  tikTokLink: 'footer a[href*="tiktok"]',

  /** All social media links */
  socialMediaLinks: '.footer-social a',

  // ─── Copyright & Legal ───────────────────────────────
  /** Copyright text */
  copyrightText: '.footer-copyright',

  /** Privacy policy link */
  privacyPolicyLink: 'footer >> a:has-text("Privacy Policy")',

  /** Legal disclaimer link */
  legalDisclaimerLink: 'footer >> a:has-text("Legal Disclaimer")',
} as const;
