import { AlertTriangle, InfoIcon, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertInfo {
    type: 'error' | 'warning' | 'info';
    title: string;
    description: string;
}

const currentAlerts: AlertInfo[] = [
    {
        type: 'error',
        title: 'พบความคลาดเคลื่อนที่สำคัญ',
        description: 'มีสินค้า 3 รายการที่มีความคลาดเคลื่อนเกิน 10% กรุณาตรวจสอบในแท็บรายการความคลาดเคลื่อน'
    },
    {
        type: 'warning',
        title: 'การนับสต็อกค้างดำเนินการ',
        description: 'พบการนับสต็อกที่ยังไม่เสร็จสิ้นในโซน B และ C'
    }
];

export function AlertBanner() {
    return (
        <div className="space-y-4">
            {currentAlerts.map((alert, index) => (
                <Alert
                    key={index}
                    variant={alert.type === 'error' ? 'destructive' : 'default'}
                    className={
                        alert.type === 'warning'
                            ? 'border-yellow-500 text-yellow-700 bg-yellow-50'
                            : undefined
                    }
                >
                    {alert.type === 'error' && <XCircle className="h-4 w-4" />}
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {alert.type === 'info' && <InfoIcon className="h-4 w-4" />}
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
            ))}
        </div>
    );
}