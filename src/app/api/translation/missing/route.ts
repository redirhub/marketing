import { NextRequest, NextResponse } from 'next/server';

const TRANSLATION_MISSING_URL = process.env.TRANSLATION_MISSING_URL;

export async function POST(request: NextRequest) {
  if (!TRANSLATION_MISSING_URL) {
    return NextResponse.json(
      { error: 'Translation missing URL not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Disable SSL verification in development
    const originalRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    try {
      const response = await fetch(TRANSLATION_MISSING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to report missing translation: ${response.statusText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } finally {
      // Restore original SSL verification setting
      if (process.env.NODE_ENV !== 'production') {
        if (originalRejectUnauthorized !== undefined) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalRejectUnauthorized;
        } else {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        }
      }
    }
  } catch (error) {
    console.error('Error reporting missing translation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
