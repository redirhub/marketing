import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

const TRANSLATION_URL = process.env.TRANSLATION_URL;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!TRANSLATION_URL) {
    return NextResponse.json(
      { error: 'Translation URL not configured' },
      { status: 500 }
    );
  }

  const url = TRANSLATION_URL.replace('{{lng}}', slug);

  try {
    const response = await fetch(url, {
      // @ts-ignore
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch translations: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Cache in production
    if (process.env.NODE_ENV === 'production') {
      headers['Cache-Control'] = 'public, max-age=3600'; // 1 hour cache
    }

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error(`Error fetching translations for ${slug}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
