"use client"

import { useMemo } from 'react';
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

export function AllFactoriesTab() {
    const allFactoriesData = useMemo(() => {
        return mockFactories.map(factory => {
            const data = getFactoryData(factory);
            const totalSystem = data.discrepancyData.reduce((acc, item) => acc + item.system, 0);
            const totalPhysical = data.discrepancyData.reduce((acc, item) => acc + item.physical, 0);
            const totalDifference = totalPhysical - totalSystem;
            const discrepancyRate = ((Math.abs(totalDifference) / totalSystem) * 100).toFixed(2);

            return {
                id: factory.id,
                code: factory.code,
                name: factory.name,
                region: factory.region,
                province: factory.province,
                systemCount: totalSystem,
                physicalCount: totalPhysical,
                difference: totalDifference,
                discrepancyRate: Number(discrepancyRate),
                status: Number(discrepancyRate) > 10 ? 'high' : Number(discrepancyRate) > 5 ? 'medium' : 'low'
            };
        });
    }, []);

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

    const chartData = Object.values(regionSummary).map(region => ({
        name: region.name,
        avgRate: (region.avgDiscrepancyRate / region.factoryCount).toFixed(2)
    }));

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
                            {(allFactoriesData.reduce((acc, f) => acc + f.discrepancyRate, 0) / allFactoriesData.length).toFixed(2)}%
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
                    <CardTitle>รายการโรงงานทั้งหมด</CardTitle>
                    <CardDescription>แสดงข้อมูลความคลาดเคลื่อนของทุกโรงงาน</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={allFactoriesData} />
                </CardContent>
            </Card>
        </div>
    );
}