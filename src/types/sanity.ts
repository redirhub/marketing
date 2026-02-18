// Sanity type definitions for blog content

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: {
    _type: 'slug'
    current: string
  }
  image?: SanityImageAsset
  bio?: string
}

export interface FAQ {
  _key: string
  _type: 'object'
  question: string
  answer: string
}

export interface FAQItem {
  _key: string
  question: string
  answer: string
}

export interface FAQSet {
  _id: string
  _type: 'faqSet'
  _createdAt?: string
  _updatedAt?: string
  pageSlug: string
  title?: string
  faqs: FAQItem[]
  locale: string
}

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

export interface PortableTextBlock {
  _key: string
  _type: 'block'
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: PortableTextSpan[]
  markDefs?: Array<{
    _key: string
    _type: string
    [key: string]: unknown
  }>
  level?: number
  listItem?: 'bullet' | 'number'
}

export interface PortableTextImage {
  _key: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export type PortableTextContent = Array<
  PortableTextBlock | PortableTextImage | FeatureSplitBlock
>

export interface Post {
  _id: string
  _type: 'post'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  excerpt?: string
  tags?: string[]
  content?: PortableTextContent
  image?: SanityImageAsset
  publishedAt: string
  locale: string
  author?: Author
  faqs?: FAQ[]
  needsTranslation?: boolean
}

export interface SupportArticle {
  _id: string
  _type: 'support'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  content?: PortableTextContent
  tags?: string[]
  publishedAt: string
  locale: string
}

export interface LegalDocument {
  _id: string
  _type: 'legal'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  content?: PortableTextContent
  publishedAt: string
  locale: string
  footer?: boolean
}

export interface ChangelogEntry {
  _id: string
  _type: 'changelog'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  description: string
  content?: PortableTextContent
  author?: Author
  publishedAt: string
  locale: string
  needsTranslation?: boolean
}

export interface Translation {
  locale: string
  slug: string
  _id: string
  exists: boolean
}

// For GROQ query results
export interface PostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  image?: SanityImageAsset
  publishedAt: string
  tags?: string[]
  author?: {
    name: string
    image?: SanityImageAsset
    slug: {
      current: string
    }
  }
}

// Pagination response
export interface PaginatedPosts {
  posts: PostPreview[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Landing Page types
export interface LandingPageMeta {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImageAsset
}

export interface CTAButton {
  label?: string
  url?: string
}

export interface HeroSection {
  headline: string
  subheadline?: string
  ctaPrimary?: CTAButton
  heroImage?: SanityImageAsset
  heroSections?: Array<'redirect' | 'customerLogos'>
  bannerStyle?: 'default' | 'purple' | 'teal' | 'dark'
}

export interface FeatureSplitBlock {
  _type: 'featureSplitBlock'
  _key: string
  mainTitle: string
  subTitle?: string
  reverseOrder?: boolean
  removePaddingBottom?: boolean
  image?: SanityImageAsset
  imageBorderRadius?: string
  features?: string[]
}

export interface FeatureItem {
  _key: string
  title: string
  description?: string
  icon?: SanityImageAsset
  image?: SanityImageAsset
}

export interface Testimonial {
  _key: string
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: SanityImageAsset
}

export interface TestimonialDocument {
  _id: string
  _type: 'testimonial'
  _createdAt?: string
  _updatedAt?: string
  slug: {
    _type: 'slug'
    current: string
  }
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: SanityImageAsset
  order: number
  isActive: boolean
  locale: string
  needsTranslation?: boolean
}

export interface StatItem {
  _key: string
  value: string
  label: string
  description?: string
}

export interface RichContentSection {
  _type: 'richContentSection'
  _key: string
  content?: PortableTextContent
}

export interface FeaturesSection {
  _type: 'featuresSection'
  _key: string
  sectionTitle?: string
  items?: FeatureItem[]
}

export interface TestimonialsSection {
  _type: 'testimonialsSection'
  _key: string
  sectionTitle?: string
  items?: Testimonial[]
}

export interface FAQSection {
  _type: 'faqSection'
  _key: string
  sectionTitle?: string
  faqs?: FAQItem[]
}

export interface CTASection {
  _type: 'ctaSection'
  _key: string
  headline?: string
  description?: string
  buttonLabel?: string
  buttonUrl?: string
  backgroundImage?: SanityImageAsset
}

export interface StatsSection {
  _type: 'statsSection'
  _key: string
  sectionTitle?: string
  stats?: StatItem[]
}

export interface LogoBarSection {
  _type: 'logoBarSection'
  _key: string
  sectionTitle?: string
  logos?: SanityImageAsset[]
}

export type PageSection =
  | RichContentSection
  | FeaturesSection
  | TestimonialsSection
  | FAQSection
  | CTASection
  | StatsSection
  | LogoBarSection

export interface LandingPage {
  _id: string
  _type: 'landingPage'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  meta?: LandingPageMeta
  hero: HeroSection
  richContent: PortableTextContent
  faqs: FAQItem[]
  sections?: Array<'contentTable' | 'testimonials' | 'blogInsight'>
  footerType: 'default' | 'with-widgets'
  publishedAt: string
  isActive: boolean
  onFooter: boolean
  locale: string
  needsTranslation?: boolean
}

export interface LandingPagePreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  hero?: {
    headline?: string
    heroImage?: SanityImageAsset
  }
  locale: string
  isActive: boolean
  publishedAt: string
}
