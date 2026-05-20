import { RISK_DISPLAY_LABEL } from '../../constants/riskLabels'
import type { MemberActivity, RiskDistribution, RiskLevel } from '../../types/analysis'

const RISK_LEVELS: RiskLevel[] = ['stable', 'watch', 'risk', 'critical']

export function createRiskDistribution(members: MemberActivity[]): RiskDistribution[] {
  const memberCount = members.length

  return RISK_LEVELS.map((riskLevel) => {
    const count = members.filter((member) => member.riskLevel === riskLevel).length

    return {
      riskLevel,
      label: RISK_DISPLAY_LABEL[riskLevel],
      count,
      percentage: memberCount > 0 ? Math.round((count / memberCount) * 100) : 0,
    }
  })
}
