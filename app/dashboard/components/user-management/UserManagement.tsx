"use client"

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole, Region } from '@/types/auth';

interface UserManagementProps {
  currentUser: User;
}

export function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Only admin can manage users
  const canManageUsers = currentUser.role === 'admin';

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Failed to update user');

      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการผู้ใช้งาน</h2>
        {canManageUsers && (
          <Button onClick={() => {
            setSelectedUser(null);
            setIsDialogOpen(true);
          }}>
            เพิ่มผู้ใช้งาน
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อ</TableHead>
            <TableHead>ตำแหน่ง</TableHead>
            <TableHead>บทบาท</TableHead>
            <TableHead>ภูมิภาค</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>เข้าใช้ล่าสุด</TableHead>
            <TableHead>การดำเนินการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.region}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </TableCell>
              <TableCell>
                {user.lastLogin?.toLocaleString('th-TH')}
              </TableCell>
              <TableCell>
                {canManageUsers && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    แก้ไข
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้งาน'}
            </DialogTitle>
          </DialogHeader>
          <UserForm
            user={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}