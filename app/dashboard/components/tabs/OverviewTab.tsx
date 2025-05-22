"use client"

import { useState, useMemo } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StatsCards } from "../stats/StatsCards";
import { AlertBanner } from "../alerts/AlertBanner";
import { TrendChart } from "../charts/TrendChart";
import { CategoryChart } from "../charts/CategoryChart";
import { DiscrepancyTable } from "../tables/DiscrepancyTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ComparisonChart } from "../charts/ComparisonChart";

interface OverviewTabProps {
    stockData: Array<{
        code: string;
        name: string;
        zone: string;
        location: string;
        position: string; // เพิ่ม position
        system: number;
        physical: number;
        difference: number;
    }>;
    discrepancyData: Array<{
        id: number;
        code: string;
        name: string;
        location: string;
        position: string; // เพิ่ม position
        zone: string;
        physical: number;
        system: number;
        difference: number;
        status: 'high' | 'medium' | 'low';
    }>;
    userRole: string;
    userRegion: string;
}

export function OverviewTab({
    stockData,
    discrepancyData,
    userRole,
    userRegion
}: OverviewTabProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stockData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(stockData.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Prepare data for the chart
    const chartData = useMemo(() => {
        return currentItems.map(item => ({
            name: item.name,
            system: item.system,
            physical: item.physical,
            difference: item.difference
        }));
    }, [currentItems]);

    return (
        <div className="grid gap-6">
            {/* Add Chart Card */}
            <Card>
                <CardHeader>
                    <CardTitle>เปรียบเทียบจำนวนนับจริงกับระบบ WMS</CardTitle>
                    <CardDescription>
                        แสดงการเปรียบเทียบระหว่างจำนวนที่นับได้จริงกับจำนวนในระบบ WMS
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ComparisonChart data={chartData} />
                </CardContent>
            </Card>

            {/* Existing Table Card */}
            <Card>
                <CardHeader>
                    <CardTitle>ข้อมูลสินค้าในคลัง</CardTitle>
                    <CardDescription>
                        แสดงข้อมูลสินค้าในคลัง {userRegion}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>รหัสสินค้า</TableHead>
                                <TableHead>ชื่อสินค้า</TableHead>
                                <TableHead>โซน</TableHead>
                                <TableHead>ตำแหน่ง</TableHead>
                                <TableHead className="text-right">จำนวนในระบบ</TableHead>
                                <TableHead className="text-right">จำนวนนับจริง</TableHead>
                                <TableHead className="text-right">ผลต่าง</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.zone}</TableCell>
                                    <TableCell>{item.position}</TableCell>
                                    <TableCell className="text-right">{item.system}</TableCell>
                                    <TableCell className="text-right">{item.physical}</TableCell>
                                    <TableCell className="text-right">
                                        <span className={item.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {item.difference > 0 ? '+' : ''}{item.difference}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    {/* Previous Button */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => handlePageChange(page)}
                                                isActive={currentPage === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {/* Next Button */}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}

                    {/* Page Information */}
                    <div className="text-sm text-gray-500 text-center mt-2">
                        แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, stockData.length)} จาก {stockData.length} รายการ
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}