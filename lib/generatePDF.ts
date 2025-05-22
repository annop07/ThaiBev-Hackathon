import { jsPDF } from 'jspdf';

export async function generateStockCountPDF(data: {
    date: Date;
    region: string;
    stockData: any[];
    signatures: any;
}) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text('รายงานการตรวจนับ Stock ประจำวัน', 20, 20);

    // Info
    doc.setFontSize(12);
    doc.text(`ภาค: ${data.region}`, 20, 40);
    doc.text(`วันที่: ${data.date.toLocaleDateString('th-TH')}`, 20, 50);

    // Stock Data Table
    const tableHeaders = ['รหัสสินค้า', 'ชื่อสินค้า', 'จำนวนจริง', 'ในระบบ', 'ผลต่าง'];
    let yPos = 70;

    // Draw Headers
    doc.setFont('helvetica', 'bold');
    tableHeaders.forEach((header, index) => {
        doc.text(header, 20 + (index * 35), yPos);
    });

    // Draw Data
    doc.setFont('helvetica', 'normal');
    data.stockData.forEach((item, index) => {
        yPos += 10;
        doc.text(item.itemCode, 20, yPos);
        doc.text(item.itemName, 55, yPos);
        doc.text(item.physical.toString(), 90, yPos);
        doc.text(item.system.toString(), 125, yPos);
        doc.text(item.difference.toString(), 160, yPos);
    });

    // Signatures
    yPos += 30;
    doc.text('ลงนามโดย:', 20, yPos);

    if (data.signatures.warehouseHead) {
        yPos += 10;
        doc.text(`หัวหน้าคลัง: ${data.signatures.warehouseHead.name}`, 30, yPos);
        doc.text(`เวลา: ${data.signatures.warehouseHead.timestamp.toLocaleString('th-TH')}`, 120, yPos);
    }

    if (data.signatures.inventoryTeam) {
        yPos += 10;
        doc.text(`ทีม Inventory: ${data.signatures.inventoryTeam.name}`, 30, yPos);
        doc.text(`เวลา: ${data.signatures.inventoryTeam.timestamp.toLocaleString('th-TH')}`, 120, yPos);
    }

    if (data.signatures.regionalManager) {
        yPos += 10;
        doc.text(`ผู้จัดการภาค: ${data.signatures.regionalManager.name}`, 30, yPos);
        doc.text(`เวลา: ${data.signatures.regionalManager.timestamp.toLocaleString('th-TH')}`, 120, yPos);
    }

    return doc.output('arraybuffer');
}