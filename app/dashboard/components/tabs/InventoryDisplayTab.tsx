"use client"

import { useState, useEffect, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

interface InventoryItem {
    location: string;
    itemCode: string;
    description: string;
    expected: number;
    counted: number;
    difference: number;
}

interface InventoryDisplayTabProps {
    items: InventoryItem[];
}

type SortField = 'itemCode' | 'description' | 'location' | 'expected' | 'counted' | 'difference';
type SortDirection = 'asc' | 'desc';

export function InventoryDisplayTab({ items }: InventoryDisplayTabProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
    const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(items);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<SortField>('itemCode');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    
    const itemsPerPage = 10;

    // Apply filters, sorting, and pagination
    useEffect(() => {
        let result = [...items];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                (item.itemCode?.toLowerCase().includes(query)) || 
                (item.description?.toLowerCase().includes(query)) || 
                (item.location?.toLowerCase().includes(query))
            );
        }

        // Filter by differences
        if (showOnlyDifferences) {
            result = result.filter(item => item.difference !== 0);
        }

        // Sort items
        result.sort((a, b) => {
            if (sortField === 'itemCode' || sortField === 'description' || sortField === 'location') {
                return sortDirection === 'asc' 
                    ? a[sortField].localeCompare(b[sortField])
                    : b[sortField].localeCompare(a[sortField]);
            } else {
                return sortDirection === 'asc'
                    ? a[sortField] - b[sortField]
                    : b[sortField] - a[sortField];
            }
        });

        setFilteredItems(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchQuery, showOnlyDifferences, items, sortField, sortDirection]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredItems, currentPage]);

    // Handle sorting
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            // Toggle direction if same field
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new field and default to ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Render sort indicator
    const renderSortIndicator = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="ml-1 h-4 w-4 inline" />;
        }
        return sortDirection === 'asc' 
            ? <ArrowUp className="ml-1 h-4 w-4 inline text-primary" />
            : <ArrowDown className="ml-1 h-4 w-4 inline text-primary" />;
    };

    // Calculate summary statistics
    const summaryStats = useMemo(() => {
        const totalItems = filteredItems.length;
        const itemsWithDiff = filteredItems.filter(item => item.difference !== 0).length;
        const percentWithDiff = totalItems > 0 ? (itemsWithDiff / totalItems) * 100 : 0;
        
        return {
            totalItems,
            itemsWithDiff,
            percentWithDiff: percentWithDiff.toFixed(1)
        };
    }, [filteredItems]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>ตัวกรองข้อมูล</CardTitle>
                        <CardDescription>ค้นหาและกรองข้อมูลสินค้าคงคลัง</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input 
                                id="search"
                                className="pl-8"
                                placeholder="ค้นหาตามรหัสสินค้า / ชื่อสินค้า / ตำแหน่ง..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                            <Checkbox 
                                id="showDifferences" 
                                checked={showOnlyDifferences}
                                onCheckedChange={(checked) => {
                                    setShowOnlyDifferences(checked === true);
                                }}
                            />
                            <Label htmlFor="showDifferences" className="font-medium">
                                แสดงเฉพาะรายการที่มีความแตกต่าง (Diff_Pallet ≠ 0)
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>สรุปข้อมูล</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-500">จำนวนรายการทั้งหมด</p>
                                <p className="text-2xl font-bold">{summaryStats.totalItems}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-500">รายการที่มีความแตกต่าง</p>
                                <p className="text-2xl font-bold text-amber-600">{summaryStats.itemsWithDiff}</p>
                                <Badge variant="outline" className="mt-1">
                                    {summaryStats.percentWithDiff}% ของทั้งหมด
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card>
                <CardHeader>
                    <CardTitle>รายการสินค้าคงคลัง</CardTitle>
                    <CardDescription>
                        แสดงรายการสินค้าคงคลังทั้งหมด {filteredItems.length} รายการ 
                        (หน้า {currentPage} จาก {totalPages || 1})
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('itemCode')}
                                    >
                                        รหัสสินค้า {renderSortIndicator('itemCode')}
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('description')}
                                    >
                                        ชื่อสินค้า {renderSortIndicator('description')}
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('location')}
                                    >
                                        ตำแหน่ง {renderSortIndicator('location')}
                                    </TableHead>
                                    <TableHead 
                                        className="text-right cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('expected')}
                                    >
                                        จำนวนที่คาดหวัง {renderSortIndicator('expected')}
                                    </TableHead>
                                    <TableHead 
                                        className="text-right cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('counted')}
                                    >
                                        จำนวนที่นับได้ {renderSortIndicator('counted')}
                                    </TableHead>
                                    <TableHead 
                                        className="text-right cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('difference')}
                                    >
                                        ความแตกต่าง {renderSortIndicator('difference')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedItems.length > 0 ? (
                                    paginatedItems.map((item, index) => (
                                        <TableRow 
                                            key={`${item.itemCode}-${item.location}-${index}`}
                                            className={item.difference !== 0 ? "bg-amber-50" : ""}
                                        >
                                            <TableCell className="font-medium">{item.itemCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.location}</TableCell>
                                            <TableCell className="text-right">{item.expected}</TableCell>
                                            <TableCell className="text-right">{item.counted}</TableCell>
                                            <TableCell 
                                                className={`text-right font-medium ${
                                                    item.difference > 0 
                                                        ? 'text-green-600' 
                                                        : item.difference < 0 
                                                        ? 'text-red-600' 
                                                        : ''
                                                }`}
                                            >
                                                {item.difference}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search className="h-8 w-8 text-gray-400 mb-2" />
                                                <p className="text-lg font-medium">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</p>
                                                <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือลบตัวกรองเพื่อดูผลลัพธ์เพิ่มเติม</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            size="default"
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                    
                                    {/* Show first page */}
                                    {currentPage > 2 && (
                                        <PaginationItem>
                                            <PaginationLink 
                                                size="default"
                                                onClick={() => setCurrentPage(1)}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    
                                    {/* Ellipsis if needed */}
                                    {currentPage > 3 && (
                                        <PaginationItem>
                                            <span className="px-4 py-2">...</span>
                                        </PaginationItem>
                                    )}
                                    
                                    {/* Previous page if not first */}
                                    {currentPage > 1 && (
                                        <PaginationItem>
                                            <PaginationLink 
                                                size="default"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                {currentPage - 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    
                                    {/* Current page */}
                                    <PaginationItem>
                                        <PaginationLink 
                                            size="default"
                                            isActive
                                        >
                                            {currentPage}
                                        </PaginationLink>
                                    </PaginationItem>
                                    
                                    {/* Next page if not last */}
                                    {currentPage < totalPages && (
                                        <PaginationItem>
                                            <PaginationLink 
                                                size="default"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                {currentPage + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    
                                    {/* Ellipsis if needed */}
                                    {currentPage < totalPages - 2 && (
                                        <PaginationItem>
                                            <span className="px-4 py-2">...</span>
                                        </PaginationItem>
                                    )}
                                    
                                    {/* Last page if not current or next */}
                                    {currentPage < totalPages - 1 && (
                                        <PaginationItem>
                                            <PaginationLink 
                                                size="default"
                                                onClick={() => setCurrentPage(totalPages)}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    
                                    <PaginationItem>
                                        <PaginationNext 
                                            size="default"
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
