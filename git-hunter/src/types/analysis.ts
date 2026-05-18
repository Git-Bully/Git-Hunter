export type RiskLevel = 'stable' | 'watch' | 'risk' | 'critical'

export type RepositoryActivityLevel = 'high' | 'medium' | 'low'

export type AnalysisPeriod = 'last-30-days' | 'last-90-days' | 'this-semester'

export type RepositoryCountOption = 'top-5' | 'top-10' | 'all'

export type AnalysisStatus =
  | 'idle'
  | 'loading'
  | 'warning'
  | 'error'
  | 'empty'
  | 'success'

export type RiskReasonCode =
  | 'low-total-score'
  | 'recent-inactivity'
  | 'low-collaboration'
  | 'missing-review'
  | 'repository-concentration'
  | 'activity-gap'
  | 'low-pr-participation'

export type RiskReasonSeverity = 'info' | 'warning' | 'danger'

export interface AnalysisFormState {
  organizationInput: string
  analysisPeriod: AnalysisPeriod
  repositoryCount: RepositoryCountOption
  excludeForks: boolean
  excludeArchived: boolean
}

export interface OrganizationSummary {
  login: string
  displayName: string
  analysisPeriodLabel: string
  repositoryCountLabel: string
}

export interface ScoreBreakdown {
  activity: number
  collaboration: number
  consistency: number
  total: number
}

export interface RiskReason {
  code: RiskReasonCode
  label: string
  description: string
  severity: RiskReasonSeverity
}

export interface RiskAnalysisResult {
  level: RiskLevel
  reasons: RiskReason[]
  deficitAreas: string[]
  lastActivityStatus: string
}

export interface RepositorySummary {
  id: string
  name: string
  activityLevel: RepositoryActivityLevel
  commitCount: number
  pullRequestCount: number
  isFork: boolean
  isArchived: boolean
}

export interface MemberActivityMetrics {
  commits: number
  pullRequests: number
  reviews: number
  issues: number
  prInteractions: number
  activeRepositories: number
  primaryRepositoryShare: number
  activeDays: number
  longestInactivityDays: number
  lastActivityAt: string
}

export interface MemberActivityInput extends MemberActivityMetrics {
  id: string
  username: string
}

export interface MemberActivity extends MemberActivityInput {
  scores: ScoreBreakdown
  riskAnalysis: RiskAnalysisResult
  riskLevel: RiskLevel
  lastActivity: string
  riskReasons: RiskReason[]
}

export interface AnalysisTotals {
  memberCount: number
  repositoryCount: number
  totalCommits: number
  totalPullRequests: number
  riskUserCount: number
  stableUserCount: number
  averageTeamScore: number
  stableRate: number
  riskUserRate: number
}

export interface OrganizationAnalysisResult {
  organization: OrganizationSummary
  repositories: RepositorySummary[]
  members: MemberActivity[]
  totals: AnalysisTotals
  warningMessage: string
  generatedAt: string
}

export interface MockOrganizationPreset {
  organization: OrganizationSummary
  repositories: RepositorySummary[]
  members: MemberActivityInput[]
  warningMessage: string
}
