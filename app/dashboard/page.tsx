"use client"

import { useState, useEffect } from 'react';
import { Factory, mockFactories, FactoryData } from '@/types/factory';
import { getFactoryData } from '@/lib/mockData';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

// Import UI components
import { mockUser } from "@/lib/auth";
import {
    LineChart as LineChartIcon, Download as FileDownload, Settings, Warehouse
} from 'lucide-react';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/tabs/TabNavigation';
import { OverviewTab } from './components/tabs/OverviewTab';
import { AnalyticsTab } from './components/tabs/AnalyticsTab';
import { Footer } from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import { Card } from "@/components/ui/card";
import { DatePicker } from "./components/filters/DatePicker";

// Mock data
const mockStockData = [
    { date: '15/05', physical: 320, system: 300, difference: 20 },
    { date: '16/05', physical: 332, system: 340, difference: -8 },
    { date: '17/05', physical: 301, system: 290, difference: 11 },
    { date: '18/05', physical: 334, system: 330, difference: 4 },
    { date: '19/05', physical: 390, system: 380, difference: 10 },
];

const discrepancyData = [
    { id: 1, itemCode: 'SKU001', itemName: 'น้ำดื่ม 500ml', location: 'A-101', physical: 145, system: 130, difference: 15, status: 'high' },
    { id: 2, itemCode: 'SKU002', itemName: 'บะหมี่กึ่งสำเร็จรูป', location: 'B-202', physical: 89, system: 95, difference: -6, status: 'medium' },
    { id: 3, itemCode: 'SKU003', itemName: 'น้ำอัดลม 1.5L', location: 'A-105', physical: 78, system: 75, difference: 3, status: 'low' },
    { id: 4, itemCode: 'SKU004', itemName: 'ขนมขบเคี้ยว', location: 'C-301', physical: 212, system: 200, difference: 12, status: 'medium' },
    { id: 5, itemCode: 'SKU005', itemName: 'ข้าวสาร 5 กก.', location: 'D-105', physical: 42, system: 50, difference: -8, status: 'medium' },
];

const categoryData = [
    { name: 'เครื่องดื่ม', count: 256, difference: 18 },
    { name: 'อาหาร', count: 175, difference: -4 },
    { name: 'ขนม', count: 212, difference: 12 },
    { name: 'ของใช้', count: 98, difference: 5 },
    { name: 'อื่นๆ', count: 65, difference: -2 },
];

const recentNotifications = [
    { id: 1, title: "ความคลาดเคลื่อนสูง", description: "พบความคลาดเคลื่อนสูงในสินค้า SKU001 น้ำดื่ม 500ml", type: "error", time: "30 นาทีที่แล้ว" },
    { id: 2, title: "ขาดสต็อก", description: "สินค้า SKU005 ข้าวสาร 5 กก. มีจำนวนนับจริงต่ำกว่าในระบบ", type: "warning", time: "45 นาทีที่แล้ว" },
    { id: 3, title: "การนับสต็อกเสร็จสิ้น", description: "การนับสต็อกในโซน A เสร็จสมบูรณ์แล้ว", type: "info", time: "2 ชั่วโมงที่แล้ว" }
];

const warehouseZones = [
    { id: 1, name: 'A', itemCount: 120, status: 'completed' },
    { id: 2, name: 'B', itemCount: 80, status: 'in-progress' },
    { id: 3, name: 'C', itemCount: 200, status: 'pending' },
    { id: 4, name: 'D', itemCount: 150, status: 'completed' },
];

const timeDiscrepancyData = [
    { hour: '00:00', discrepancy: 5 },
    { hour: '01:00', discrepancy: 3 },
    { hour: '02:00', discrepancy: 8 },
    { hour: '03:00', discrepancy: 6 },
    { hour: '04:00', discrepancy: 2 },
    { hour: '05:00', discrepancy: 4 },
    { hour: '06:00', discrepancy: 7 },
    { hour: '07:00', discrepancy: 1 },
    { hour: '08:00', discrepancy: 3 },
    { hour: '09:00', discrepancy: 5 },
    { hour: '10:00', discrepancy: 2 },
    { hour: '11:00', discrepancy: 4 },
    { hour: '12:00', discrepancy: 6 },
    { hour: '13:00', discrepancy: 3 },
    { hour: '14:00', discrepancy: 5 },
    { hour: '15:00', discrepancy: 7 },
    { hour: '16:00', discrepancy: 2 },
    { hour: '17:00', discrepancy: 4 },
    { hour: '18:00', discrepancy: 6 },
    { hour: '19:00', discrepancy: 3 },
    { hour: '20:00', discrepancy: 5 },
    { hour: '21:00', discrepancy: 2 },
    { hour: '22:00', discrepancy: 4 },
    { hour: '23:00', discrepancy: 6 },
];

const analyticsInsights = {
    trendAnalysis: {
        trend: "เพิ่มขึ้น",
        percentage: 15,
        comparedTo: "เดือนที่แล้ว",
        details: "ความคลาดเคลื่อนมีแนวโน้มเพิ่มขึ้นในช่วงเวลา 14:00-16:00 น."
    },
    topCategories: [
        { name: "เครื่องดื่ม", percentage: 35, status: "เพิ่มขึ้น" },
        { name: "ขนม", percentage: 28, status: "คงที่" },
        { name: "อาหาร", percentage: 22, status: "ลดลง" }
    ],
    recommendations: [
        "ควรเพิ่มความถี่ในการตรวจนับสินค้าประเภทเครื่องดื่มในช่วงบ่าย",
        "แนะนำให้ตรวจสอบกระบวนการจัดเก็บในโซน A เนื่องจากพบความคลาดเคลื่อนบ่อยครั้ง",
        "ควรปรับปรุงการบันทึกข้อมูลสำหรับสินค้าที่มีหลายขนาดบรรจุ"
    ]
};

