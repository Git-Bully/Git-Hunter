import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { WarningBanner } from '../components/common/WarningBanner'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { DashboardCharts } from '../features/analysis/components/DashboardCharts'
import { RepositoryList } from '../features/analysis/components/RepositoryList'
import { RepositoryInsights } from '../features/analysis/components/RepositoryInsights'
import { RiskReview } from '../features/analysis/components/RiskReview'
import { SummaryCards } from '../features/analysis/components/SummaryCards'
import { TeamHealthTable } from '../features/analysis/components/TeamHealthTable'
import type { OrganizationAnalysisResult } from '../types/analysis'
import { createDashboardChartDataset } from '../utils/chart/dashboardChartDataset'

interface ResultLocationState {
  analysisResult?: OrganizationAnalysisResult
}

export function ResultPage() {
  const location = useLocation()
  const locationState = location.state as ResultLocationState | null
  const analysisResult = locationState?.analysisResult ?? null
  const chartDataset = useMemo(
    () => (analysisResult ? createDashboardChartDataset(analysisResult) : null),
    [analysisResult],
  )

  if (!analysisResult || !chartDataset) {
    return (
      <PageContainer>
        <EmptyState
          action={
            <Link to="/">
              <Button>분석 화면으로 돌아가기</Button>
            </Link>
          }
          message="현재 MVP에서는 결과 데이터가 라우터 상태에만 보관됩니다. 홈 화면에서 새 모의 분석을 실행하세요."
          title="분석 결과가 없습니다"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <header className="mb-8 flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            {analysisResult.organization.displayName}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-50">협업 분석 대시보드</h1>
          <p className="mt-3 text-sm text-zinc-400">
            {analysisResult.organization.analysisPeriodLabel} /{' '}
            {analysisResult.organization.repositoryCountLabel} / 생성{' '}
            {new Date(analysisResult.generatedAt).toLocaleDateString('ko-KR')}
          </p>
        </div>
        <Link to="/">
          <Button variant="secondary">새 분석</Button>
        </Link>
      </header>

      <div className="space-y-6">
        <WarningBanner message={analysisResult.warningMessage} />
        <SummaryCards
          result={analysisResult}
          scoreAggregation={chartDataset.scoreAggregation}
        />
        <DashboardCharts dataset={chartDataset} />
        <TeamHealthTable members={analysisResult.members} />
        <RepositoryInsights insights={chartDataset.repositoryInsights} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <RepositoryList repositories={analysisResult.repositories} />
          <RiskReview members={analysisResult.members} />
        </div>
      </div>
    </PageContainer>
  )
}
