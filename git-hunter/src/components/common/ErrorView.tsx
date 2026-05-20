import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

interface ErrorViewProps {
  action?: ReactNode
  details?: string[]
  message: string
  title?: string
}

export function ErrorView({
  action,
  details,
  message,
  title = '분석에 실패했습니다',
}: ErrorViewProps) {
  return (
    <Card tone="danger" className="flex min-h-[320px] flex-col justify-center">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-400/30 bg-red-400/10 text-sm font-bold text-red-200">
            오류
          </div>
          <h2 className="mt-5 text-xl font-semibold text-red-100">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-red-100/75">{message}</p>
        </div>
        <div className="rounded-lg border border-red-400/20 bg-zinc-950/70 px-4 py-3 text-left text-xs leading-5 text-red-100/70">
          <p className="font-semibold text-red-100">복구 방법</p>
          <p className="mt-1">입력값을 확인한 뒤 같은 조건으로 다시 분석할 수 있습니다.</p>
        </div>
      </div>

      {details && details.length > 0 ? (
        <ul className="mt-5 grid gap-2 text-sm text-red-100/75 md:grid-cols-2">
          {details.map((detail) => (
            <li
              className="rounded-lg border border-red-400/15 bg-red-400/5 px-3 py-2"
              key={detail}
            >
              {detail}
            </li>
          ))}
        </ul>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  )
}
