export type UserRole = "admin" | "checker" | "viewer";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export const mockUser: User = {
  id: 1,
  name: "Admin Demo",
  role: "admin", // เปลี่ยนเป็น "checker" หรือ "viewer" เพื่อทดสอบสิทธิ์
};