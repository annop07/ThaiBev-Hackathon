"use client";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  Scan,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

const SuperCheckerApp = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState("login");
  const [palletCount, setPalletCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [bottleCount, setBottleCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [manualBoxMode, setManualBoxMode] = useState(false);
  const [manualBoxCount, setManualBoxCount] = useState(75);
  const [countMode, setCountMode] = useState<"pallet" | "box">("pallet");
  const [manualBoxInput, setManualBoxInput] = useState<number>(0);

  const BOTTLES_PER_BOX = 24; // 1 กล่องมี 9 ขวด
  const BOXES_PER_PALLET = 75; // 1 พาเลทมี 75 กล่อง

  // ฟังก์ชันคำนวณจำนวนขวด
  const calculateBottles = (boxes: number) => {
    setBottleCount(boxes * BOTTLES_PER_BOX);
  };

  // ฟังก์ชันสำหรับการนับแบบพาเลท
  const handlePalletChange = (newPalletCount: number) => {
    if (newPalletCount >= 0) {
      setPalletCount(newPalletCount);
      const newBoxCount = newPalletCount * BOXES_PER_PALLET;
      setBoxCount(newBoxCount);
      calculateBottles(newBoxCount);
    }
  };

  // ฟังก์ชันสำหรับการนับแบบกล่อง
  const handleManualBoxChange = (boxes: number) => {
    if (boxes >= 0) {
      setManualBoxInput(boxes);
      setBoxCount(boxes);
      calculateBottles(boxes);
    }
  };

  const handleSubmit = async () => {
    try {
      const checkData = {
        location: "1BC030A",
        checker: loginData.username,
        date: new Date().toISOString(),
        countMode: countMode,
        palletCount,
        boxCount,
        bottleCount,
        bottlesPerBox: BOTTLES_PER_BOX,
        boxesPerPallet: BOXES_PER_PALLET,
      };

      // TODO: ส่งข้อมูลไปยัง API
      // const response = await fetch('/api/check-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(checkData)
      // });

      // แสดง success toast
      toast({
        title: "บันทึกข้อมูลสำเร็จ",
        description: `บันทึกข้อมูลการนับสินค้าเรียบร้อยแล้ว`,
      });

      // รีเซ็ตค่าหลังจากส่งข้อมูลสำเร็จ
      setPalletCount(0);
      setBoxCount(0);
      setBottleCount(0);
      setManualBoxInput(0);
    } catch (error) {
      // แสดง error toast
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  };

  // Counter View Component
  const CounterView = () => (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-6 h-6 mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Super Checker</h1>
            <p className="text-green-600 text-sm">Location : RDC หลราชสีมา</p>
          </div>
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-2">
            <Image
              src="/images/profile-cheker.jpg"
              width={100}
              height={500}
              alt="My Image"
              className="w-12 h-12 bg-gray-300 rounded-full mb-2"
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <p className="text-2xl font-bold">1BC030A</p>
        </div>

        {/* Count Mode Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCountMode("pallet")}
              className={`flex-1 py-2 px-4 rounded-lg ${
                countMode === "pallet"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              นับแบบพาเลท
            </button>
            <button
              onClick={() => setCountMode("box")}
              className={`flex-1 py-2 px-4 rounded-lg ${
                countMode === "box"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              นับแบบกล่อง
            </button>
          </div>

          {countMode === "pallet" ? (
            // Pallet Counter
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">จำนวนพาเลท</h3>
              <div className="flex gap-2">
                <div className="bg-green-600 text-white text-3xl font-bold rounded-lg p-4 flex-1 text-center">
                  {palletCount}
                </div>
                <button
                  onClick={() => handlePalletChange(palletCount + 1)}
                  className="bg-gray-100 border rounded-lg p-4 flex items-center justify-center w-16"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handlePalletChange(palletCount - 1)}
                  className="bg-gray-100 border rounded-lg p-4 flex items-center justify-center w-16"
                >
                  <Minus className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                *1 พาเลท = {BOXES_PER_PALLET} กล่อง
              </p>
            </div>
          ) : (
            // Manual Box Counter
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">จำนวนกล่อง</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={manualBoxInput}
                  onChange={(e) =>
                    handleManualBoxChange(parseInt(e.target.value) || 0)
                  }
                  className="flex-1 p-4 text-3xl font-bold text-center border rounded-lg"
                  min="0"
                />
                <button
                  onClick={() => handleManualBoxChange(manualBoxInput + 1)}
                  className="bg-gray-100 border rounded-lg p-4 flex items-center justify-center w-16"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleManualBoxChange(manualBoxInput - 1)}
                  className="bg-gray-100 border rounded-lg p-4 flex items-center justify-center w-16"
                >
                  <Minus className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Box Count Display */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">จำนวนกล่องทั้งหมด</h3>
          <div className="bg-blue-600 text-white text-3xl font-bold rounded-lg p-4 text-center">
            {boxCount}
          </div>
        </div>

        {/* Bottle Count */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">จำนวนขวดทั้งหมด</h3>
          <div className="bg-purple-600 text-white text-3xl font-bold rounded-lg p-4 text-center">
            {bottleCount}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">สรุป</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• จำนวนกล่องทั้งหมด: {boxCount} กล่อง</li>
            <li>• จำนวนขวดต่อกล่อง: {BOTTLES_PER_BOX} ขวด</li>
            <li>• จำนวนขวดทั้งหมด: {bottleCount} ขวด</li>
          </ul>
        </div>

        {/* เพิ่มปุ่มส่งข้อมูล */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition-colors duration-200 mt-6"
        >
          บันทึกการนับสินค้า
        </button>
      </div>
    </div>
  );

  // Performance Dashboard View
  const DashboardView = () => (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => setCurrentView("counter")}
          />
          <div className="flex-1">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2">
              <Image
                src="/images/profile-cheker.jpg"
                width={100}
                height={500}
                alt="My Image"
                className="w-12 h-12 bg-gray-300 rounded-full mb-2"
              />
            </div>

            <h2 className="font-bold">Annop Sangsila</h2>
            <p className="text-sm text-gray-600">WH : RDC NKM</p>
            <p className="text-sm text-gray-600">
              Date : 22-May-2025 Score : 75
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">Performance</h3>
          <div className="flex justify-between items-end mb-4 h-32">
            {[60, 80, 85, 90, 75].map((height, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-blue-500 w-8 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Status : Great</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Average Score : 80.24</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Working time : 8 Hour</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">Something...</div>
      </div>
    </div>
  );

  // Scanner View
  const ScannerView = () => (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => setCurrentView("counter")}
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Super Checker</h1>
            <p className="text-green-600 text-sm">Location RDC นครราชสีมา</p>
          </div>
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-2">
            <Image
              src="/images/profile-cheker.jpg"
              width={100}
              height={500}
              alt="My Image"
              className="w-12 h-12 bg-gray-300 rounded-full mb-2"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8">
            <Plus className="w-12 h-12 text-white" />
          </div>

          <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold">
            SCAN
          </button>
        </div>
      </div>
    </div>
  );

  // Login View
  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Super Checker
            </h1>
            <p className="text-gray-600">Please login to continue</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (loginData.username && loginData.password) {
                setIsLoggedIn(true);
                setCurrentView("counter");
              } else {
                alert("Please enter username and password");
              }
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition-colors duration-200 mb-8"
          >
            Login
          </button>

          <div className="text-center">
            <div className="text-blue-600 font-bold text-2xl">TBL</div>
            <div className="text-sm text-gray-500">Technology Logistics</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation Bar
  const NavigationBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => setCurrentView("counter")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            currentView === "counter"
              ? "bg-green-100 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          <Settings className="w-6 h-6 mb-1" />
          <span className="text-xs">Counter</span>
        </button>
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            currentView === "dashboard"
              ? "bg-green-100 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-xs">Dashboard</span>
        </button>
        <button
          onClick={() => setCurrentView("scanner")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            currentView === "scanner"
              ? "bg-green-100 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          <Scan className="w-6 h-6 mb-1" />
          <span className="text-xs">Scanner</span>
        </button>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setCurrentView("login");
            setLoginData({ username: "", password: "" });
          }}
          className="flex flex-col items-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </div>
  );

  // Main App Component
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Show login page if not logged in */}
      {!isLoggedIn ? (
        <LoginView />
      ) : (
        <>
          {/* Show main app content only when logged in */}
          {currentView === "counter" && <CounterView />}
          {currentView === "dashboard" && <DashboardView />}
          {currentView === "scanner" && <ScannerView />}

          {/* Navigation bar */}
          <NavigationBar />

          {/* Add padding bottom to prevent content from being hidden behind nav */}
          <div className="h-20"></div>
        </>
      )}
    </div>
  );
};

export default SuperCheckerApp;
