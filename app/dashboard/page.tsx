"use client"

import { useState } from 'react';
import { 
  LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Bell, AlertTriangle, Package, Layers, Calendar,
  Filter, Search, PieChart, BarChart3, LineChart as LineChartIcon, 
  List, User
} from 'lucide-react';

// Import ShadCN UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

export default function dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const totalPhysical = discrepancyData.reduce((acc, item) => acc + item.physical, 0);
  const totalSystem = discrepancyData.reduce((acc, item) => acc + item.system, 0);
  const totalDifference = totalPhysical - totalSystem;
  const differencePercent = ((totalDifference / totalSystem) * 100).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Layers className="text-blue-600" size={28} />
            <h1 className="text-xl font-bold text-slate-800">Stock Reconciliation Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs font-bold text-white flex items-center justify-center">3</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>การแจ้งเตือน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recentNotifications.map(notification => (
                  <DropdownMenuItem key={notification.id} className="py-3 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'error' ? 'bg-red-100 text-red-600' : 
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {notification.type === 'error' ? 
                          <AlertTriangle className="h-4 w-4" /> : 
                          notification.type === 'warning' ? 
                          <AlertTriangle className="h-4 w-4" /> : 
                          <Bell className="h-4 w-4" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="justify-center">
                  <Button variant="ghost" className="w-full" size="sm">ดูทั้งหมด</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>โปรไฟล์</span>
                </DropdownMenuItem>
                <DropdownMenuItem>การตั้งค่า</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>ออกจากระบบ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content with ShadCN Tabs */}
      <main className="flex-1 container mx-auto py-6 px-4">
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>ภาพรวม</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>การวิเคราะห์</span>
              </TabsTrigger>
              <TabsTrigger value="discrepancy" className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                <span>รายงานความคลาดเคลื่อน</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>การแจ้งเตือน</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Filter Controls */}
            <div className="flex items-center space-x-2">
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="ทุกประเภทสินค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">ทุกประเภทสินค้า</SelectItem>
                  <SelectItem value="drinks">เครื่องดื่ม</SelectItem>
                  <SelectItem value="food">อาหาร</SelectItem>
                  <SelectItem value="snacks">ขนม</SelectItem>
                  <SelectItem value="household">ของใช้</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="today">
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="วันนี้" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">วันนี้</SelectItem>
                  <SelectItem value="this-week">สัปดาห์นี้</SelectItem>
                  <SelectItem value="this-month">เดือนนี้</SelectItem>
                  <SelectItem value="custom">กำหนดเอง</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative w-[240px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input type="search" placeholder="ค้นหาสินค้า..." className="pl-9 h-9" />
              </div>
            </div>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                    จำนวนในระบบ
                    <Package className="text-blue-500 h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSystem}</div>
                  <p className="text-xs text-slate-500 mt-1">อัพเดทล่าสุด: 19 พ.ค. 14:30 น.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                    จำนวนนับจริง
                    <Layers className="text-green-500 h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPhysical}</div>
                  <p className="text-xs text-slate-500 mt-1">อัพเดทล่าสุด: 19 พ.ค. 14:30 น.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                    ความคลาดเคลื่อน
                    <AlertTriangle className="text-yellow-500 h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{color: totalDifference > 0 ? '#10b981' : totalDifference < 0 ? '#ef4444' : '#6b7280'}}>
                    {totalDifference > 0 && '+'}{totalDifference}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">คิดเป็น {differencePercent}% จากระบบ</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                    รายการที่มีปัญหา
                    <Bell className="text-red-500 h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-slate-500 mt-1">2 รายการแจ้งเตือนใหม่</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Alert */}
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>แจ้งเตือน: พบความคลาดเคลื่อนในสินค้า</AlertTitle>
              <AlertDescription>
                พบความแตกต่างระหว่างจำนวนนับจริงและข้อมูลในระบบจำนวน 3 รายการ โปรดตรวจสอบในส่วนของรายงานความคลาดเคลื่อน
              </AlertDescription>
            </Alert>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>แนวโน้มสต็อก 5 วันล่าสุด</CardTitle>
                  <CardDescription>เปรียบเทียบข้อมูลจำนวนสินค้าในระบบและการนับจริง</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockStockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="physical" stroke="#10b981" name="นับจริง" strokeWidth={2} />
                        <Line type="monotone" dataKey="system" stroke="#3b82f6" name="ในระบบ" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ความคลาดเคลื่อนตามประเภทสินค้า</CardTitle>
                  <CardDescription>แสดงความแตกต่างของจำนวนสินค้าแยกตามประเภท</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="จำนวน" />
                        <Bar dataKey="difference" fill="#f59e0b" name="ความคลาดเคลื่อน" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Top Discrepancies */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>รายการที่มีความคลาดเคลื่อนสูงสุด</CardTitle>
                  <CardDescription>สินค้าที่มีความแตกต่างระหว่างจำนวนในระบบและการนับจริง</CardDescription>
                </div>
                <Button variant="outline" size="sm">ดูทั้งหมด</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>รหัสสินค้า</TableHead>
                      <TableHead>ชื่อสินค้า</TableHead>
                      <TableHead>ตำแหน่ง</TableHead>
                      <TableHead>ในระบบ</TableHead>
                      <TableHead>นับจริง</TableHead>
                      <TableHead>ต่าง</TableHead>
                      <TableHead>สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discrepancyData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.itemCode}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.system}</TableCell>
                        <TableCell>{item.physical}</TableCell>
                        <TableCell className="font-medium" style={{color: item.difference > 0 ? '#10b981' : item.difference < 0 ? '#ef4444' : '#6b7280'}}>
                          {item.difference > 0 && '+'}{item.difference}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'high' ? 'destructive' : item.status === 'medium' ? 'warning' : 'outline'}
                            className={item.status === 'medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                          >
                            {item.status === 'high' ? 'สูง' : item.status === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="text-xs text-slate-500">อัพเดทล่าสุด: 19 พ.ค. 14:30 น.</div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>การวิเคราะห์ข้อมูล</CardTitle>
                <CardDescription>ข้อมูลการวิเคราะห์แนวโน้มและรูปแบบความคลาดเคลื่อนของสต็อกสินค้า</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">สรุปการวิเคราะห์</h3>
                    <p className="text-sm text-gray-500">การวิเคราะห์ข้อมูลสต็อกย้อนหลัง 30 วันพบว่า มีรูปแบบความคลาดเคลื่อนในกลุ่มสินค้าประเภทเครื่องดื่มสูงที่สุด</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="discrepancy">
            <Card>
              <CardHeader>
                <CardTitle>รายงานความคลาดเคลื่อน</CardTitle>
                <CardDescription>รายละเอียดของความคลาดเคลื่อนทั้งหมดที่พบในการตรวจนับสต็อก</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">สรุปรายงาน</h3>
                  <p className="text-sm text-gray-500">รายงานความคลาดเคลื่อนประจำวันที่ 19 พฤษภาคม 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>การแจ้งเตือน</CardTitle>
                <CardDescription>การตั้งค่าและประวัติการแจ้งเตือนสำหรับความคลาดเคลื่อนของสต็อก</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">การแจ้งเตือนล่าสุด</h3>
                  <p className="text-sm text-gray-500">รายการแจ้งเตือนความคลาดเคลื่อนและสถานะสต็อกล่าสุด</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
        Stock Reconciliation Dashboard © 2025 | อัพเดทล่าสุด: 19 พ.ค. 14:30 น.
      </footer>
    </div>
  );
}
