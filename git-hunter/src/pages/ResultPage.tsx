import { Link, useLocation } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { WarningBanner } from '../components/common/WarningBanner'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { RepositoryList } from '../features/analysis/components/RepositoryList'
import { SummaryCards } from '../features/analysis/components/SummaryCards'
import { TeamHealthTable } from '../features/analysis/components/TeamHealthTable'
import type { OrganizationAnalysisResult, RiskLevel } from '../types/analysis'

interface ResultLocationState {
  analysisResult?: OrganizationAnalysisResult
}

const riskLabel: Record<RiskLevel, string> = {
  stable: '안정',
  watch: '관찰',
  risk: '위험',
  critical: '심각',
}

export function ResultPage() {
  const location = useLocation()
  const locationState = location.state as ResultLocationState | null
  const analysisResult = locationState?.analysisResult ?? null

  if (!analysisResult) {
    return (
      <PageContainer>
        <EmptyState
          action={
            <Link to="/">
              <Button>분석 화면으로 돌아가기</Button>
            </Link>
          }
          message="스프린트 1에서는 결과 데이터가 라우터 상태에만 보관됩니다. 홈 화면에서 새 모의 분석을 실행하세요."
          title="분석 결과가 없습니다"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <header className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            {analysisResult.organization.displayName}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-50">협업 건강도</h1>
          <p className="mt-3 text-sm text-zinc-400">
            {analysisResult.organization.analysisPeriodLabel} / {analysisResult.organization.repositoryCountLabel}
          </p>
        </div>
        <Link to="/">
          <Button variant="secondary">새 분석</Button>
        </Link>
      </header>

      <div className="space-y-6">
        <WarningBanner message={analysisResult.warningMessage} />
        <SummaryCards result={analysisResult} />
        <TeamHealthTable members={analysisResult.members} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <RepositoryList repositories={analysisResult.repositories} />
          <Card tone="danger">
            <h2 className="text-xl font-semibold text-red-200">위험 검토</h2>
            <div className="mt-4 space-y-3">
              {analysisResult.members
                .filter((member) => member.riskLevel !== 'stable')
                .map((member) => (
                  <div
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
                    key={member.id}
                  >
                    <p className="font-semibold text-zinc-100">
                      {member.username} / {riskLabel[member.riskLevel]}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {member.riskReasons.join(' ')}
                    </p>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
