"use client"

import { useState } from "react";
import Sidebar from "@/app/dashboard/components/layout/Sidebar";
import { Header } from "@/app/dashboard/components/layout/Header";
import { Footer } from "@/app/dashboard/components/layout/Footer";
import { AllFactoriesTab } from "../components/tabs/AllFactoriesTab";

export default function AllFactoriesOverview() {
    const [selectedFactory, setSelectedFactory] = useState(null);

    const notifications = [
        {
            id: 1,
            title: "ความคลาดเคลื่อนสูง",
            description: "พบความคลาดเคลื่อนที่โรงงานอำนาจเจริญ",
            type: "error",
            time: "5 นาทีที่แล้ว"
        }
    ];

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header
                    notifications={notifications}
                    selectedFactory={selectedFactory}
                    onFactoryChange={(id) => setSelectedFactory(id)}
                />

                <main className="flex-1 p-6 space-y-6 bg-gray-50 overflow-y-auto">
                    <AllFactoriesTab />
                </main>

                <Footer lastUpdate="19 พ.ค. 14:30 น." />
            </div>
        </div>
    );
}