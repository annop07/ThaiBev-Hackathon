"use client"

import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FooterProps {
    lastUpdate: string;
}

export function Footer({ lastUpdate }: FooterProps) {
    const [currentTime, setCurrentTime] = useState(lastUpdate);

    useEffect(() => {
        const now = new Date();
        const timeStr = `19 พ.ค. ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} น.`;
        setCurrentTime(timeStr);
    }, []);

    return (
        <footer className="border-t bg-white px-6 py-3">
            <div className="container mx-auto flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>อัพเดตล่าสุด: {currentTime}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                    <span>© 2024 ThaiBev Stock Reconciliation System</span>
                    <div className="flex items-center space-x-2">
                        <a href="#" className="hover:text-blue-600">คู่มือการใช้งาน</a>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-600">ติดต่อสนับสนุน</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}