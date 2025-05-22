"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ตัวอย่าง Tabs components อย่างง่าย
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Tabs({ className, ...props }: TabsProps) {
    return <div className={cn("flex flex-col", className)} {...props} />
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={cn("mt-4", className)} {...props} />
    }
)
TabsContent.displayName = "TabsContent"

// สมมุติว่า TabsList และ TabsTrigger ก็ถูก export เช่นกัน
export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex space-x-2", className)} {...props} />
}

export function TabsTrigger({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
    return <button className={cn("px-3 py-1 rounded", className)} {...props} />
}