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

// Mock factories data
const mockFactories = [
    { code: 'F001', name: 'โรงงานอำนาจเจริญ', region: 'Northeast' },
    { code: 'F014', name: 'โรงงานอุบลราชธานี', region: 'Northeast' },
    { code: 'F011', name: 'โรงงานขอนแก่น', region: 'Central' },
    // เพิ่มโรงงานอื่นๆ ที่นี่
];

// Function สำหรับสร้างข้อมูลสินค้าที่แตกต่างกันตามโรงงาน
function generateUniqueProductsForFactory(factory: Factory): ProductData[] {
    const randomStock = (base: number) => {
        const variation = Math.floor(Math.random() * (base * 0.1));
        return base + (Math.random() > 0.5 ? variation : -variation);
    };

    // สินค้าพื้นฐานที่มีในทุกโรงงาน
    const commonProducts = [
        {
            code: `${factory.code}-W001`,
            name: `น้ำดื่ม ${factory.province} 600ml`,
            boxPerUnit: 24,
            palletPerUnit: 1680,
            boxPerPallet: 70,
            unit: 'BT',
            locations: [`A${factory.code.slice(-2)}-01`, `A${factory.code.slice(-2)}-02`],
            system: randomStock(5000),
            physical: randomStock(5000)
        },
        {
            code: `${factory.code}-W002`,
            name: `น้ำแร่ ${factory.province} 1.5L`,
            boxPerUnit: 12,
            palletPerUnit: 840,
            boxPerPallet: 70,
            unit: 'BT',
            locations: [`A${factory.code.slice(-2)}-03`, `A${factory.code.slice(-2)}-04`],
            system: randomStock(3000),
            physical: randomStock(3000)
        }
    ];

    // สินค้าตามภูมิภาค
    const regionSpecificProducts = {
        'North': [
            {
                code: `${factory.code}-N001`,
                name: `ชาเขียวมัทฉะ ${factory.province} 500ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`B${factory.code.slice(-2)}-01`, `B${factory.code.slice(-2)}-02`],
                system: randomStock(4000),
                physical: randomStock(4000)
            },
            {
                code: `${factory.code}-N002`,
                name: `กาแฟดอยช้าง ${factory.province} 250ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`B${factory.code.slice(-2)}-03`, `B${factory.code.slice(-2)}-04`],
                system: randomStock(3500),
                physical: randomStock(3500)
            }
        ],
        'Northeast': [
            {
                code: `${factory.code}-E001`,
                name: `เบียร์ช้าง ${factory.province} 640ml`,
                boxPerUnit: 12,
                palletPerUnit: 840,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`C${factory.code.slice(-2)}-01`, `C${factory.code.slice(-2)}-02`],
                system: randomStock(6000),
                physical: randomStock(6000)
            },
            {
                code: `${factory.code}-E002`,
                name: `เบียร์ลีโอ ${factory.province} 640ml`,
                boxPerUnit: 12,
                palletPerUnit: 840,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`C${factory.code.slice(-2)}-03`, `C${factory.code.slice(-2)}-04`],
                system: randomStock(5500),
                physical: randomStock(5500)
            }
        ],
        'Central': [
            {
                code: `${factory.code}-C001`,
                name: `แสงโสม ${factory.province} 700ml`,
                boxPerUnit: 12,
                palletPerUnit: 840,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`D${factory.code.slice(-2)}-01`, `D${factory.code.slice(-2)}-02`],
                system: randomStock(4500),
                physical: randomStock(4500)
            },
            {
                code: `${factory.code}-C002`,
                name: `รีเจนซี่ ${factory.province} 700ml`,
                boxPerUnit: 12,
                palletPerUnit: 840,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`D${factory.code.slice(-2)}-03`, `D${factory.code.slice(-2)}-04`],
                system: randomStock(4000),
                physical: randomStock(4000)
            }
        ],
        'East': [
            {
                code: `${factory.code}-T001`,
                name: `น้ำทับทิม ${factory.province} 400ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`E${factory.code.slice(-2)}-01`, `E${factory.code.slice(-2)}-02`],
                system: randomStock(3500),
                physical: randomStock(3500)
            },
            {
                code: `${factory.code}-T002`,
                name: `น้ำมังคุด ${factory.province} 400ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`E${factory.code.slice(-2)}-03`, `E${factory.code.slice(-2)}-04`],
                system: randomStock(3200),
                physical: randomStock(3200)
            }
        ],
        'West': [
            {
                code: `${factory.code}-S001`,
                name: `ชามะนาว ${factory.province} 500ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`F${factory.code.slice(-2)}-01`, `F${factory.code.slice(-2)}-02`],
                system: randomStock(3800),
                physical: randomStock(3800)
            },
            {
                code: `${factory.code}-S002`,
                name: `ชาเย็น ${factory.province} 500ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`F${factory.code.slice(-2)}-03`, `F${factory.code.slice(-2)}-04`],
                system: randomStock(3600),
                physical: randomStock(3600)
            }
        ],
        'South': [
            {
                code: `${factory.code}-H001`,
                name: `น้ำมะพร้าว ${factory.province} 350ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`G${factory.code.slice(-2)}-01`, `G${factory.code.slice(-2)}-02`],
                system: randomStock(4200),
                physical: randomStock(4200)
            },
            {
                code: `${factory.code}-H002`,
                name: `น้ำส้ม ${factory.province} 350ml`,
                boxPerUnit: 24,
                palletPerUnit: 1680,
                boxPerPallet: 70,
                unit: 'BT',
                locations: [`G${factory.code.slice(-2)}-03`, `G${factory.code.slice(-2)}-04`],
                system: randomStock(4000),
                physical: randomStock(4000)
            }
        ]
    };

    // สร้างข้อมูลย้อนหลัง 7 วัน
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates();

    // รวมสินค้าทั้งหมด
    const allProducts = dates.flatMap(date => {
        return [
            ...commonProducts,
            ...(regionSpecificProducts[factory.region as keyof typeof regionSpecificProducts] || [])
        ].map(product => ({
            ...product,
            date: date, // เพิ่มวันที่
            region: factory.region,
            factory: factory.name,
            manufacturingDate: new Date(2024, 2, 15),
            difference: product.physical - product.system,
            tihi: '10x7',
            status: Math.abs(product.physical - product.system) > 20 ? 'high' :
                Math.abs(product.physical - product.system) > 10 ? 'medium' : 'low',
            zone: product.locations[0].split('-')[0]
        }));
    });

    return allProducts;
}

// อัปเดตฟังก์ชัน generateMockDataForFactory
function generateMockDataForFactory(factory: Factory): FactoryData {
    const products = generateUniqueProductsForFactory(factory).map(product => ({
        ...product,
        code: product.code,
        name: product.name,
        zone: product.locations[0].split('-')[0],
        location: product.locations[0],
        position: product.locations[0].split('-')[1] || '',
        system: product.system,
        physical: product.physical,
        difference: product.physical - product.system,
        date: new Date() // เพิ่ม field date
    }));

    // สร้างข้อมูลความคลาดเคลื่อน
    const discrepancyData = products.map(product => ({
        id: Number(product.code.split('-')[1]),
        code: product.code,
        name: product.name,
        location: product.location,
        zone: product.zone,
        position: product.position, // เพิ่มข้อมูลตำแหน่ง
        system: product.system,
        physical: product.physical,
        difference: product.physical - product.system,
        status: Math.abs(product.physical - product.system) > 20 ? 'high' :
            Math.abs(product.physical - product.system) > 10 ? 'medium' : 'low',
    }));

    // สร้างข้อมูลวิเคราะห์เฉพาะโรงงาน
    const analyticsInsights = {
        trendAnalysis: {
            trend: products.reduce((acc, curr) => acc + curr.difference, 0) > 0 ? "เพิ่มขึ้น" : "ลดลง",
            percentage: Math.abs(products.reduce((acc, curr) => acc + curr.difference, 0) /
                products.reduce((acc, curr) => acc + curr.system, 0) * 100).toFixed(2),
            comparedTo: "เดือนที่แล้ว",
            details: `ข้อมูลสำหรับ${factory.name}: พบความคลาดเคลื่อนมากที่สุดในช่วงเวลา 14:00-16:00 น.`
        },
        topCategories: [
            { name: "น้ำดื่ม", percentage: 35, status: "เพิ่มขึ้น" },
            { name: "เครื่องดื่มแอลกอฮอล์", percentage: 28, status: "คงที่" },
            { name: "เครื่องดื่มอื่นๆ", percentage: 22, status: "ลดลง" }
        ],
        recommendations: [
            `ควรเพิ่มความถี่ในการตรวจนับสินค้าที่${factory.name}`,
            `แนะนำให้ตรวจสอบกระบวนการจัดเก็บที่${factory.name} โซน ${products[0].zone}`,
            `ปรับปรุงการบันทึกข้อมูลสำหรับสินค้าที่มีความคลาดเคลื่อนสูงที่${factory.name}`
        ]
    };

    return {
        stockData: products,
        discrepancyData,
        analyticsInsights,
        factory: {
            ...factory,
            systemCount: products.reduce((acc, item) => acc + item.system, 0),
            physicalCount: products.reduce((acc, item) => acc + item.physical, 0),
            discrepancyRate: discrepancyData.reduce((acc, item) =>
                acc + Math.abs(item.difference), 0) / discrepancyData.length,
            status: discrepancyData.some(item => item.status === 'high') ? 'high' :
                discrepancyData.some(item => item.status === 'medium') ? 'medium' : 'low'
        }
    };
}

// เพิ่มฟังก์ชัน getFactoryData และ factoryDataCache
const factoryDataCache = new Map<string, FactoryData>();

function getFactoryData(factory: Factory): FactoryData {
    // ถ้ามีข้อมูลใน cache ให้ใช้ข้อมูลจาก cache
    if (factoryDataCache.has(factory.code)) {
        return factoryDataCache.get(factory.code)!;
    }

    // สร้างข้อมูลสำหรับโรงงาน
    const products = generateUniqueProductsForFactory(factory);

    const data: FactoryData = {
        stockData: products,
        discrepancyData: products.map(product => ({
            id: Number(product.code.split('-')[1]),
            itemCode: product.code,
            itemName: product.name,
            location: product.locations[0],
            zone: product.zone,
            system: product.system,
            physical: product.physical,
            difference: product.physical - product.system,
            status: Math.abs(product.physical - product.system) > 20 ? 'high' :
                Math.abs(product.physical - product.system) > 10 ? 'medium' : 'low',
            region: product.region,
            date: product.date
        })),
        analyticsInsights: {
            trendAnalysis: {
                trend: "เพิ่มขึ้น",
                percentage: 15,
                comparedTo: "เดือนที่แล้ว",
                details: `ความคลาดเคลื่อนของ${factory.name} มีแนวโน้มเพิ่มขึ้น`
            },
            topCategories: [
                { name: "เครื่องดื่ม", percentage: 35, status: "เพิ่มขึ้น" },
                { name: "ขนม", percentage: 28, status: "คงที่" },
                { name: "อาหาร", percentage: 22, status: "ลดลง" }
            ],
            recommendations: [
                `ควรเพิ่มความถี่ในการตรวจนับสินค้าที่${factory.name}`,
                `แนะนำให้ตรวจสอบกระบวนการจัดเก็บที่${factory.name}`,
                "ปรับปรุงการบันทึกข้อมูลสำหรับสินค้าที่มีหลายขนาดบรรจุ"
            ]
        },
        factory: {
            ...factory,
            systemCount: products.reduce((acc, item) => acc + item.system, 0),
            physicalCount: products.reduce((acc, item) => acc + item.physical, 0),
            discrepancyRate: products.reduce((acc, item) =>
                acc + Math.abs(item.physical - item.system), 0) / products.length,
            status: 'medium'
        }
    };

    // เก็บข้อมูลลง cache
    factoryDataCache.set(factory.code, data);

    return data;
}

// export ฟังก์ชันที่จำเป็น
const users: User[] = [
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

// Single export statement for all needed items
export {
    mockFactories,
    getFactoryData,
    factoryDataCache,
    users
};
