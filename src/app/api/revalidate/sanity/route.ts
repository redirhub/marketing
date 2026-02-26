import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getTagsForContentType } from '@/lib/cache-tags';
import { allLanguages } from '@/sanity/config/i18n';

/**
 * Sanity Webhook Handler - Tag-Based Revalidation
 *
 * Automatically revalidates cached content when Sanity CMS content changes.
 * Uses cache tags for efficient, grouped revalidation instead of individual paths.
 *
 * Setup in Sanity:
 * URL: https://your-domain.vercel.app/api/revalidate/sanity?secret=YOUR_SECRET
 * Method: POST
 * Triggers: Create, Update, Delete
 *
 * When ANY locale version changes, ALL locale versions are revalidated via tags.
 */

interface SanityWebhookPayload {
  _id: string;
  _type: string;
  _rev?: string;
  slug?: {
    current: string;
  };
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (expectedSecret) {
      const secret = request.nextUrl.searchParams.get('secret');

      if (secret !== expectedSecret) {
        return NextResponse.json(
          { message: 'Invalid secret' },
          { status: 401 }
        );
      }
    }

    const payload: SanityWebhookPayload = await request.json();
    const typeHint = request.nextUrl.searchParams.get('type');
    const contentType = typeHint || payload._type;

    console.log('📨 Sanity webhook received:', {
      type: contentType,
      id: payload._id,
      slug: payload.slug?.current,
      locale: payload.locale,
    });

    const tagsToRevalidate = new Set<string>();

    // Get content-type-specific tags
    const contentTags = getTagsForContentType(
      contentType,
      payload.slug?.current,
      payload.locale
    );
    contentTags.forEach(tag => tagsToRevalidate.add(tag));

    // Add locale tags for ALL locales (ensures all language versions update)
    // This is the key: when English changes, German/Spanish/etc. also revalidate
    allLanguages.forEach(locale => {
      tagsToRevalidate.add(`locale:${locale}`);
    });

    // Revalidate all tags
    const revalidatedTags: string[] = [];
    const errors: { tag: string; error: string }[] = [];

    for (const tag of tagsToRevalidate) {
      try {
        revalidateTag(tag, 'page');
        revalidatedTags.push(tag);
        console.log(`✓ Revalidated tag: ${tag}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push({ tag, error: errorMessage });
        console.error(`✗ Failed to revalidate tag ${tag}:`, error);
      }
    }

    const response = {
      success: true,
      contentType,
      documentId: payload._id,
      slug: payload.slug?.current,
      locale: payload.locale,
      revalidated: {
        tags: revalidatedTags,
        count: revalidatedTags.length,
      },
      errors: errors.length > 0 ? errors : undefined,
      timestamp: Date.now(),
    };

    console.log(`✅ Revalidated ${revalidatedTags.length} cache tags for ${contentType}`);

    return NextResponse.json(response);
  } catch (err) {
    console.error('❌ Error processing Sanity webhook:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing webhook',
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
