import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { RISK_CHART_COLORS } from '../../../../constants/chartTheme'
import type { RiskDistribution } from '../../../../types/analysis'
import { ChartPanel } from './ChartPanel'
import {
  chartLegendStyle,
  chartTooltipContentStyle,
  chartTooltipLabelStyle,
} from './chartStyles'

interface RiskLevelDistributionChartProps {
  data: RiskDistribution[]
}

export function RiskLevelDistributionChart({
  data,
}: RiskLevelDistributionChartProps) {
  const visibleData = data.filter((riskDistribution) => riskDistribution.count > 0)

  return (
    <ChartPanel
      description="Stable, Watch, Risk, Critical 비율을 한눈에 확인합니다."
      isEmpty={visibleData.length === 0}
      title="Risk Level Distribution"
    >
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="48%"
            data={visibleData}
            dataKey="count"
            innerRadius={58}
            isAnimationActive={false}
            nameKey="label"
            outerRadius={92}
            paddingAngle={3}
          >
            {visibleData.map((riskDistribution) => (
              <Cell
                fill={RISK_CHART_COLORS[riskDistribution.riskLevel]}
                key={riskDistribution.riskLevel}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            labelStyle={chartTooltipLabelStyle}
          />
          <Legend
            formatter={(value) => <span style={chartLegendStyle}>{value}</span>}
            iconType="circle"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartPanel>
  )
}
