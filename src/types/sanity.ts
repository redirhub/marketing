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
  PortableTextBlock | PortableTextImage
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
