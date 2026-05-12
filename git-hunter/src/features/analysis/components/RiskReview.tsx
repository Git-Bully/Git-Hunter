import type { MemberActivity, RiskLevel } from '../../../types/analysis'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { SectionTitle } from '../../../components/layout/SectionTitle'
import { RISK_DISPLAY_LABEL } from '../../../constants/riskLabels'

interface RiskReviewProps {
  members: MemberActivity[]
}

const riskCardClassNames: Record<Exclude<RiskLevel, 'stable'>, string> = {
  watch: 'border-yellow-400/25 bg-yellow-400/10',
  risk: 'border-red-400/30 bg-red-400/10',
  critical: 'border-fuchsia-400/30 bg-fuchsia-400/10',
}

export function RiskReview({ members }: RiskReviewProps) {
  const riskMembers = members.filter(hasNonStableRiskLevel)

  return (
    <Card tone={riskMembers.length > 0 ? 'danger' : 'default'}>
      <SectionTitle
        description="관찰, 위험, 심각 단계의 사용자만 표시합니다."
        title="위험 검토"
      />
      <div className="mt-4 space-y-3">
        {riskMembers.length === 0 ? (
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-200">
            현재 안정 기준을 벗어난 사용자가 없습니다.
          </div>
        ) : (
          riskMembers.map((member) => (
            <div
              className={`rounded-lg border px-4 py-4 ${riskCardClassNames[member.riskLevel]}`}
              key={member.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-zinc-100">{member.username}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {member.riskAnalysis.lastActivityStatus} / {member.lastActivity}
                  </p>
                </div>
                <Badge variant={member.riskLevel}>
                  {RISK_DISPLAY_LABEL[member.riskLevel]}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {member.riskAnalysis.deficitAreas.map((area) => (
                  <span
                    className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300"
                    key={area}
                  >
                    {area}
                  </span>
                ))}
              </div>

              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-300">
                {member.riskReasons.map((reason) => (
                  <li key={reason.code}>
                    <span className="font-semibold text-zinc-100">{reason.label}:</span>{' '}
                    {reason.description}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

function hasNonStableRiskLevel(
  member: MemberActivity,
): member is MemberActivity & { riskLevel: Exclude<RiskLevel, 'stable'> } {
  return member.riskLevel !== 'stable'
}
