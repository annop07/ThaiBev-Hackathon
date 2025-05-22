export interface Signature {
    userId: string;
    name: string;
    position: string;
    timestamp: Date;
}

export interface StockCountSignatures {
    warehouseHead?: Signature;
    inventoryTeam?: Signature;
    regionalManager?: Signature;
}