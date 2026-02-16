#!/usr/bin/env tsx
/**
 * Static Changelog Data to Sanity Migration Script
 *
 * Migrates fake changelog entries to Sanity CMS with dates adjusted to 1 year ago
 *
 * Usage: npm run migrate:changelog
 */

import { writeClient } from '../src/sanity/lib/client'
import { parse } from 'node-html-parser'
import { randomUUID } from 'crypto'

const DEFAULT_LOCALE = 'en'

// Import static changelog data
const staticEntries = [
  {
    slug: 'advanced-analytics-dashboard',
    title: 'Advanced Analytics Dashboard',
    description: 'Track redirect performance with detailed metrics, including geographic distribution, device types, and time-based analytics.',
    date: '2026-02-13',
    content: `
      <p>We are excited to introduce our new Advanced Analytics Dashboard, giving you deeper insights into your redirect performance.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Real-time traffic visualization with interactive charts</li>
        <li>Geographic heat maps showing where your traffic comes from</li>
        <li>Device and browser breakdowns for better targeting</li>
        <li>Time-based analytics to identify peak traffic periods</li>
        <li>Export data in CSV or JSON formats</li>
      </ul>
      <p>The new dashboard is available to all users and can be accessed from your main navigation menu.</p>
    `,
  },
  {
    slug: 'bulk-redirect-import',
    title: 'Bulk Redirect Import',
    description: 'Import hundreds of redirects at once using CSV files. Perfect for website migrations and large-scale redirect management.',
    date: '2026-02-10',
    content: `
      <p>Managing large numbers of redirects just got easier with our new Bulk Import feature.</p>
      <h3>How It Works</h3>
      <p>Simply upload a CSV file with your redirect rules, and we'll process them in seconds. The import tool validates each entry and provides detailed error reporting if any issues are found.</p>
      <h3>Supported Formats</h3>
      <ul>
        <li>CSV files with source URL, destination URL, and redirect type</li>
        <li>Optional metadata like expiration dates and tags</li>
        <li>Support for up to 10,000 redirects per import</li>
      </ul>
    `,
  },
  {
    slug: 'faster-dashboard-loading',
    title: 'Faster Dashboard Loading',
    description: 'We have optimized our dashboard loading times by 60%. Experience lightning-fast performance when managing your redirects.',
    date: '2026-02-08',
    content: `
      <p>We have been hard at work optimizing the performance of our dashboard, and the results speak for themselves.</p>
      <h3>Performance Improvements</h3>
      <ul>
        <li>60% faster initial page load</li>
        <li>Reduced database queries by implementing smart caching</li>
        <li>Optimized frontend bundle size</li>
        <li>Improved rendering performance for large redirect lists</li>
      </ul>
      <p>These improvements benefit all users, especially those managing thousands of redirects.</p>
    `,
  },
  {
    slug: 'custom-domain-support',
    title: 'Custom Domain Support',
    description: 'Use your own branded domains for redirects. Set up custom domains with automatic SSL certificate provisioning.',
    date: '2026-02-05',
    content: `
      <p>Take your redirect branding to the next level with custom domain support.</p>
      <h3>Features</h3>
      <ul>
        <li>Add unlimited custom domains to your account</li>
        <li>Automatic SSL certificate provisioning via Let's Encrypt</li>
        <li>DNS verification wizard for easy setup</li>
        <li>Custom domain analytics and tracking</li>
      </ul>
      <p>Custom domains are available on Pro and Enterprise plans.</p>
    `,
  },
  {
    slug: 'realtime-collaboration',
    title: 'Real-time Collaboration',
    description: 'Work with your team in real-time. See live updates when team members create or modify redirects.',
    date: '2026-02-01',
    content: `
      <p>Collaboration just got better with real-time updates across your team.</p>
      <h3>What's New</h3>
      <ul>
        <li>See live indicators when team members are viewing or editing redirects</li>
        <li>Instant notifications when redirects are created, updated, or deleted</li>
        <li>Conflict resolution for simultaneous edits</li>
        <li>Activity feed showing recent team actions</li>
      </ul>
      <p>This feature is available on Team and Enterprise plans.</p>
    `,
  },
  {
    slug: 'enhanced-error-messages',
    title: 'Enhanced Error Messages',
    description: 'Better error messages and validation feedback help you troubleshoot issues faster and more effectively.',
    date: '2026-01-28',
    content: `
      <p>We have completely redesigned our error messaging system to provide clearer, more actionable feedback.</p>
      <h3>Improvements</h3>
      <ul>
        <li>More descriptive error messages with suggested solutions</li>
        <li>Inline validation for forms with real-time feedback</li>
        <li>Helpful links to documentation for common issues</li>
        <li>Better formatting for API error responses</li>
      </ul>
    `,
  },
  {
    slug: 'api-rate-limit-increase',
    title: 'API Rate Limit Increase',
    description: 'We have increased API rate limits across all plans. Pro users now get 10,000 requests per hour.',
    date: '2026-01-25',
    content: `
      <p>Based on user feedback, we've significantly increased our API rate limits.</p>
      <h3>New Rate Limits</h3>
      <ul>
        <li>Free plan: 1,000 requests/hour (previously 500)</li>
        <li>Pro plan: 10,000 requests/hour (previously 5,000)</li>
        <li>Enterprise plan: Custom limits available</li>
      </ul>
      <p>These changes are effective immediately for all users.</p>
    `,
  },
  {
    slug: 'mobile-responsive-improvements',
    title: 'Mobile Responsive Improvements',
    description: 'The entire dashboard has been optimized for mobile devices. Manage redirects on the go with ease.',
    date: '2026-01-22',
    content: `
      <p>We have rebuilt our mobile experience from the ground up.</p>
      <h3>Mobile Enhancements</h3>
      <ul>
        <li>Fully responsive dashboard that works on all screen sizes</li>
        <li>Touch-optimized controls for easier interaction</li>
        <li>Simplified navigation for mobile users</li>
        <li>Faster loading on mobile networks</li>
      </ul>
      <p>Try it out on your smartphone or tablet today!</p>
    `,
  },
  {
    slug: 'geographic-routing',
    title: 'Geographic Routing',
    description: 'Route users to different destinations based on their geographic location. Perfect for international campaigns.',
    date: '2026-01-18',
    content: `
      <p>Introducing geographic routing - redirect users to different destinations based on their location.</p>
      <h3>Use Cases</h3>
      <ul>
        <li>Send users to localized landing pages based on country</li>
        <li>Route traffic to regional stores or distributors</li>
        <li>Comply with regional regulations and content requirements</li>
        <li>A/B test campaigns across different geographic markets</li>
      </ul>
      <p>Geographic routing is available on Pro and Enterprise plans.</p>
    `,
  },
  {
    slug: 'dark-mode-enhancements',
    title: 'Dark Mode Enhancements',
    description: 'Improved dark mode with better contrast and refined color palette. Easy on the eyes during late-night work sessions.',
    date: '2026-01-15',
    content: `
      <p>We have refined our dark mode with improved colors and better accessibility.</p>
      <h3>What's Improved</h3>
      <ul>
        <li>Higher contrast for better readability</li>
        <li>Refined color palette that's easier on the eyes</li>
        <li>Better syntax highlighting for code snippets</li>
        <li>Consistent dark mode across all pages and components</li>
      </ul>
      <p>Toggle dark mode from the settings menu or use system preferences.</p>
    `,
  },
  {
    slug: 'team-management-updates',
    title: 'Team Management Updates',
    description: 'New role-based permissions and team management features. Control who can view, edit, and delete redirects.',
    date: '2026-01-10',
    content: `
      <p>Take control of team access with our enhanced team management features.</p>
      <h3>New Capabilities</h3>
      <ul>
        <li>Role-based permissions (Admin, Editor, Viewer)</li>
        <li>Granular access control for individual redirects</li>
        <li>Team activity logs and audit trails</li>
        <li>Invitation management and onboarding workflows</li>
      </ul>
    `,
  },
  {
    slug: 'performance-optimizations',
    title: 'Performance Optimizations',
    description: 'System-wide performance improvements reduce redirect latency by 40%. Your users will notice the difference.',
    date: '2026-01-05',
    content: `
      <p>We have optimized our infrastructure to deliver faster redirects worldwide.</p>
      <h3>Technical Improvements</h3>
      <ul>
        <li>40% reduction in average redirect latency</li>
        <li>Expanded CDN coverage to 150+ locations</li>
        <li>Optimized database queries and caching strategies</li>
        <li>Improved handling of high-traffic redirects</li>
      </ul>
    `,
  },
  {
    slug: 'security-updates',
    title: 'Security Updates',
    description: 'Enhanced security measures including 2FA, session management improvements, and stricter API authentication.',
    date: '2026-01-01',
    content: `
      <p>Security is our top priority. This update brings several important security enhancements.</p>
      <h3>Security Features</h3>
      <ul>
        <li>Two-factor authentication (2FA) support</li>
        <li>Improved session management and timeout policies</li>
        <li>Stricter API authentication requirements</li>
        <li>Enhanced encryption for sensitive data</li>
        <li>Security headers and CSP improvements</li>
      </ul>
    `,
  },
  {
    slug: 'ui-refresh',
    title: 'UI Refresh',
    description: 'A refreshed user interface with modern design, improved navigation, and better accessibility throughout.',
    date: '2025-12-28',
    content: `
      <p>We have given our interface a fresh new look while maintaining the familiar workflow you love.</p>
      <h3>Design Updates</h3>
      <ul>
        <li>Modern, clean interface with improved visual hierarchy</li>
        <li>Better spacing and typography for improved readability</li>
        <li>Enhanced accessibility with WCAG 2.1 AA compliance</li>
        <li>Streamlined navigation and information architecture</li>
      </ul>
    `,
  },
  {
    slug: 'webhook-support',
    title: 'Webhook Support',
    description: 'Integrate with your existing tools using webhooks. Get real-time notifications when redirects are accessed.',
    date: '2025-12-25',
    content: `
      <p>Connect RedirHub to your existing workflows with webhook support.</p>
      <h3>Webhook Events</h3>
      <ul>
        <li>Redirect created, updated, or deleted</li>
        <li>Redirect accessed (with configurable triggers)</li>
        <li>Analytics milestones reached</li>
        <li>Team member actions</li>
      </ul>
      <p>Configure webhooks from your account settings. Available on Pro and Enterprise plans.</p>
    `,
  },
]

