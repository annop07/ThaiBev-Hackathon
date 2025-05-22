"use client"

import { Bell, Factory } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
    notifications: Array<{
        id: string
        message: string
        timestamp: Date
    }>
    selectedFactory: string
    onFactoryChange: (value: string) => void
    canChangeFactory: boolean
    userRegion: string
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
                <div className="flex items-center gap-4">
                    <Factory className="h-5 w-5 text-gray-500" />
                    {canChangeFactory ? (
                        <Select value={selectedFactory} onValueChange={onFactoryChange}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="เลือกโรงงาน" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nakhonratchasima">โรงงานนครราชสีมา</SelectItem>
                                <SelectItem value="kamphaengphet">โรงงานกำแพงเพชร</SelectItem>
                            </SelectContent>
                        </Select>
                    ) : (
                        <span className="text-sm text-gray-600">
                            {userRegion === 'northeast' ? 'โรงงานนครราชสีมา' : 'โรงงานกำแพงเพชร'}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="relative">
                            <Bell className="h-5 w-5 text-gray-500" />
                            {notifications.length > 0 && (
                                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            {notifications.map((notification) => (
                                <DropdownMenuItem key={notification.id}>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm">{notification.message}</p>
                                        <p className="text-xs text-gray-500">
                                            {notification.timestamp.toLocaleString()}
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}