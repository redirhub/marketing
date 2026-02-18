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
    metaTitle: 'Create 301, 302 & Wildcard Redirects',
    metaDescription: 'Create 301, 302, and wildcard redirects in seconds — with bulk CSV import, UTM parameter builder, path forwarding, and instant global deployment. No server config required.',
    heroHeadline: 'Create Redirects',
    heroSubheadline: 'Stop waiting on developers. Set up any redirect — from a single page forward to an entire wildcard domain — in seconds, live worldwide the moment you save.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Live in Seconds, Not Deployment Cycles',
        subTitle: 'Create a redirect and it goes live across our global edge network instantly — no config files, no server restarts, no tickets to IT.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Any redirect type', description: '301 permanent, 302 temporary, 307, 308 — choose the right type for your use case without guessing.' },
          { heading: 'Real-time validation', description: 'Broken or malformed destination URLs are flagged before you save.' },
          { heading: 'Instant propagation', description: 'Changes go live globally the moment you hit save — no DNS wait, no deployment pipeline.' },
        ]),
      },
      {
        mainTitle: 'Flexible Rules for Any URL Structure',
        subTitle: 'From a single page redirect to an entire domain — configure rules that match exactly how your URLs work.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Wildcard domains', description: 'Point an entire domain or subdomain to a new destination with one rule — *.brand.com covered in seconds.' },
          { heading: 'Page-to-page redirects', description: 'Map specific source URLs to exact destinations, with full control over path and query string behavior.' },
          { heading: 'Path forwarding', description: 'Preserve the full URL path automatically — so a.com/page lands at b.com/page without extra configuration.' },
          { heading: 'Query string forwarding', description: 'Forward query parameters to the destination — so a.com/?ref=x carries through to b.com/?ref=x intact.' },
        ]),
      },
      {
        mainTitle: 'Stop Losing Campaign Attribution',
        subTitle: 'UTM parameters stripped in a redirect chain cost you attribution data. RedirHub appends them at the infrastructure level — they cannot be dropped.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'UTM builder', description: 'Set source, medium, campaign, term, and content once — applied to every hit through that redirect automatically.' },
          { heading: 'No manual string-building', description: 'UTMs are configured in the dashboard, not pasted into URLs by hand — no human error, no missing parameters.' },
          { heading: 'Tagging', description: 'Tag redirects by campaign, channel, or team for easy filtering and reporting.' },
        ]),
      },
      {
        mainTitle: 'Hundreds of Redirects in One Upload',
        subTitle: 'When a migration or rebranding means setting up hundreds of routes at once, CSV import eliminates the manual work entirely.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'CSV import', description: 'Upload source URL, destination, redirect type, and tags in a single file — live in one click.' },
          { heading: 'Preview before publishing', description: 'Review every redirect before it goes live to catch mapping errors before users hit them.' },
          { heading: 'Export anytime', description: 'Download your full redirect list for audits, migrations, or backups.' },
        ]),
      },
      {
        mainTitle: 'Full HTTPS on Every Redirect You Create',
        subTitle: 'Every redirect — whether for one domain or a thousand — is served over HTTPS automatically. No certificate purchase, no renewal reminder.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Wildcard SSL', description: 'Auto-provisioned certificates cover all subdomains of a domain from day one.' },
          { heading: 'HTTP to HTTPS upgrade', description: 'Visitors arriving over HTTP are silently upgraded — no mixed content warnings, no browser security errors.' },
          { heading: 'Custom certificates', description: 'Upload your own SSL certificate for compliance or enterprise requirements.' },
        ]),
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a 301 and 302 redirect?',
        answer: 'A 301 is a permanent redirect — it tells search engines the page has moved for good, passing link equity to the new URL. A 302 is a temporary redirect — search engines keep the original URL indexed and do not transfer link equity. Use 301 for migrations and permanent URL changes. Use 302 for short-term redirects such as maintenance pages or split tests.',
      },
      {
        question: 'How do I set up a wildcard domain redirect?',
        answer: 'A wildcard domain redirect routes all traffic from an entire domain or subdomain to a single destination using one rule — for example, pointing every variation of an old brand domain to your main site. In RedirHub, you add the domain with a wildcard record and set the destination URL. Automatic SSL covers all subdomains from the same rule.',
      },
      {
        question: 'How do I bulk upload redirects from a CSV file?',
        answer: 'Prepare a CSV file with columns for source URL, destination URL, and redirect type. Upload it through the RedirHub dashboard and preview all entries before publishing. Broken or malformed destination URLs are flagged during the import review so you can fix mapping errors before any redirect goes live.',
      },
      {
        question: 'What are UTM parameters and how do I add them to a redirect?',
        answer: 'UTM parameters are tags appended to a destination URL that tell analytics tools where a visitor came from — source, medium, campaign, term, and content. Instead of pasting them manually into every URL, RedirHub\'s UTM builder lets you configure them once per redirect and applies them automatically to every hit, preventing them from being stripped mid-redirect.',
      },
      {
        question: 'How do I redirect a domain without losing SEO?',
        answer: 'Use a 301 permanent redirect from the old domain to the new one. This signals to search engines that the content has moved permanently and passes link equity to the destination. Ensure the redirect is served over HTTPS — an insecure hop breaks the trust signal chain. Avoid redirect chains by pointing directly to the final destination URL.',
      },
    ],
  },
  {
    title: 'Manage Redirects',
    slug: 'manage-redirects',
    metaTitle: 'URL Redirect Management Dashboard',
    metaDescription: 'Manage all your redirects from one dashboard — search, filter, bulk edit, and monitor destination health across every domain. No server access needed.',
    heroHeadline: 'Manage Redirects',
    heroSubheadline: 'Your entire redirect inventory — searchable, editable, and monitored in real time. Make any change and it\'s live globally in seconds.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Find Any Redirect Instantly',
        subTitle: 'When you\'re managing redirects across multiple domains and campaigns, the ability to find what you need in seconds matters more than you\'d think.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Global search', description: 'Find any redirect by source URL, destination, tag, or domain — across your entire account.' },
          { heading: 'Smart filters', description: 'Narrow by status, redirect type, domain, or creation date to surface exactly what you need.' },
          { heading: 'Tag-based organization', description: 'Group redirects by project, campaign, or team — and filter down to just that group in one click.' },
        ]),
      },
      {
        mainTitle: 'Update Any Redirect Without a Deployment',
        subTitle: 'Change a destination URL, swap a redirect type, or kill a campaign link — it\'s live worldwide the moment you save.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Change destination anytime', description: 'Update where any redirect points without disrupting the source URL or losing traffic.' },
          { heading: 'Enable or disable instantly', description: 'Pause or reactivate redirects in one click — for seasonal campaigns, maintenance windows, or quick rollbacks.' },
          { heading: 'No server access needed', description: 'Every update happens in the dashboard — no config files, no SSH, no waiting on IT.' },
        ]),
      },
      {
        mainTitle: 'Catch Broken Destinations Before Your Users Do',
        subTitle: 'A redirect pointing to a dead page fails silently. Automated destination monitoring alerts you when something breaks — before it becomes a support ticket.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Destination health checks', description: 'Automated checks alert you when a destination URL goes down or starts returning errors.' },
          { heading: 'Fallback destinations', description: 'Set a backup URL for any redirect — traffic is caught automatically if the primary destination fails.' },
          { heading: 'Error visibility', description: 'See which redirects are returning errors directly in your dashboard — no manual spot-checking required.' },
        ]),
      },
      {
        mainTitle: 'Bulk Operations for the Heavy Lifting',
        subTitle: 'When you need to act on dozens or hundreds of redirects at once, batch edits and mass actions cut the work down to seconds.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Batch updates', description: 'Modify destinations, types, or tags across multiple redirects in a single operation.' },
          { heading: 'Mass actions', description: 'Enable, disable, retag, or delete multiple redirects at once — no one-by-one clicking.' },
          { heading: 'CSV export', description: 'Download your full redirect inventory at any time for audits, client reporting, or migration handoffs.' },
        ]),
      },
    ],
  },
  {
    title: 'Analyze Redirects',
    slug: 'analyze-redirects',
    metaTitle: 'Redirect Traffic Analytics & Click Tracking',
    metaDescription: 'Track clicks, unique visitors, geographic data, and device breakdown for every redirect — with real-time logs and automated weekly reports.',
    heroHeadline: 'Analyze Redirects',
    heroSubheadline: 'See exactly who clicks your redirects, where they come from, and when — in real time. No guesswork, no waiting for a report to run.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'See the Full Picture Across Every Redirect',
        subTitle: 'Total clicks, unique visitors, QR scans — everything in one dashboard so you always know what\'s performing and what\'s not.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Total clicks', description: 'See total hits per redirect with hourly distribution to spot traffic patterns and spikes as they happen.' },
          { heading: 'Unique visitors', description: 'Separate returning users from first-time visitors to understand true reach, not just raw volume.' },
          { heading: 'QR scan tracking', description: 'Monitor QR code performance separately from URL click-throughs — useful for offline campaigns and print assets.' },
        ]),
      },
      {
        mainTitle: 'Know Your Audience — Location, Device, Referrer',
        subTitle: 'Understand who is clicking your redirects — where they are, what device they are on, and which domain is sending them.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Geographic breakdown', description: 'Country and city-level location data for every redirect — see where your traffic actually originates.' },
          { heading: 'Device and browser', description: 'Mobile vs desktop split, browser breakdown — know how your audience accesses your links.' },
          { heading: 'Domain-level traffic', description: 'Compare traffic across domains and subdomains in one view to see which properties are driving volume.' },
        ]),
      },
      {
        mainTitle: 'Real-Time Activity — No More Guessing',
        subTitle: 'See every visit as it happens. The live log shows timestamps, locations, and device info so you catch anomalies the moment they occur.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Live activity log', description: 'A real-time stream of recent visits with timestamp, location, and device — updated as hits come in.' },
          { heading: 'Per-redirect detail', description: 'Drill into any individual redirect to see its full traffic history, not just aggregate totals.' },
          { heading: 'Error visibility', description: 'Spot redirects generating errors or unusual patterns immediately — before users report them.' },
        ]),
      },
      {
        mainTitle: 'Reports Delivered Without You Asking',
        subTitle: 'Weekly and monthly performance summaries land in your inbox automatically. No dashboards to check, no exports to schedule.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Scheduled email reports', description: 'Weekly and monthly summaries of your redirect performance delivered directly to your inbox.' },
          { heading: 'Raw log pipeline', description: 'Access full raw traffic logs for deeper analysis in your own BI tools or data warehouse.' },
          { heading: 'Export on demand', description: 'Pull data at any time for client reports, audits, or custom analysis — no access restrictions.' },
        ]),
      },
    ],
  },
  {
    title: 'Team Management',
    slug: 'team-management',
    metaTitle: 'Team Access Control & Permissions for Redirects',
    metaDescription: 'Invite your team, assign role-based permissions, and control access by domain — so marketers move fast and infrastructure stays protected.',
    heroHeadline: 'Team Management',
    heroSubheadline: 'Give every team member exactly the access they need — no more, no less. Marketers move fast, infrastructure stays protected.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Role-Based Access — Not Everyone Needs the Keys',
        subTitle: 'Marketers don\'t need admin access. Developers don\'t need to approve every campaign link. Role-based permissions let each person do their job without stepping on anyone else\'s.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Role-based permissions', description: 'Define what each team member can see and change — full admin, edit access, or view-only.' },
          { heading: 'Granular domain control', description: 'Restrict access at the domain level — a team managing one brand has no visibility into another.' },
          { heading: 'Unlimited team members', description: 'Invite your entire team without per-seat pricing penalties scaling against you.' },
        ]),
      },
      {
        mainTitle: 'Stop Being the Bottleneck',
        subTitle: 'Every time marketing waits on IT to create a redirect, campaign momentum is lost. The right access model lets each team move independently — without risk.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Self-serve for non-technical teams', description: 'Marketers and campaign managers create and update redirects themselves — no tickets, no waiting on developers.' },
          { heading: 'No shared credentials', description: 'Every team member logs in with their own account — access is individual, traceable, and revocable instantly.' },
          { heading: 'SSO support', description: 'Connect RedirHub to your identity provider for centralized access management across your organization.' },
        ]),
      },
      {
        mainTitle: 'Built for Agencies and Multi-Brand Teams',
        subTitle: 'Managing redirects for multiple clients or brands from one account — with clean separation between each.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Per-domain organization', description: 'Redirects are organized by domain so each team or client sees only what is relevant to them.' },
          { heading: 'Centralized oversight', description: 'One account to manage everything — delegate to teams while keeping full visibility at the top level.' },
          { heading: 'Instant access revocation', description: 'Remove a team member\'s access immediately when needed — their changes remain, their access does not.' },
        ]),
      },
    ],
  },
  {
    title: 'Global Scale',
    slug: 'global-scale',
    metaTitle: 'Global Edge Network for Fast, Reliable URL Redirects',
    metaDescription: 'Serve redirects from the edge closest to your users — sub-100ms latency, 99.99% uptime, automatic failover, and DDoS protection across every domain.',
    heroHeadline: 'Global Scale',
    heroSubheadline: 'Every redirect resolves from the edge location nearest to your user. Sub-100ms latency, worldwide — whether you manage five domains or fifty thousand.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'Sub-100ms Redirects, Anywhere in the World',
        subTitle: 'Redirect latency is not just a technical metric — a slow redirect loses conversions, frustrates users, and signals poor performance to search engines.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Edge network', description: 'Requests are served from the nearest edge location — cutting round-trip time to a minimum for users everywhere.' },
          { heading: 'Redirect to the fastest target', description: 'When a redirect has multiple destinations, traffic is automatically routed to the fastest-responding one.' },
          { heading: 'Instant propagation', description: 'Changes you make in the dashboard reach every edge location in seconds — not hours.' },
        ]),
      },
      {
        mainTitle: 'Scales to Any Volume Without Configuration',
        subTitle: 'Whether you\'re parking ten domains or handling millions of hits a day, the infrastructure adjusts automatically — no capacity planning, no manual intervention.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Auto-scaling', description: 'Traffic spikes are absorbed automatically — performance stays consistent whether you\'re sending ten hits or ten million.' },
          { heading: '99.99% uptime', description: 'Redundant infrastructure across regions keeps your redirects online — even during regional outages.' },
          { heading: 'Automatic failover', description: 'If a node becomes unavailable, traffic is rerouted instantly with no downtime for your users.' },
        ]),
      },
      {
        mainTitle: 'Every Domain Format, Every Language',
        subTitle: 'International domains, non-Latin scripts, multilingual portfolios — all handled correctly with no encoding issues or special configuration.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'IDN support', description: 'International domain names including non-Latin scripts are resolved and redirected correctly — no workarounds required.' },
          { heading: 'Wildcard SSL at scale', description: 'Auto-provisioned HTTPS for every domain in your portfolio, renewed automatically with zero manual steps.' },
          { heading: 'Thousands of domains, one account', description: 'Manage domain portfolios of any size from a single dashboard — consistent performance across all of them.' },
        ]),
      },
      {
        mainTitle: 'Infrastructure-Grade Reliability',
        subTitle: 'DDoS protection and continuous monitoring mean your redirects stay online under attack, during traffic surges, and at any hour.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'DDoS protection', description: 'Advanced protection keeps redirects online under distributed attack conditions — no manual response required.' },
          { heading: 'Infrastructure monitoring', description: 'Continuous checks across the global network with instant response to any performance issue.' },
          { heading: 'Consistent SLA', description: '99.99% uptime across our global network — the reliability level that enterprise and high-volume operations require.' },
        ]),
      },
    ],
  },
  {
    title: 'Security & Privacy',
    slug: 'security',
    metaTitle: 'Secure URL Redirects — Auto HTTPS & Bot Protection',
    metaDescription: 'Every redirect is served over HTTPS automatically — with bot protection, DDoS mitigation, and access logs built in. No certificates to manage, no security warnings.',
    heroHeadline: 'Security & Privacy',
    heroSubheadline: 'Automatic HTTPS on every redirect, bot filtering at the edge, and access logs that tell you exactly what changed and when — without adding complexity to your workflow.',
    bannerStyle: 'default' as const,
    blocks: [
      {
        mainTitle: 'No More "Connection Not Secure" Warnings',
        subTitle: 'Every redirect is served over HTTPS automatically — certificates provision on first use and renew before they expire. Users never see a browser security warning.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Auto SSL', description: 'Certificates provision automatically for every domain — no purchase, no manual setup, no renewal reminders.' },
          { heading: 'HTTPS enforcement', description: 'HTTP visitors are silently upgraded to HTTPS — no mixed content warnings, no "Connection Not Secure" errors.' },
          { heading: 'Custom certificates', description: 'Upload your own SSL certificate for enterprise, compliance, or branding requirements.' },
        ]),
      },
      {
        mainTitle: 'Bot Filtering — Without Blocking Real Traffic',
        subTitle: 'Malicious bots inflate click counts, drain request quotas, and can get your domains flagged by ad networks. Edge-level filtering stops them before they reach your redirects.',
        reverseOrder: true,
        features: toFeatureStrings([
          { heading: 'Bot protection', description: 'Block malicious crawlers and scrapers while allowing legitimate search engine bots to pass through cleanly.' },
          { heading: 'DDoS protection', description: 'Infrastructure-level protection keeps your redirects online under distributed attack conditions — no manual response needed.' },
          { heading: 'Security plugins', description: 'Additional security layers configurable per redirect — for high-value or sensitive destination URLs.' },
        ]),
      },
      {
        mainTitle: 'Compliance-Ready Infrastructure',
        subTitle: 'Access logs, role-based access control, and data stored in US and EU regions — the baseline your security and compliance teams require.',
        reverseOrder: false,
        features: toFeatureStrings([
          { heading: 'Access logs', description: 'Detailed logs of redirect activity and configuration changes — traceable when something goes wrong or needs auditing.' },
          { heading: 'Data residency', description: 'Traffic data is processed and stored in US and EU regions — no unexpected data routing outside your compliance boundary.' },
          { heading: 'Role-based access control', description: 'Only authorized team members can create or modify redirects — access is individual, traceable, and revocable.' },
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
