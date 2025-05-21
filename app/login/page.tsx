"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const redirectTo = searchParams.get('from') || '/dashboard';

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const username = formData.get('username');
            const password = formData.get('password');

            console.log('Attempting login with:', { username }); // Debug log

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            // Debug logs
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers));

            const data = await response.json();
            console.log('Response data:', data); // Debug log

        if (data.success) {
            console.log('Login successful, redirecting to:', redirectTo);
            
            // Add a small delay to ensure cookie is set before redirecting
            setTimeout(() => {
                router.replace(redirectTo);
            }, 300);
        } else {
            alert(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
        }
        } catch (error) {
            console.error('Login error:', error);
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>เข้าสู่ระบบ</CardTitle>
                    <CardDescription>
                        เข้าสู่ระบบเพื่อจัดการข้อมูลสต็อก
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                name="username"
                                type="text"
                                placeholder="ชื่อผู้ใช้"
                                disabled={isLoading}
                                required
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="รหัสผ่าน"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
