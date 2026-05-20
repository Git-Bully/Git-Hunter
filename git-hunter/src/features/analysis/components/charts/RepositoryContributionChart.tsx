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
import {
  CHART_AXIS_COLOR,
  CHART_GRID_COLOR,
  REPOSITORY_ACTIVITY_COLORS,
} from '../../../../constants/chartTheme'
import type { RepositoryContribution } from '../../../../types/analysis'
import { ChartPanel } from './ChartPanel'
import { chartTooltipContentStyle, chartTooltipLabelStyle } from './chartStyles'

interface RepositoryContributionChartProps {
  data: RepositoryContribution[]
}

export function RepositoryContributionChart({
  data,
}: RepositoryContributionChartProps) {
  return (
    <ChartPanel
      description="리포지토리별 커밋과 PR을 합산한 활동량입니다."
      isEmpty={data.length === 0}
      title="Repository Contribution"
    >
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ bottom: 8, left: 0, right: 18, top: 8 }}>
          <CartesianGrid vertical={false} stroke={CHART_GRID_COLOR} strokeDasharray="3 3" />
          <XAxis
            angle={-18}
            axisLine={false}
            dataKey="name"
            height={58}
            interval={0}
            textAnchor="end"
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 11 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            cursor={{ fill: 'rgba(63, 63, 70, 0.28)' }}
            labelStyle={chartTooltipLabelStyle}
          />
          <Bar
            dataKey="contributionCount"
            isAnimationActive={false}
            name="Contribution"
            radius={[8, 8, 0, 0]}
          >
            {data.map((repository) => (
              <Cell
                fill={REPOSITORY_ACTIVITY_COLORS[repository.activityLevel]}
                key={repository.repositoryId}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}
