export interface Factory {
    id: number;
    code: string;
    name: string;
    region: string;
    province: string;
}

export const mockFactories: Factory[] = [
    // ภาคเหนือ (Northern) - 10
    { id: 1, code: "F001", name: "โรงงานนครสวรรค์", region: "ภาคเหนือ", province: "นครสวรรค์" },
    { id: 2, code: "F002", name: "โรงงานกำแพงเพชร", region: "ภาคเหนือ", province: "กำแพงเพชร" },
    { id: 3, code: "F003", name: "โรงงานเชียงใหม่", region: "ภาคเหนือ", province: "เชียงใหม่" },
    { id: 4, code: "F004", name: "โรงงานเชียงราย", region: "ภาคเหนือ", province: "เชียงราย" },
    { id: 5, code: "F005", name: "โรงงานพิษณุโลก", region: "ภาคเหนือ", province: "พิษณุโลก" },
    { id: 6, code: "F006", name: "โรงงานลำปาง", region: "ภาคเหนือ", province: "ลำปาง" },
    { id: 7, code: "F007", name: "โรงงานพะเยา", region: "ภาคเหนือ", province: "พะเยา" },
    { id: 8, code: "F008", name: "โรงงานสุโขทัย", region: "ภาคเหนือ", province: "สุโขทัย" },
    { id: 9, code: "F009", name: "โรงงานอุตรดิตถ์", region: "ภาคเหนือ", province: "อุตรดิตถ์" },
    { id: 10, code: "F010", name: "โรงงานตาก", region: "ภาคเหนือ", province: "ตาก" },

    // ภาคตะวันออกเฉียงเหนือ (Northeastern) - 12
    { id: 11, code: "F011", name: "โรงงานขอนแก่น", region: "ภาคตะวันออกเฉียงเหนือ", province: "ขอนแก่น" },
    { id: 12, code: "F012", name: "โรงงานนครราชสีมา", region: "ภาคตะวันออกเฉียงเหนือ", province: "นครราชสีมา" },
    { id: 13, code: "F013", name: "โรงงานอุดรธานี", region: "ภาคตะวันออกเฉียงเหนือ", province: "อุดรธานี" },
    { id: 14, code: "F014", name: "โรงงานอุบลราชธานี", region: "ภาคตะวันออกเฉียงเหนือ", province: "อุบลราชธานี" },
    { id: 15, code: "F015", name: "โรงงานบุรีรัมย์", region: "ภาคตะวันออกเฉียงเหนือ", province: "บุรีรัมย์" },
    { id: 16, code: "F016", name: "โรงงานสุรินทร์", region: "ภาคตะวันออกเฉียงเหนือ", province: "สุรินทร์" },
    { id: 17, code: "F017", name: "โรงงานร้อยเอ็ด", region: "ภาคตะวันออกเฉียงเหนือ", province: "ร้อยเอ็ด" },
    { id: 18, code: "F018", name: "โรงงานศรีสะเกษ", region: "ภาคตะวันออกเฉียงเหนือ", province: "ศรีสะเกษ" },
    { id: 19, code: "F019", name: "โรงงานชัยภูมิ", region: "ภาคตะวันออกเฉียงเหนือ", province: "ชัยภูมิ" },
    { id: 20, code: "F020", name: "โรงงานสกลนคร", region: "ภาคตะวันออกเฉียงเหนือ", province: "สกลนคร" },
    { id: 21, code: "F021", name: "โรงงานกาฬสินธุ์", region: "ภาคตะวันออกเฉียงเหนือ", province: "กาฬสินธุ์" },
    { id: 22, code: "F022", name: "โรงงานหนองคาย", region: "ภาคตะวันออกเฉียงเหนือ", province: "หนองคาย" },

    // ภาคกลาง (Central) - 12
    { id: 23, code: "F023", name: "โรงงานกรุงเทพมหานคร", region: "ภาคกลาง", province: "กรุงเทพมหานคร" },
    { id: 24, code: "F024", name: "โรงงานนนทบุรี", region: "ภาคกลาง", province: "นนทบุรี" },
    { id: 25, code: "F025", name: "โรงงานปทุมธานี", region: "ภาคกลาง", province: "ปทุมธานี" },
    { id: 26, code: "F026", name: "โรงงานสมุทรปราการ", region: "ภาคกลาง", province: "สมุทรปราการ" },
    { id: 27, code: "F027", name: "โรงงานพระนครศรีอยุธยา", region: "ภาคกลาง", province: "พระนครศรีอยุธยา" },
    { id: 28, code: "F028", name: "โรงงานสระบุรี", region: "ภาคกลาง", province: "สระบุรี" },
    { id: 29, code: "F029", name: "โรงงานลพบุรี", region: "ภาคกลาง", province: "ลพบุรี" },
    { id: 30, code: "F030", name: "โรงงานนครปฐม", region: "ภาคกลาง", province: "นครปฐม" },
    { id: 31, code: "F031", name: "โรงงานสุพรรณบุรี", region: "ภาคกลาง", province: "สุพรรณบุรี" },
    { id: 32, code: "F032", name: "โรงงานสมุทรสาคร", region: "ภาคกลาง", province: "สมุทรสาคร" },
    { id: 33, code: "F033", name: "โรงงานอ่างทอง", region: "ภาคกลาง", province: "อ่างทอง" },
    { id: 34, code: "F034", name: "โรงงานสิงห์บุรี", region: "ภาคกลาง", province: "สิงห์บุรี" },

    // ภาคตะวันออก (Eastern) - 7
    { id: 35, code: "F035", name: "โรงงานชลบุรี", region: "ภาคตะวันออก", province: "ชลบุรี" },
    { id: 36, code: "F036", name: "โรงงานระยอง", region: "ภาคตะวันออก", province: "ระยอง" },
    { id: 37, code: "F037", name: "โรงงานจันทบุรี", region: "ภาคตะวันออก", province: "จันทบุรี" },
    { id: 38, code: "F038", name: "โรงงานตราด", region: "ภาคตะวันออก", province: "ตราด" },
    { id: 39, code: "F039", name: "โรงงานฉะเชิงเทรา", region: "ภาคตะวันออก", province: "ฉะเชิงเทรา" },
    { id: 40, code: "F040", name: "โรงงานปราจีนบุรี", region: "ภาคตะวันออก", province: "ปราจีนบุรี" },
    { id: 41, code: "F041", name: "โรงงานสระแก้ว", region: "ภาคตะวันออก", province: "สระแก้ว" },

    // ภาคตะวันตก (Western) - 5
    { id: 42, code: "F042", name: "โรงงานกาญจนบุรี", region: "ภาคตะวันตก", province: "กาญจนบุรี" },
    { id: 43, code: "F043", name: "โรงงานราชบุรี", region: "ภาคตะวันตก", province: "ราชบุรี" },
    { id: 44, code: "F044", name: "โรงงานเพชรบุรี", region: "ภาคตะวันตก", province: "เพชรบุรี" },
    { id: 45, code: "F045", name: "โรงงานประจวบคีรีขันธ์", region: "ภาคตะวันตก", province: "ประจวบคีรีขันธ์" },
    { id: 46, code: "F046", name: "โรงงานสมุทรสงคราม", region: "ภาคตะวันตก", province: "สมุทรสงคราม" }, // บางทีจัดอยู่ภาคกลาง

    // ภาคใต้ (Southern) - 8
    { id: 47, code: "F047", name: "โรงงานสงขลา", region: "ภาคใต้", province: "สงขลา" },
    { id: 48, code: "F048", name: "โรงงานสุราษฎร์ธานี", region: "ภาคใต้", province: "สุราษฎร์ธานี" },
    { id: 49, code: "F049", name: "โรงงานนครศรีธรรมราช", region: "ภาคใต้", province: "นครศรีธรรมราช" },
    { id: 50, code: "F050", name: "โรงงานภูเก็ต", region: "ภาคใต้", province: "ภูเก็ต" },
    { id: 51, code: "F051", name: "โรงงานตรัง", region: "ภาคใต้", province: "ตรัง" },
    { id: 52, code: "F052", name: "โรงงานกระบี่", region: "ภาคใต้", province: "กระบี่" },
    { id: 53, code: "F053", name: "โรงงานชุมพร", region: "ภาคใต้", province: "ชุมพร" },
    { id: 54, code: "F054", name: "โรงงานพัทลุง", region: "ภาคใต้", province: "พัทลุง" },
];

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