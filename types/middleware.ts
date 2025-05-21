import { NextRequest } from 'next/server';
import { UserRole } from './auth';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id: number;
        name: string;
        role: UserRole;
    };
}

export interface MiddlewareConfig {
    requireAuth?: boolean;
    allowedRoles?: UserRole[];
}