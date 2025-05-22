import { Bell, Layers, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { FactorySelector } from '../header/FactorySelector';
import { Factory } from '@/types/factory';

interface Notification {
    id: number;
    title: string;
    description: string;
    type: string;
    time: string;
}

function NotificationsMenu({ notifications }: { notifications: Notification[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {notifications.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>การแจ้งเตือน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{notification.title}</span>
                                <Badge variant={notification.type === 'error' ? 'destructive' : 'secondary'}>
                                    {notification.type === 'error' ? 'ด่วน' :
                                        notification.type === 'warning' ? 'เตือน' : 'ทั่วไป'}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{notification.description}</p>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Avatar>
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>โปรไฟล์</span>
                </DropdownMenuItem>
                <DropdownMenuItem>ตั้งค่า</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">ออกจากระบบ</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface HeaderProps {
    notifications: any[];
    selectedFactory: Factory | null;
    onFactoryChange: (factoryId: string) => void;
    canChangeFactory: boolean;
    userRegion: string;  // เพิ่ม prop type นี้
}

export function Header({
    notifications,
    selectedFactory,
    onFactoryChange,
    canChangeFactory,
    userRegion
}: HeaderProps) {
    return (
        <header className="border-b bg-white px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <Layers className="text-blue-600" size={28} />
                        <h1 className="text-xl font-bold text-slate-800">Stock Reconciliation Dashboard</h1>
                    </div>
                    {/* Factory Selector */}
                    <FactorySelector
                        selectedFactory={selectedFactory}
                        onFactoryChange={onFactoryChange}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <NotificationsMenu notifications={notifications} />
                    <ProfileMenu />
                </div>
            </div>
        </header>
    );
}