import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InventoryItem } from '@/types/inventory';
import { ExportReport } from "../reports/ExportReport";

interface DiscrepancyTableProps {
    data: InventoryItem[];
}

export function DiscrepancyTable({ data }: DiscrepancyTableProps) {
    const getStatusBadge = (status: 'high' | 'medium' | 'low') => {
        const variants = {
            high: 'destructive',
            medium: 'warning',
            low: 'secondary'
        } as const;

        const labels = {
            high: 'สูง',
            medium: 'ปานกลาง',
            low: 'ต่ำ'
        };

        return (
            <Badge variant={variants[status]}>
                {labels[status]}
            </Badge>
        );
    };

    const formatQuantity = (item: InventoryItem, type: 'system' | 'counted') => {
        const values = type === 'system' 
            ? {
                units: item.totalUnits,
                pallets: item.totalPallets,
                boxes: item.totalBoxes
              }
            : {
                units: item.countedBottles,
                pallets: item.countedPallets,
                boxes: item.countedBoxes
              };

        if (!values.units) return '-';

        return (
            <div className="text-right">
                <div className="font-medium">
                    {values.units.toLocaleString()} {item.unit}
                </div>
                <div className="text-xs text-muted-foreground">
                    {values.pallets} พาเลท {values.boxes > 0 ? `• ${values.boxes} ลัง` : ''}
                </div>
            </div>
        );
    };

    const columns = [
        {
            accessorKey: 'itemCode',
            header: 'รหัสสินค้า',
        },
        {
            accessorKey: 'description',
            header: 'ชื่อสินค้า',
        },
        {
            accessorKey: 'location',
            header: 'ที่เก็บ',
        },
        {
            accessorKey: 'totalQuantity',
            header: 'จำนวนในระบบ',
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div>
                        <div>{item.totalQuantity} {item.unit}</div>
                        <div className="text-sm text-gray-500">
                            {item.totalPallets} พาเลท, {item.totalBoxes} ลัง
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'countedUnits',
            header: 'จำนวนนับจริง',
            cell: ({ row }) => {
                const item = row.original;
                if (!item.countedUnits) return '-';
                return (
                    <div>
                        <div>{item.countedUnits} {item.unit}</div>
                        <div className="text-sm text-gray-500">
                            {item.countedPallets} พาเลท, {item.countedBoxes} ลัง
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'difference',
            header: 'ผลต่าง',
            cell: ({ row }) => {
                const counted = row.original.countedBottles || 0;
                const total = row.original.totalBottles;
                const diff = counted - total;
                return (
                    <span className={diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : ''}>
                        {diff > 0 ? '+' : ''}{diff}
                    </span>
                );
            },
        },
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>รายการความคลาดเคลื่อน</CardTitle>
                        <CardDescription>
                            แสดงเฉพาะรายการที่มีความแตกต่างระหว่างจำนวนนับจริงและข้อมูลในระบบ
                        </CardDescription>
                    </div>
                    <ExportReport 
                        data={data}
                        type="discrepancy"
                        fileName="stock_discrepancy"
                        disabled={data.length === 0}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">รหัสสินค้า</TableHead>
                            <TableHead>ชื่อสินค้า</TableHead>
                            <TableHead>ตำแหน่ง</TableHead>
                            <TableHead className="text-right">จำนวนในระบบ</TableHead>
                            <TableHead className="text-right">จำนวนนับจริง</TableHead>
                            <TableHead className="text-right">ผลต่าง</TableHead>
                            <TableHead>สถานะ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.filter(item => 
                            item.countedUnits !== undefined && 
                            item.countedUnits !== item.totalQuantity
                        ).map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.itemCode}</TableCell>
                                <TableCell>{item.itemName}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{formatQuantity(item, 'system')}</TableCell>
                                <TableCell>{formatQuantity(item, 'counted')}</TableCell>
                                <TableCell>
                                    <div className={
                                        "text-right font-medium" +
                                        (item.difference > 0 ? " text-green-600" : 
                                        item.difference < 0 ? " text-red-600" : "")
                                    }>
                                        {item.difference > 0 ? '+' : ''}{item.difference.toLocaleString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(item.status)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}