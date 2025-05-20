import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface CategoryChartProps {
    data: Array<{
        itemName: string;
        location: string;
        difference: number;
    }>;
}

export function CategoryChart({ data }: CategoryChartProps) {
    // Process data for pie chart
    const categoryData = data.reduce((acc, item) => {
        const category = item.itemName.split(' ')[0];
        const existingCategory = acc.find(c => c.name === category);
        if (existingCategory) {
            existingCategory.value += Math.abs(item.difference);
        } else {
            acc.push({ name: category, value: Math.abs(item.difference) });
        }
        return acc;
    }, [] as Array<{ name: string; value: number }>);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>ความคลาดเคลื่อนตามประเภทสินค้า</CardTitle>
                <CardDescription>แสดงสัดส่วนความคลาดเคลื่อนแยกตามประเภทสินค้า</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}