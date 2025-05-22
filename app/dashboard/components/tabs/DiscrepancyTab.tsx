"use client"

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileDown } from 'lucide-react';

interface DiscrepancyItem {
    id: number;
    itemCode: string;
    itemName: string;
    location: string;
    physical: number;
    system: number;
    difference: number;
    status: string;
}

interface DiscrepancyTabProps {
    data: DiscrepancyItem[];
}

export function DiscrepancyTab({ data }: DiscrepancyTabProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof DiscrepancyItem;
        direction: 'asc' | 'desc';
    }>({ key: 'id', direction: 'asc' });

    // Filter and sort data
    const filteredData = data.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key: keyof DiscrepancyItem) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'high':
                return 'destructive';
            case 'medium':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>รายการความคลาดเคลื่อน</CardTitle>
                <CardDescription>
                    แสดงรายละเอียดความคลาดเคลื่อนระหว่างจำนวนนับจริงและในระบบ
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="ค้นหาตามรหัสสินค้า, ชื่อสินค้า, หรือตำแหน่ง..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <FileDown className="h-4 w-4" />
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]" onClick={() => handleSort('itemCode')}>
                                    รหัสสินค้า
                                </TableHead>
                                <TableHead onClick={() => handleSort('itemName')}>ชื่อสินค้า</TableHead>
                                <TableHead onClick={() => handleSort('location')}>ตำแหน่ง</TableHead>
                                <TableHead className="text-right" onClick={() => handleSort('physical')}>
                                    นับจริง
                                </TableHead>
                                <TableHead className="text-right" onClick={() => handleSort('system')}>
                                    ในระบบ
                                </TableHead>
                                <TableHead className="text-right" onClick={() => handleSort('difference')}>
                                    ผลต่าง
                                </TableHead>
                                <TableHead onClick={() => handleSort('status')}>สถานะ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.itemCode}</TableCell>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell className="text-right">{item.physical}</TableCell>
                                    <TableCell className="text-right">{item.system}</TableCell>
                                    <TableCell className="text-right">
                                        <span className={item.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {item.difference > 0 ? '+' : ''}{item.difference}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusColor(item.status)}>
                                            {item.status === 'high' ? 'สูง' : item.status === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

// ส่วนที่แสดงใน Dashboard (page.tsx)
<TabsContent value="discrepancy">
    <DiscrepancyTab data={factoryData ? factoryData.discrepancyData : discrepancyData} />
</TabsContent>