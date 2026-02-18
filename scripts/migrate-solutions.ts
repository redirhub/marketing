/**
 * Migration Script: Migrate Hardcoded Solution Pages to Sanity CMS
 *
 * Converts the 4 static solution page files into landingPage CMS documents
 * with featureSplitBlock entries inside richContent.
 *
 * Run with: npx tsx scripts/migrate-solutions.ts
 *
 * After running:
 * 1. Upload hero + section images in Sanity Studio
 * 2. Toggle "Needs Translation" to auto-translate
 */

import { writeClient } from '@/sanity/lib/client'

// Helper: convert { heading, description } pairs to **heading:** description strings
function toFeatureStrings(items: { heading: string; description: string }[]): string[] {
  return items.map(({ heading, description }) => {
    if (heading && description) return `**${heading}** ${description}`
    if (heading) return `**${heading}**`
    return description
  })
}

// ─── Domain Parking ────────────────────────────────────────────────────────────

const domainParkingBlocks = [
  {
    mainTitle: 'Scale Without Limits',
    subTitle:
      'RedirHub is built to handle portfolios of virtually any size – from a few dozen to hundreds of thousands of domains – without compromising on performance, visibility, or ease of management.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: '', description: 'Designed to handle **mass-scale domain portfolios** with high-speed infrastructure' },
      { heading: '', description: '**Bulk import, clone,** and manage thousands of redirects in one go' },
      { heading: 'Automated HTTPS', description: 'for every domain, regardless of scale' },
      { heading: '', description: 'Purpose-built for **domain parking use cases and high-volume traffic**' },
    ]),
  },
  {
    mainTitle: 'Preserve Value',
    subTitle:
      'Ensure your parked domains continue to deliver value by maintaining redirect integrity, SEO trust signals, and a clean user experience across all traffic types.',
    reverseOrder: true,
    removePaddingBottom: false,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: '', description: 'Ensure all domains redirect to **relevant, working destinations**' },
      { heading: '', description: 'Protect expired or unused domains from **broken links and lost SEO equity**' },
      { heading: '', description: 'Serve clean, secure redirects that **pass traffic trust signals**' },
      { heading: 'Avoid browser warnings or downtime', description: 'with always-on HTTPS and health checks' },
    ]),
  },
  {
    mainTitle: 'Optimize Costs',
    subTitle:
      'Skip the burden of managing internal infrastructure and instead leverage RedirHub\'s platform to achieve lower operational overhead and higher ROI on your domain investments.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: '', description: 'No need to maintain your own **servers or DNS infrastructure**' },
      { heading: 'Predictable pricing', description: 'designed for high-volume redirection' },
      { heading: 'Offload traffic filtering, SSL provisioning, and uptime monitoring', description: '' },
      { heading: 'Reduce engineering hours', description: 'spent building and maintaining redirect logic' },
    ]),
  },
  {
    mainTitle: 'Redirect Smarter',
    subTitle:
      'Gain granular control over how domains behave with flexible redirect rules that support monetization strategies, ad traffic rotation, and intelligent fallback logic.',
    reverseOrder: true,
    removePaddingBottom: false,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Set fallback rules, random redirects, or rotation by region/device', description: '' },
      { heading: '', description: 'Filter traffic by **path, query, or bot signature**' },
      { heading: '', description: 'Integrate with **analytics tools** to monitor redirection effectiveness' },
      { heading: '', description: 'Route parked domains to **ad pages, expired landing pages, or SEO vaults**' },
    ]),
  },
  {
    mainTitle: 'Reliable at Any Volume',
    subTitle:
      'Whether you manage hundreds or hundreds of thousands of domains, RedirHub\'s infrastructure is built to maintain speed, reliability, and security at every level of scale.',
    reverseOrder: false,
    removePaddingBottom: true,
    features: toFeatureStrings([
      { heading: '', description: 'Global infrastructure with **sub-100ms redirect latency**' },
      { heading: 'Smart failover and load balancing', description: 'across distributed nodes' },
      { heading: 'Auto-renewing SSL', description: 'for every domain, with no manual steps' },
      { heading: 'Daily performance monitoring and queue-based domain syncing', description: '' },
    ]),
  },
]

