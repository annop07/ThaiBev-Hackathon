export type UserRole =
    | 'admin'
    | 'warehouse_head'
    | 'inventory_team'
    | 'regional_manager'
    | 'rdc_manager';

export type Region =
    | 'North'          // ภาคเหนือ
    | 'Northeast'      // ภาคตะวันออกเฉียงเหนือ
    | 'Central'        // ภาคกลาง
    | 'East'           // ภาคตะวันออก
    | 'West'           // ภาคตะวันตก
    | 'South'          // ภาคใต้
    | 'All';           // สำหรับ Admin

export interface Permission {
    viewStock: boolean;      // ดูข้อมูลสต็อก
    editStock: boolean;      // แก้ไขข้อมูลสต็อก
    approveReports: boolean; // อนุมัติรายงาน
    manageZone: boolean;     // จัดการโซน
    manageWarehouse: boolean;// จัดการคลัง
    viewAnalytics: boolean;  // ดูรายงานวิเคราะห์
    sign: boolean;          // ลงนาม
}

export const rolePermissions: Record<UserRole, Permission> = {
    admin: {
        viewStock: true,
        editStock: true,
        approveReports: true,
        manageZone: true,
        manageWarehouse: true,
        viewAnalytics: true,
        sign: true
    },
    warehouse_head: {
        viewStock: true,
        editStock: false,
        approveReports: false,
        manageZone: true,
        manageWarehouse: true,
        viewAnalytics: true,
        sign: true
    },
    inventory_team: {
        viewStock: true,
        editStock: true,
        approveReports: false,
        manageZone: true,
        manageWarehouse: false,
        viewAnalytics: false,
        sign: true
    },
    regional_manager: {
        viewStock: true,
        editStock: false,
        approveReports: true,
        manageZone: true,
        manageWarehouse: true,
        viewAnalytics: true,
        sign: true
    },
    rdc_manager: {
        viewStock: true,
        editStock: false,
        approveReports: false,
        manageZone: false,
        manageWarehouse: false,
        viewAnalytics: true,
        sign: false
    }
};