export const mockUser = {
  id: '1',
  name: 'John Doe',
  role: 'rdc_manager',
  region: 'central',
  email: 'john.doe@example.com',
  position: 'RDC Manager'
} as const;

export type UserRole = 'rdc_manager' | 'inventory_team' | 'regional_manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  region: string;
  email: string;
  position: string;
}