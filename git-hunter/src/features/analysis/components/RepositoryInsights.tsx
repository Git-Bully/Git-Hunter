import { SectionTitle } from '../../../components/layout/SectionTitle'
import { Card } from '../../../components/ui/Card'
import type { RepositoryInsight } from '../../../types/analysis'

interface RepositoryInsightsProps {
  insights: RepositoryInsight[]
}

const insightValueClassNames: Record<RepositoryInsight['tone'], string> = {
  default: 'text-zinc-50',
  success: 'text-emerald-100',
  warning: 'text-yellow-100',
  danger: 'text-red-100',
}

export function RepositoryInsights({ insights }: RepositoryInsightsProps) {
  return (
    <section>
      <SectionTitle
        description="리포지토리 활동량, 저활동 구간, 사용자 편중, 분산도를 요약합니다."
        title="Repository Insights"
      />
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => (
          <Card
            className="transition-colors hover:border-zinc-500"
            key={insight.id}
            tone={insight.tone === 'default' ? 'default' : insight.tone}
          >
            <p className="text-sm text-zinc-400">{insight.label}</p>
            <p
              className={`mt-3 break-words text-2xl font-bold ${insightValueClassNames[insight.tone]}`}
            >
              {insight.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{insight.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
