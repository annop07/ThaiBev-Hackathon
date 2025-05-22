import cron from 'node-cron';
import { generateStockCountPDF } from './generatePDF';

export function setupAutoReports() {
    // ส่งรายงานทุกวันเวลา 23:00 น.
    cron.schedule('0 23 * * *', async () => {
        try {
            const regions = ['Central', 'North', 'South', 'Northeast'];

            for (const region of regions) {
                // ดึงข้อมูลของแต่ละภาค
                const response = await fetch('/api/reports/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: new Date(),
                        region,
                        stockData: [], // ใส่ข้อมูลจริง
                        signatures: {} // ใส่ข้อมูลการลงนามจริง
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to send report for region: ${region}`);
                }
            }
        } catch (error) {
            console.error('Auto report error:', error);
        }
    }, {
        timezone: 'Asia/Bangkok'
    });
}