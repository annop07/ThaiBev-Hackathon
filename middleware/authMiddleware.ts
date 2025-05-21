import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function authMiddleware(request: NextRequest) {
    // ดึง token จาก cookie
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        // ตรวจสอบ token ด้วย jose
        const { payload } = await jwtVerify(token, SECRET_KEY);
        // สามารถใส่ข้อมูลผู้ใช้ลงใน request สำหรับใช้งานต่อได้ (ถ้าต้องการ)
        // request.user = { id: payload.id, role: payload.role };  // ตัวอย่าง
        return NextResponse.next();
    } catch (error) {
        console.error("JWT verify failed:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}