// Helper functions for filtering data by region
const filterInsightsByRegion = (insights: any, region: string) => {
    if (!insights || region === 'All') return insights;

    return {
        ...insights,
        trendAnalysis: {
            ...insights.trendAnalysis,
            details: `ข้อมูลสำหรับภาค${region}: ${insights.trendAnalysis.details}`
        },
        topCategories: insights.topCategories.map((cat: any) => ({
            ...cat,
            name: `${cat.name} (${region})`
        })),
        recommendations: insights.recommendations.filter((rec: string) =>
            rec.toLowerCase().includes(region.toLowerCase())
        )
    };
};

const filterTimeDataByRegion = (timeData: any[], region: string) => {
    if (region === 'All') return timeData;

    // สมมติว่าแต่ละ entry มี region
    return timeData.filter(entry => entry.region === region);
};

// เพิ่ม import
import { StockCountSignatures, Signature } from '@/types/signature';
import NotificationService from '@/lib/notificationService';
import { users } from '@/lib/mockData'; // Add this import

export default function Dashboard() {
    // อัปเดต comment ให้ถูกต้อง
    // users[0] - Admin
    // users[1] - Warehouse Head
    // users[2] - Inventory Team
    // users[3] - Regional Manager North
    // users[4] - Regional Manager Northeast
    // users[5] - Regional Manager Central
    // users[6] - Regional Manager East
    // users[7] - Regional Manager West
    // users[8] - Regional Manager South

    const [currentUser] = useState<User>(users[4]); // เปลี่ยนเป็น index ที่ต้องการทดสอบ
    const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
    const [factoryData, setFactoryData] = useState<FactoryData | null>(null);
    const [signatures, setSignatures] = useState<StockCountSignatures>({});
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        if (mockFactories.length > 0 && !selectedFactory) {
            setSelectedFactory(mockFactories[0]);
        }
    }, [selectedFactory]);

    useEffect(() => {
        if (selectedFactory && (currentUser.role === 'admin' || selectedFactory.region === currentUser.region)) {
            try {
                const data = getFactoryData(selectedFactory);
                // กรองข้อมูลตามภูมิภาค
                if (currentUser.role !== 'admin') {
                    data.stockData = data.stockData.filter(item =>
                        item.region === currentUser.region);
                    data.discrepancyData = data.discrepancyData.filter(item =>
                        item.region === currentUser.region);
                }
                setFactoryData(data);
            } catch (error) {
                console.error('Error fetching factory data:', error);
            }
        }
    }, [selectedFactory, currentUser]);

    const handleFactoryChange = (factoryId: string) => {
        const factory = mockFactories.find(f => f.id.toString() === factoryId);
        if (factory && (currentUser.role === 'admin' || factory.region === currentUser.region)) {
            setSelectedFactory(factory);
        } else {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงข้อมูลโรงงานนี้');
        }
    };

    const handleSignature = (role: string) => {
        setSignatures(prev => ({
            ...prev,
            [role]: {
                name: currentUser.name,
                timestamp: new Date(),
                role: role
            }
        }));
    };

    // เพิ่มฟังก์ชันสำหรับกรองข้อมูลตามวันที่
    const getFilteredData = () => {
        if (!factoryData) return { stockData: [], discrepancyData: [] };

        return {
            stockData: factoryData.stockData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.toDateString() === selectedDate.toDateString();
            }),
            discrepancyData: factoryData.discrepancyData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.toDateString() === selectedDate.toDateString();
            })
        };
    };

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
                    {/* เพิ่ม DatePicker ด้านบน */}
                    <div className="mb-6">
                        <DatePicker
                            date={selectedDate}
                            onDateChange={(newDate) => setSelectedDate(newDate || new Date())}
                        />
                    </div>

                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                            <TabsTrigger value="discrepancy">รายการความคลาดเคลื่อน</TabsTrigger>
                            <TabsTrigger value="analytics">วิเคราะห์</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <OverviewTab
                                stockData={getFilteredData().stockData}
                                discrepancyData={getFilteredData().discrepancyData}
                                userRole={currentUser.role}
                                userRegion={currentUser.region}
                            />
                        </TabsContent>

                        {/* ...existing tabs content... */}
                    </Tabs>

                    {/* Signature Section */}
                    {currentUser.role !== 'inventory_team' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>การลงนาม</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    {!signatures[currentUser.role] ? (
                                        <Button
                                            onClick={() => handleSignature(currentUser.role)}
                                            variant="outline"
                                        >
                                            ลงนามรับรอง
                                        </Button>
                                    ) : (
                                        <div className="text-sm text-gray-500">
                                            ลงนามแล้วโดย {signatures[currentUser.role].name}
                                            <br />
                                            เมื่อ {format(signatures[currentUser.role].timestamp, 'dd/MM/yyyy HH:mm')}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
}
