import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/classNames'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tone?: 'default' | 'danger' | 'warning' | 'success'
}

const toneClassNames: Record<NonNullable<CardProps['tone']>, string> = {
  default: 'border-zinc-800 bg-zinc-900/80',
  danger: 'border-red-500/25 bg-red-500/5',
  warning: 'border-amber-400/25 bg-amber-400/10',
  success: 'border-emerald-400/25 bg-emerald-400/10',
}

export function Card({ children, className, tone = 'default', ...cardProps }: CardProps) {
  return (
    <div
      className={cx(
        'rounded-lg border p-5 shadow-2xl shadow-black/10',
        toneClassNames[tone],
        className,
      )}
      {...cardProps}
    >
      {children}
    </div>
  )
}
