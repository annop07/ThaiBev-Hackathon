"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User, Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Mock login - replace with actual authentication
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <Image
                src="/images/bg-login.png" // เปลี่ยนนามสกุลไฟล์จาก .jpg เป็น .png
                alt="Background"
                fill
                className="object-cover"
                priority
                quality={100}
            />
            <div className="w-full max-w-md px-4 relative z-10">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            {/* Replace with ThaiBev logo */}
                            <svg 
                                className="w-10 h-10 text-blue-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
                            </svg>
                            
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Stock Reconciliation System</h1>
                    <p className="text-blue-100">ThaiBev Inventory Management</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>เข้าสู่ระบบ</CardTitle>
                        <CardDescription>
                            กรุณาเข้าสู่ระบบด้วยบัญชีพนักงาน ThaiBev ของคุณ
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-9"
                                    type="text"
                                    placeholder="รหัสพนักงาน"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-9"
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button 
                                className="w-full mt-4" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                            </Button>
                            <Button 
                                variant="link" 
                                className="text-sm text-gray-500"
                                type="button"
                            >
                                ลืมรหัสผ่าน?
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center mt-8 text-sm text-blue-100">
                    © 2024 ThaiBev Stock Reconciliation System. All rights reserved.
                </p>
            </div>
        </div>
    );
}