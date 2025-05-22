"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import NotificationService, { Notification } from '@/lib/notificationService';

interface NotificationContextType {
    notifications: Notification[];
    markAsRead: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    markAsRead: () => {},
    clearAll: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    useEffect(() => {
        // ตรวจสอบและแจ้งเตือนทุก 5 นาที
        const interval = setInterval(() => {
            // ตรวจสอบความคลาดเคลื่อน
            const checkDiscrepancies = async () => {
                try {
                    const response = await fetch('/api/stock/check-discrepancies');
                    const data = await response.json();
                    
                    data.discrepancies.forEach((item: any) => {
                        NotificationService.notifyDiscrepancy(
                            item.itemName,
                            item.difference
                        );
                    });
                } catch (error) {
                    console.error('Error checking discrepancies:', error);
                }
            };

            checkDiscrepancies();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                markAsRead,
                clearAll,
            }}
        >
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: { background: 'white', color: 'black' },
                }}
            />
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext);