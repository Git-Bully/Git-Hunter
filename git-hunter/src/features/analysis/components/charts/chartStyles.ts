import type { CSSProperties } from 'react'
import {
  CHART_AXIS_COLOR,
  CHART_BORDER_COLOR,
  CHART_SURFACE_COLOR,
} from '../../../../constants/chartTheme'

export const chartTooltipContentStyle: CSSProperties = {
  backgroundColor: CHART_SURFACE_COLOR,
  border: `1px solid ${CHART_BORDER_COLOR}`,
  borderRadius: 8,
  color: '#f4f4f5',
}

export const chartTooltipLabelStyle: CSSProperties = {
  color: CHART_AXIS_COLOR,
  fontWeight: 600,
}

export const chartLegendStyle: CSSProperties = {
  color: CHART_AXIS_COLOR,
  fontSize: 12,
}