// ─── Marketing Campaigns ───────────────────────────────────────────────────────

const marketingCampaignsBlocks = [
  {
    mainTitle: 'Create Short Links for Ads',
    subTitle: 'Easily convert lengthy URLs into concise, branded links for your marketing efforts.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: 'Boost Engagement:', description: 'Short, memorable links drive higher click-through rates.' },
      { heading: 'Brand Reinforcement:', description: 'Custom domains keep ads looking polished and professional.' },
      { heading: 'Multi-Channel Use:', description: 'Ideal for social media, email, and online ads.' },
    ]),
  },
  {
    mainTitle: 'UTM Builder',
    subTitle: 'Add tracking parameters to every link to measure individual campaign performance.',
    reverseOrder: true,
    removePaddingBottom: false,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Consistent Tagging:', description: 'Automatically apply standard UTM parameters' },
      { heading: 'Detailed Insights:', description: 'Compare link clicks, conversions, and sources in one place.' },
      { heading: 'Simplify Reporting:', description: 'Make data-driven decisions with accurate metrics.' },
    ]),
  },
  {
    mainTitle: 'Random Redirects for A/B Split Testing',
    subTitle: 'Test multiple landing pages to see which version yields the best conversions.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: 'Seamless Rotation:', description: 'Randomly direct traffic to different variations' },
      { heading: 'Actionable Data:', description: 'Identify winning headlines, designs, or offers.' },
      { heading: 'Optimize in Real Time:', description: 'Quickly swap or refine test variations.' },
    ]),
  },
  {
    mainTitle: 'Track Campaign Performance',
    subTitle: 'Monitor how each campaign performs through robust analytics and real-time dashboards.',
    reverseOrder: true,
    removePaddingBottom: true,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Granular Stats:', description: 'View clicks, user locations, device types, and more.' },
      { heading: 'ROI Evaluation:', description: 'Pinpoint successful channels and focus resources effectively.' },
      { heading: 'Easy Integration:', description: 'Connect data to your preferred analytics or CRM tools.' },
    ]),
  },
]

// ─── Website Migrations ────────────────────────────────────────────────────────

const websiteMigrationsBlocks = [
  {
    mainTitle: 'Maintain SEO Rankings',
    subTitle: 'Ensure your website migration doesn\'t impact your visibility in search engines.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: 'Preserve Traffic:', description: 'Retain your organic traffic with SEO-friendly redirects.' },
      { heading: 'Seamless Transitions:', description: 'Minimize ranking disruptions during URL changes.' },
      { heading: 'Track Success:', description: 'Monitor post-migration SEO performance effortlessly.' },
    ]),
  },
  {
    mainTitle: 'Bulk 301 Redirects',
    subTitle: 'Apply multiple redirects efficiently to save time and maintain consistency.',
    reverseOrder: true,
    removePaddingBottom: false,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Scale Easily:', description: 'Implement hundreds of redirects in seconds.' },
      { heading: 'SEO Best Practices:', description: 'Use 301 redirects to maintain authority and rankings.' },
      { heading: 'Error-Free Setup:', description: 'Avoid misconfigurations with easy-to-use tools.' },
    ]),
  },
  {
    mainTitle: 'Match Old Pages to New URLs',
    subTitle: 'Redirect users and search engines smoothly from old pages to new destinations.',
    reverseOrder: false,
    removePaddingBottom: true,
    features: toFeatureStrings([
      { heading: 'Accurate Mapping:', description: 'Prevent broken links with precise URL mapping.' },
      { heading: 'User Experience:', description: 'Ensure visitors seamlessly find what they\'re looking for.' },
      { heading: 'Automation:', description: 'Speed up migrations with bulk redirect tools.' },
    ]),
  },
]

