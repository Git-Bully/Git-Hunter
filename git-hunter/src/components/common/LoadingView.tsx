import { Card } from '../ui/Card'

interface LoadingViewProps {
  title?: string
}

export function LoadingView({ title = '조직 활동을 분석하는 중입니다' }: LoadingViewProps) {
  return (
    <Card className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-300" />
      <h2 className="mt-6 text-xl font-semibold text-zinc-50">{title}</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
        Git-Hunter가 로컬 모의 데이터를 기반으로 데모 분석 결과를 준비하고 있습니다.
      </p>
      <div className="mt-8 grid w-full max-w-md gap-3">
        <div className="h-4 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
      </div>
    </Card>
  )
}
