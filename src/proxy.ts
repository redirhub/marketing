import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'];
const defaultLocale = 'en';
const headerName = 'x-locale';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Detect locale from pathname
  const detectedLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Check if pathname already has a locale
  const pathnameHasLocale = !!detectedLocale;

  if (pathnameHasLocale) {
    // If it's the default locale, redirect to URL without locale
    if (pathname.startsWith(`/${defaultLocale}/`)) {
      const newPathname = pathname.replace(`/${defaultLocale}`, '');
      const url = new URL(newPathname, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
    if (pathname === `/${defaultLocale}`) {
      const url = new URL('/', request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    // Set locale in header for server components to access
    response.headers.set(headerName, detectedLocale!);
    return response;
  }

  // Rewrite to default locale for URLs without locale
  const url = new URL(`/${defaultLocale}${pathname}`, request.url);
  url.search = request.nextUrl.search;
  const response = NextResponse.rewrite(url);
  response.headers.set('x-pathname', pathname);
  // Set default locale in header for server components to access
  response.headers.set(headerName, defaultLocale);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files, studio)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|locales|studio).*)',
  ],
};
