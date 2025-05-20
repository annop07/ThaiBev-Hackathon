"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileType2, Loader2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'sonner';

interface ExportReportProps {
    data: any[];
    type: 'discrepancy' | 'overview' | 'analytics';
    fileName?: string;
    disabled?: boolean;
}

export function ExportReport({
    data,
    type,
    fileName = 'report',
    disabled = false
}: ExportReportProps) {
    const [isExporting, setIsExporting] = useState(false);

    const formatDate = () => {
        const now = new Date();
        return now.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleExportError = (error: Error) => {
        toast.error('การส่งออกล้มเหลว', {
            description: error.message,
        });
    };

    const exportToExcel = async () => {
        setIsExporting(true);
        try {
            // Transform data to match ThaiBev format
            const formattedData = data.map(item => ({
                'รหัสสินค้า\nITEM': item.itemCode,
                'ชื่อสินค้า\nDESCRIPTION': item.description || item.itemName,
                'ที่เก็บ\nLOCATION': item.location,
                'MFG .\nDATE': item.manufacturingDate,
                'Ti x Hi': item.tihi,
                'สถานะ\nSTATUS': item.status,
                'ลังต่อขวด': item.boxPerUnit,
                'พาเลท\nต่อขวด': item.palletPerUnit,
                'ลังต่อ\nพาเลท': item.boxPerPallet,
                'หน่วย': item.unit,
                'ทั้งหมด\n(ขวด)': item.totalUnits || item.system,
                'รวม\nพาเลท': item.totalPallets,
                'รวม\nกล่อง': item.totalBoxes,
                'รวม\nขวด': item.totalBottles || item.system,
                'นับ\nพาเลท': item.countedPallets || '',
                'นับ\nกล่อง': item.countedBoxes || '',
                'นับ\nขวด': item.countedBottles || item.physical || '',
                'จำนวนในระบบ': item.system || item.totalUnits,
                'จำนวนนับจริง': item.physical || item.countedBottles,
                'ผลต่าง': item.difference ||
                    (item.physical && item.system ? item.physical - item.system :
                        item.countedBottles && item.totalUnits ? item.countedBottles - item.totalUnits : '')
            }));

            const ws = XLSX.utils.json_to_sheet(formattedData);

            // Update column widths array
            const colWidths = [
                { wch: 15 },  // รหัสสินค้า
                { wch: 35 },  // ชื่อสินค้า
                { wch: 12 },  // ที่เก็บ
                { wch: 12 },  // MFG DATE
                { wch: 8 },   // Ti x Hi
                { wch: 12 },  // สถานะ
                { wch: 10 },  // ลังต่อขวด
                { wch: 10 },  // พาเลทต่อขวด
                { wch: 10 },  // ลังต่อพาเลท
                { wch: 8 },   // หน่วย
                { wch: 12 },  // ทั้งหมด(ขวด)
                { wch: 10 },  // รวมพาเลท
                { wch: 10 },  // รวมกล่อง
                { wch: 10 },  // รวมขวด
                { wch: 10 },  // นับพาเลท
                { wch: 10 },  // นับกล่อง
                { wch: 10 },  // นับขวด
                { wch: 12 },  // จำนวนในระบบ
                { wch: 12 },  // จำนวนนับจริง
                { wch: 10 },  // ผลต่าง
            ];
            ws['!cols'] = colWidths;

            // Set row height for header (to accommodate two lines)
            ws['!rows'] = [{ hpt: 30 }];  // Set height for header row

            // Style the headers
            const headerStyle = {
                font: { bold: true },
                alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
                fill: { fgColor: { rgb: "E2EFDA" } }
            };

            // Apply styles to header cells
            const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
                if (cell) Object.assign(cell, headerStyle);
            }

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Stock Count');

            XLSX.writeFile(wb, `${fileName}_${formatDate()}.xlsx`);

            toast.success('ส่งออกไฟล์สำเร็จ', {
                description: `บันทึกไฟล์ ${fileName}_${formatDate()}.xlsx แล้ว`
            });
        } catch (error) {
            console.error('Export failed:', error);
            handleExportError(error as Error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const doc = new jsPDF();

            // เพิ่ม Header
            doc.setFontSize(16);
            doc.text('ThaiBev Stock Reconciliation Report', 14, 15);
            doc.setFontSize(10);
            doc.text(`วันที่พิมพ์: ${formatDate()}`, 14, 22);

            // สร้างตาราง
            const tableColumns = [
                'รหัสสินค้า',
                'ชื่อสินค้า',
                'ที่เก็บ',
                'จำนวนในระบบ',
                'จำนวนนับจริง',
                'ผลต่าง',
                'สถานะ'
            ];

            const tableData = data.map(item => [
                item.itemCode,
                item.itemName,
                item.location,
                item.system?.toLocaleString(),
                item.physical?.toLocaleString(),
                item.difference?.toLocaleString(),
                item.status === 'high' ? 'สูง' :
                    item.status === 'medium' ? 'ปานกลาง' : 'ต่ำ'
            ]);

            (doc as any).autoTable({
                head: [tableColumns],
                body: tableData,
                startY: 30,
                styles: { fontSize: 8, font: 'THSarabunNew' },
                headStyles: { fillColor: [37, 99, 235] },
                alternateRowStyles: { fillColor: [245, 247, 251] },
            });

            doc.save(`${fileName}_${formatDate()}.pdf`);
        } catch (error) {
            console.error('Export failed:', error);
            handleExportError(error as Error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={disabled || isExporting}
                        className="min-w-[100px]"
                    >
                        {isExporting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                กำลังส่งออก...
                            </>
                        ) : (
                            <>
                                <Download className="mr-2 h-4 w-4" />
                                ส่งออก
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-[200px]"
                >
                    <DropdownMenuItem
                        onClick={exportToExcel}
                        disabled={isExporting}
                        className="flex items-center"
                    >
                        <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                        <div className="flex flex-col">
                            <span>ส่งออกเป็น Excel</span>
                            <span className="text-xs text-muted-foreground">
                                .xlsx format
                            </span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={exportToPDF}
                        disabled={isExporting}
                        className="flex items-center"
                    >
                        <FileType2 className="mr-2 h-4 w-4 text-red-600" />
                        <div className="flex flex-col">
                            <span>ส่งออกเป็น PDF</span>
                            <span className="text-xs text-muted-foreground">
                                พร้อมตารางอัตโนมัติ
                            </span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}