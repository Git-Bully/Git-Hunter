import type { MemberActivity, TimelinePoint } from '../../types/analysis'

const FALLBACK_TIMELINE_LABELS = ['4주 전', '3주 전', '2주 전', '이번 주'] as const
const FALLBACK_ACTIVITY_RATIOS = [0.18, 0.24, 0.28, 0.3] as const

export function createActivityTimeline(
  sourceTimeline: TimelinePoint[],
  members: MemberActivity[],
): TimelinePoint[] {
  if (sourceTimeline.length > 0) {
    return sourceTimeline
  }

  const totalCommits = members.reduce((sum, member) => sum + member.commits, 0)
  const totalPullRequests = members.reduce((sum, member) => sum + member.pullRequests, 0)
  const totalReviews = members.reduce((sum, member) => sum + member.reviews, 0)

  return FALLBACK_TIMELINE_LABELS.map((label, index) => {
    const ratio = FALLBACK_ACTIVITY_RATIOS[index]
    const commitCount = Math.round(totalCommits * ratio)
    const pullRequestCount = Math.round(totalPullRequests * ratio)
    const reviewCount = Math.round(totalReviews * ratio)

    return {
      label,
      commitCount,
      pullRequestCount,
      reviewCount,
      totalActivity: commitCount + pullRequestCount + reviewCount,
    }
  })
}
