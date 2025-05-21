import { NextResponse } from 'next/server';
import type { AuthenticatedRequest, MiddlewareConfig } from '@/types/middleware';
import { authMiddleware } from './authMiddleware';
import { roleMiddleware } from './.roleMiddleware';

export function middlewareChain(config: MiddlewareConfig = {}) {
    return async function (request: AuthenticatedRequest) {
        // Skip middleware for public routes
        const publicRoutes = ['/login', '/register', '/_next', '/api/public', '/api/auth/login'];
        if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
            console.log('Middleware Chain - Skipping middleware for public route:', request.nextUrl.pathname);
            return NextResponse.next();
        }

        // Apply authentication if required
        if (config.requireAuth) {
            const authResponse = await authMiddleware(request);
            if (authResponse.status !== 200) {
                return authResponse;
            }
        }

        // Apply role-based authorization if roles are specified
        if (config.allowedRoles?.length) {
            const roleResponse = roleMiddleware(config.allowedRoles)(request);
            if (roleResponse.status !== 200) {
                return roleResponse;
            }
        }

        return NextResponse.next();
    };
}
