import type { ChartDataset } from '../../../types/analysis'
import { ActivityTimelineChart } from './charts/ActivityTimelineChart'
import { RepositoryContributionChart } from './charts/RepositoryContributionChart'
import { RiskLevelDistributionChart } from './charts/RiskLevelDistributionChart'
import { TeamScoreDistributionChart } from './charts/TeamScoreDistributionChart'

interface DashboardChartsProps {
  dataset: ChartDataset
}

export function DashboardCharts({ dataset }: DashboardChartsProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <TeamScoreDistributionChart data={dataset.teamDistribution} />
      <RiskLevelDistributionChart data={dataset.riskDistribution} />
      <RepositoryContributionChart data={dataset.repositoryContributions} />
      <ActivityTimelineChart data={dataset.activityTimeline} />
    </section>
  )
}
