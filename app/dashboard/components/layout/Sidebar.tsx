"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    Boxes,
    PieChart,
    Settings,
    Factory
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    isActive: boolean;
}

function SidebarItem({ href, icon, title, isActive }: SidebarItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-700",
                isActive ? "bg-gray-700 text-white font-medium" : "text-gray-300"
            )}
        >
            {icon}
            <span className="text-sm font-medium">{title}</span>
        </Link>
    );
}

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            href: "/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            title: "แดชบอร์ด"
        },
        {
            href: "/dashboard/all-factories",
            icon: <Building2 className="h-5 w-5" />,
            title: "ภาพรวมทุกโรงงาน"
        },
        {
            href: "/dashboard/inventory",
            icon: <Boxes className="h-5 w-5" />,
            title: "คลังสินค้า"
        },
        {
            href: "/dashboard/analytics",
            icon: <PieChart className="h-5 w-5" />,
            title: "วิเคราะห์ข้อมูล"
        }
    ];

    return (
        <aside className="flex flex-col h-screen w-64 bg-gray-800 border-r border-gray-700">
            {/* Logo และชื่อระบบ */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
                <Factory className="h-8 w-8 text-blue-400" />
                <span className="text-lg font-bold text-white">Stock System</span>
            </div>

            {/* เมนูหลัก */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        title={item.title}
                        isActive={pathname === item.href}
                    />
                ))}
            </nav>

            {/* Settings ด้านล่าง */}
            <div className="mt-auto border-t border-gray-700 px-3 py-4">
                <SidebarItem
                    href="/dashboard/settings"
                    icon={<Settings className="h-5 w-5" />}
                    title="ตั้งค่า"
                    isActive={pathname === "/dashboard/settings"}
                />
            </div>
        </aside>
    );
}