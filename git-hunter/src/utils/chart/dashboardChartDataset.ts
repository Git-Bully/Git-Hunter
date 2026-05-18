import type { ChartDataset, OrganizationAnalysisResult } from '../../types/analysis'
import { createRepositoryContributions, createRepositoryInsights } from '../analytics/repositoryAnalytics'
import { createRiskDistribution } from '../analytics/riskDistribution'
import { createScoreAggregation } from '../analytics/scoreAggregation'
import { createTeamDistribution } from '../analytics/teamDistribution'
import { createActivityTimeline } from '../analytics/timelineGeneration'

export function createDashboardChartDataset(
  result: OrganizationAnalysisResult,
): ChartDataset {
  const activityTimeline = createActivityTimeline(result.activityTimeline, result.members)

  return {
    teamDistribution: createTeamDistribution(result.members),
    riskDistribution: createRiskDistribution(result.members),
    repositoryContributions: createRepositoryContributions(result.repositories),
    activityTimeline,
    repositoryInsights: createRepositoryInsights(result.repositories, result.members),
    scoreAggregation: createScoreAggregation(result.members),
  }
}
