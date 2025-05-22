import { NextResponse } from 'next/server';
import { User, UserRole, Region } from '@/types/auth';

// Mock database
let users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        position: "Warehouse Head",
        role: "warehouse_head",
        region: "Central",
        permissions: {
            view: true,
            edit: true,
            approve: true,
            manage: false
        },
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