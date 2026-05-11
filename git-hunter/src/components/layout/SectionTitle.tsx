interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionTitle({ description, eyebrow, title }: SectionTitleProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-medium text-emerald-300">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-xl font-semibold text-zinc-50">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
      ) : null}
    </div>
  )
}

