import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_AXIS_COLOR, CHART_GRID_COLOR } from '../../../../constants/chartTheme'
import type { TimelinePoint } from '../../../../types/analysis'
import { ChartPanel } from './ChartPanel'
import {
  chartLegendStyle,
  chartTooltipContentStyle,
  chartTooltipLabelStyle,
} from './chartStyles'

interface ActivityTimelineChartProps {
  data: TimelinePoint[]
}

export function ActivityTimelineChart({ data }: ActivityTimelineChartProps) {
  return (
    <ChartPanel
      description="모의 timeline 데이터를 기반으로 활동 추세를 표시합니다."
      isEmpty={data.length === 0}
      title="Activity Timeline"
    >
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data} margin={{ bottom: 8, left: 0, right: 18, top: 8 }}>
          <CartesianGrid stroke={CHART_GRID_COLOR} strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            dataKey="label"
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            labelStyle={chartTooltipLabelStyle}
          />
          <Legend
            formatter={(value) => <span style={chartLegendStyle}>{value}</span>}
            iconType="plainline"
            verticalAlign="bottom"
          />
          <Line
            activeDot={{ r: 5 }}
            dataKey="totalActivity"
            isAnimationActive={false}
            name="Total"
            stroke="#34d399"
            strokeWidth={3}
            type="monotone"
          />
          <Line
            dataKey="pullRequestCount"
            isAnimationActive={false}
            name="PR"
            stroke="#60a5fa"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="reviewCount"
            isAnimationActive={false}
            name="Review"
            stroke="#facc15"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}
