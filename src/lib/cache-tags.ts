/**
 * Centralized Cache Tag Configuration
 *
 * This file defines all cache tags used for Next.js revalidation.
 * Tags allow efficient, grouped revalidation instead of individual path revalidation.
 */

export const CACHE_TAGS = {
  // Content type tags - revalidate all content of a specific type
  BLOG_POSTS: 'blog-posts',
  LANDING_PAGES: 'landing-pages',
  SUPPORT_ARTICLES: 'support-articles',
  CHANGELOG_ENTRIES: 'changelog-entries',
  LEGAL_PAGES: 'legal-pages',
  AUTHORS: 'authors',
  TESTIMONIALS: 'testimonials',
  FAQ_SETS: 'faq-sets',

  // Page-specific tags
  HOME_PAGE: 'page:home',
  BLOG_LISTING: 'page:blog-listing',
  SUPPORT_LISTING: 'page:support-listing',
  CHANGELOG_LISTING: 'page:changelog-listing',
  LEGAL_LISTING: 'page:legal-listing',
} as const;

/**
 * Generate tags for a blog post
 */
export function getBlogPostTags(locale?: string): string[] {
  const tags: string[] = [
    CACHE_TAGS.BLOG_POSTS,
    CACHE_TAGS.BLOG_LISTING,
    CACHE_TAGS.HOME_PAGE, // Blog posts may appear on home
  ];

  if (locale) {
    tags.push(getLocaleTag(locale));
  }

  return tags;
}

/**
 * Generate tags for a landing page
 */
export function getLandingPageTags(slug: string, locale?: string): string[] {
  const tags: string[] = [CACHE_TAGS.LANDING_PAGES];

  if (slug === 'homepage') {
    tags.push(CACHE_TAGS.HOME_PAGE);
  }

  if (locale) {
    tags.push(getLocaleTag(locale));
  }

  return tags;
}

/**
 * Generate tags for a support article
 */
export function getSupportArticleTags(locale?: string): string[] {
  const tags: string[] = [
    CACHE_TAGS.SUPPORT_ARTICLES,
    CACHE_TAGS.SUPPORT_LISTING,
  ];

  if (locale) {
    tags.push(getLocaleTag(locale));
  }

  return tags;
}

/**
 * Generate tags for a changelog entry
 */
export function getChangelogTags(locale?: string): string[] {
  const tags: string[] = [
    CACHE_TAGS.CHANGELOG_ENTRIES,
    CACHE_TAGS.CHANGELOG_LISTING,
  ];

  if (locale) {
    tags.push(getLocaleTag(locale));
  }

  return tags;
}

/**
 * Generate tags for legal pages
 */
export function getLegalPageTags(locale?: string): string[] {
  const tags: string[] = [
    CACHE_TAGS.LEGAL_PAGES,
    CACHE_TAGS.LEGAL_LISTING,
  ];

  if (locale) {
    tags.push(getLocaleTag(locale));
  }

  return tags;
}

/**
 * Generate tags for testimonials
 */
export function getTestimonialTags(): string[] {
  return [
    CACHE_TAGS.TESTIMONIALS,
    CACHE_TAGS.HOME_PAGE, // Testimonials appear on home
  ];
}

/**
 * Generate tags for FAQ sets
 */
export function getFAQTags(): string[] {
  return [
    CACHE_TAGS.FAQ_SETS,
    CACHE_TAGS.HOME_PAGE, // FAQs appear on home
  ];
}

/**
 * Generate tags for authors
 */
export function getAuthorTags(): string[] {
  return [
    CACHE_TAGS.AUTHORS,
    CACHE_TAGS.BLOG_POSTS, // Author changes affect blog posts
  ];
}

/**
 * Get locale tag for a specific locale
 */
export function getLocaleTag(locale: string): string {
  return `locale:${locale}`;
}

/**
 * Map Sanity content type to cache tags
 */
export function getTagsForContentType(contentType: string, slug?: string, locale?: string): string[] {
  switch (contentType) {
    case 'post':
      return getBlogPostTags(locale);

    case 'landingPage':
      return getLandingPageTags(slug || '', locale);

    case 'support':
      return getSupportArticleTags(locale);

    case 'changelog':
      return getChangelogTags(locale);

    case 'legal':
      return getLegalPageTags(locale);

    case 'testimonial':
      return getTestimonialTags();

    case 'faqSet':
      return getFAQTags();

    case 'author':
      return getAuthorTags();

    default:
      return [CACHE_TAGS.HOME_PAGE];
  }
}
