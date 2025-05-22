import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { NotificationProvider } from '@/components/providers/NotificationProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThaiBev Stock Reconciliation",
  description: "Stock reconciliation system for ThaiBev warehouses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="light"
        />
      </body>
    </html>
  );
}
