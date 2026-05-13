import type { RiskLevel } from '../types/analysis'

export const RISK_DISPLAY_LABEL: Record<RiskLevel, string> = {
  stable: '안정',
  watch: '관찰',
  risk: '위험',
  critical: '심각',
}
