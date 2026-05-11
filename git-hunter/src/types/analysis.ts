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

export interface RepositorySummary {
  id: string
  name: string
  activityLevel: RepositoryActivityLevel
  commitCount: number
  pullRequestCount: number
  isFork: boolean
  isArchived: boolean
}

export interface MemberActivity {
  id: string
  username: string
  scores: ScoreBreakdown
  riskLevel: RiskLevel
  commits: number
  pullRequests: number
  reviews: number
  activeRepositories: number
  lastActivity: string
  riskReasons: string[]
}

export interface AnalysisTotals {
  memberCount: number
  totalCommits: number
  totalPullRequests: number
  riskUserCount: number
}

export interface OrganizationAnalysisResult {
  organization: OrganizationSummary
  repositories: RepositorySummary[]
  members: MemberActivity[]
  totals: AnalysisTotals
  warningMessage: string
  generatedAt: string
}
