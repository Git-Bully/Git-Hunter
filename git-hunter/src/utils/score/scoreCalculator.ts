import type { MemberActivityInput, ScoreBreakdown } from '../../types/analysis'
import { getDaysSince } from '../date/activityDate'
import { clampScore, normalizeBySoftCap, roundScore } from './normalization'

const ACTIVITY_WEIGHTS = {
  commits: 0.45,
  pullRequests: 0.35,
  repositories: 0.2,
} as const

const COLLABORATION_WEIGHTS = {
  reviews: 0.35,
  issues: 0.2,
  prInteractions: 0.25,
  repositorySpread: 0.2,
} as const

const TOTAL_WEIGHTS = {
  activity: 0.45,
  collaboration: 0.3,
  consistency: 0.25,
} as const

export function calculateScoreBreakdown(
  member: MemberActivityInput,
  teamMembers: MemberActivityInput[],
  referenceDate = new Date(),
): ScoreBreakdown {
  const activity = calculateActivityScore(member, teamMembers)
  const collaboration = calculateCollaborationScore(member)
  const consistency = calculateConsistencyScore(member, referenceDate)
  const total = roundScore(
    activity * TOTAL_WEIGHTS.activity +
      collaboration * TOTAL_WEIGHTS.collaboration +
      consistency * TOTAL_WEIGHTS.consistency,
  )

  return {
    activity,
    collaboration,
    consistency,
    total,
  }
}

function calculateActivityScore(
  member: MemberActivityInput,
  teamMembers: MemberActivityInput[],
): number {
  const teamCommitAverage = getPositiveAverage(
    teamMembers.map((teamMember) => teamMember.commits),
  )
  const teamPullRequestAverage = getPositiveAverage(
    teamMembers.map((teamMember) => teamMember.pullRequests),
  )
  const repositoryCap = Math.max(
    3,
    ...teamMembers.map((teamMember) => teamMember.activeRepositories),
  )

  const commitScore = normalizeBySoftCap(member.commits, teamCommitAverage * 1.8)
  const pullRequestScore = normalizeBySoftCap(
    member.pullRequests,
    teamPullRequestAverage * 1.8,
  )
  const repositoryScore = normalizeBySoftCap(member.activeRepositories, repositoryCap)

  return roundScore(
    commitScore * ACTIVITY_WEIGHTS.commits +
      pullRequestScore * ACTIVITY_WEIGHTS.pullRequests +
      repositoryScore * ACTIVITY_WEIGHTS.repositories,
  )
}

function calculateCollaborationScore(member: MemberActivityInput): number {
  const reviewScore = normalizeBySoftCap(member.reviews, Math.max(4, member.pullRequests))
  const issueScore = normalizeBySoftCap(member.issues, 8)
  const interactionScore = normalizeBySoftCap(member.prInteractions, 12)
  const spreadScore = clampScore(100 - Math.max(0, member.primaryRepositoryShare - 45) * 1.45)
  const noReviewPenalty = member.reviews === 0 ? 16 : 0
  const noPullRequestPenalty = member.pullRequests === 0 ? 10 : 0

  return roundScore(
    reviewScore * COLLABORATION_WEIGHTS.reviews +
      issueScore * COLLABORATION_WEIGHTS.issues +
      interactionScore * COLLABORATION_WEIGHTS.prInteractions +
      spreadScore * COLLABORATION_WEIGHTS.repositorySpread -
      noReviewPenalty -
      noPullRequestPenalty,
  )
}

function calculateConsistencyScore(
  member: MemberActivityInput,
  referenceDate: Date,
): number {
  const daysSinceLastActivity = getDaysSince(member.lastActivityAt, referenceDate)
  const recencyScore = clampScore(100 - daysSinceLastActivity * 3.2)
  const activityDaysScore = normalizeBySoftCap(member.activeDays, 24)
  const inactivityPenalty = Math.min(45, member.longestInactivityDays * 1.5)

  return roundScore(recencyScore * 0.45 + activityDaysScore * 0.4 + 15 - inactivityPenalty)
}

function getPositiveAverage(values: number[]): number {
  const positiveValues = values.filter((value) => value > 0)

  if (positiveValues.length === 0) {
    return 1
  }

  return (
    positiveValues.reduce((total, value) => total + value, 0) / positiveValues.length
  )
}
