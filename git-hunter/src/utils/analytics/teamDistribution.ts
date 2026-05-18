import type { MemberActivity, TeamDistribution } from '../../types/analysis'

export function createTeamDistribution(members: MemberActivity[]): TeamDistribution[] {
  return [...members]
    .sort((firstMember, secondMember) => secondMember.scores.total - firstMember.scores.total)
    .map((member) => ({
      memberId: member.id,
      username: member.username,
      totalScore: member.scores.total,
      activityScore: member.scores.activity,
      collaborationScore: member.scores.collaboration,
      consistencyScore: member.scores.consistency,
      riskLevel: member.riskLevel,
    }))
}
