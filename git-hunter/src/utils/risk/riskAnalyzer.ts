import type {
  MemberActivityInput,
  RiskAnalysisResult,
  RiskLevel,
  RiskReason,
  ScoreBreakdown,
} from '../../types/analysis'
import { getDaysSince, getLastActivityStatus } from '../date/activityDate'

export function analyzeMemberRisk(
  member: MemberActivityInput,
  scores: ScoreBreakdown,
  referenceDate = new Date(),
): RiskAnalysisResult {
  const daysSinceLastActivity = getDaysSince(member.lastActivityAt, referenceDate)
  const reasons = createRiskReasons(member, scores, daysSinceLastActivity)
  const level = determineRiskLevel(scores, reasons, daysSinceLastActivity)

  return {
    level,
    reasons,
    deficitAreas: createDeficitAreas(member, scores),
    lastActivityStatus: getLastActivityStatus(daysSinceLastActivity),
  }
}

function determineRiskLevel(
  scores: ScoreBreakdown,
  reasons: RiskReason[],
  daysSinceLastActivity: number,
): RiskLevel {
  const dangerReasonCount = reasons.filter((reason) => reason.severity === 'danger').length

  if (scores.total < 35 || daysSinceLastActivity > 30 || dangerReasonCount >= 3) {
    return 'critical'
  }

  if (scores.total < 55 || dangerReasonCount >= 2) {
    return 'risk'
  }

  if (scores.total < 72 || reasons.length > 0) {
    return 'watch'
  }

  return 'stable'
}

function createRiskReasons(
  member: MemberActivityInput,
  scores: ScoreBreakdown,
  daysSinceLastActivity: number,
): RiskReason[] {
  const reasons: RiskReason[] = []

  if (scores.total < 55) {
    reasons.push({
      code: 'low-total-score',
      label: '낮은 총 건강도 점수',
      description: `총 건강도 점수가 ${scores.total}점으로 안정 범위보다 낮습니다.`,
      severity: scores.total < 40 ? 'danger' : 'warning',
    })
  }

  if (daysSinceLastActivity > 10) {
    reasons.push({
      code: 'recent-inactivity',
      label: '최근 활동 부족',
      description: `${daysSinceLastActivity}일 동안 확인된 활동이 없습니다.`,
      severity: daysSinceLastActivity > 21 ? 'danger' : 'warning',
    })
  }

  if (scores.collaboration < 55) {
    reasons.push({
      code: 'low-collaboration',
      label: '협업 신호 부족',
      description: '리뷰, 이슈, PR 상호작용이 팀 기준보다 낮습니다.',
      severity: scores.collaboration < 40 ? 'danger' : 'warning',
    })
  }

  if (member.reviews === 0) {
    reasons.push({
      code: 'missing-review',
      label: '리뷰 활동 없음',
      description: '선택한 기간 동안 리뷰 참여가 감지되지 않았습니다.',
      severity: 'danger',
    })
  }

  if (member.pullRequests === 0) {
    reasons.push({
      code: 'low-pr-participation',
      label: 'PR 참여 없음',
      description: '선택한 기간 동안 PR 활동이 감지되지 않았습니다.',
      severity: 'danger',
    })
  }

  if (member.primaryRepositoryShare >= 70) {
    reasons.push({
      code: 'repository-concentration',
      label: '리포지토리 편중',
      description: `활동의 ${member.primaryRepositoryShare}%가 하나의 리포지토리에 집중되어 있습니다.`,
      severity: member.primaryRepositoryShare >= 85 ? 'danger' : 'warning',
    })
  }

  if (member.longestInactivityDays >= 12) {
    reasons.push({
      code: 'activity-gap',
      label: '활동 공백 감지',
      description: `가장 긴 활동 공백이 ${member.longestInactivityDays}일입니다.`,
      severity: member.longestInactivityDays >= 20 ? 'danger' : 'warning',
    })
  }

  return reasons
}

function createDeficitAreas(member: MemberActivityInput, scores: ScoreBreakdown): string[] {
  const deficitAreas: string[] = []

  if (scores.activity < 65) {
    deficitAreas.push('활동량')
  }

  if (scores.collaboration < 65) {
    deficitAreas.push('협업')
  }

  if (scores.consistency < 65) {
    deficitAreas.push('지속성')
  }

  if (member.activeRepositories <= 1 || member.primaryRepositoryShare >= 70) {
    deficitAreas.push('리포지토리 분산')
  }

  return deficitAreas
}
