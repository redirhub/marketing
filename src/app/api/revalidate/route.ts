import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for on-demand revalidation
 *
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET
 * Body: { path?: string, tag?: string }
 *
 * Examples:
 * - Revalidate specific path: { "path": "/blog/my-post" }
 * - Revalidate by tag: { "tag": "blog-posts" }
 * - Revalidate all blog posts: { "tag": "blog-posts" }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { path, tag } = body;

    // Revalidate by path
    if (path) {
      revalidatePath(path, 'page');
      return NextResponse.json({
        revalidated: true,
        type: 'path',
        path,
        now: Date.now(),
      });
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag, 'page');
      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        tag,
        now: Date.now(),
      });
    }

    return NextResponse.json(
      { message: 'Missing path or tag parameter' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
