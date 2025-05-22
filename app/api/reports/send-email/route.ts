import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, region, stockData, signatures } = body;

        // ข้อมูลตัวอย่างสินค้า
        const discrepancyData = [
            { itemCode: 'SKU001', itemName: 'น้ำดื่ม 500ml', physical: 145, system: 130, difference: 15 },
            { itemCode: 'SKU002', itemName: 'บะหมี่กึ่งสำเร็จรูป', physical: 89, system: 95, difference: -6 },
            { itemCode: 'SKU003', itemName: 'น้ำอัดลม 1.5L', physical: 78, system: 75, difference: 3 },
            { itemCode: 'SKU004', itemName: 'ขนมขบเคี้ยว', physical: 212, system: 200, difference: 12 },
            { itemCode: 'SKU005', itemName: 'ข้าวสาร 5 กก.', physical: 42, system: 50, difference: -8 }
        ];

        // สร้าง transporter ด้วยการตั้งค่าที่ถูกต้อง
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true สำหรับ port 465, false สำหรับ port 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // ใส่ App Password ที่ได้จาก Gmail
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // เพิ่ม console.log เพื่อดูการส่ง
        console.log('Attempting to send email...');

        const mailOptions = {
            from: `"Stock Report System" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            subject: `รายงานการตรวจนับ Stock ประจำวันที่ ${new Date(date).toLocaleDateString('th-TH')}`,
            html: `
                <h1>รายงานการตรวจนับ Stock ประจำวัน</h1>
                <p><strong>ภาค:</strong> ${region}</p>
                <p><strong>วันที่:</strong> ${new Date(date).toLocaleDateString('th-TH')}</p>
                
                <h2>ข้อมูลการตรวจนับ:</h2>
                <table border="1" style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="padding: 8px;">รหัสสินค้า</th>
                        <th style="padding: 8px;">ชื่อสินค้า</th>
                        <th style="padding: 8px;">จำนวนนับจริง</th>
                        <th style="padding: 8px;">จำนวนในระบบ (WMS)</th>
                        <th style="padding: 8px;">ผลต่าง</th>
                        <th style="padding: 8px;">สถานะ</th>
                    </tr>
                    ${discrepancyData.map(item => `
                        <tr>
                            <td style="padding: 8px;">${item.itemCode}</td>
                            <td style="padding: 8px;">${item.itemName}</td>
                            <td style="padding: 8px; text-align: right;">${item.physical.toLocaleString()}</td>
                            <td style="padding: 8px; text-align: right;">${item.system.toLocaleString()}</td>
                            <td style="padding: 8px; text-align: right; ${item.difference > 0 ? 'color: green;' : item.difference < 0 ? 'color: red;' : ''}">${item.difference > 0 ? '+' : ''}${item.difference.toLocaleString()}</td>
                            <td style="padding: 8px;">${Math.abs(item.difference) > 10 ?
                    '<span style="color: red;">สูง</span>' :
                    Math.abs(item.difference) > 5 ?
                        '<span style="color: orange;">ปานกลาง</span>' :
                        '<span style="color: green;">ต่ำ</span>'
                }</td>
                        </tr>
                    `).join('')}
                </table>

                <h2>ผู้ลงนาม:</h2>
                ${signatures.warehouseHead ? `
                    <p><strong>หัวหน้าคลัง:</strong> ${signatures.warehouseHead.name}<br>
                    <strong>เวลา:</strong> ${new Date(signatures.warehouseHead.timestamp).toLocaleString('th-TH')}</p>
                ` : ''}
                ${signatures.inventoryTeam ? `
                    <p><strong>ทีม Inventory:</strong> ${signatures.inventoryTeam.name}<br>
                    <strong>เวลา:</strong> ${new Date(signatures.inventoryTeam.timestamp).toLocaleString('th-TH')}</p>
                ` : ''}
                ${signatures.regionalManager ? `
                    <p><strong>ผู้จัดการภาค:</strong> ${signatures.regionalManager.name}<br>
                    <strong>เวลา:</strong> ${new Date(signatures.regionalManager.timestamp).toLocaleString('th-TH')}</p>
                ` : ''}
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);

        return NextResponse.json({
            success: true,
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}