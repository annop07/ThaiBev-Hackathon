import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function roleMiddleware(request: NextRequest, allowedRoles: string[]) {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        // ตรวจสอบ token แบบละเอียดอีกครั้งเพื่อดึงข้อมูล payload
        const { payload } = await jwtVerify(token, SECRET_KEY);
        const role = payload.role as string;
        if (!allowedRoles.includes(role)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.error("Role check failed:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}