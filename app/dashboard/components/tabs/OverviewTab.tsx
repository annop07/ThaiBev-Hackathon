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

interface StockData {
    totalLocations: number;
    totalItems: number;
    totalPallets: number;
    countedPallets: number;
}

interface DiscrepancyData {
    totalDiscrepancies: number;
    locations: Array<{
        location: string;
        itemCode: string;
        description: string;
        expected: number;
        counted: number;
        difference: number;
    }>;
    allItems: Array<{
        location: string;
        itemCode: string;
        description: string;
        expected: number;
        counted: number;
        difference: number;
    }>;
    percentage: number;
}

interface OverviewTabProps {
    stockData: StockData;
    discrepancyData: DiscrepancyData;
    userRole: string;
    userRegion: string;
}

const getUniqueInventoryItems = (items: DiscrepancyData['locations']) => {
    const uniqueMap = new Map();

    items.forEach(item => {
        const key = item.itemCode;
        if (!uniqueMap.has(key)) {
            uniqueMap.set(key, {
                ...item,
                total_expected: item.expected,
                total_counted: item.counted,
                total_difference: item.difference
            });
        } else {
            const existing = uniqueMap.get(key);
            existing.total_expected += item.expected;
            existing.total_counted += item.counted;
            existing.total_difference += item.difference;
        }
    });

    return Array.from(uniqueMap.values());
};

export function OverviewTab({
    stockData,
    discrepancyData,
    userRole,
    userRegion
}: OverviewTabProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Paginate discrepancy locations instead of stockData
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = discrepancyData.locations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(discrepancyData.locations.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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
                        แสดงข้อมูลสินค้าในคลัง {userRegion} (รวมตามรหัสสินค้า)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>รหัสสินค้า</TableHead>
                                <TableHead>ชื่อสินค้า</TableHead>
                                <TableHead className="text-right">จำนวนในระบบ (รวม)</TableHead>
                                <TableHead className="text-right">จำนวนนับจริง (รวม)</TableHead>
                                <TableHead className="text-right">ผลต่าง</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {getUniqueInventoryItems(discrepancyData.allItems || []).map((item) => (
                                <TableRow
                                    key={item.itemCode}
                                    className={item.total_difference !== 0 ? "bg-red-50" : ""}
                                >
                                    <TableCell>{item.itemCode}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">{item.total_expected}</TableCell>
                                    <TableCell className="text-right">{item.total_counted}</TableCell>
                                    <TableCell
                                        className={`text-right ${item.total_difference !== 0 ? "text-red-600 font-medium" : ""
                                            }`}
                                    >
                                        {item.total_difference}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Discrepancy Table */}
            {discrepancyData.locations.length > 0 && (
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>รายการนับสินค้าเทียบกับWMS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Location</TableHead>
                                        <TableHead>รหัสสินค้า</TableHead>
                                        <TableHead>รายละเอียด</TableHead>
                                        <TableHead className="text-right">WMS</TableHead>
                                        <TableHead className="text-right">นับจริง</TableHead>
                                        <TableHead className="text-right">ผลต่าง</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentItems.map((item) => (
                                        <TableRow key={`${item.itemCode}-${item.location}`}>
                                            <TableCell>{item.location}</TableCell>
                                            <TableCell>{item.itemCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell className="text-right">{item.expected}</TableCell>
                                            <TableCell className="text-right">{item.counted}</TableCell>
                                            <TableCell className="text-right text-red-600 font-medium">
                                                {item.difference}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded ${currentPage === page
                                                ? "bg-primary text-white"
                                                : "bg-gray-100"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}