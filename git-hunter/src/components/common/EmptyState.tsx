import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

interface EmptyStateProps {
  action?: ReactNode
  checklist?: string[]
  message: string
  title: string
}

export function EmptyState({ action, checklist, message, title }: EmptyStateProps) {
  return (
    <Card className="flex min-h-[420px] flex-col items-center justify-center overflow-hidden text-center">
      <div className="grid w-full max-w-2xl gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="mx-auto h-3 w-16 rounded bg-zinc-800" />
          <div className="mx-auto mt-4 h-12 w-12 rounded-full border border-dashed border-zinc-700" />
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="mx-auto h-3 w-20 rounded bg-zinc-800" />
          <div className="mt-4 space-y-2">
            <div className="h-2 rounded bg-zinc-800" />
            <div className="h-2 rounded bg-zinc-800" />
            <div className="h-2 rounded bg-zinc-800" />
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="mx-auto h-3 w-14 rounded bg-zinc-800" />
          <div className="mt-4 grid grid-cols-4 items-end gap-2">
            <div className="h-8 rounded bg-zinc-800" />
            <div className="h-12 rounded bg-zinc-800" />
            <div className="h-6 rounded bg-zinc-800" />
            <div className="h-10 rounded bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-lg font-semibold text-zinc-400">
        GH
      </div>
      <h2 className="mt-5 text-xl font-semibold text-zinc-50">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{message}</p>
      {checklist && checklist.length > 0 ? (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {checklist.map((item) => (
            <span
              className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-400"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  )
}
