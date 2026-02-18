/**
 * Migration Script: Migrate Hardcoded Feature Pages to Sanity CMS
 *
 * Converts the 6 static feature page files into landingPage CMS documents.
 * FAQs are pulled from existing faqSet documents in Sanity.
 *
 * Run with: npx tsx scripts/migrate-features.ts
 *
 * After running:
 * 1. Upload hero + section images in Sanity Studio
 * 2. Toggle "Needs Translation" to auto-translate
 */

import { writeClient } from '@/sanity/lib/client'

function toFeatureStrings(items: { heading: string; description: string }[]): string[] {
  return items.map(({ heading, description }) => {
    const h = heading.trim().replace(/:$/, '')
    const d = description.trim()
    if (h && d) return `**${h}:** ${d}`
    if (h) return `**${h}**`
    return d
  })
}

async function fetchExistingFAQs(pageSlug: string, locale = 'en') {
  const faqs = await writeClient.fetch(
    `*[_type == "faqSet" && pageSlug == $pageSlug && locale == $locale][0].faqs`,
    { pageSlug, locale }
  )
  return (faqs ?? []) as Array<{ _key: string; question: string; answer: string }>
}

// ─── Page content ──────────────────────────────────────────────────────────────

const featurePages = [
  {
    title: 'Create Redirects',
    slug: 'create-redirects',
    metaTitle: 'Create Redirects',
    metaDescription: 'Create and deploy all your redirects quickly and easily with powerful redirect creation tools.',
    heroHeadline: 'Create and Deploy Redirects',
    heroSubheadline: 'Transform your link management with powerful, intuitive redirect creation tools that put you in control',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Create Individual Redirects',
        subTitle: 'Set up redirects with our easy-to-use interface. Configure source URLs, destination paths, and redirect types in seconds',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Quick Setup:', description: 'Create redirects in seconds with our streamlined interface and instant validation' },
          { heading: 'Flexible Redirect Types:', description: 'Choose between 301 permanent redirects and 302 temporary redirects based on your needs' },
          { heading: 'Instant Validation:', description: 'Real-time URL validation ensures your redirects are properly formatted and functional' },
        ]),
      },
      {
        mainTitle: 'URL Path Customization',
        subTitle: 'Create powerful redirect rules using pattern matching and regular expressions.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Forwarded Options:', description: 'Choose which parts of the URL to forward to the destination, including path forwarding (a.com/one/two → b.com/one/two) and query forwarding (a.com/?one=two → b.com/?one=two).' },
          { heading: 'UTM Builder:', description: 'Automatically append UTM parameters (source, medium, campaign, term, content) to your destination URL on every redirect.' },
          { heading: 'Regular Expressions:', description: 'Use regex patterns to create flexible redirect rules that match multiple URLs.' },
          { heading: 'Wildcard Support:', description: 'Implement wildcard matching to handle dynamic URL structures efficiently.' },
          { heading: 'Path Parameters:', description: 'Maintain URL parameters and path structures in your redirects automatically.' },
        ]),
      },
      {
        mainTitle: 'Bulk Import & Export',
        subTitle: 'Manage multiple redirects efficiently with our bulk operation tools',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'CSV Import:', description: 'Upload CSV files to create multiple redirects in one operation.' },
          { heading: 'Batch Processing:', description: 'Edit, update, or delete multiple redirects simultaneously.' },
          { heading: 'Validation & Review:', description: 'Preview and validate all redirects before deployment.' },
        ]),
      },
      {
        mainTitle: 'Bot Protection & Monitoring',
        subTitle: 'Configure advanced security measures and link monitoring for your redirects',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'URL Monitoring:', description: 'Stay ahead of broken links with automated checks, notifications, and fallback options for broken destinations.' },
          { heading: 'Bot Security:', description: 'Control bot access with multiple protection layers including crawler blocking and JavaScript challenges.' },
          { heading: 'Platform Handling:', description: 'Customize redirect behavior for specific platforms like WeChat to ensure optimal user experience.' },
          { heading: 'Tag Management:', description: 'Create and organize redirects with custom tags for better management and filtering.' },
        ]),
      },
      {
        mainTitle: 'Domain Configuration',
        subTitle: 'Manage redirect settings across multiple domains and subdomains',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Multi-domain Support:', description: 'Create and manage redirects across all your domains from one interface.' },
          { heading: 'Custom Rules:', description: 'Set domain-specific redirect rules and default behaviors.' },
          { heading: 'SSL Support:', description: 'Automatic HTTPS redirect handling and SSL certificate management.' },
        ]),
      },
    ],
  },
  {
    title: 'Manage Redirects',
    slug: 'manage-redirects',
    metaTitle: 'Manage Redirects',
    metaDescription: 'Manage all your redirects in one centralized platform with powerful tools and real-time updates.',
    heroHeadline: 'Manage Redirects',
    heroSubheadline: 'Take control of your redirect infrastructure with powerful management tools and real-time updates.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Search and Filter',
        subTitle: 'Access and organize your redirects with powerful search capabilities.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Global Search:', description: 'Find any redirect instantly with comprehensive search across URLs, tags, and descriptions' },
          { heading: 'Smart Filters:', description: 'Filter redirects by status, type, creation date, or performance metrics' },
          { heading: 'Bulk Selection:', description: 'Select and manage multiple redirects simultaneously for efficient operations' },
        ]),
      },
      {
        mainTitle: 'Status Management',
        subTitle: 'Keep your redirects organized and up to date.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Path Parameters:', description: 'Maintain URL parameters and path structures in your redirects automatically' },
          { heading: 'Quick Actions:', description: 'Enable, disable, or pause redirects with a single click' },
          { heading: 'Version History:', description: 'Track changes and updates with detailed revision history' },
        ]),
      },
      {
        mainTitle: 'Bulk Operations',
        subTitle: 'Efficiently manage multiple redirects at once.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Batch Updates:', description: 'Modify multiple redirects simultaneously with bulk edit capabilities' },
          { heading: 'Mass Actions:', description: 'Apply actions like enable/disable, delete, or tag to multiple redirects at once' },
          { heading: 'Export Options:', description: 'Download redirect data in various formats for backup or analysis' },
        ]),
      },
      {
        mainTitle: 'Performance Tracking',
        subTitle: 'Monitor and optimize your redirect performance.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Usage Statistics:', description: 'Track redirect usage patterns and response times' },
          { heading: 'Error Monitoring:', description: 'Identify and troubleshoot failed redirects quickly' },
          { heading: 'Health Checks:', description: 'Regular automated checks ensure your redirects are working properly' },
        ]),
      },
    ],
  },
  {
    title: 'Analyze Redirects',
    slug: 'analyze-redirects',
    metaTitle: 'Analyze Redirects',
    metaDescription: 'Gain powerful insights from your redirect traffic with comprehensive analytics and real-time monitoring.',
    heroHeadline: 'Analyze Redirects',
    heroSubheadline: 'Transform your redirect data into actionable insights with comprehensive analytics and real-time monitoring.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Traffic Overview',
        subTitle: 'Get detailed insights into your redirect performance.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Total Clicks:', description: 'Track the total number of redirect clicks and view hourly distribution' },
          { heading: 'Unique Visitors:', description: 'Monitor unique visitors accessing your redirects' },
          { heading: 'QR Scans:', description: 'Track QR code scan performance if enabled for your redirects' },
        ]),
      },
      {
        mainTitle: 'Visit Details',
        subTitle: 'Monitor detailed information about each redirect access.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Recent Activity:', description: 'View real-time log of recent visits with timestamp and location' },
          { heading: 'Device Info:', description: 'See which devices and browsers are accessing your redirects' },
          { heading: 'Location Data:', description: 'Track visitor locations with country and city breakdown' },
        ]),
      },
      {
        mainTitle: 'Technical Analysis',
        subTitle: 'Understand the technical aspects of your redirects.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Protocol Stats:', description: 'Monitor HTTP vs HTTPS usage across your redirects' },
          { heading: 'Browser Analytics:', description: 'Track which browsers and versions access your redirects' },
          { heading: 'Domain Insights:', description: 'Analyze traffic patterns across different domains and subdomains' },
        ]),
      },
    ],
  },
  {
    title: 'Team Management',
    slug: 'team-management',
    metaTitle: 'Team Management',
    metaDescription: 'Collaborate securely across your organization with powerful team management tools.',
    heroHeadline: 'Team Management',
    heroSubheadline: 'Collaborate securely across your organization with powerful team management tools.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Access Control',
        subTitle: 'Manage team permissions effectively.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Role Assignment:', description: 'Create and assign custom roles with specific permissions' },
          { heading: 'User Groups:', description: 'Organize team members into groups for easier permission management' },
          { heading: 'Granular Controls:', description: 'Set precise access levels for different redirect features and actions' },
        ]),
      },
      {
        mainTitle: 'Workspace Organization',
        subTitle: 'Keep your team\'s work structured and efficient.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Shared Workspaces:', description: 'Create dedicated spaces for different teams or projects' },
          { heading: 'Resource Sharing:', description: 'Share redirect configurations and templates across teams' },
          { heading: 'Caching:', description: 'Optimize redirect speed with intelligent edge caching' },
        ]),
      },
    ],
  },
  {
    title: 'Global Scale',
    slug: 'global-scale',
    metaTitle: 'Global Scale',
    metaDescription: 'Deliver seamless experiences across websites and domains with enterprise-grade global infrastructure.',
    heroHeadline: 'Global Scale',
    heroSubheadline: 'Deliver seamless customer experiences across your websites and domains with enterprise-grade infrastructure.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Global CDN',
        subTitle: 'Scale your redirects worldwide with confidence.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Edge Network:', description: 'Serve redirects from locations closest to your users for minimal latency' },
          { heading: 'Auto-Scaling:', description: 'Handle traffic spikes effortlessly with dynamic capacity adjustment' },
          { heading: 'High Availability:', description: 'Maintain 99.99% uptime with redundant infrastructure across regions' },
        ]),
      },
      {
        mainTitle: 'Performance Optimization',
        subTitle: 'Ensure fast and reliable redirects everywhere.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Smart Routing:', description: 'Automatically route requests through the fastest available path' },
          { heading: 'Load Balancing:', description: 'Distribute traffic evenly across our global infrastructure' },
          { heading: 'Caching:', description: 'Optimize redirect speed with intelligent edge caching' },
        ]),
      },
      {
        mainTitle: 'Enterprise Infrastructure',
        subTitle: 'Built for business-critical operations.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'DDoS Protection:', description: 'Advanced protection against distributed denial of service attacks' },
          { heading: 'Failover:', description: 'Automatic failover to ensure your redirects stay online' },
          { heading: '24/7 Monitoring:', description: 'Continuous infrastructure monitoring and instant issue response' },
        ]),
      },
    ],
  },
  {
    title: 'Security & Privacy',
    slug: 'security',
    metaTitle: 'Security & Privacy',
    metaDescription: 'Keep all your audiences and web properties safe with enterprise-grade security features.',
    heroHeadline: 'Security & Privacy',
    heroSubheadline: 'Keep all your audiences and web properties safe with enterprise-grade security features.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'User Access Protection',
        subTitle: 'Secure your redirects against unauthorized access.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Bot Protection:', description: 'Block malicious bots while allowing legitimate crawlers with advanced detection' },
          { heading: 'Rate Limiting:', description: 'Prevent abuse with customizable rate limits and throttling controls' },
          { heading: 'IP Filtering:', description: 'Control access with IP allowlists and blocklists for specific redirects' },
        ]),
      },
      {
        mainTitle: 'SSL Management',
        subTitle: 'Ensure secure connections across all redirects.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Auto SSL:', description: 'Automatic SSL certificate provisioning and renewal for all domains' },
          { heading: 'HTTPS Enforcement:', description: 'Force secure connections with automatic HTTP to HTTPS upgrades' },
          { heading: 'Custom Certificates:', description: 'Support for custom SSL certificates and advanced configurations' },
        ]),
      },
      {
        mainTitle: 'Data Protection',
        subTitle: 'Keep your redirect data secure and compliant.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Encryption:', description: 'End-to-end encryption for all redirect configurations and analytics' },
          { heading: 'Access Logs:', description: 'Detailed audit trails of all security-related events and changes' },
          { heading: 'Privacy Controls:', description: 'Configurable data retention and privacy settings' },
        ]),
      },
    ],
  },
]