// ─── Scalable Enterprise Solutions ────────────────────────────────────────────

const enterpriseSolutionsBlocks = [
  {
    mainTitle: 'API Integration',
    subTitle: 'Automate redirect tasks programmatically for large-scale, enterprise needs.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: 'Full Control:', description: 'Create, update, and delete redirects via REST APIs.' },
      { heading: 'Custom Workflows:', description: 'Integrate seamlessly with CI/CD pipelines, CRMs, or internal tools.' },
      { heading: 'Reduced Manual Labor:', description: 'Eliminate repetitive tasks with code-based automation.' },
    ]),
  },
  {
    mainTitle: 'Bulk Import/Export',
    subTitle: 'Process massive volumes of redirects in seconds to handle big migrations or reorganizations.',
    reverseOrder: true,
    removePaddingBottom: false,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Instant Scaling:', description: 'Upload or download thousands of redirect rules at once.' },
      { heading: 'Error Prevention:', description: 'Validate your CSV files before finalizing changes.' },
      { heading: 'Version Tracking:', description: 'Keep historical logs for compliance and auditing.' },
    ]),
  },
  {
    mainTitle: 'High-Speed Global Edge Network',
    subTitle: 'Leverage a distributed infrastructure to serve redirects with minimal latency.',
    reverseOrder: false,
    removePaddingBottom: false,
    features: toFeatureStrings([
      { heading: 'Ultra-Fast Response:', description: 'Minimize wait times for users worldwide.' },
      { heading: 'Resilient Architecture:', description: 'Reroute traffic to the nearest available node.' },
      { heading: '99.999% Uptime:', description: 'Ensure consistent, always-online redirect services.' },
    ]),
  },
  {
    mainTitle: 'Dedicated Infrastructure for 100% SLAs',
    subTitle: 'Rely on an enterprise-grade environment built for mission-critical deployments.',
    reverseOrder: true,
    removePaddingBottom: true,
    imageBorderRadius: '0px 15px 0px 0px',
    features: toFeatureStrings([
      { heading: 'Guaranteed Reliability:', description: 'Protect revenue and user experience with ironclad SLAs.' },
      { heading: 'Priority Support:', description: 'Access premium, round-the-clock assistance.' },
      { heading: 'Compliance Ready:', description: 'Meet strict data and security requirements at scale.' },
    ]),
  },
]

// ─── Page definitions ──────────────────────────────────────────────────────────

interface FeatureBlock {
  mainTitle: string
  subTitle: string
  reverseOrder: boolean
  removePaddingBottom: boolean
  imageBorderRadius?: string
  features: string[]
}

interface FAQItem {
  question: string
  answer: string
}

interface SolutionPage {
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  heroSubheadline: string
  bannerStyle: 'default' | 'purple' | 'teal' | 'dark'
  blocks: FeatureBlock[]
  faqs: FAQItem[]
  ctaPrimaryLabel: string
  ctaPrimaryUrl: string
  ctaNote: string
}

