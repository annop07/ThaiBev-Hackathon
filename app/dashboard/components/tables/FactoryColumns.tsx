"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "ชื่อโรงงาน",
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.getValue("name")}</div>
                <div className="text-sm text-gray-500">{row.original.code}</div>
            </div>
        ),
    },
    {
        accessorKey: "region",
        header: "ภูมิภาค",
        cell: ({ row }) => (
            <div>
                <div>{row.getValue("region")}</div>
                <div className="text-sm text-gray-500">{row.original.province}</div>
            </div>
        ),
    },
    {
        accessorKey: "systemCount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    จำนวนในระบบ
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("systemCount")}</div>
        },
    },
    {
        accessorKey: "difference",
        header: "ผลต่าง",
        cell: ({ row }) => {
            const value = row.getValue("difference") as number;
            return (
                <div className={`text-right ${value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : ''}`}>
                    {value > 0 ? '+' : ''}{value}
                </div>
            )
        },
    },
    {
        accessorKey: "discrepancyRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    อัตราคลาดเคลื่อน
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rate = row.getValue("discrepancyRate") as number;
            return <div className="text-right">{rate}%</div>
        },
    },
    {
        accessorKey: "status",
        header: "สถานะ",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge variant={
                    status === 'high' ? 'destructive' :
                    status === 'medium' ? 'warning' : 
                    'secondary'
                }>
                    {status === 'high' ? 'สูง' :
                     status === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                </Badge>
            )
        },
    },
];