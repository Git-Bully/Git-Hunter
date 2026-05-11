import type { InputHTMLAttributes } from 'react'
import { cx } from '../../utils/classNames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string | null
}

export function Input({ className, errorMessage, id, label, ...inputProps }: InputProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        className={cx(
          'mt-2 h-11 w-full rounded-lg border bg-zinc-950 px-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-300',
          errorMessage ? 'border-red-400/70' : 'border-zinc-700',
          className,
        )}
        id={id}
        {...inputProps}
      />
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-300">{errorMessage}</p>
      ) : null}
    </label>
  )
}

