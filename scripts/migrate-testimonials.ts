/**
 * Migration Script: Migrate Static Testimonials to Sanity CMS
 *
 * This script migrates the hardcoded testimonials from TestimonialsSlider.tsx
 * to Sanity CMS as testimonial documents.
 *
 * Run with: npx tsx scripts/migrate-testimonials.ts
 */

import { writeClient } from '@/sanity/lib/client'

// Static testimonials from src/components/home/TestimonialsSlider.tsx
const staticTestimonials = [
  {
    id: 1,
    quote: `"I've been using this for a while, and it's great—easy to manage and track URLs with no hassle. Simple, reliable, and effective."	`,
    name: 'Chris Panton',
    role: 'Building world\'s best Ecom market',
    avatar: '/assets/images/TestimonialsSlider/test-1.svg',
  },
  {
    id: 2,
    quote: `It works like a charm, redirecting domain names with SSL is a huge pain. I have to do it frequently, often at mass and it was hours of work. Now it is few clicks.`,
    name: 'Zsolt Bikadi',
    role: '',
    avatar: '/assets/images/TestimonialsSlider/test-2.jpeg',
  },
  {
    id: 3,
    quote: `Extremely easy to set up and reporting on redirects that have never had access to before. Easier to sleep now knowing that if a redirect link ever gets broken I will be notified via email.5 tacos PLUS on this one`,
    name: 'InSearchOf',
    role: '',
    avatar: '/assets/images/TestimonialsSlider/test-3.jpeg',
  },
  {
    id: 4,
    quote: `"Great tool for redirecting domains with https, without the additional cost of a cert. Simple to setup and it walks you through each step. No guessing what needs to be done!"`,
    name: 'MarketedPotential',
    role: '',
    avatar: '/assets/images/TestimonialsSlider/test-4.png',
  },
]

async function migrateTestimonials() {
  console.log('🚀 Starting testimonial migration...')

  try {
    for (const testimonial of staticTestimonials) {
      // Check if testimonial already exists
      const existing = await writeClient.fetch(
        `*[_type == "testimonial" && author == $author && locale == "en"][0]`,
        { author: testimonial.name }
      )

      if (existing) {
        console.log(`⏭️  Skipping: "${testimonial.name}" - already exists`)
        continue
      }

      // Create the testimonial document
      const doc = {
        _type: 'testimonial',
        quote: testimonial.quote.trim(),
        author: testimonial.name,
        role: testimonial.role || undefined,
        order: testimonial.id - 1, // Zero-based ordering
        isActive: true,
        locale: 'en',
        needsTranslation: true, // Mark for translation
      }

      // Note: Avatar images are stored in /public/assets/images/TestimonialsSlider/
      // You'll need to manually upload these to Sanity assets and assign them
      console.log(
        `📝 Creating: "${testimonial.name}" (Avatar: ${testimonial.avatar})`
      )
      console.log(`   Note: You'll need to manually upload avatar: ${testimonial.avatar}`)

      const result = await writeClient.create(doc)
      console.log(`✅ Created: ${result._id}`)
    }

    console.log('\n✨ Migration complete!')
    console.log('\n📌 Next steps:')
    console.log('1. Go to Sanity Studio')
    console.log('2. Upload avatar images for each testimonial')
    console.log('3. Click "AI Translate" button to translate to all languages')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateTestimonials()
