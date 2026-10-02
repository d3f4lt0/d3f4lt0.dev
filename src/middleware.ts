import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/admin' || path.startsWith('/admin/')) {
    const adminPassword = getAdminPassword();

    if (!adminPassword) {
      return new NextResponse('Admin not configured', { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    const expected = `Basic ${btoa(`admin:${adminPassword}`)}`;

    if (authHeader !== expected) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }
  }

  if (path === '/admin/cms') {
    return NextResponse.rewrite(new URL('/admin/index.html', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