const solutionPages: SolutionPage[] = [
  {
    title: 'Domain Parking',
    slug: 'solutions/domain-parking',
    metaTitle: 'Domain Parking - RedirHub',
    metaDescription: 'Turbocharge your domain parking business with instant redirects, global infrastructure, and the capacity to handle millions of hits per day.',
    heroHeadline: 'Turbocharge your Domain Parking Business with Redirhub',
    heroSubheadline:
      'With RedirHub, you get instant redirects, global infrastructure, and the capacity to handle millions of hits per day. We provide the speed, flexibility, and control your business needs at a fraction of the cost.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: domainParkingBlocks,
    faqs: [
      {
        question: 'How can RedirHub help with domain parking?',
        answer:
          'RedirHub allows you to instantly redirect parked domains to monetized landing pages, affiliate links, or other destinations. Our platform ensures seamless traffic handling without downtime.',
      },
      {
        question: 'Can RedirHub handle high-traffic domain portfolios?',
        answer:
          'Yes. RedirHub\'s global edge network can manage millions of hits per day, making it ideal for domain parking businesses with large portfolios or high-traffic domains.',
      },
      {
        question: 'How fast are redirects for parked domains?',
        answer:
          'Redirects are deployed within milliseconds globally, powered by RedirHub\'s low-latency infrastructure. Visitors experience instant navigation and improved SEO performance.',
      },
      {
        question: 'Can I manage multiple parked domains efficiently?',
        answer:
          'Absolutely. RedirHub\'s dashboard supports bulk redirect management, filtering, and real-time updates, allowing you to handle hundreds or thousands of domains effortlessly.',
      },
      {
        question: 'Can I integrate RedirHub with my existing systems?',
        answer:
          'Yes. RedirHub provides CSV import/export and a robust API, enabling automation, bulk updates, and integration with affiliate networks or domain management tools.',
      },
    ],
  },
  {
    title: 'Marketing Campaigns',
    slug: 'solutions/marketing-campaigns',
    metaTitle: 'Marketing Campaigns - RedirHub',
    metaDescription: 'Amplify your campaign reach with streamlined link management, data-driven A/B testing, and real-time insights.',
    heroHeadline: 'Marketing Campaigns',
    heroSubheadline:
      'Amplify your campaign reach with streamlined link management, data-driven A/B testing, and real-time insights.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: marketingCampaignsBlocks,
    faqs: [
      {
        question: 'How can RedirHub help manage marketing campaign links?',
        answer:
          'RedirHub allows you to create and manage campaign-specific redirects easily. You can track performance, update destinations instantly, and ensure all links are secure with automatic HTTPS.',
      },
      {
        question: 'Can I run A/B testing with my redirects?',
        answer:
          'Yes. RedirHub supports data-driven A/B testing, allowing you to split traffic across different URLs and analyze performance. This helps optimize landing pages and improve conversion rates.',
      },
      {
        question: 'Can I monitor campaign performance in real time?',
        answer:
          'Absolutely. RedirHub provides real-time analytics for every redirect, showing hits, referral sources, and geographic traffic. This enables immediate insights and faster campaign optimization.',
      },
      {
        question: 'Does RedirHub support multiple domains and campaigns at once?',
        answer:
          'Yes. You can manage multiple domains and campaigns from one dashboard, filter redirects by campaign, and group links for easier organization and reporting.',
      },
      {
        question: 'Can I export campaign data for further analysis?',
        answer:
          'Yes. RedirHub allows you to export redirect and campaign data in CSV format. You can use this data with your marketing dashboards or BI tools for deeper insights.',
      },
      {
        question: 'Can I automate campaign redirects?',
        answer:
          'Yes. Using the RedirHub API, you can automate redirect creation, updates, and A/B testing, making campaign management faster and reducing manual work.',
      },
    ],
  },
  {
    title: 'Website Migrations',
    slug: 'solutions/website-migrations',
    metaTitle: 'Website Migrations - RedirHub',
    metaDescription: 'Transform your website migration into a seamless process while preserving SEO and user experience.',
    heroHeadline: 'Website Migrations',
    heroSubheadline:
      'Transform your website migration into a seamless process while preserving SEO and user experience.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: websiteMigrationsBlocks,
    faqs: [
      {
        question: 'How can RedirHub help with website migrations?',
        answer:
          'RedirHub simplifies migrations by managing all your redirects in one place. You can map old URLs to new destinations, ensuring users and search engines reach the correct pages without downtime.',
      },
      {
        question: 'Will my SEO be affected during migration?',
        answer:
          'No. RedirHub supports 301 permanent redirects, which preserve link equity and search engine rankings. Properly configured redirects ensure your SEO remains intact during and after migration.',
      },
      {
        question: 'Can I migrate multiple domains or subdomains at once?',
        answer:
          'Yes. RedirHub supports bulk redirect management, making it easy to migrate large websites or multiple domains simultaneously while maintaining consistent routing and tracking.',
      },
      {
        question: 'How fast are redirects applied during migration?',
        answer:
          'Yes. RedirHub allows you to audit and monitor redirects in real time, quickly identifying and fixing broken links to prevent 404 errors and protect your SEO.',
      },
      {
        question: 'Can I automate migrations with RedirHub?',
        answer:
          'Absolutely. Using the RedirHub API and CSV import/export, you can automate bulk redirects, making large-scale migrations faster, accurate, and less prone to human error.',
      },
    ],
  },
  {
    title: 'Scalable Enterprise Solutions',
    slug: 'solutions/scalable-enterprise-solutions',
    metaTitle: 'Scalable Enterprise Solutions - RedirHub',
    metaDescription: 'Empower your enterprise with fast, automated redirects on a global edge network—guaranteed uptime and seamless scalability.',
    heroHeadline: 'Scalable Enterprise Solutions',
    heroSubheadline:
      'Empower your enterprise with fast, automated redirects on a global edge network—guaranteed uptime and seamless scalability.',
    bannerStyle: 'dark',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: enterpriseSolutionsBlocks,
    faqs: [
      {
        question: 'What makes RedirHub suitable for enterprise-scale operations?',
        answer:
          'RedirHub provides fast, automated redirects on a global edge network, handling large-scale domain portfolios and high-volume traffic with enterprise-grade reliability.',
      },
      {
        question: 'Can I automate redirects for multiple domains?',
        answer:
          'Yes. Using RedirHub\'s API and CSV import/export, you can automate redirect creation, updates, and bulk management, reducing manual work and ensuring consistency across domains.',
      },
      {
        question: 'Can I scale redirects globally without latency issues?',
        answer:
          'Absolutely. RedirHub\'s edge network serves redirects from the nearest location to your users, minimizing latency and ensuring a seamless experience worldwide.',
      },
      {
        question: 'Does RedirHub support security and compliance for enterprise use?',
        answer:
          'Yes. All redirects include automatic SSL (HTTPS), DDoS protection, and bad bot filtering. Role-based access and audit logs ensure secure collaboration and compliance with enterprise policies.',
      },
      {
        question: 'Can I monitor and report on enterprise redirects?',
        answer:
          'Yes. RedirHub provides real-time analytics across all domains and redirects. You can track traffic, performance, and errors, and export data for reporting or integration with enterprise dashboards.',
      },
    ],
  },
]

