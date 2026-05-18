import type { ReactNode } from 'react'
import { Card } from '../../../../components/ui/Card'
import { SectionTitle } from '../../../../components/layout/SectionTitle'
import { cx } from '../../../../utils/classNames'

interface ChartPanelProps {
  children: ReactNode
  title: string
  description: string
  className?: string
  isEmpty?: boolean
  emptyMessage?: string
}

export function ChartPanel({
  children,
  className,
  description,
  emptyMessage = '표시할 차트 데이터가 없습니다.',
  isEmpty = false,
  title,
}: ChartPanelProps) {
  return (
    <Card className={cx('min-h-[380px]', className)}>
      <SectionTitle description={description} title={title} />
      <div className="mt-6 h-[300px]">
        {isEmpty ? <ChartEmptyState message={emptyMessage} /> : children}
      </div>
    </Card>
  )
}

function ChartEmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/70 px-4 text-center text-sm text-zinc-400">
      {message}
    </div>
  )
}
