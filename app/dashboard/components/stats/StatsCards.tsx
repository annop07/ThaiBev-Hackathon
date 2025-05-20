import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface StatsCardsProps {
    totalSystem: number;
    totalPhysical: number;
    totalDifference: number;
    differencePercent: string;
}

interface StatCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    trend?: 'up' | 'down';
    trendValue?: string;
}

function StatCard({ title, value, icon, trend, trendValue }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        {icon}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{title}</p>
                            <h3 className="text-2xl font-bold">{value}</h3>
                            {trend && trendValue && (
                                <p className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                                    {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    {trendValue}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function StatsCards({ totalSystem, totalPhysical, totalDifference, differencePercent }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="จำนวนในระบบ"
                value={totalSystem}
                icon={<Package className="text-blue-500 h-5 w-5" />}
            />
            <StatCard
                title="จำนวนนับจริง"
                value={totalPhysical}
                icon={<Package className="text-green-500 h-5 w-5" />}
            />
            <StatCard
                title="ผลต่าง"
                value={totalDifference}
                icon={<AlertTriangle className="text-yellow-500 h-5 w-5" />}
                trend={totalDifference > 0 ? 'up' : 'down'}
                trendValue={`${differencePercent}%`}
            />
            <StatCard
                title="ความคลาดเคลื่อน"
                value={`${Math.abs(Number(differencePercent))}%`}
                icon={<TrendingUp className="text-purple-500 h-5 w-5" />}
            />
        </div>
    );
}