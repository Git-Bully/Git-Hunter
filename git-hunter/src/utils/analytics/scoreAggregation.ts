import type { MemberActivity, ScoreAggregation } from '../../types/analysis'

export function createScoreAggregation(members: MemberActivity[]): ScoreAggregation {
  return {
    averageActivityScore: calculateAverageScore(
      members.map((member) => member.scores.activity),
    ),
    averageCollaborationScore: calculateAverageScore(
      members.map((member) => member.scores.collaboration),
    ),
    averageConsistencyScore: calculateAverageScore(
      members.map((member) => member.scores.consistency),
    ),
    averageTotalScore: calculateAverageScore(
      members.map((member) => member.scores.total),
    ),
  }
}

function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) {
    return 0
  }

  const totalScore = scores.reduce((sum, score) => sum + score, 0)

  return Math.round(totalScore / scores.length)
}
