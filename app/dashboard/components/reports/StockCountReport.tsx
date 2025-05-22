"use client"

import { useState, useEffect } from 'react';
import { SignatureModal } from '../modals/SignatureModal';
import { StockCountSignatures, Signature } from '@/types/signature';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NotificationService from '@/lib/notificationService';

interface StockCountReportProps {
    date: Date;
    region: string;
    stockData: any[];
    currentUser: {
        id: string;
        name: string;
        position: string;
        region: string;
        role: string;
    };
    signatures: StockCountSignatures;
    onSign: (signature: Signature) => void;
    canEdit: boolean;
    canApprove: boolean;
}

interface SignatureStatusProps {
    title: string;
    signature?: Signature;
    canSign: boolean;
    onSignClick: () => void;
}

function SignatureStatus({ title, signature, canSign, onSignClick }: SignatureStatusProps) {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{title}</h3>
            {signature ? (
                <div className="text-sm space-y-1">
                    <p>ลงนามโดย: {signature.name}</p>
                    <p>ตำแหน่ง: {signature.position}</p>
                    <p>เวลา: {signature.timestamp.toLocaleString('th-TH')}</p>
                </div>
            ) : (
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">รอการลงนาม</p>
                    {canSign && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSignClick}
                        >
                            ลงนาม
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export function StockCountReport({
    date,
    region,
    stockData,
    currentUser,
    signatures,
    onSign,
    canEdit,
    canApprove
}: StockCountReportProps) {
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const canUserSign = (role: string) => {
        if (currentUser.role !== role) return false;

        switch (role) {
            case 'warehouse_head':
                return !signatures.warehouseHead && currentUser.region === region;
            case 'inventory_team':
                return !signatures.inventoryTeam && currentUser.region === region;
            case 'regional_manager':
                return !signatures.regionalManager && currentUser.region === region;
            default:
                return false;
        }
    };

    const handleSendReport = async () => {
        setIsSending(true);
        try {
            const response = await fetch('/api/reports/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    region,
                    stockData,
                    signatures,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send report');
            }

            alert('รายงานถูกส่งเรียบร้อยแล้ว');
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการส่งรายงาน');
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        // ตรวจสอบว่าต้องมีการลงนามหรือไม่
        if (!signatures.warehouseHead && currentUser.role === 'warehouse_head') {
            NotificationService.notifySignatureNeeded('หัวหน้าคลัง');
        }
        if (!signatures.inventoryTeam && currentUser.role === 'inventory_team') {
            NotificationService.notifySignatureNeeded('ทีม Inventory');
        }
        if (!signatures.regionalManager && currentUser.role === 'regional_manager') {
            NotificationService.notifySignatureNeeded('ผู้จัดการภาค');
        }
    }, [signatures, currentUser]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>รายงานการตรวจนับ Stock ประจำวัน</CardTitle>
                <div className="text-sm text-gray-500">
                    ภาค: {region} | วันที่: {date.toLocaleDateString('th-TH')}
                </div>
            </CardHeader>
            <CardContent>
                {canEdit && (
                    <div className="mb-4">
                        <Button onClick={() => {/* implement edit logic */ }}>
                            บันทึกผลการตรวจนับ
                        </Button>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">หัวหน้าคลัง</h3>
                            {signatures.warehouseHead ? (
                                <div className="text-sm space-y-1">
                                    <p>ลงนามโดย: {signatures.warehouseHead.name}</p>
                                    <p>เวลา: {signatures.warehouseHead.timestamp.toLocaleString('th-TH')}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">รอการลงนาม</p>
                                    {canUserSign('warehouse_head') && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsSignatureModalOpen(true)}
                                        >
                                            ลงนาม
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">ทีม Inventory</h3>
                            {signatures.inventoryTeam ? (
                                <div className="text-sm space-y-1">
                                    <p>ลงนามโดย: {signatures.inventoryTeam.name}</p>
                                    <p>เวลา: {signatures.inventoryTeam.timestamp.toLocaleString('th-TH')}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">รอการลงนาม</p>
                                    {canUserSign('inventory_team') && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsSignatureModalOpen(true)}
                                        >
                                            ลงนาม
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">ผู้จัดการภาค</h3>
                            {signatures.regionalManager ? (
                                <div className="text-sm space-y-1">
                                    <p>ลงนามโดย: {signatures.regionalManager.name}</p>
                                    <p>เวลา: {signatures.regionalManager.timestamp.toLocaleString('th-TH')}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">รอการลงนาม</p>
                                    {canUserSign('regional_manager') && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsSignatureModalOpen(true)}
                                        >
                                            ลงนาม
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {canApprove && !signatures.regionalManager && (
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={() => setIsSignatureModalOpen(true)}
                                disabled={!signatures.warehouseHead || !signatures.inventoryTeam}
                            >
                                อนุมัติรายงาน
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>

            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                onSign={onSign}
                currentUser={currentUser}
            />
        </Card>
    );
}