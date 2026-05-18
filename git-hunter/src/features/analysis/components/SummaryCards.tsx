import type { OrganizationAnalysisResult } from '../../../types/analysis'
import { Card } from '../../../components/ui/Card'

interface SummaryCardsProps {
  result: OrganizationAnalysisResult
}

export function SummaryCards({ result }: SummaryCardsProps) {
  const summaryItems = [
    {
      label: '팀 평균 점수',
      value: result.totals.averageTeamScore,
      suffix: '/100',
      tone: 'default',
    },
    {
      label: '안정 비율',
      value: result.totals.stableRate,
      suffix: '%',
      tone: 'default',
    },
    {
      label: '위험 사용자 비율',
      value: result.totals.riskUserRate,
      suffix: '%',
      tone: result.totals.riskUserCount > 0 ? 'danger' : 'default',
    },
    {
      label: '분석 리포지토리',
      value: result.totals.repositoryCount,
      suffix: '',
      tone: 'default',
    },
    {
      label: '전체 팀원',
      value: result.totals.memberCount,
      suffix: '',
      tone: 'default',
    },
    {
      label: '전체 커밋',
      value: result.totals.totalCommits,
      suffix: '',
      tone: 'default',
    },
    {
      label: '전체 PR',
      value: result.totals.totalPullRequests,
      suffix: '',
      tone: 'default',
    },
    {
      label: '관찰 이상',
      value: result.totals.riskUserCount,
      suffix: '',
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
            <span className="ml-1 text-base font-semibold opacity-70">{item.suffix}</span>
          </p>
        </Card>
      ))}
    </div>
  )
}