// Generate unique key for Portable Text blocks
const genKey = (): string =>
  typeof randomUUID === 'function'
    ? randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

// Convert HTML to Portable Text blocks
function htmlToPortableText(html: string): any[] {
  const blocks: any[] = []
  const root = parse(html.trim())

  root.childNodes.forEach((node: any) => {
    if (node.nodeType === 3) {
      // Text node
      const text = node.text.trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: genKey(),
          style: 'normal',
          children: [{ _type: 'span', _key: genKey(), text, marks: [] }],
          markDefs: [],
        })
      }
    } else if (node.nodeType === 1) {
      // Element node
      const tagName = node.tagName.toLowerCase()

      if (tagName === 'p') {
        const text = node.text.trim()
        if (text) {
          blocks.push({
            _type: 'block',
            _key: genKey(),
            style: 'normal',
            children: [{ _type: 'span', _key: genKey(), text, marks: [] }],
            markDefs: [],
          })
        }
      } else if (tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
        const text = node.text.trim()
        if (text) {
          blocks.push({
            _type: 'block',
            _key: genKey(),
            style: tagName,
            children: [{ _type: 'span', _key: genKey(), text, marks: [] }],
            markDefs: [],
          })
        }
      } else if (tagName === 'ul' || tagName === 'ol') {
        const listItems = node.querySelectorAll('li')
        listItems.forEach((li: any) => {
          const text = li.text.trim()
          if (text) {
            blocks.push({
              _type: 'block',
              _key: genKey(),
              style: 'normal',
              listItem: tagName === 'ul' ? 'bullet' : 'number',
              children: [{ _type: 'span', _key: genKey(), text, marks: [] }],
              markDefs: [],
            })
          }
        })
      }
    }
  })

  return blocks
}

