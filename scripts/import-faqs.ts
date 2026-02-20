#!/usr/bin/env tsx
/**
 * FAQ Migration Script
 * Stores FAQs for enterprise and pricing pages to Sanity
 * Note: Other pages have been converted to standard landingPage type
 *
 * Usage: npm run migrate:faqs
 */

import { writeClient } from '../src/sanity/lib/client'
import { randomUUID } from 'crypto'

const DEFAULT_LOCALE = 'en'

interface FAQ {
  question: string
  answer: string
}

interface FAQData {
  pageSlug: string
  faqs: FAQ[]
}

// FAQ data for enterprise and pricing pages
// Other pages have been converted to standard landingPage type
const FAQ_PAGES: FAQData[] = [
  {
    pageSlug: 'pricing',
    faqs: [
      {
        question: "Do you offer a free trial?",
        answer: "Yes, all plans offer a 14-day free trial and you can keep a free plan forever."
      },
      {
        question: "Do you have any discounts or promotions?",
        answer: "Yes, you save 20% when choosing to pay annually."
      },
      {
        question: "What types of URLs can I redirect?",
        answer: "You can redirect any URLs associated with your domains or subdomains, provided you have control over their DNS records. After configuring your DNS to point to RedirHub, you are free to set up any redirects as needed."
      },
      {
        question: "What is a \"Source Domain\"?",
        answer: "A \"Source Domain\" refers to the hostnames used to serve redirects. Each plan includes a specific limit on the number of domains you can manage for redirection purposes."
      },
      {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged a prorated amount for the remainder of your billing cycle. When you downgrade, the change will take effect at the end of your current billing period."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. For annual Enterprise plans, we also offer invoice-based payments."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time with no cancellation fees. If you cancel, your plan will remain active until the end of your current billing period, and you can always downgrade to our free plan to keep your redirects running."
      },
      {
        question: "Are there any hidden fees or additional costs?",
        answer: "No, there are no hidden fees. The price you see is the price you pay. All features included in your plan are available at no additional cost. You only pay more if you choose to upgrade to a higher plan."
      },
      {
        question: "What happens if I exceed my plan limits?",
        answer: "If you approach your plan limits, we'll notify you via email. You can either upgrade to a higher plan or manage your usage. We'll never shut down your redirects without warning - we believe in transparent communication with our customers."
      },
      {
        question: "Can I use my own custom domain for redirects?",
        answer: "Yes, all plans (including the free plan) allow you to use your own custom domains for redirects. Simply point your domain's DNS records to RedirHub, and you'll be able to create redirects on that domain."
      }
    ]
  },
  {
    pageSlug: 'enterprise',
    faqs: [
      {
        question: "What is included in the Enterprise plan?",
        answer: "The Enterprise plan includes unlimited redirects, dedicated account management, custom SLA agreements, priority 24/7 support, advanced security features, custom integrations, SSO/SAML authentication, dedicated infrastructure options, and white-glove onboarding assistance."
      },
      {
        question: "How does Enterprise support differ from other plans?",
        answer: "Enterprise customers receive dedicated 24/7 priority support with guaranteed response times defined in your SLA. You'll have a dedicated account manager who understands your specific needs and can provide proactive assistance, architectural guidance, and direct access to our engineering team when needed."
      },
      {
        question: "Can I get a custom Service Level Agreement (SLA)?",
        answer: "Yes, Enterprise plans include custom SLA agreements tailored to your specific uptime, performance, and support requirements. We work with you to define SLAs that match your business needs, including guaranteed response times and uptime commitments."
      },
      {
        question: "Do you offer dedicated infrastructure for Enterprise customers?",
        answer: "Yes, we can provide dedicated servers with dedicated IP addresses for Enterprise customers who require enhanced performance, security, or compliance requirements."
      },
      {
        question: "How do I get started with an Enterprise plan?",
        answer: "Getting started is easy - simply contact our sales team to schedule a consultation. We'll discuss your specific requirements, demonstrate the platform, and create a customized proposal tailored to your needs. Implementation typically begins within days of contract signing."
      },
      {
        question: "Can I schedule a demo of the platform?",
        answer: "Absolutely! We offer personalized demos for all potential Enterprise customers. During the demo, we'll walk through the platform's capabilities, discuss your specific use cases, and answer any questions you have. Contact us to schedule a time that works for you."
      },
      {
        question: "What security and compliance features are available?",
        answer: "Enterprise plans include advanced security features such as SSO/SAML authentication, role-based access control (RBAC), audit logs, custom SSL certificates, DDoS protection. We can also accommodate additional security requirements specific to your organization."
      },
      {
        question: "Do you support Single Sign-On (SSO) and SAML?",
        answer: "Yes, Enterprise plans include full support for SSO and SAML 2.0 authentication. We integrate with popular identity providers including Okta, Azure AD, Google Workspace, OneLogin, and others. This allows your team to access RedirHub using your existing corporate credentials."
      },
      {
        question: "Can you provide custom integrations or API access?",
        answer: "Yes, Enterprise customers get priority API access with higher rate limits and can request custom integrations with your existing tools and workflows. Our engineering team can work with you to build specialized integrations, webhooks, or custom features that align with your specific requirements."
      },
      {
        question: "What kind of onboarding and training do you provide?",
        answer: "Enterprise customers receive white-glove onboarding including dedicated implementation support, team training sessions, best practices consultation, and ongoing strategic guidance. We ensure your team is fully equipped to leverage RedirHub's capabilities from day one."
      },
      {
        question: "Is there a minimum contract length for Enterprise plans?",
        answer: "Enterprise plans typically have an annual contract, but we're flexible and can discuss terms that work for your organization. We want to ensure our partnership is mutually beneficial and can accommodate different contract structures based on your needs."
      },
      {
        question: "How is Enterprise pricing determined?",
        answer: "Enterprise pricing is customized based on your specific requirements including expected traffic volume, number of domains, desired features, support level, and any custom development needs. Contact our sales team for a personalized quote tailored to your organization."
      }
    ]
  }
]

