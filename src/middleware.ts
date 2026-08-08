import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.rewrite(new URL('/admin/index.html', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
