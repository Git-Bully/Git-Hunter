import type { OrganizationAnalysisResult } from '../../../types/analysis'
import { Card } from '../../../components/ui/Card'

interface SummaryCardsProps {
  result: OrganizationAnalysisResult
}

export function SummaryCards({ result }: SummaryCardsProps) {
  const summaryItems = [
    {
      label: '전체 팀원',
      value: result.totals.memberCount,
      tone: 'default',
    },
    {
      label: '전체 커밋',
      value: result.totals.totalCommits,
      tone: 'default',
    },
    {
      label: '전체 PR',
      value: result.totals.totalPullRequests,
      tone: 'default',
    },
    {
      label: '위험 사용자',
      value: result.totals.riskUserCount,
      tone: 'danger',
    },
  ] as const

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <Card key={item.label} tone={item.tone}>
          <p className={item.tone === 'danger' ? 'text-sm text-red-300' : 'text-sm text-zinc-400'}>
            {item.label}
          </p>
          <p
            className={
              item.tone === 'danger'
                ? 'mt-2 text-3xl font-bold text-red-300'
                : 'mt-2 text-3xl font-bold text-zinc-50'
            }
          >
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
