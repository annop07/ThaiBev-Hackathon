import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./authMiddleware";
import { roleMiddleware } from "./roleMiddleware";

export function middlewareChain(config: { requireAuth?: boolean; allowedRoles?: string[] } = {}) {
    return async function (request: NextRequest) {
        // หาก requireAuth = true ให้เรียก authMiddleware
        if (config.requireAuth) {
            const authResponse = await authMiddleware(request);
            // ถ้าไม่ได้ NextResponse.next() ให้รีเทิร์น response นั้นทันที
            if (authResponse.status !== 200) {
                return authResponse;
            }
        }
        // หากระบุ allowedRoles แล้ว ให้ตรวจสอบสิทธิ์ผู้ใช้
        if (config.allowedRoles && config.allowedRoles.length > 0) {
            const roleResponse = await roleMiddleware(request, config.allowedRoles);
            if (roleResponse.status !== 200) {
                return roleResponse;
            }
        }
        return NextResponse.next();
    };
}