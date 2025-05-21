import { NextResponse } from 'next/server';
import type { AuthenticatedRequest } from '@/types/middleware';
import { jwtVerify } from 'jose';
import type { UserRole } from '@/lib/auth';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function authMiddleware(request: AuthenticatedRequest) {
    try {
        // Get token from cookie or header
        const cookieToken = request.cookies.get('auth-token')?.value;
        const headerToken = request.headers.get('authorization')?.split(' ')[1];
        const token = cookieToken || headerToken;
        
        // Debug log
        console.log('Auth Middleware - Cookie Token:', cookieToken);
        console.log('Auth Middleware - Header Token:', headerToken);
        console.log('Auth Middleware - Using Token:', token);

        if (!token) {
            console.log('Auth Middleware - No token found, redirecting to login');
            return redirectToLogin(request);
        }

        // Verify token
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Add user info to request
        request.user = {
            id: payload.id as number,
            name: payload.name as string,
            role: payload.role as UserRole,
        };

        return NextResponse.next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return redirectToLogin(request);
    }
}

function redirectToLogin(request: AuthenticatedRequest) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}
