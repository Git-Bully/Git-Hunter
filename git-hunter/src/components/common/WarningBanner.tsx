interface WarningBannerProps {
  message: string
}

export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold">데모 모드 / Mock Data 기반 분석</p>
          <p className="mt-1 leading-6 text-amber-100/75">{message}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-100/80">
          <span className="rounded-full border border-amber-300/20 bg-zinc-950/40 px-3 py-1">
            GitHub API 미연동
          </span>
          <span className="rounded-full border border-amber-300/20 bg-zinc-950/40 px-3 py-1">
            로컬 preset
          </span>
          <span className="rounded-full border border-amber-300/20 bg-zinc-950/40 px-3 py-1">
            발표 안정화
          </span>
        </div>
      </div>
    </div>
  )
}
