"use client"

import { Factory, mockFactories, FactoryData } from '@/types/factory';
import { useState, useEffect } from 'react';
import { getFactoryData } from '@/lib/mockData';

// Import ShadCN UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUser} from "@/lib/auth";
import { LineChart as LineChartIcon,Download as FileDownload, Settings, Warehouse
} from 'lucide-react';

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

// Mock warehouse zones data
const warehouseZones = [
    { id: 1, name: 'A', itemCount: 120, status: 'completed' },
    { id: 2, name: 'B', itemCount: 80, status: 'in-progress' },
    { id: 3, name: 'C', itemCount: 200, status: 'pending' },
    { id: 4, name: 'D', itemCount: 150, status: 'completed' },
];

// Mock time discrepancy data for heatmap
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

// เพิ่ม mock data สำหรับการวิเคราะห์เพิ่มเติม
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

import { Header } from './components/layout/Header';
import { TabNavigation } from './components/tabs/TabNavigation';
import { OverviewTab } from './components/tabs/OverviewTab';
import { AnalyticsTab } from './components/tabs/AnalyticsTab';
import { DiscrepancyTab } from './components/tabs/DiscrepancyTab';
import { Footer } from './components/layout/Footer';
import { AllFactoriesTab } from './components/tabs/AllFactoriesTab';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
    const [factoryData, setFactoryData] = useState<FactoryData | null>(null);

    // Initialize with first factory
    useEffect(() => {
        if (mockFactories.length > 0 && !selectedFactory) {
            setSelectedFactory(mockFactories[0]);
        }
    }, [selectedFactory]);

    // Load factory data when selected factory changes
    useEffect(() => {
        if (selectedFactory) {
            try {
                const data = getFactoryData(selectedFactory);
                console.log('Factory Data:', data); // เพื่อ debug
                setFactoryData(data);
            } catch (error) {
                console.error('Error fetching factory data:', error);
            }
        }
    }, [selectedFactory]);

    const handleFactoryChange = (factoryId: string) => {
        const factory = mockFactories.find(f => f.id.toString() === factoryId);
        setSelectedFactory(factory || null);
    };

    const formattedDate = new Date().toLocaleString('th-TH', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header
                notifications={recentNotifications}
                selectedFactory={selectedFactory}
                onFactoryChange={handleFactoryChange}
            />

            <main className="flex-1 container mx-auto py-6 px-4">
                <Tabs defaultValue="all-factories" value={activeTab} onValueChange={setActiveTab}>
                    <TabNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        userRole={mockUser.role}
                    />

                    <TabsContent value="all-factories">
                        <AllFactoriesTab />
                    </TabsContent>
                    
                    {selectedFactory && factoryData && (
                        <>
                            <OverviewTab
                                stockData={factoryData.stockData}
                                discrepancyData={factoryData.discrepancyData}
                            />
                            <AnalyticsTab
                                insights={factoryData.analyticsInsights}
                                timeData={timeDiscrepancyData}
                            />
                            <DiscrepancyTab
                                data={factoryData.discrepancyData}
                            />
                        </>
                    )}
                </Tabs>
            </main>

            <Footer lastUpdate={formattedDate} />
        </div>
    );
}
