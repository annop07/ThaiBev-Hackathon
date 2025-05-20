"use client"

import { TabsContent } from "@/components/ui/tabs";
import { StatsCards } from "../stats/StatsCards";
import { AlertBanner } from "../alerts/AlertBanner";
import { TrendChart } from "../charts/TrendChart";
import { CategoryChart } from "../charts/CategoryChart";
import { DiscrepancyTable } from "../tables/DiscrepancyTable";
import { useMemo } from 'react';

interface OverviewTabProps {
    stockData: Array<{
        date: string;
        physical: number;
        system: number;
        difference: number;
    }>;
    discrepancyData: Array<{
        id: number;
        itemCode: string;
        itemName: string;
        location: string;
        physical: number;
        system: number;
        difference: number;
        status: 'high' | 'medium' | 'low';
    }>;
}

export function OverviewTab({ stockData, discrepancyData }: OverviewTabProps) {
    // Use useMemo to ensure stable calculations
    const statsProps = useMemo(() => {
        const totalSystem = discrepancyData.reduce((acc, item) => acc + item.system, 0);
        const totalPhysical = discrepancyData.reduce((acc, item) => acc + item.physical, 0);
        const totalDifference = discrepancyData.reduce((acc, item) => acc + item.difference, 0);
        const differencePercent = ((totalDifference / totalSystem) * 100).toFixed(2);

        return {
            totalSystem,
            totalPhysical,
            totalDifference,
            differencePercent
        };
    }, [discrepancyData]);

    return (
        <TabsContent value="overview" className="space-y-6">
            <StatsCards {...statsProps} />
            <AlertBanner />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrendChart data={stockData} />
                <CategoryChart data={discrepancyData} />
            </div>
            <DiscrepancyTable data={discrepancyData} />
        </TabsContent>
    );
}