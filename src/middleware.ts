import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale, redirect to URL without locale
    if (pathname.startsWith(`/${defaultLocale}/`)) {
      const newPathname = pathname.replace(`/${defaultLocale}`, '');
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
    if (pathname === `/${defaultLocale}`) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Rewrite to default locale for URLs without locale
  const response = NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|locales).*)',
  ],
};