// ─── Migration runner ──────────────────────────────────────────────────────────

function buildRichContent(blocks: FeatureBlock[]) {
  return blocks.map((block, i) => ({
    _type: 'featureSplitBlock',
    _key: `block-${i}`,
    mainTitle: block.mainTitle,
    subTitle: block.subTitle,
    reverseOrder: block.reverseOrder,
    removePaddingBottom: block.removePaddingBottom,
    ...(block.imageBorderRadius ? { imageBorderRadius: block.imageBorderRadius } : {}),
    features: block.features,
  }))
}

async function migrateSolutions() {
  console.log('🚀 Starting solution pages migration...\n')

  for (const page of solutionPages) {
    const existingId = await writeClient.fetch(
      `*[_type == "landingPage" && slug.current == $slug && locale == "en"][0]._id`,
      { slug: page.slug }
    )

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
          label: page.ctaPrimaryLabel,
          url: page.ctaPrimaryUrl,
        },
        ctaNote: page.ctaNote,
        bannerStyle: page.bannerStyle,
        heroSections: [],
      },
      richContent: buildRichContent(page.blocks),
      faqs: page.faqs.map((faq, i) => ({
        _key: `faq-${i}`,
        question: faq.question,
        answer: faq.answer,
      })),
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
  console.log('3. Run: npx tsx scripts/migrate-solutions.ts (idempotent — safe to re-run)')
}

migrateSolutions().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
