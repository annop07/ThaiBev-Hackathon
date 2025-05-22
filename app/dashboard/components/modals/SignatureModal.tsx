"use client"

import { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ESignature } from '@/types/signature';

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSign: (signature: ESignature) => void;
    currentUser: {
        id: string;
        name: string;
        position: string;
        region: string;
    };
}

export function SignatureModal({ isOpen, onClose, onSign, currentUser }: SignatureModalProps) {
    const sigPad = useRef<any>(null);
    const [error, setError] = useState('');

    const handleSign = () => {
        if (!sigPad.current || sigPad.current.isEmpty()) {
            setError('กรุณาลงลายมือชื่อ');
            return;
        }

        const signatureData: ESignature = {
            userId: currentUser.id,
            name: currentUser.name,
            position: currentUser.position,
            region: currentUser.region,
            timestamp: new Date(),
            signature: sigPad.current.toDataURL(),
        };

        onSign(signatureData);
        onClose();
    };

    const clearSignature = () => {
        sigPad.current?.clear();
        setError('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>ลงลายมือชื่ออิเล็กทรอนิกส์</DialogTitle>
                    <DialogDescription>
                        กรุณาลงลายมือชื่อในช่องด้านล่าง
                    </DialogDescription>
                </DialogHeader>
                <div className="border rounded-lg p-4">
                    <SignaturePad
                        ref={sigPad}
                        canvasProps={{
                            className: 'signature-canvas w-full h-48 border rounded',
                        }}
                    />
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </div>
                <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={clearSignature}>
                        ลบลายเซ็น
                    </Button>
                    <div className="space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            ยกเลิก
                        </Button>
                        <Button onClick={handleSign}>
                            ยืนยัน
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}