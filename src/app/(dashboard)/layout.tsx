import * as React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>
}
