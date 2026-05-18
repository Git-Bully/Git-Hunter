import { Card } from '../ui/Card'

interface LoadingViewProps {
  title?: string
}

export function LoadingView({ title = '조직 활동을 분석하는 중입니다' }: LoadingViewProps) {
  return (
    <Card className="min-h-[520px]">
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-300" />
        <h2 className="mt-6 text-xl font-semibold text-zinc-50">{title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
          Git-Hunter가 로컬 모의 데이터를 기반으로 활동, 협업, 지속성, 위험 신호를 계산하고 있습니다.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-emerald-400/20" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-yellow-400/20" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-red-400/20" />
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="h-4 w-36 animate-pulse rounded bg-zinc-800" />
          <div className="mt-5 grid grid-cols-4 items-end gap-3">
            <div className="h-20 animate-pulse rounded bg-zinc-800" />
            <div className="h-28 animate-pulse rounded bg-zinc-800" />
            <div className="h-16 animate-pulse rounded bg-zinc-800" />
            <div className="h-24 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    </Card>
  )
}
