import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

interface EmptyStateProps {
  action?: ReactNode
  message: string
  title: string
}

export function EmptyState({ action, message, title }: EmptyStateProps) {
  return (
    <Card className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-lg font-semibold text-zinc-400">
        GH
      </div>
      <h2 className="mt-5 text-xl font-semibold text-zinc-50">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  )
}

