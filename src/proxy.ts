import { NextRequest, NextResponse } from 'next/server';
import { sessionCookieName } from '@/config';

const protectedRoutes = ['/dashboard'];

export function proxy (request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (!isProtected) {
        return NextResponse.next();
    }

    const token = request.cookies.get(sessionCookieName)?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
