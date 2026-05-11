import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/classNames'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-400 text-zinc-950 hover:bg-emerald-300 disabled:bg-zinc-700 disabled:text-zinc-400',
  secondary:
    'border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 disabled:text-zinc-500',
}

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={cx(
        'inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed',
        variantClassNames[variant],
        className,
      )}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

