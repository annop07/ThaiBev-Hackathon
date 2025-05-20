export interface StockItem {
    itemCode: string;          // Z-Code (เช่น Z31064033029)
    description: string;       // ชื่อสินค้า (เช่น ขาว 40 ดีกรี 330 มล.(เอส.เอส.))
    location: string;         // รหัสที่เก็บ (เช่น 1BA001A)
    manufacturingDate: string; // วันที่ผลิต (เช่น 03-15-2025)
    tihi: string;            // Ti x Hi (เช่น 10x7)
    status: 'Available' | 'Reserved' | 'Blocked';
    boxPerUnit: number;      // ลังต่อขวด (เช่น 24)
    palletPerUnit: number;   // พาเลทต่อขวด (เช่น 1,680)
    boxPerPallet: number;    // ลังต่อพาเลท (เช่น 70)
    unit: string;            // หน่วย (BT)
    totalUnits: number;      // ทั้งหมด(ขวด) (เช่น 40,320)
    totalPallets: number;    // รวมพาเลท (เช่น 24)
    totalBoxes: number;      // รวมกล่อง
    totalBottles: number;    // รวมขวด
    countedPallets?: number; // นับพาเลท
    countedBoxes?: number;   // นับกล่อง
    countedBottles?: number; // นับขวด
}

export interface StockCount {
    warehouse: string;      // รหัสคลัง (AMNATCHAROEN)
    countDate: string;     // วันที่นับ
    countTime: string;     // เวลาที่นับ
    items: StockItem[];    // รายการสินค้า
    status: 'draft' | 'pending' | 'completed';
}