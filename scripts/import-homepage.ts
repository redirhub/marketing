#!/usr/bin/env tsx
/**
 * Import Homepage to Sanity
 *
 * Creates (or updates) two documents:
 *   1. landingPage  — slug "homepage", locale "en"  (hero content + SEO)
 *   2. faqSet       — pageSlug "homepage", locale "en"
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/import-homepage.ts
 */

import { writeClient } from '../src/sanity/lib/client'
import { randomUUID } from 'crypto'

const genKey = (): string => randomUUID()

// ---------------------------------------------------------------------------
// FAQ data (from JSON-LD schema)
// ---------------------------------------------------------------------------

const FAQS = [
  {
    question: 'What is a redirect, and what domains can I use with RedirHub?',
    answer:
      'A redirect automatically sends visitors from one URL to another. With RedirHub, you can use any domain you own to create redirects. Our platform supports all top-level domains (TLDs) and provides seamless redirect management for your websites.',
  },
  {
    question: 'What is RedirHub and how does it work?',
    answer:
      'RedirHub is a powerful redirect management platform that allows you to create, manage, and monitor URL redirects effortlessly. Simply add your domain, set up your redirect rules, and our global network handles the rest with lightning-fast performance.',
  },
  {
    question: 'How fast are RedirHub\'s redirects?',
    answer:
      'RedirHub delivers redirects at 100ms-level global latency, powered by an edge network that is up to 4× faster than Bitly. Every request is routed through the nearest global location for maximum speed and SEO performance.',
  },
  {
    question: 'Does RedirHub support HTTPS for every domain?',
    answer:
      'Yes! RedirHub automatically provisions and manages SSL/TLS certificates for all domains using Let\'s Encrypt. Every redirect is secured with HTTPS at no extra cost, protecting your visitors and preserving SEO trust signals.',
  },
  {
    question: 'Can I change my redirect destination at any time?',
    answer:
      'Absolutely! You can update your redirect destinations anytime through our intuitive dashboard. Changes take effect immediately across our global network, giving you complete flexibility to manage your redirects without any downtime.',
  },
  {
    question: 'Is RedirHub suitable for SEO, domain migration, and IT redirection?',
    answer:
      'Yes, RedirHub is perfect for all these use cases. We support proper 301 (permanent) and 302 (temporary) redirects, preserve SEO value during domain migrations, and provide enterprise-grade reliability for IT infrastructure redirection needs.',
  },
]

// ---------------------------------------------------------------------------
// Homepage landing page document
// ---------------------------------------------------------------------------

const HOMEPAGE_LANDING_PAGE = {
  _type: 'landingPage',
  title: 'Home Page',
  slug: {
    _type: 'slug',
    current: 'homepage',
  },
  meta: {
    metaTitle: 'RedirHub - Fast & Secure URL Redirect Management',
    metaDescription:
      'Enterprise-grade URL redirect service. Manage redirects, track analytics, and scale globally with RedirHub. Trusted by businesses worldwide.',
  },
  hero: {
    headline: 'Your domains.\n**Globally** redirected. Instantly.',
    subheadline:
      'Forward your domains instantly and manage all redirects from a real-time dashboard. Enhance your SEO with 301/302 redirects and secure every link with HTTPS.',
    ctaPrimary: {
      label: '✨ 1M+ domains redirected daily',
    },
    heroSections: ['redirect', 'customerLogos'],
    bannerStyle: 'default',
  },
  // Minimal placeholder content block (required field)
  content: [
    {
      _type: 'block',
      _key: genKey(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: genKey(),
          text: '',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  faqs: FAQS.map((faq) => ({
    _key: genKey(),
    _type: 'object',
    question: faq.question,
    answer: faq.answer,
  })),
  sections: [],
  footerType: 'default',
  publishedAt: new Date().toISOString(),
  isActive: true,
  onFooter: false,
  locale: 'en',
  needsTranslation: false,
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  console.log('🚀 Importing homepage to Sanity...\n')

  // ── 1. Landing page ────────────────────────────────────────────────────

  const existingLandingPage = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "landingPage" && slug.current == "homepage" && locale == "en"][0]{ _id }`,
    {}
  )

  if (existingLandingPage) {
    await writeClient.createOrReplace({ ...HOMEPAGE_LANDING_PAGE, _id: existingLandingPage._id })
    console.log(`🔄 Updated landingPage  (id: ${existingLandingPage._id})`)
  } else {
    const result = await writeClient.create(HOMEPAGE_LANDING_PAGE)
    console.log(`✅ Created landingPage  (id: ${result._id})`)
  }

  // ── 2. FAQ set ─────────────────────────────────────────────────────────

  const faqDocId = 'faqset-homepage-en'

  const existingFaqSet = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "faqSet" && pageSlug == "homepage" && locale == "en"][0]{ _id }`,
    {}
  )

  const faqDoc = {
    _id: existingFaqSet?._id ?? faqDocId,
    _type: 'faqSet',
    pageSlug: 'homepage',
    title: 'Frequently Asked Questions',
    locale: 'en',
    needsTranslation: false,
    faqs: FAQS.map((faq) => ({
      _key: genKey(),
      question: faq.question,
      answer: faq.answer,
    })),
  }

  await writeClient.createOrReplace(faqDoc)
  console.log(
    `${existingFaqSet ? '🔄 Updated' : '✅ Created'} faqSet        (id: ${faqDoc._id}, ${FAQS.length} FAQs)`
  )

  console.log('\n✨ Done! Remember to publish both documents in Sanity Studio.\n')
}

run().catch((err) => {
  console.error('❌', err.message)
  process.exit(1)
})
