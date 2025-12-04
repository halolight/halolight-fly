import * as React from "react"

import { LegalLayoutContent } from "@/components/layout/legal-layout-content"

interface LegalLayoutProps {
  children: React.ReactNode
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return <LegalLayoutContent>{children}</LegalLayoutContent>
}
