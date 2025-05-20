import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface TrendChartProps {
    data: Array<{
        date: string;
        physical: number;
        system: number;
        difference: number;
    }>;
}

export function TrendChart({ data }: TrendChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>แนวโน้มสต็อก 5 วันล่าสุด</CardTitle>
                <CardDescription>เปรียบเทียบข้อมูลจำนวนสินค้าในระบบและการนับจริง</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="physical"
                                stroke="#3b82f6"
                                name="นับจริง"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="system"
                                stroke="#10b981"
                                name="ในระบบ"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="difference"
                                stroke="#ef4444"
                                name="ผลต่าง"
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}