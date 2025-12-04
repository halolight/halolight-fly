import { NotFoundContent } from "@/components/not-found-content"

// 禁用静态生成
export const dynamic = "force-dynamic"

export default function NotFound() {
  return <NotFoundContent />
}
