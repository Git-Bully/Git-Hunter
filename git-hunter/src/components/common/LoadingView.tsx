import { Card } from '../ui/Card'

interface LoadingViewProps {
  activeStepLabel?: string
  progressValue?: number
  steps?: string[]
  title?: string
}

const DEFAULT_LOADING_STEPS = [
  '리포지토리 활동 신호 수집',
  '협업 점수 계산',
  '위험 사용자 후보 검토',
  '대시보드 차트 구성',
]

export function LoadingView({
  activeStepLabel = DEFAULT_LOADING_STEPS[0],
  progressValue = 32,
  steps = DEFAULT_LOADING_STEPS,
  title = '조직 활동을 분석하는 중입니다',
}: LoadingViewProps) {
  return (
    <Card className="min-h-[560px] overflow-hidden">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Mock analytics pipeline
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-zinc-50">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Git-Hunter가 로컬 모의 데이터를 기반으로 활동, 협업, 지속성, 위험
            신호를 계산하고 있습니다.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
          <p className="text-xs font-medium text-zinc-500">현재 단계</p>
          <p className="mt-1 font-semibold text-emerald-200">{activeStepLabel}</p>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>분석 진행률</span>
          <span>{progressValue}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-950">
          <div
            className="h-full rounded-full bg-emerald-300 transition-all duration-500"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      <div className="mt-7 grid gap-3 md:grid-cols-4">
        {steps.map((step) => (
          <div
            className={
              step === activeStepLabel
                ? 'rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-3 text-xs font-medium text-emerald-100'
                : 'rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-xs font-medium text-zinc-500'
            }
            key={step}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4" key={index}>
            <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-zinc-800" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-zinc-800/80" />
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="h-4 w-36 animate-pulse rounded bg-zinc-800" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-emerald-400/20" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-yellow-400/20" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-red-400/20" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-800" />
          <div className="mt-5 grid h-36 grid-cols-5 items-end gap-3">
            <div className="h-20 animate-pulse rounded bg-zinc-800" />
            <div className="h-28 animate-pulse rounded bg-zinc-800" />
            <div className="h-16 animate-pulse rounded bg-zinc-800" />
            <div className="h-32 animate-pulse rounded bg-zinc-800" />
            <div className="h-24 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        <div className="grid grid-cols-5 gap-3 border-b border-zinc-800 px-4 py-3">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="h-3 animate-pulse rounded bg-zinc-800" key={index} />
          ))}
        </div>
        <div className="space-y-3 p-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="grid grid-cols-5 gap-3" key={index}>
              {Array.from({ length: 5 }, (_, cellIndex) => (
                <div
                  className="h-3 animate-pulse rounded bg-zinc-800/80"
                  key={cellIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
