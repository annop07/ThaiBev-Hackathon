import { toast } from 'sonner';

export interface Notification {
    id: string;
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
}

class NotificationService {
    private static threshold = 10; // ค่าความคลาดเคลื่อนที่ถือว่าสูง

    public static notifyDiscrepancy(itemName: string, difference: number) {
        if (Math.abs(difference) > this.threshold) {
            toast.error('พบความคลาดเคลื่อนสูง', {
                description: `สินค้า ${itemName} มีความคลาดเคลื่อน ${difference} หน่วย`,
                duration: 5000,
            });
        }
    }

    public static notifySignatureNeeded(role: string) {
        toast.warning('รอการลงนาม', {
            description: `กรุณาลงนามในฐานะ ${role}`,
            duration: 5000,
        });
    }

    public static notifyStockCountStatus(zone: string, status: string) {
        const statusMap = {
            'completed': { type: 'success' as const, message: 'เสร็จสิ้น' },
            'in-progress': { type: 'info' as const, message: 'กำลังดำเนินการ' },
            'pending': { type: 'warning' as const, message: 'รอดำเนินการ' },
        };

        const { type, message } = statusMap[status as keyof typeof statusMap];
        
        toast[type]('สถานะการตรวจนับ', {
            description: `โซน ${zone}: ${message}`,
            duration: 5000,
        });
    }
}

export default NotificationService;