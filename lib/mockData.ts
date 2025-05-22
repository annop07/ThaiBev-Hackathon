import type { Factory, FactoryData } from '@/types/factory';
import { User, rolePermissions } from '@/types/auth';

// Define types for product data
interface ProductData {
    code: string;
    name: string;
    boxPerUnit: number;
    palletPerUnit: number;
    boxPerPallet: number;
    unit: string;
    locations: string[];
}

// Define type for factory products
type FactoryProductsMap = {
    [key: string]: ProductData[];
};

// ข้อมูลสินค้าแต่ละโรงงาน
const factoryProducts: FactoryProductsMap = {
    // โรงงานอำนาจเจริญ 
    F001: [
        {
            code: 'Z31064033029',
            name: 'ขาว 40 ดีกรี 330 มล.(เอส.เอส.)',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA001A', '1BA001B', '1BA002A']
        },
        {
            code: 'Z31064033030',
            name: 'หงส์ทอง 40 ดีกรี 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA003A', '1BA004A']
        },
        {
            code: 'Z31064033031',
            name: 'แสงโสม 40 ดีกรี 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA005A', '1BA006A']
        }
    ],
    // โรงงานอุบลราชธานี
    F014: [
        {
            code: 'Z31164033029',
            name: 'แสงโสม 40 ดีกรี 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA001A', '1BA002A']
        },
        {
            code: 'Z31164033030',
            name: 'เบียร์ช้าง 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA003A', '1BA004A']
        },
        {
            code: 'Z31164033031',
            name: 'เบียร์ลีโอ 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA005A', '1BA006A']
        }
    ],
    // โรงงานขอนแก่น
    F011: [
        {
            code: 'Z31264033029',
            name: 'หงส์ทอง 40 ดีกรี 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA001A', '1BA002A']
        },
        {
            code: 'Z31264033030',
            name: 'เบียร์ช้าง 330 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA003A', '1BA004A']
        },
        {
            code: 'Z31264033031',
            name: 'น้ำดื่มช้าง 600 มล.',
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: ['1BA005A', '1BA006A']
        }
    ]
};

