import {
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    PieChart,
    BarChart3,
    FileText,
    Filter,
    Search,
    Building2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FilterControls() {
    return (
        <div className="flex items-center space-x-2">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="ค้นหา..."
                    className="pl-8 w-[200px]"
                />
            </div>
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
    );
}

export function TabNavigation({ activeTab, setActiveTab, userRole }) {
    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    <span>ภาพรวม</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>วิเคราะห์</span>
                </TabsTrigger>
                <TabsTrigger value="discrepancy" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>รายการความคลาดเคลื่อน</span>
                </TabsTrigger>
                {userRole === 'admin' && (
                    <TabsTrigger value="audit" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Audit Log</span>
                    </TabsTrigger>
                )}
            </TabsList>
            <FilterControls />
        </div>
    );
}