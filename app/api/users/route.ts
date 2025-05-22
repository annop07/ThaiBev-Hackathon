import { NextResponse } from 'next/server';
import { User, UserRole, Region } from '@/types/auth';

// Mock database
let users: User[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        position: "System Admin",
        role: "admin",
        region: "All",
        permissions: rolePermissions.admin,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "2",
        name: "Warehouse Head",
        email: "warehouse@example.com",
        position: "Warehouse Head",
        role: "warehouse_head",
        region: "Central",
        permissions: rolePermissions.warehouse_head,
        assignedWarehouse: "WH001",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "3",
        name: "Inventory Staff",
        email: "inventory@example.com",
        position: "Inventory Staff",
        role: "inventory_team",
        region: "Central",
        permissions: rolePermissions.inventory_team,
        assignedZones: ["A1", "A2", "B1"],
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "4",
        name: "Regional Manager",
        email: "regional@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "Central",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "5",
        name: "RDC Manager",
        email: "rdc@example.com",
        position: "RDC Manager",
        role: "rdc_manager",
        region: "Central",
        permissions: rolePermissions.rdc_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    }
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newUser: User = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        users.push(newUser);
        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}