function generateMockDataForFactory(factory: Factory): FactoryData {
    // เพิ่มการตรวจสอบภูมิภาค
    const factoryRegion = {
        'F001': 'Northeast', // อำนาจเจริญ
        'F014': 'Northeast', // อุบลราชธานี
        'F011': 'Central',   // กรุงเทพมหานคร
    };

    // กรองข้อมูลตามภูมิภาค
    const products = factoryProducts[factory.code]?.map(product => ({
        ...product,
        region: factoryRegion[factory.code as keyof typeof factoryRegion]
    })) || [];

    // สร้างข้อมูล stock จากสินค้าและ locations
    const stockData = products.flatMap((product: ProductData & { region: string }) =>
        product.locations.map((location: string) => {
            const isSmallBatch = location.includes('2A');
            const baseUnits = isSmallBatch ? 3360 : 40320;
            const basePallets = isSmallBatch ? 2 : 24;
            const baseBoxes = isSmallBatch ? 140 : 1680;

            // สุ่มความคลาดเคลื่อน ±5%
            const variationPercent = (Math.random() * 10 - 5) / 100;
            const countedUnits = Math.round(baseUnits * (1 + variationPercent));
            const difference = countedUnits - baseUnits;

            return {
                itemCode: product.code,
                description: product.name,
                location: location,
                manufacturingDate: new Date(2025, 2, 15).toLocaleDateString('en-US'),
                tihi: '10x7',
                status: 'Available',
                boxPerUnit: product.boxPerUnit,
                palletPerUnit: product.palletPerUnit,
                boxPerPallet: product.boxPerPallet,
                unit: product.unit,
                // ข้อมูลในระบบ
                totalUnits: baseUnits,
                totalPallets: basePallets,
                totalBoxes: baseBoxes,
                // ข้อมูลนับจริง
                countedPallets: Math.round(basePallets * (1 + variationPercent)),
                countedBoxes: Math.round(baseBoxes * (1 + variationPercent)),
                countedBottles: countedUnits,
                // ผลต่าง
                difference: difference,
                system: baseUnits,
                physical: countedUnits,
                region: product.region // เพิ่ม region เข้าไปในข้อมูล
            };
        })
    );

    // สร้างข้อมูลความคลาดเคลื่อน
    const discrepancyData = stockData.map((item: any, index: number) => {
        const absPercentDiff = Math.abs((item.difference / item.totalUnits) * 100);
        const status = absPercentDiff > 5 ? 'high' :
            absPercentDiff > 2 ? 'medium' : 'low';

        return {
            id: index + 1,
            itemCode: item.itemCode,
            itemName: item.description,
            location: item.location,
            physical: item.countedBottles,
            system: item.totalUnits,
            difference: item.difference,
            status: status as 'high' | 'medium' | 'low'
        };
    });

    // คำนวณข้อมูลสรุป
    const totalSystemCount = stockData.reduce((acc: number, item: any) => acc + item.totalUnits, 0);
    const totalPhysicalCount = stockData.reduce((acc: number, item: any) => acc + item.countedBottles, 0);
    const totalDifference = totalPhysicalCount - totalSystemCount;
    const discrepancyRate = (Math.abs(totalDifference) / totalSystemCount) * 100;

    // ข้อมูลการวิเคราะห์
    const analyticsInsights = {
        trendAnalysis: {
            trend: discrepancyRate > 5 ? "เพิ่มขึ้น" : "คงที่",
            percentage: discrepancyRate,
            comparedTo: "เดือนที่แล้ว",
            details: `${discrepancyRate > 5 ? 'พบ' : 'ไม่พบ'}ความคลาดเคลื่อนที่มีนัยสำคัญใน${factory.name}`
        },
        topCategories: [
            { name: "สุรา 40 ดีกรี", percentage: 85, status: discrepancyRate > 5 ? "เพิ่มขึ้น" : "คงที่" },
            { name: "สุรา 35 ดีกรี", percentage: 10, status: "คงที่" },
            { name: "สุราพิเศษ", percentage: 5, status: "คงที่" }
        ],
        recommendations: [
            `ตรวจนับสต็อกตามกำหนดการปกติที่${factory.name}`,
            "ดำเนินการตามมาตรฐานการจัดเก็บ",
            "บันทึกข้อมูลการนับสต็อกอย่างสม่ำเสมอ"
        ]
    };

    // ส่งคืนข้อมูลทั้งหมด
    return {
        stockData,
        discrepancyData,
        analyticsInsights,
        factory: {
            ...factory,
            region: factoryRegion[factory.code as keyof typeof factoryRegion]
        }
    };
}

// เพิ่มฟังก์ชัน getFactoryData และ factoryDataCache
const factoryDataCache = new Map<string, FactoryData>();

function getFactoryData(factory: Factory): FactoryData {
    // ตรวจสอบ cache ก่อน
    const cachedData = factoryDataCache.get(factory.code);
    if (cachedData) {
        return cachedData;
    }

    // ถ้าไม่มีใน cache ให้สร้างข้อมูลใหม่
    const data = generateMockDataForFactory(factory);

    // เก็บข้อมูลลง cache
    factoryDataCache.set(factory.code, data);

    return data;
}

// export ฟังก์ชันที่จำเป็น
export { getFactoryData, factoryDataCache };

// Mock data for users
export const users: User[] = [
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
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "4",
        name: "Regional Manager North",
        email: "north@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "North",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "5",
        name: "Regional Manager Northeast",
        email: "northeast@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "Northeast",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "6",
        name: "Regional Manager Central",
        email: "central@example.com",
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
        id: "7",
        name: "Regional Manager East",
        email: "east@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "East",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "8",
        name: "Regional Manager West",
        email: "west@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "West",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    },
    {
        id: "9",
        name: "Regional Manager South",
        email: "south@example.com",
        position: "Regional Manager",
        role: "regional_manager",
        region: "South",
        permissions: rolePermissions.regional_manager,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
    }
];
