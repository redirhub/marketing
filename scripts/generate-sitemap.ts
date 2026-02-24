import { writeClient } from '@/sanity/lib/client'
import path from 'path'
import fs from 'fs'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

interface SanitySlug {
  slug: string
  _type: string
}

async function generateSitemap() {

  const query = `*[
    (_type == "post" || _type == "landingPage") && defined(slug.current) && locale == "en"
  ] {
    "slug": slug.current,
    _type
  }`

  try {
    const slugs = await writeClient.fetch<SanitySlug[]>(query)

    const staticUrls = [
      { loc: `${BASE_URL}/`,          changefreq: 'weekly', priority: '1.0' },
      { loc: `${BASE_URL}/pricing`,   changefreq: 'weekly', priority: '0.9' },
      { loc: `${BASE_URL}/enterprise`,changefreq: 'weekly', priority: '0.9' },
      { loc: `${BASE_URL}/blog`,      changefreq: 'weekly', priority: '0.9' },
      { loc: `${BASE_URL}/changelog`, changefreq: 'weekly', priority: '0.8' },
      { loc: `${BASE_URL}/support`,   changefreq: 'weekly', priority: '0.8' },
      { loc: `${BASE_URL}/legal`,     changefreq: 'weekly', priority: '0.5' },
    ]

    const urls = [
      ...staticUrls.map(({ loc, changefreq, priority }) => `
        <url>
          <loc>${loc}</loc>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>
      `),
      ...slugs.map(({ slug, _type }) => {
        const urlPath =
          _type === 'post'
            ? `/blog/${slug}`
            : `/${slug}`
        return `
          <url>
            <loc>${BASE_URL}${urlPath}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `
      }),
    ]

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('\n')}
      </urlset>
    `

    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    fs.writeFileSync(sitemapPath, sitemapXML, 'utf8')
    console.log('✅ Sitemap generated at public/sitemap.xml')
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

generateSitemap()
