/**
 * TEMPLATE branding tokens
 * -------------------------
 * Rename these values when cloning for a new product brand.
 * Keep this file as the single source of truth for name / colors / logo.
 *
 * This is NOT a live brand — placeholders only.
 */

export const brand = {
  /** Display name shown in header, footer, and document titles */
  name: 'Brand Name',

  /** Short tagline for the home hero */
  tagline: 'A simple Shopify starter for product brands.',

  /** Accent / primary brand color (CSS color) */
  color: {
    primary: '#1a5f4a',
    primaryDark: '#0f3d31',
    background: '#f7f4ef',
    surface: '#ffffff',
    text: '#1a1a1a',
    muted: '#5c5c5c',
    border: '#e2ddd4',
  },

  /**
   * Logo slot — set `src` to a path under /public or an imported asset.
   * Leave null to render a text wordmark from `name`.
   */
  logo: {
    src: null, // e.g. '/logo.svg'
    alt: 'Brand Name logo',
    width: 140,
    height: 36,
  },

  /** Home hero copy (stub) */
  hero: {
    headline: 'Your product story starts here',
    subhead:
      'Clone this template, drop in your brand tokens, and connect a Shopify store.',
    ctaLabel: 'Shop collections',
    ctaHref: '/collections',
  },
};

/** CSS custom properties derived from brand tokens */
export function brandCssVars() {
  const {color} = brand;
  return {
    '--brand-primary': color.primary,
    '--brand-primary-dark': color.primaryDark,
    '--brand-bg': color.background,
    '--brand-surface': color.surface,
    '--brand-text': color.text,
    '--brand-muted': color.muted,
    '--brand-border': color.border,
  };
}
