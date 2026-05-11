interface WarningBannerProps {
  message: string
}

export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
      <span className="font-semibold">데모 모드</span>
      <span className="mx-2 text-amber-400/70">/</span>
      <span>{message}</span>
    </div>
  )
}
