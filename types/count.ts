// Request type ตามรูปแบบที่ API ต้องการ
export interface CountRequest {
    checker: string;
    location: string;
    countPallet: number;
    timestamp: string;
}

// Response type ตามที่ API ส่งกลับมา
export interface CountResponse {
    success: boolean;
    matched: boolean;
    message: string;
}

// ข้อมูลสินค้าจาก API /master/items
export interface MasterItem {
    ItemCode: string;
    description: string;
    Location: string;
    total_pallet: number;
    CountPallet: number;
    Diff_Pallet: number;
}