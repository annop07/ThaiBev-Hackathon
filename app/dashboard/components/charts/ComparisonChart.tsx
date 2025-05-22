"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface ComparisonChartProps {
    data: Array<{
        name: string;
        system: number;
        physical: number;
        difference: number;
    }>;
}

export function ComparisonChart({ data }: ComparisonChartProps) {
    const formatTooltip = (value: number, name: string) => {
        // Find the complete item data
        const item = data.find(d =>
            (name === 'จำนวนในระบบ' && d.system === value) ||
            (name === 'จำนวนนับจริง' && d.physical === value)
        );

        if (!item) return [value, name];

        // Format all numbers with Thai locale
        const formattedPhysical = new Intl.NumberFormat('th-TH').format(item.physical);
        const formattedSystem = new Intl.NumberFormat('th-TH').format(item.system);
        const diff = item.physical - item.system;
        const formattedDiff = new Intl.NumberFormat('th-TH').format(Math.abs(diff));
        const diffSign = diff < 0 ? '-' : '+';
        const diffStatus = diff !== 0 ? (diff > 0 ? '(เกิน)' : '(ขาด)') : '';

        // Return an array where first element is the value to display
        // and second element is empty string to hide the series name
        return [`${value}`, '']; // จะแสดงเฉพาะค่าของแต่ละแท่ง
    };

    const tooltipContent = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        const item = payload[0].payload;
        const formattedPhysical = new Intl.NumberFormat('th-TH').format(item.physical);
        const formattedSystem = new Intl.NumberFormat('th-TH').format(item.system);
        const diff = item.physical - item.system;
        const formattedDiff = new Intl.NumberFormat('th-TH').format(Math.abs(diff));
        const diffSign = diff < 0 ? '-' : '+';
        const diffStatus = diff !== 0 ? (diff > 0 ? '(เกิน)' : '(ขาด)') : '';

        return (
            <div className="bg-white p-3 border rounded-lg shadow-lg">
                <p className="font-semibold text-gray-800">สินค้า: {item.name}</p>
                <p className="text-indigo-600">จำนวนในระบบ: {formattedSystem}</p>
                <p className="text-emerald-600">จำนวนนับจริง: {formattedPhysical}</p>
                <p className={`font-medium ${diff > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    ผลต่าง: {diffSign}{formattedDiff} {' '}
                    <span className="font-normal">
                        {diffStatus}
                    </span>
                </p>
            </div>
        );
    };

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-10}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                    />
                    <YAxis
                        tickFormatter={(value) => new Intl.NumberFormat('th-TH').format(value)}
                    />
                    <Tooltip
                        content={tooltipContent}
                        wrapperStyle={{ zIndex: 1000 }}
                    />
                    <Legend
                        verticalAlign="top"
                        height={36}
                    />
                    <Bar
                        name="จำนวนในระบบ"
                        dataKey="system"
                        fill="#4f46e5"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        name="จำนวนนับจริง"
                        dataKey="physical"
                        fill="#22c55e"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}