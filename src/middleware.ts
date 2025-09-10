import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporarily comment out the entire middleware
/*
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only protect specific routes, allow home page for everyone
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Add your auth check here for protected routes only
    const { auth } = await import('@/auth');
    const session = await auth();
    
    if (!session) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}
*/

export const config = {
  matcher: [],
};
