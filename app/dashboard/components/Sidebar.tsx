"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ClipboardCheck,
    Settings,
    LogOut
} from "lucide-react"

export function Sidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="w-64 bg-white border-r h-screen p-4">
            <div className="space-y-4">
                <div className="py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">
                        Stock Reconciliation
                    </h2>
                </div>
                
                {/* Navigation Links */}
                <nav className="space-y-2">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                            isActive('/dashboard') ? 'bg-gray-100 text-gray-900' : ''
                        }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>แดชบอร์ด</span>
                    </Link>
                    
                    <Link
                        href="/checker"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                            isActive('/checker') ? 'bg-gray-100 text-gray-900' : ''
                        }`}
                    >
                        <ClipboardCheck className="h-4 w-4" />
                        <span>นับสินค้า</span>
                    </Link>

                    <Link
                        href="/settings"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                            isActive('/settings') ? 'bg-gray-100 text-gray-900' : ''
                        }`}
                    >
                        <Settings className="h-4 w-4" />
                        <span>ตั้งค่า</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-4 w-56">
                    <button
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => {
                            // Add logout logic here
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                        <span>ออกจากระบบ</span>
                    </button>
                </div>
            </div>
        </div>
    )
}