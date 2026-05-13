import type { RepositoryActivityLevel, RepositorySummary } from '../../../types/analysis'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { SectionTitle } from '../../../components/layout/SectionTitle'

interface RepositoryListProps {
  repositories: RepositorySummary[]
}

const activityBadgeVariant: Record<RepositoryActivityLevel, 'stable' | 'watch' | 'risk'> = {
  high: 'stable',
  medium: 'watch',
  low: 'risk',
}

const activityLabel: Record<RepositoryActivityLevel, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <Card>
      <SectionTitle
        description="모의 분석 시나리오에 사용된 리포지토리 활동량입니다."
        title="리포지토리 활동"
      />
      <div className="mt-4 max-h-[520px] space-y-3 overflow-auto pr-1">
        {repositories.map((repository) => (
          <div
            className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            key={repository.id}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-zinc-100">{repository.name}</p>
                {repository.isArchived ? <Badge variant="watch">보관됨</Badge> : null}
                {repository.isFork ? <Badge variant="watch">포크</Badge> : null}
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                커밋 {repository.commitCount}개 / PR {repository.pullRequestCount}개
              </p>
            </div>
            <Badge variant={activityBadgeVariant[repository.activityLevel]}>
              {activityLabel[repository.activityLevel]}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