// ─── Migration runner ──────────────────────────────────────────────────────────

function buildRichContent(blocks: typeof featurePages[0]['blocks']) {
  return blocks.map((block, i) => ({
    _type: 'feature',
    _key: `block-${i}`,
    mainTitle: block.mainTitle,
    subTitle: block.subTitle,
    reverseOrder: block.reverseOrder,
      : {}),
    features: block.features,
  }))
}

async function migrateFeatures() {
  console.log('🚀 Starting feature pages migration...\n')

  for (const page of featurePages) {
    const existingId = await writeClient.fetch(
      `*[_type == "landingPage" && slug.current == $slug && locale == "en"][0]._id`,
      { slug: page.slug }
    )

    // Pull FAQs from existing faqSet document in Sanity
    const existingFAQs = await fetchExistingFAQs(page.slug)
    const faqs = existingFAQs.map((faq, i) => ({
      _key: faq._key || `faq-${i}`,
      question: faq.question,
      answer: faq.answer,
    }))

    if (faqs.length > 0) {
      console.log(`  📋 Found ${faqs.length} FAQs from faqSet for "${page.title}"`)
    }

    const doc = {
      _type: 'landingPage',
      title: page.title,
      slug: { _type: 'slug', current: page.slug },
      meta: {
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
      },
      hero: {
        headline: page.heroHeadline,
        subheadline: page.heroSubheadline,
        ctaPrimary: {
          label: 'Get Started For Free',
          url: 'https://dash.redirhub.com/register',
        },
        ctaNote: '*No Credit Card Needed. Cancel Anytime.',
        bannerStyle: page.bannerStyle,
        heroSections: [],
      },
      content: buildRichContent(page.blocks),
      faqs,
      sections: ['testimonials'],
      footerType: 'with-widgets',
      publishedAt: new Date().toISOString(),
      isActive: true,
      onFooter: false,
      locale: 'en',
      needsTranslation: true,
    }

    let result
    if (existingId) {
      console.log(`🔄 Updating: "${page.title}" → /${page.slug} (${existingId})`)
      result = await writeClient.createOrReplace({ ...doc, _id: existingId })
    } else {
      console.log(`📝 Creating: "${page.title}" → /${page.slug}`)
      result = await writeClient.create(doc)
    }
    console.log(`✅ ${existingId ? 'Updated' : 'Created'}: ${result._id}\n`)
  }

  console.log('✨ Migration complete!\n')
  console.log('📌 Next steps:')
  console.log('1. Upload hero images and section images in Sanity Studio')
  console.log('2. Set "Needs Translation" to auto-translate each page')
  console.log('3. Run: npx tsx scripts/migrate-features.ts (idempotent — safe to re-run)')
}

migrateFeatures().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
