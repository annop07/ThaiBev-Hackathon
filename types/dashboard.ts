export interface DiscrepancyItem {
    id: number;
    itemCode: string;
    itemName: string;
    location: string;
    physical: number;
    system: number;
    difference: number;
    status: 'high' | 'medium' | 'low';
}

export interface CategoryData {
    name: string;
    count: number;
    difference: number;
}

// ... other type definitions