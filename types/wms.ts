export interface WMSItem {
    ItemCode: string;
    description?: string;
    Location: string;
    total_pallet: number;
    CountPallet: number;
    Diff_Pallet: number;
}

export interface WMSResponse {
    items?: WMSItem[];
    data?: WMSItem[];
    // Add other possible response fields
}