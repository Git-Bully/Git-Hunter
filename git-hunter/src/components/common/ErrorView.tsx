import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

interface ErrorViewProps {
  action?: ReactNode
  message: string
  title?: string
}

export function ErrorView({ action, message, title = '분석에 실패했습니다' }: ErrorViewProps) {
  return (
    <Card tone="danger" className="flex min-h-[260px] flex-col justify-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-400/30 bg-red-400/10 text-sm font-bold text-red-200">
        오류
      </div>
      <h2 className="mt-5 text-xl font-semibold text-red-100">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-red-100/75">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  )
}
