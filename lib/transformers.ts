import { StockItem, StockCount } from '@/types/inventory';

export function transformThaiBevData(rawData: any): StockCount {
    // แปลงข้อมูลจาก header
    const header = {
        warehouse: rawData.warehouse || 'UNKNOWN',
        countDate: rawData.countDate,
        countTime: rawData.countTime,
        status: rawData.status || 'draft'
    };

    // แปลงข้อมูลรายการสินค้า
    const items: StockItem[] = rawData.items.map((item: any) => ({
        itemCode: item['รหัสสินค้า'],
        description: item['ชื่อสินค้า'],
        location: item['ที่เก็บ'],
        manufacturingDate: item['MFG .DATE'],
        tihi: item['Ti x Hi'],
        status: item['สถานะ'],
        boxPerUnit: Number(item['ลังต่อขวด']) || 0,
        palletPerUnit: Number(item['พาเลทต่อขวด']) || 0,
        boxPerPallet: Number(item['ลังต่อพาเลท']) || 0,
        unit: item['หน่วย'] || 'BT',
        totalQuantity: Number(item['ทั้งหมด(ขวด)']) || 0,
        totalPallets: Number(item['รวมพาเลท']) || 0,
        totalBoxes: Number(item['รวมกล่อง']) || 0,
        remainingUnits: Number(item['รวมขวด']) || 0,
        countedPallets: item['นับพาเลท'] ? Number(item['นับพาเลท']) : undefined,
        countedBoxes: item['นับกล่อง'] ? Number(item['นับกล่อง']) : undefined,
        countedUnits: item['นับขวด'] ? Number(item['นับขวด']) : undefined,
    }));

    return {
        ...header,
        items
    };
}