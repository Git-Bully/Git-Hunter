import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_AXIS_COLOR, CHART_GRID_COLOR, RISK_CHART_COLORS } from '../../../../constants/chartTheme'
import type { TeamDistribution } from '../../../../types/analysis'
import { ChartPanel } from './ChartPanel'
import { chartTooltipContentStyle, chartTooltipLabelStyle } from './chartStyles'

interface TeamScoreDistributionChartProps {
  data: TeamDistribution[]
}

export function TeamScoreDistributionChart({
  data,
}: TeamScoreDistributionChartProps) {
  return (
    <ChartPanel
      description="팀원별 Total Health Score를 위험 단계 색상으로 표시합니다."
      isEmpty={data.length === 0}
      title="Team Score Distribution"
    >
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ bottom: 8, left: 18, right: 18, top: 8 }}
        >
          <CartesianGrid horizontal={false} stroke={CHART_GRID_COLOR} strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            domain={[0, 100]}
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
            tickLine={false}
            type="number"
          />
          <YAxis
            axisLine={false}
            dataKey="username"
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
            tickLine={false}
            type="category"
            width={118}
          />
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            cursor={{ fill: 'rgba(63, 63, 70, 0.28)' }}
            labelStyle={chartTooltipLabelStyle}
          />
          <Bar
            dataKey="totalScore"
            isAnimationActive={false}
            name="Total Score"
            radius={[0, 8, 8, 0]}
          >
            {data.map((member) => (
              <Cell
                fill={RISK_CHART_COLORS[member.riskLevel]}
                key={member.memberId}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}
