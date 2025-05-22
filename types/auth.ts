export type UserRole = 'warehouse_head' | 'inventory_team' | 'regional_manager';

export interface User {
    id: string;
    name: string;
    position: string;
    region: string;
    role: UserRole;
}