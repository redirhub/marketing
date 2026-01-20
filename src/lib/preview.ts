import { client, draftClient } from '@/sanity/lib/client'
import type { SanityClient } from 'next-sanity'

export function getClient(searchParams: { version?: string }): SanityClient {
  return searchParams?.version === 'drafts' ? draftClient : client
}
