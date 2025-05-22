"use client"


import { useState, useEffect } from 'react';
import { wmsService } from '@/services/api';
import type { WMSItem } from '@/types/wms';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { DatePicker } from './components/filters/DatePicker';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from './components/tabs/OverviewTab';
import { InventoryDisplayTab } from './components/tabs/InventoryDisplayTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

// ...existing imports

export default function Dashboard() {
    // Add state for Header props
    const [selectedFactory, setSelectedFactory] = useState('nakhonratchasima');
    const [recentNotifications] = useState([
        {
            id: '1',
            message: 'พบความคลาดเคลื่อนในการนับสินค้า Location 1BA001A',
            timestamp: new Date()
        }
    ]);
    const [currentUser] = useState({
        role: 'checker',
        region: 'northeast'
    });

    const handleFactoryChange = (value: string) => {
        setSelectedFactory(value);
    };

    // Update the items state initialization
    const [items, setItems] = useState<WMSItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Add these types after the imports
    interface Signature {
        name: string;
        timestamp: Date;
    }

    interface Signatures {
        [key: string]: Signature;
    }

    // Add this inside the Dashboard component, after the existing states
    const [signatures, setSignatures] = useState<Signatures>({});

    const handleSignature = (role: string) => {
        // Get user name from current user (you might want to get this from your auth system)
        const userName = "John Doe"; // Replace with actual user name

        setSignatures(prev => ({
            ...prev,
            [role]: {
                name: userName,
                timestamp: new Date()
            }
        }));

        toast({
            title: "ลงนามสำเร็จ",
            description: "บันทึกการลงนามเรียบร้อยแล้ว",
            variant: "default"
        });
    };

    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            try {
                console.log('Fetching items...');
                const response = await wmsService.getItems();
                console.log('Raw API Response:', response); // log raw response

                // Handle different response formats
                let itemsData = [];
                if (Array.isArray(response)) {
                    // If response is directly an array
                    itemsData = response;
                } else if (response && typeof response === 'object') {
                    // If response is an object, try to find items array
                    if (Array.isArray(response.items)) {
                        itemsData = response.items;
                    } else if (Array.isArray(response.data)) {
                        itemsData = response.data;
                    } else {
                        // If response is a single item, wrap it in array
                        itemsData = [response];
                    }
                }

                // Validate items data structure
                const validItems = itemsData.filter((item: any) =>
                    item &&
                    typeof item === 'object' &&
                    'ItemCode' in item &&
                    'Location' in item
                );

                if (validItems.length > 0) {
                    setItems(validItems);
                } else {
                    console.error('No valid items found in response:', itemsData);
                    throw new Error('No valid items found in response');
                }

            } catch (error) {
                console.error('Failed to load items:', error);
                toast({
                    title: "ไม่สามารถโหลดข้อมูลได้",
                    description: "กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadItems();
    }, []);

    // Define types for the return value of getFilteredData
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

// Update getFilteredData function with null checks
    const getFilteredData = (): { stockData: StockData; discrepancyData: DiscrepancyData } => {
        // Return default values if items is empty
        if (!items || items.length === 0) {
            return {
                stockData: {
                    totalLocations: 0,
                    totalItems: 0,
                    totalPallets: 0,
                    countedPallets: 0,
                },
                discrepancyData: {
                    totalDiscrepancies: 0,
                    locations: [],
                    allItems: [],
                    percentage: 0
                }
            };
        }

        // Calculate stock statistics
        const stockData = {
            totalLocations: new Set(items.map(item => item.Location)).size,
            totalItems: items.length,
            totalPallets: items.reduce((sum, item) => sum + item.total_pallet, 0),
            countedPallets: items.reduce((sum, item) => sum + item.CountPallet, 0),
        };

        // Calculate discrepancy data
        const discrepancyData: DiscrepancyData = {
            totalDiscrepancies: items.filter(item => item.Diff_Pallet !== 0).length,
            locations: items.filter(item => item.Diff_Pallet !== 0).map((item) => ({
                location: item.Location,
                itemCode: item.ItemCode,
                description: item.description || '-', // Ensure description is always a string
                expected: item.total_pallet,
                counted: item.CountPallet,
                difference: item.Diff_Pallet
            })),
            allItems: items.map((item) => ({  // เพิ่ม allItems ที่มีข้อมูลทั้งหมด
                location: item.Location,
                itemCode: item.ItemCode,
                description: item.description || '-', // Ensure description is always a string
                expected: item.total_pallet,
                counted: item.CountPallet,
                difference: item.Diff_Pallet
            })),
            percentage: items.length > 0
                ? (items.filter(item => item.Diff_Pallet !== 0).length / items.length) * 100
                : 0
        };

        return {
            stockData,
            discrepancyData
        };
    };

    // ...existing functions

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูล...</div>;
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header
                    notifications={recentNotifications}
                    selectedFactory={selectedFactory}
                    onFactoryChange={handleFactoryChange}
                    canChangeFactory={currentUser.role !== 'inventory_team'}
                    userRegion={currentUser.region}
                />

                <main className="flex-1 p-6 space-y-6 bg-gray-50">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <div className="text-lg mb-2">กำลังโหลดข้อมูล...</div>
                                <div className="text-gray-500">กรุณารอสักครู่</div>
                            </div>
                        </div>
                    ) : (
                        <Tabs defaultValue="discrepancy" className="space-y-4">
                            <div className="flex items-center justify-between">
                                <TabsList>
                                    <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                                    <TabsTrigger value="discrepancy">รายการความคลาดเคลื่อน</TabsTrigger>
                                    <TabsTrigger value="analytics">วิเคราะห์</TabsTrigger>
                                </TabsList>
                                <DatePicker
                                    date={selectedDate}
                                    onDateChange={(newDate) => setSelectedDate(newDate || new Date())}
                                />
                            </div>

                            <TabsContent value="overview">
                                <OverviewTab
                                    stockData={getFilteredData().stockData}
                                    discrepancyData={getFilteredData().discrepancyData}
                                    userRole={currentUser.role}
                                    userRegion={currentUser.region}
                                />
                            </TabsContent>

                            <TabsContent value="discrepancy">
                                <InventoryDisplayTab 
                                    items={getFilteredData().discrepancyData.allItems} 
                                />
                            </TabsContent>

                            <TabsContent value="analytics">
                                {/* Add analytics content */}
                            </TabsContent>
                        </Tabs>
                    )}
                </main>
            </div>
        </div>
    );
}
