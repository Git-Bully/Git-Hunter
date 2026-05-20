import type { ReactNode } from 'react'
import type { RiskLevel } from '../../types/analysis'
import { cx } from '../../utils/classNames'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant: RiskLevel
}

const variantClassNames: Record<RiskLevel, string> = {
  stable: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  watch: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200',
  risk: 'border-red-400/30 bg-red-400/10 text-red-300',
  critical: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200',
}

export function Badge({ children, className, variant }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
        variantClassNames[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