// Generate a unique key for Sanity array items
function genKey(): string {
  return typeof randomUUID === 'function'
    ? randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

async function migrate() {
  console.log('🚀 Starting FAQ migration...\n')

  let success = 0
  let failures = 0
  let skipped = 0

  for (const page of FAQ_PAGES) {
    try {
      // Add unique keys to FAQs
      const faqs = page.faqs.map(faq => ({
        _key: genKey(),
        question: faq.question,
        answer: faq.answer,
      }))

      if (faqs.length === 0) {
        console.log(`⚠️  Skipped: ${page.pageSlug} (no FAQs defined)`)
        skipped += 1
        continue
      }

      // Create Sanity document
      const documentId = `faqset-${page.pageSlug}-${DEFAULT_LOCALE}`

      // Check if already exists
      const existing = await writeClient.fetch(
        `*[_type == "faqSet" && pageSlug == $pageSlug && locale == $locale][0]._id`,
        { pageSlug: page.pageSlug, locale: DEFAULT_LOCALE }
      )

      const doc = {
        _id: existing || documentId,
        _type: 'faqSet',
        pageSlug: page.pageSlug,
        locale: DEFAULT_LOCALE,
        faqs: faqs,
        needsTranslation: true,
      }

      await writeClient.createOrReplace(doc)
      console.log(`✅ Migrated: ${page.pageSlug} (${faqs.length} FAQs)`)
      success += 1
    } catch (error: any) {
      console.error(`❌ Failed: ${page.pageSlug} - ${error.message}`)
      failures += 1
    }
  }

  console.log(`\n✨ Migration completed!`)
  console.log(`✅ Success: ${success}`)
  console.log(`❌ Failures: ${failures}`)
  console.log(`⚠️  Skipped: ${skipped}`)
}

migrate()
