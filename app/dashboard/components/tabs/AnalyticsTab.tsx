import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
} from 'recharts';

interface AnalyticsTabProps {
    insights: {
        trendAnalysis: {
            trend: string;
            percentage: number;
            comparedTo: string;
            details: string;
        };
        topCategories: Array<{
            name: string;
            percentage: number;
            status: string;
        }>;
        recommendations: string[];
    };
    timeData: Array<{
        hour: string;
        discrepancy: number;
    }>;
}

export function AnalyticsTab({ insights, timeData }: AnalyticsTabProps) {
    return (
        <div className="grid gap-6">
            {/* Overview Card */}
            <Card>
                <CardHeader>
                    <CardTitle>ภาพรวมการวิเคราะห์</CardTitle>
                    <CardDescription>
                        การวิเคราะห์แนวโน้มและรูปแบบความคลาดเคลื่อนของสต็อกสินค้า
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Trend Analysis */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium">แนวโน้มความคลาดเคลื่อน</h3>
                                <Badge variant={insights.trendAnalysis.trend === "เพิ่มขึ้น" ? "destructive" : "success"}>
                                    {insights.trendAnalysis.percentage}% {insights.trendAnalysis.trend}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{insights.trendAnalysis.details}</p>
                        </div>

                        {/* Top Categories */}
                        <div className="space-y-2">
                            <h3 className="font-medium">หมวดหมู่ที่พบปัญหามากที่สุด</h3>
                            <div className="space-y-1">
                                {insights.topCategories.map((category, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{category.name}</span>
                                        <Badge variant={category.status === "เพิ่มขึ้น" ? "destructive" : "outline"}>
                                            {category.percentage}%
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-2">
                            <h3 className="font-medium">คำแนะนำ</h3>
                            <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
                                {insights.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Time Analysis Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>การวิเคราะห์ตามช่วงเวลา</CardTitle>
                    <CardDescription>แสดงความถี่ของความคลาดเคลื่อนในแต่ละช่วงเวลา</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="discrepancy"
                                    stroke="#3b82f6"
                                    name="ความคลาดเคลื่อน"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}