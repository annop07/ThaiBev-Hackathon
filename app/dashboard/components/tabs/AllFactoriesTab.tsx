"use client"

import { useMemo, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { DataTable } from "../tables/DataTable";
import { columns } from "../tables/FactoryColumns";
import { mockFactories } from "@/types/factory";
import { getFactoryData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function AllFactoriesTab() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoize factory data with consistent number formatting
    const allFactoriesData = useMemo(() => {
        return mockFactories.map(factory => {
            const data = getFactoryData(factory);
            const factoryInfo = data.factory;
            const discrepancyRate = factoryInfo.discrepancyRate || 0;

            return {
                id: factory.id,
                code: factory.code,
                name: factory.name,
                region: factory.region,
                province: factory.province,
                systemCount: factoryInfo.systemCount,
                physicalCount: factoryInfo.physicalCount,
                difference: factoryInfo.physicalCount - factoryInfo.systemCount,
                discrepancyRate: Number(discrepancyRate.toFixed(2)),
                status: factoryInfo.status
            };
        });
    }, []);

    // Calculate average discrepancy rate with consistent formatting
    const averageDiscrepancyRate = useMemo(() => {
        if (!allFactoriesData.length) return 0;
        const total = allFactoriesData.reduce((acc, f) => acc + f.discrepancyRate, 0);
        const average = total / allFactoriesData.length;
        return Number(average.toFixed(2));
    }, [allFactoriesData]);

    const regionSummary = useMemo(() => {
        return allFactoriesData.reduce((acc, factory) => {
            if (!acc[factory.region]) {
                acc[factory.region] = {
                    name: factory.region,
                    totalDiscrepancy: 0,
                    factoryCount: 0,
                    avgDiscrepancyRate: 0
                };
            }
            acc[factory.region].totalDiscrepancy += Math.abs(factory.difference);
            acc[factory.region].factoryCount += 1;
            acc[factory.region].avgDiscrepancyRate += factory.discrepancyRate;
            return acc;
        }, {} as Record<string, any>);
    }, [allFactoriesData]);

    const chartData = useMemo(() => {
        return Object.values(regionSummary).map(region => ({
            name: region.name,
            avgRate: Number((region.avgDiscrepancyRate / region.factoryCount).toFixed(2))
        }));
    }, [regionSummary]);

    // Calculate pagination
    const totalPages = Math.ceil(allFactoriesData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFactories = allFactoriesData.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">จำนวนโรงงานทั้งหมด</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 21V5M5 12H3M5 21H19M5 3H19M19 12h2M7 12a5 5 0 0 1 5-5M17 12a5 5 0 0 0-5-5" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockFactories.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ความคลาดเคลื่อนเฉลี่ย</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {averageDiscrepancyRate}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ความคลาดเคลื่อนตามภูมิภาค</CardTitle>
                    <CardDescription>เปรียบเทียบอัตราความคลาดเคลื่อนเฉลี่ยแต่ละภูมิภาค</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="avgRate"
                                    fill="#2563eb"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>รายการโรงงานทั้งหมด</CardTitle>
                            <CardDescription>แสดงข้อมูลความคลาดเคลื่อนของทุกโรงงาน</CardDescription>
                        </div>
                        <div className="text-sm text-gray-500">
                            แสดง {startIndex + 1}-{Math.min(endIndex, allFactoriesData.length)} จาก {allFactoriesData.length} รายการ
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={currentFactories} />

                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i + 1}>
                                        <PaginationLink
                                            onClick={() => setCurrentPage(i + 1)}
                                            isActive={currentPage === i + 1}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
