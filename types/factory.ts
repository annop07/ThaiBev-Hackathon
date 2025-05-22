export interface Factory {
    id: number;
    code: string;
    name: string;
    region: string;
    province: string;
}

export const mockFactories: Factory[] = [
    // ภาคเหนือ (North)
    { id: 1, code: "F001", name: "โรงงานเชียงใหม่", region: "North", province: "เชียงใหม่" },
    { id: 2, code: "F002", name: "โรงงานเชียงราย", region: "North", province: "เชียงราย" },
    { id: 3, code: "F003", name: "โรงงานลำปาง", region: "North", province: "ลำปาง" },
    { id: 4, code: "F004", name: "โรงงานพะเยา", region: "North", province: "พะเยา" },
    { id: 5, code: "F005", name: "โรงงานแพร่", region: "North", province: "แพร่" },
    { id: 6, code: "F006", name: "โรงงานน่าน", region: "North", province: "น่าน" },
    { id: 7, code: "F007", name: "โรงงานพิษณุโลก", region: "North", province: "พิษณุโลก" },
    { id: 8, code: "F008", name: "โรงงานตาก", region: "North", province: "ตาก" },

    // ภาคตะวันออกเฉียงเหนือ (Northeast)
    { id: 9, code: "F009", name: "โรงงานขอนแก่น", region: "Northeast", province: "ขอนแก่น" },
    { id: 10, code: "F010", name: "โรงงานนครราชสีมา", region: "Northeast", province: "นครราชสีมา" },
    { id: 11, code: "F011", name: "โรงงานอุดรธานี", region: "Northeast", province: "อุดรธานี" },
    { id: 12, code: "F012", name: "โรงงานอุบลราชธานี", region: "Northeast", province: "อุบลราชธานี" },
    { id: 13, code: "F013", name: "โรงงานสกลนคร", region: "Northeast", province: "สกลนคร" },
    { id: 14, code: "F014", name: "โรงงานบุรีรัมย์", region: "Northeast", province: "บุรีรัมย์" },
    { id: 15, code: "F015", name: "โรงงานสุรินทร์", region: "Northeast", province: "สุรินทร์" },
    { id: 16, code: "F016", name: "โรงงานร้อยเอ็ด", region: "Northeast", province: "ร้อยเอ็ด" },

    // ภาคกลาง (Central)
    { id: 17, code: "F017", name: "โรงงานกรุงเทพมหานคร", region: "Central", province: "กรุงเทพมหานคร" },
    { id: 18, code: "F018", name: "โรงงานนนทบุรี", region: "Central", province: "นนทบุรี" },
    { id: 19, code: "F019", name: "โรงงานปทุมธานี", region: "Central", province: "ปทุมธานี" },
    { id: 20, code: "F020", name: "โรงงานพระนครศรีอยุธยา", region: "Central", province: "พระนครศรีอยุธยา" },
    { id: 21, code: "F021", name: "โรงงานสระบุรี", region: "Central", province: "สระบุรี" },
    { id: 22, code: "F022", name: "โรงงานลพบุรี", region: "Central", province: "ลพบุรี" },
    { id: 23, code: "F023", name: "โรงงานสิงห์บุรี", region: "Central", province: "สิงห์บุรี" },
    { id: 24, code: "F024", name: "โรงงานชัยนาท", region: "Central", province: "ชัยนาท" },

    // ภาคตะวันออก (East)
    { id: 25, code: "F025", name: "โรงงานชลบุรี", region: "East", province: "ชลบุรี" },
    { id: 26, code: "F026", name: "โรงงานระยอง", region: "East", province: "ระยอง" },
    { id: 27, code: "F027", name: "โรงงานจันทบุรี", region: "East", province: "จันทบุรี" },
    { id: 28, code: "F028", name: "โรงงานตราด", region: "East", province: "ตราด" },
    { id: 29, code: "F029", name: "โรงงานฉะเชิงเทรา", region: "East", province: "ฉะเชิงเทรา" },
    { id: 30, code: "F030", name: "โรงงานปราจีนบุรี", region: "East", province: "ปราจีนบุรี" },
    { id: 31, code: "F031", name: "โรงงานสระแก้ว", region: "East", province: "สระแก้ว" },

    // ภาคตะวันตก (West)
    { id: 32, code: "F032", name: "โรงงานกาญจนบุรี", region: "West", province: "กาญจนบุรี" },
    { id: 33, code: "F033", name: "โรงงานราชบุรี", region: "West", province: "ราชบุรี" },
    { id: 34, code: "F034", name: "โรงงานเพชรบุรี", region: "West", province: "เพชรบุรี" },
    { id: 35, code: "F035", name: "โรงงานประจวบคีรีขันธ์", region: "West", province: "ประจวบคีรีขันธ์" },
    { id: 36, code: "F036", name: "โรงงานสุพรรณบุรี", region: "West", province: "สุพรรณบุรี" },

    // ภาคใต้ (South)
    { id: 37, code: "F037", name: "โรงงานสงขลา", region: "South", province: "สงขลา" },
    { id: 38, code: "F038", name: "โรงงานสุราษฎร์ธานี", region: "South", province: "สุราษฎร์ธานี" },
    { id: 39, code: "F039", name: "โรงงานนครศรีธรรมราช", region: "South", province: "นครศรีธรรมราช" },
    { id: 40, code: "F040", name: "โรงงานภูเก็ต", region: "South", province: "ภูเก็ต" },
    { id: 41, code: "F041", name: "โรงงานตรัง", region: "South", province: "ตรัง" },
    { id: 42, code: "F042", name: "โรงงานพัทลุง", region: "South", province: "พัทลุง" },
    { id: 43, code: "F043", name: "โรงงานกระบี่", region: "South", province: "กระบี่" },
    { id: 44, code: "F044", name: "โรงงานชุมพร", region: "South", province: "ชุมพร" }
];

// Group factories by region
export const groupedFactories = mockFactories.reduce((acc, factory) => {
    if (!acc[factory.region]) {
        acc[factory.region] = [];
    }
    acc[factory.region].push(factory);
    return acc;
}, {} as Record<string, Factory[]>);

export interface FactoryData {
    stockData: any[]; // กำหนด type ที่ชัดเจน
    discrepancyData: any[]; // กำหนด type ที่ชัดเจน
    analyticsInsights: {
        trendAnalysis: {
            trend: string;
            percentage: number;
            comparedTo: string;
            details: string;
        };
        topCategories: Array<{
            name: string;
            percentage: number;
            status: string;
        }>;
        recommendations: string[];
    };
    factory: Factory & {
        systemCount: number;
        physicalCount: number;
        discrepancyRate: number;
        status: 'high' | 'medium' | 'low';
    };
}

export interface StockData {
    code: string;
    name: string;
    zone: string;
    location: string;
    system: number;
    physical: number;
    difference: number;
    date: Date;
}

export interface StockCountSignatures {
    [key: string]: {
        name: string;
        timestamp: Date;
        role: string;
    };
}