/**
 * Migration Script: Migrate Hardcoded Solution Pages to Sanity CMS
 *
 * Converts the 4 static solution page files into landingPage CMS documents
 * with feature entries inside content.
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
      'Gain granular control over how domains behave with flexible redirect rules that support monetization strategies, fallback logic, and traffic filtering.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Fallback rules and random redirects', description: 'set backup destinations and split traffic randomly across multiple offers — so no hit goes to waste' },
      { heading: '', description: 'Filter traffic by **path, query, or bot signature**' },
      { heading: '', description: 'Integrate with **analytics tools** to monitor redirection effectiveness' },
      { heading: '', description: 'Route parked domains to **ad pages, landing pages, or affiliate offers**' },
    ]),
  },
  {
    mainTitle: 'Reliable at Any Volume',
    subTitle:
      'Whether you manage hundreds or hundreds of thousands of domains, RedirHub\'s infrastructure is built to maintain speed, reliability, and security at every level of scale.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: '', description: 'Global infrastructure with **sub-100ms redirect latency**' },
      { heading: 'Smart failover and load balancing', description: 'across distributed nodes — traffic keeps moving even if a node goes down' },
      { heading: 'Auto-renewing SSL', description: 'for every domain, with no manual steps' },
      { heading: 'Continuous uptime monitoring', description: 'across your entire portfolio with instant alerts on destination failures' },
    ]),
  },
]

// ─── Marketing Campaigns ───────────────────────────────────────────────────────

const marketingCampaignsBlocks = [
  {
    mainTitle: 'Campaign Links That Don\'t Get Flagged',
    subTitle: 'Shared link shorteners get domains blacklisted by ad networks. Your own branded domain — served over HTTPS — keeps campaigns trusted, live, and looking professional.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: 'Custom domain links', description: 'use your own domain for every campaign link — no shared shortener reputation risk, no unexpected blacklisting.' },
      { heading: 'Brand reinforcement', description: 'branded links in ads, emails, and social posts reinforce your identity and earn more clicks than generic URLs.' },
      { heading: 'Automatic HTTPS', description: 'every link is secured automatically — no certificate setup, no browser warnings for your audience.' },
    ]),
  },
  {
    mainTitle: 'UTM Attribution That Survives the Redirect',
    subTitle: 'UTM parameters stripped mid-redirect means your analytics can\'t tell which campaigns are working. RedirHub appends them at the infrastructure level — they don\'t get lost.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Built-in UTM builder', description: 'set source, medium, campaign, term, and content once — applied to every hit through that redirect automatically.' },
      { heading: 'No manual parameter management', description: 'UTMs are configured in the dashboard, not pasted into URLs by hand — no human error, no missing attribution.' },
      { heading: 'Tag by campaign', description: 'tag redirect links by campaign or channel — filter and report across your whole account in one view.' },
    ]),
  },
  {
    mainTitle: 'A/B Test Landing Pages Without a Developer',
    subTitle: 'Send traffic randomly across multiple landing page variations to find which converts best — swap or pause variations instantly, no code required.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: 'Random traffic split', description: 'distribute traffic across multiple destinations automatically — no manual routing or engineering work.' },
      { heading: 'Instant variation swaps', description: 'change or pause a test variation in the dashboard — live in seconds, no deployment pipeline.' },
      { heading: 'Real-time click data', description: 'see hits per variation as they arrive — no waiting for a batch report to tell you what\'s working.' },
    ]),
  },
  {
    mainTitle: 'Real-Time Analytics for Every Campaign Link',
    subTitle: 'See exactly where your clicks are coming from — device, location, and referrer — for every campaign redirect, updated as hits arrive.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Per-link analytics', description: 'track total clicks, unique visitors, and geographic breakdown for each redirect individually.' },
      { heading: 'Device and browser breakdown', description: 'understand whether your campaign audience is arriving on mobile or desktop — and which browsers dominate.' },
      { heading: 'CSV export', description: 'pull campaign data at any time to feed into your analytics stack, client reports, or BI tools.' },
    ]),
  },
]

// ─── Website Migrations ────────────────────────────────────────────────────────

const websiteMigrationsBlocks = [
  {
    mainTitle: 'Protect Your SEO Rankings Through the Move',
    subTitle: 'A migration without proper redirects doesn\'t just break links — it signals to search engines that pages no longer exist, destroying link equity built over years.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: '301 permanent redirects', description: 'signal to search engines that content has moved — not disappeared — preserving link equity and rankings.' },
      { heading: 'Wildcard domain redirects', description: 'point an entire old domain or subdomain to its new home with a single rule.' },
      { heading: 'HTTPS on every redirect', description: 'every migration redirect is served over HTTPS automatically — no insecure hop in the chain.' },
    ]),
  },
  {
    mainTitle: 'Map Hundreds of Pages in One Upload',
    subTitle: 'Manual URL mapping for large migrations invites errors. CSV import handles the heavy lifting — every source URL mapped to its correct destination at once.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Bulk CSV import', description: 'upload your full URL mapping — source, destination, and redirect type — in a single file.' },
      { heading: 'Preview before publishing', description: 'review every redirect before it goes live and catch mapping errors before users or search engines hit them.' },
      { heading: 'Page-to-page precision', description: 'map specific source URLs to exact destinations with full control over path and query string handling.' },
    ]),
  },
  {
    mainTitle: 'Go Live With Confidence, Not Fingers Crossed',
    subTitle: 'Before flipping the switch, validate that every redirect is correctly configured. Catch broken mappings before search engines and users do.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: 'Validation on import', description: 'broken or malformed destination URLs are flagged during upload — before they go live.' },
      { heading: 'Instant activation', description: 'when you\'re ready, redirects propagate globally in seconds — not hours.' },
      { heading: 'Disable instantly', description: 'turn off individual redirects immediately if something isn\'t right post-launch — no server access needed.' },
    ]),
  },
  {
    mainTitle: 'Monitor Post-Launch — Before Rankings Drop',
    subTitle: 'Traffic loss after a migration often doesn\'t show up in Search Console until days later. Destination monitoring gives you visibility the moment something breaks.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Destination health checks', description: 'automated checks alert you when a redirect destination goes down or returns an error.' },
      { heading: 'Error visibility', description: 'see which redirects are generating errors directly in your dashboard — act before Google recrawls.' },
      { heading: 'Always-on monitoring', description: 'continuous checks keep your migration redirects healthy long after launch day.' },
    ]),
  },
]

// ─── Scalable Enterprise Solutions ────────────────────────────────────────────

const enterpriseSolutionsBlocks = [
  {
    mainTitle: 'API-First — Automate Everything',
    subTitle: 'Marketing shouldn\'t wait on engineering to create a redirect. The API lets technical teams automate redirect management entirely — and gives non-technical teams a dashboard to move independently.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: 'Full REST API', description: 'create, update, and delete redirects programmatically — integrate with CI/CD pipelines, internal tooling, or custom workflows.' },
      { heading: 'Decouple marketing from engineering', description: 'marketers manage campaign links in the dashboard while developers automate the infrastructure — no bottlenecks.' },
      { heading: 'Reduce manual overhead', description: 'eliminate repetitive redirect tasks with API-driven automation — consistent, error-free, and scalable.' },
    ]),
  },
  {
    mainTitle: 'Bulk Operations at Enterprise Scale',
    subTitle: 'When a migration or reorganization means configuring thousands of redirect rules at once, CSV import handles it in minutes.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Upload thousands at once', description: 'CSV import handles bulk redirect creation — source, destination, type, and tags in a single file.' },
      { heading: 'Validate before publish', description: 'review and catch errors in your import before any redirects go live.' },
      { heading: 'Export on demand', description: 'download your full redirect inventory at any time for audits, compliance reporting, or migration handoffs.' },
    ]),
  },
  {
    mainTitle: 'Global Edge Network — No Latency Compromise',
    subTitle: 'Redirects are served from the edge location closest to each user — sub-100ms globally, at any volume, with automatic failover if a node goes down.',
    reverseOrder: false,
    features: toFeatureStrings([
      { heading: 'Sub-100ms globally', description: 'edge infrastructure delivers redirects from the nearest node — fast for users in every region.' },
      { heading: 'Auto-scaling', description: 'traffic spikes are absorbed automatically — no capacity planning, no performance degradation under load.' },
      { heading: '99.99% uptime', description: 'redundant infrastructure across regions keeps your redirects online — even during regional outages.' },
    ]),
  },
  {
    mainTitle: 'Security & Compliance Built In',
    subTitle: 'Automatic HTTPS, DDoS protection, role-based access, and access logs — the security baseline your compliance teams require, without additional configuration.',
    reverseOrder: true,
    features: toFeatureStrings([
      { heading: 'Automatic HTTPS & DDoS protection', description: 'every redirect is served over HTTPS with infrastructure-level DDoS mitigation — no manual security configuration.' },
      { heading: 'Role-based access control', description: 'assign granular permissions across your team — only authorized members can create or modify redirects.' },
      { heading: 'Access logs & data residency', description: 'detailed activity logs and data stored in US and EU regions — the audit trail and compliance boundary enterprise policies require.' },
    ]),
  },
]

// ─── Page definitions ──────────────────────────────────────────────────────────

interface FeatureBlock {
  mainTitle: string
  subTitle: string
  reverseOrder: boolean
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
    metaTitle: 'Domain Parking Redirects — Bulk HTTPS & Portfolio Management',
    metaDescription: 'Redirect parked domains instantly with automatic HTTPS, bulk management, and global edge infrastructure built for portfolios of any size — from dozens to hundreds of thousands.',
    heroHeadline: 'Turbocharge Your Domain Parking Business',
    heroSubheadline:
      'Instant redirects, automatic HTTPS for every domain, and the infrastructure to handle millions of hits per day — at a fraction of the cost of running it yourself.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: domainParkingBlocks,
    faqs: [
      {
        question: 'How do I redirect traffic from a parked domain?',
        answer:
          'Redirecting a parked domain means pointing all traffic from your domain to a destination URL — such as a landing page, affiliate offer, or main website. You connect your domain to a redirect service, configure the destination, and the service handles HTTPS and traffic routing automatically. With RedirHub, parked domain redirects go live instantly with automatic SSL — no server setup required.',
      },
      {
        question: 'Does domain parking affect SEO?',
        answer:
          'Domain parking can affect SEO when redirects are misconfigured or served without HTTPS. Parked domains that use 301 permanent redirects pass link equity to the destination, preserving SEO value. Domains served without HTTPS trigger browser security warnings, which reduces click-through rates and signals poor trust to search engines. Automatic SSL ensures every parked domain redirect is served securely.',
      },
      {
        question: 'How fast are redirects for parked domains?',
        answer:
          'Redirects are served from a global edge network within milliseconds — visitors experience no perceptible delay. Changes to destinations take effect globally in seconds, not hours, with no DNS propagation wait.',
      },
      {
        question: 'How do I manage redirects for thousands of domains?',
        answer:
          'Managing large domain portfolios requires bulk tools — manually configuring each domain individually is impractical at scale. CSV import lets you upload source domain, destination URL, and redirect type in a single file. Bulk actions let you update, enable, or disable groups of redirects at once. RedirHub\'s dashboard supports filtering and searching across thousands of domains from one account.',
      },
      {
        question: 'Does a domain parking redirect service have an API?',
        answer:
          'Yes. A redirect management API lets you automate domain parking operations programmatically — creating redirects, updating destinations, and managing bulk portfolios without the dashboard. RedirHub provides a REST API with full control over redirect rules, making it easy to integrate with affiliate networks, domain management tools, or internal workflows.',
      },
    ],
  },
  {
    title: 'Marketing Campaigns',
    slug: 'solutions/marketing-campaigns',
    metaTitle: 'URL Redirects for Marketing Campaigns — UTM Tracking & A/B Testing',
    metaDescription: 'Create branded campaign links with built-in UTM builder, A/B split testing, and real-time click analytics — no developers required, no attribution lost in the redirect.',
    heroHeadline: 'Marketing Campaigns',
    heroSubheadline:
      'Stop losing campaign attribution in redirect chains and worrying about link blacklisting. Branded custom domain links, built-in UTM tracking, and A/B testing — all managed from one dashboard.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: marketingCampaignsBlocks,
    faqs: [
      {
        question: 'Why are UTM parameters lost in redirects?',
        answer:
          'UTM parameters are lost when a redirect drops query strings before forwarding traffic to the destination. This breaks campaign attribution — clicks appear as direct traffic instead of being tied to their source. The fix is configuring the redirect to preserve or append query strings. RedirHub\'s query string forwarding and built-in UTM builder ensure parameters always reach the destination intact.',
      },
      {
        question: 'Why do affiliate and campaign links get flagged or banned?',
        answer:
          'Campaign and affiliate links get flagged by ad networks like Facebook and Google when they use shared shortener domains with poor reputation histories. If one user on a shared shortener violates platform policies, the entire domain can be blacklisted — taking every other user\'s campaigns down with it. Using your own branded custom domain for redirects eliminates this shared reputation risk entirely.',
      },
      {
        question: 'Can I run A/B testing with my redirects?',
        answer:
          'Yes. You can split traffic randomly across multiple destination URLs from a single source link — useful for testing different landing pages, offers, or messaging. Traffic is distributed automatically and you can swap or pause variations instantly from the dashboard without changing the link or running a deployment.',
      },
      {
        question: 'Can I monitor campaign performance in real time?',
        answer:
          'Yes. Real-time analytics are available for every redirect — showing total clicks, unique visitors, geographic breakdown, and device data as hits arrive. You can drill into any individual campaign link to see its full traffic history, or export data in CSV format for deeper analysis in your own tools.',
      },
      {
        question: 'How do I track which campaign channels are driving the most clicks?',
        answer:
          'Attach UTM parameters to every campaign redirect — source, medium, and campaign name — so your analytics tool can attribute each click to its correct channel. RedirHub\'s built-in UTM builder applies these parameters automatically to every hit, so you don\'t need to manually append them to destination URLs or risk them being stripped mid-redirect.',
      },
      {
        question: 'Can I automate campaign redirects?',
        answer:
          'Yes. Using the RedirHub API, you can programmatically create, update, and manage campaign redirects — useful for automating link generation at scale, integrating with internal tools, or managing campaigns across large numbers of destinations without manual dashboard work.',
      },
    ],
  },
  {
    title: 'Website Migrations',
    slug: 'solutions/website-migrations',
    metaTitle: 'Website Migration Redirects — Preserve SEO Rankings with 301s',
    metaDescription: 'Manage your entire website migration with bulk 301 redirects, validated URL mapping, and post-launch monitoring — without losing search rankings or organic traffic.',
    heroHeadline: 'Website Migrations',
    heroSubheadline:
      'A botched migration can wipe out years of SEO. Bulk 301 redirects, validated URL mapping, and post-launch monitoring keep your rankings and traffic intact through every URL change.',
    bannerStyle: 'default',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: websiteMigrationsBlocks,
    faqs: [
      {
        question: 'How do I set up 301 redirects for a website migration?',
        answer:
          'Setting up 301 redirects for a migration involves mapping every old URL to its new destination, then publishing those rules so search engines and users are forwarded correctly. The most efficient method is building a URL mapping in CSV format — source URL, destination URL, redirect type — and uploading it in bulk. RedirHub publishes the full mapping globally in seconds, with validation to catch broken destinations before they go live.',
      },
      {
        question: 'Will my SEO be affected during migration?',
        answer:
          'Not if redirects are configured correctly. 301 permanent redirects signal to search engines that content has moved — preserving link equity and rankings. Temporary or missing redirects cause search engines to treat old pages as deleted, which drops rankings. Serving all redirects over HTTPS is equally important — an insecure hop in the chain can dilute the trust signals passed between URLs.',
      },
      {
        question: 'Do redirect chains hurt SEO?',
        answer:
          'Yes. Redirect chains — where a URL redirects through multiple hops before reaching its destination — dilute link equity at each step and increase page load latency. Search engines recommend keeping redirect paths to a single hop. When migrating, map every old URL directly to its final destination rather than routing through intermediate URLs. This preserves as much link equity as possible and keeps redirect speed fast.',
      },
      {
        question: 'Why did my traffic drop after a website migration?',
        answer:
          'Traffic drops after a migration are usually caused by missing or misconfigured redirects — old URLs returning 404 errors instead of forwarding to their new equivalents. Search engines then index those URLs as dead pages, dropping their rankings. Other causes include redirect chains diluting link equity, non-HTTPS redirects signalling insecurity, or destination URLs returning errors. Monitoring redirect health after launch catches these issues before rankings are permanently affected.',
      },
      {
        question: 'How fast are redirects applied during migration?',
        answer:
          'Redirects go live globally within seconds of being published — propagating across RedirHub\'s edge network instantly. There is no deployment pipeline or DNS propagation delay to wait for.',
      },
    ],
  },
  {
    title: 'Scalable Enterprise Solutions',
    slug: 'solutions/scalable-enterprise-solutions',
    metaTitle: 'Enterprise URL Redirect Infrastructure — API, Scale & Compliance',
    metaDescription: 'Automate redirect management via API, deploy across a global edge network, and meet enterprise SLAs — with role-based access, DDoS protection, and compliance-ready infrastructure.',
    heroHeadline: 'Scalable Enterprise Solutions',
    heroSubheadline:
      'Replace legacy redirect servers with API-driven, globally distributed infrastructure — built for the reliability, security, and compliance standards enterprise operations require.',
    bannerStyle: 'dark',
    ctaPrimaryLabel: 'Get Started For Free',
    ctaPrimaryUrl: 'https://dash.redirhub.com/register',
    ctaNote: '*No Credit Card Needed. Cancel Anytime.',
    blocks: enterpriseSolutionsBlocks,
    faqs: [
      {
        question: 'How do I replace Nginx or Apache redirects with a managed service?',
        answer:
          'Replacing self-hosted redirect configs with a managed service involves exporting your existing redirect rules, importing them via CSV or API, then updating DNS to route traffic through the new service. The main advantage is eliminating SSH access for simple changes, removing manual SSL certificate management, and decoupling redirect changes from deployment pipelines. RedirHub accepts bulk CSV imports and provides a REST API for full migration automation.',
      },
      {
        question: 'Can I automate redirects for multiple domains?',
        answer:
          'Yes. The RedirHub API supports full programmatic control — creating, updating, and deleting redirects across any number of domains without using the dashboard. Combined with CSV import/export, you can automate bulk updates, sync redirect rules with internal systems, and integrate redirect management into CI/CD pipelines or custom tooling.',
      },
      {
        question: 'Can I scale redirects globally without latency issues?',
        answer:
          'Yes. Redirects are served from the edge location nearest to each user — delivering sub-100ms response times globally without centralized server bottlenecks. The infrastructure auto-scales under traffic spikes automatically, and redundant nodes across regions maintain 99.99% uptime even during regional outages.',
      },
      {
        question: 'How do enterprise URL redirects handle security and compliance?',
        answer:
          'Enterprise redirect management should include automatic HTTPS on all redirects, DDoS protection at the infrastructure level, and role-based access control so only authorized team members can create or modify rules. RedirHub includes all three by default, along with access logs for audit trails and data storage in US and EU regions to meet data residency requirements.',
      },
      {
        question: 'Can I monitor and report on enterprise redirects?',
        answer:
          'Yes. Real-time analytics are available across all domains and redirects — tracking traffic volume, geographic breakdown, device data, and errors. Data can be exported in CSV format for integration with enterprise dashboards or BI tools, and scheduled weekly and monthly email reports provide automated summaries without requiring manual exports.',
      },
    ],
  },
]

// ─── Migration runner ──────────────────────────────────────────────────────────

function buildRichContent(blocks: FeatureBlock[]) {
  return blocks.map((block, i) => ({
    _type: 'feature',
    _key: `block-${i}`,
    mainTitle: block.mainTitle,
    subTitle: block.subTitle,
    reverseOrder: block.reverseOrder,
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
      content: buildRichContent(page.blocks),
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
