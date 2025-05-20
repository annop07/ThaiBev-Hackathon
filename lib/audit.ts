export interface AuditLog {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 1,
    user: "Admin Demo",
    action: "แก้ไข",
    target: "SKU001 น้ำดื่ม 500ml",
    timestamp: "2025-05-19 14:20",
  },
  {
    id: 2,
    user: "Checker A",
    action: "นับสต็อก",
    target: "โซน A",
    timestamp: "2025-05-19 13:50",
  },
];