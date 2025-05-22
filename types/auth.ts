export type UserRole = 
  | 'admin'
  | 'warehouse_head'
  | 'inventory_team'
  | 'regional_manager'
  | 'rdc_manager'
  | 'viewer';

export type Region = 'North' | 'South' | 'Central' | 'Northeast' | 'All';

export interface Permission {
  view: boolean;
  edit: boolean;
  approve: boolean;
  manage: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  role: UserRole;
  region: Region;
  permissions: Permission;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
}