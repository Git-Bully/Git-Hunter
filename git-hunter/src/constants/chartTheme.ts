import type { RepositoryActivityLevel, RiskLevel } from '../types/analysis'

export const RISK_CHART_COLORS: Record<RiskLevel, string> = {
  stable: '#34d399',
  watch: '#facc15',
  risk: '#fb7185',
  critical: '#e879f9',
}

export const REPOSITORY_ACTIVITY_COLORS: Record<RepositoryActivityLevel, string> = {
  high: '#34d399',
  medium: '#facc15',
  low: '#fb7185',
}

export const CHART_GRID_COLOR = '#27272a'

export const CHART_AXIS_COLOR = '#a1a1aa'

export const CHART_SURFACE_COLOR = '#18181b'

export const CHART_BORDER_COLOR = '#3f3f46'
