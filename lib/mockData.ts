import type { Factory, FactoryData } from '@/types/factory';

// ข้อมูลสินค้าแต่ละโรงงาน
const factoryProducts = {
    // โรงงานอำนาจเจริญ 
    amnatcharoen: [
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
    ubon: [
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
    khonkaen: [
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
    // เลือกข้อมูลสินค้าตามโรงงาน
    const products = factoryProducts[factory.code.toLowerCase()] || [];

    // สร้างข้อมูล stock จากสินค้าและ locations
    const stockData = products.flatMap(product =>
        product.locations.map((location, index) => {
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
                manufacturingDate: new Date(2025, 2, 15 + index).toLocaleDateString('en-US'),
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
                physical: countedUnits
            };
        })
    );

    // สร้างข้อมูลความคลาดเคลื่อน
    const discrepancyData = stockData.map((item, index) => {
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
    const totalSystemCount = stockData.reduce((acc, item) => acc + item.totalUnits, 0);
    const totalPhysicalCount = stockData.reduce((acc, item) => acc + item.countedBottles, 0);
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
            systemCount: totalSystemCount,
            physicalCount: totalPhysicalCount,
            discrepancyRate: Number(discrepancyRate.toFixed(2)),
            status: discrepancyRate > 5 ? 'high' :
                discrepancyRate > 2 ? 'medium' : 'low'
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