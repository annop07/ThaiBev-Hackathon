import { NextResponse } from 'next/server';
import type { AuthenticatedRequest } from '@/types/middleware';
import type { UserRole } from '@/types/auth';

export function roleMiddleware(allowedRoles: UserRole[]) {
    return function (request: AuthenticatedRequest) {
        const user = request.user;

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (!allowedRoles.includes(user.role)) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        return NextResponse.next();
    };
}