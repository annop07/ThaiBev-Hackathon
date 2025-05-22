"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, mockFactories, FactoryData } from '@/types/factory';
import { useState, useEffect } from 'react';
import { getFactoryData } from '@/lib/mockData';

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
import { StockCountReport } from './components/reports/StockCountReport';
import { UserManagement } from './components/user-management/UserManagement';

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

    const [currentUser] = useState<User>(users[0]); // เปลี่ยนเป็น index ที่ต้องการทดสอบ

    const [signatures, setSignatures] = useState<StockCountSignatures>({});
    const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
    const [factoryData, setFactoryData] = useState<FactoryData | null>(null);

    useEffect(() => {
        if (mockFactories.length > 0 && !selectedFactory) {
            setSelectedFactory(mockFactories[0]);
        }
    }, [selectedFactory]);

    useEffect(() => {
        if (selectedFactory && (currentUser.role === 'admin' || selectedFactory.region === currentUser.region)) {
            try {
                const data = getFactoryData(selectedFactory);
                setFactoryData(data);
            } catch (error) {
                console.error('Error fetching factory data:', error);
                toast.error('ไม่สามารถโหลดข้อมูลโรงงานได้');
            }
        }
    }, [selectedFactory, currentUser]);

    useEffect(() => {
        // ตรวจสอบความคลาดเคลื่อนเมื่อข้อมูลเปลี่ยนแปลง
        if (factoryData?.discrepancyData) {
            factoryData.discrepancyData.forEach(item => {
                if (Math.abs(item.difference) > 10) {
                    NotificationService.notifyDiscrepancy(item.itemName, item.difference);
                }
            });
        }
    }, [factoryData]);

    const handleFactoryChange = (factoryId: string) => {
        const factory = mockFactories.find(f => f.id.toString() === factoryId);
        if (factory && (currentUser.role === 'admin' || factory.region === currentUser.region)) {
            setSelectedFactory(factory);
        } else {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงข้อมูลโรงงานนี้');
        }
    };

    // แจ้งเตือนสถานะการตรวจนับ
    const updateZoneStatus = (zone: string, status: string) => {
        NotificationService.notifyStockCountStatus(zone, status);
    };

    // ตรวจสอบสิทธิ์การเข้าถึง
    const canAccessRegion = (userRegion: string) => {
        if (!currentUser) return false;

        if (currentUser.role === 'admin') return true;

        // Regional Manager can only access their assigned region
        if (currentUser.role === 'regional_manager') {
            return currentUser.region === userRegion;
        }

        return false;
    };

    // แก้ไขฟังก์ชัน canAccessWarehouse
    const canAccessWarehouse = (warehouseRegion: string) => {
        if (!currentUser) return false;

        switch (currentUser.role) {
            case 'admin':
                return true;
            case 'regional_manager':
                return currentUser.region === warehouseRegion;
            case 'warehouse_head':
            case 'inventory_team':
            case 'rdc_manager':
                return currentUser.region === warehouseRegion;
            default:
                return false;
        }
    };

    const canAccessZone = (zone: string) => {
        if (!currentUser) return false;

        switch (currentUser.role) {
            case 'inventory_team':
                return currentUser.assignedZones?.includes(zone);
            case 'warehouse_head':
                return true; // หัวหน้าคลังเข้าถึงได้ทุกโซนในคลังของตัวเอง
            case 'regional_manager':
                return true; // ผู้จัดการภาคเข้าถึงได้ทุกโซนในภูมิภาค
            case 'admin':
                return true;
            default:
                return false;
        }
    };

    const formattedDate = new Date().toLocaleString('th-TH', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    // เพิ่มฟังก์ชัน handleSign
    const handleSign = (signature: Signature) => {
        setSignatures(prev => {
            switch (currentUser.role) {
                case 'warehouse_head':
                    return { ...prev, warehouseHead: signature };
                case 'inventory_team':
                    return { ...prev, inventoryTeam: signature };
                case 'regional_manager':
                    return { ...prev, regionalManager: signature };
                default:
                    return prev;
            }
        });
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
                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                            {currentUser.role !== 'inventory_team' && (
                                <TabsTrigger value="analytics">วิเคราะห์</TabsTrigger>
                            )}
                        </TabsList>

                        <TabsContent value="overview">
                            <OverviewTab
                                stockData={factoryData?.stockData.filter(item =>
                                    // กรองข้อมูลตามภูมิภาค
                                    canAccessWarehouse(item.region) &&
                                    canAccessZone(item.zone)
                                ) || []}
                                discrepancyData={factoryData?.discrepancyData.filter(item =>
                                    // กรองข้อมูลตามภูมิภาค
                                    canAccessWarehouse(item.region) &&
                                    canAccessZone(item.location)
                                ) || []}
                                userRole={currentUser.role}
                                userRegion={currentUser.region}
                            />
                        </TabsContent>

                        {currentUser.role !== 'inventory_team' && (
                            <TabsContent value="analytics">
                                <AnalyticsTab
                                    // กรองข้อมูลตามภูมิภาค
                                    insights={
                                        currentUser.role === 'admin'
                                            ? factoryData?.analyticsInsights
                                            : filterInsightsByRegion(factoryData?.analyticsInsights, currentUser.region)
                                    }
                                    timeData={
                                        currentUser.role === 'admin'
                                            ? timeDiscrepancyData
                                            : filterTimeDataByRegion(timeDiscrepancyData, currentUser.region)
                                    }
                                    userRole={currentUser.role}
                                    userRegion={currentUser.region}
                                />
                            </TabsContent>
                        )}
                    </Tabs>

                    {/* แสดงเฉพาะข้อมูลในภูมิภาคที่รับผิดชอบ */}
                    {canAccessWarehouse(currentUser.region) && (
                        <StockCountReport
                            date={new Date()}
                            region={currentUser.region}
                            stockData={mockStockData.filter(item =>
                                currentUser.role === 'admin' ||
                                item.region === currentUser.region
                            )}
                            currentUser={currentUser}
                            signatures={signatures}
                            onSign={handleSign}
                            canEdit={currentUser.role === 'inventory_team'}
                            canApprove={currentUser.role === 'regional_manager'}
                        />
                    )}
                </main>

                <Footer lastUpdate={formattedDate} />
            </div>
        </div>
    );
}