// Adjust date to 1 year ago
function adjustDateToOneYearAgo(dateString: string): string {
  const date = new Date(dateString)
  date.setFullYear(date.getFullYear() - 1)
  return date.toISOString()
}

// Main migration function
async function migrateChangelog() {
  console.log('🚀 Starting changelog migration...\n')

  let successCount = 0
  let errorCount = 0

  for (const entry of staticEntries) {
    try {
      console.log(`📝 Migrating: ${entry.title}`)

      // Convert HTML content to Portable Text
      const portableTextContent = htmlToPortableText(entry.content)

      // Adjust date to 1 year ago
      const adjustedDate = adjustDateToOneYearAgo(entry.date)

      // Create Sanity document
      const doc = {
        _type: 'changelog',
        title: entry.title,
        slug: {
          _type: 'slug',
          current: entry.slug,
        },
        description: entry.description,
        content: portableTextContent,
        publishedAt: adjustedDate,
        locale: DEFAULT_LOCALE,
        needsTranslation: false,
      }

      // Create document in Sanity
      const result = await writeClient.create(doc)
      console.log(`   ✅ Created with ID: ${result._id}`)
      console.log(`   📅 Date adjusted: ${entry.date} → ${adjustedDate.split('T')[0]}`)
      successCount++
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ Successfully migrated: ${successCount} entries`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} entries`)
  }
  console.log('='.repeat(60))
}

// Run migration
migrateChangelog()
  .then(() => {
    console.log('\n✨ Migration completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
