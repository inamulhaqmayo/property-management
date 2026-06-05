import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for auth token on protected admin routes
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token || !verifyToken(token)) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
