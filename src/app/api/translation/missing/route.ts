import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

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

    const response = await fetch(TRANSLATION_MISSING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // @ts-ignore
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to report missing translation: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reporting missing translation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
