import type { OrganizationAnalysisResult, ScoreAggregation } from '../../../types/analysis'
import { Card } from '../../../components/ui/Card'

interface SummaryCardsProps {
  result: OrganizationAnalysisResult
  scoreAggregation: ScoreAggregation
}

export function SummaryCards({ result, scoreAggregation }: SummaryCardsProps) {
  const summaryItems = [
    {
      label: '팀 평균 점수',
      value: result.totals.averageTeamScore,
      suffix: '/100',
      tone: 'default',
      description: `활동 ${scoreAggregation.averageActivityScore} / 협업 ${scoreAggregation.averageCollaborationScore} / 지속성 ${scoreAggregation.averageConsistencyScore}`,
    },
    {
      label: '안정 비율',
      value: result.totals.stableRate,
      suffix: '%',
      tone: 'success',
      description: `${result.totals.stableUserCount}명이 안정 기준 안에 있습니다.`,
    },
    {
      label: '위험 사용자 비율',
      value: result.totals.riskUserRate,
      suffix: '%',
      tone: result.totals.riskUserCount > 0 ? 'danger' : 'default',
      description: `${result.totals.riskUserCount}명이 관찰 이상입니다.`,
    },
    {
      label: '활성 리포지토리',
      value: result.totals.activeRepositoryCount,
      suffix: '',
      tone: 'default',
      description: `${result.totals.repositoryCount}개 중 활동이 확인된 리포지토리입니다.`,
    },
    {
      label: '주간 활동 추세',
      value: formatTrendValue(result.totals.weeklyActivityTrend),
      suffix: '%',
      tone: result.totals.weeklyActivityTrend < 0 ? 'warning' : 'success',
      description: '최근 timeline 구간 대비 변화입니다.',
    },
    {
      label: '전체 커밋',
      value: result.totals.totalCommits,
      suffix: '',
      tone: 'default',
      description: `${result.totals.memberCount}명의 commit signal입니다.`,
    },
    {
      label: '전체 PR',
      value: result.totals.totalPullRequests,
      suffix: '',
      tone: 'default',
      description: '선택 기간의 PR 활동량입니다.',
    },
    {
      label: '팀원 수',
      value: result.totals.memberCount,
      suffix: '',
      tone: 'default',
      description: `평균 총점은 ${scoreAggregation.averageTotalScore}점입니다.`,
    },
  ] as const

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <Card
          className="transition-colors hover:border-zinc-500"
          key={item.label}
          tone={item.tone}
        >
          <p
            className={
              item.tone === 'danger' ? 'text-sm text-red-300' : 'text-sm text-zinc-400'
            }
          >
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
          <p className="mt-2 text-xs leading-5 text-zinc-500">{item.description}</p>
        </Card>
      ))}
    </div>
  )
}

function formatTrendValue(value: number): string {
  return value > 0 ? `+${value}` : String(value)
}
