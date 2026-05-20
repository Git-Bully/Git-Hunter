import type { MemberActivity, RiskLevel, RiskReasonSeverity } from '../../../types/analysis'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { SectionTitle } from '../../../components/layout/SectionTitle'
import { RISK_DISPLAY_LABEL } from '../../../constants/riskLabels'
import { cx } from '../../../utils/classNames'

interface RiskReviewProps {
  members: MemberActivity[]
}

const riskCardClassNames: Record<Exclude<RiskLevel, 'stable'>, string> = {
  watch: 'border-yellow-400/25 bg-yellow-400/10 hover:border-yellow-300/50',
  risk: 'border-red-400/30 bg-red-400/10 hover:border-red-300/50',
  critical: 'border-fuchsia-400/30 bg-fuchsia-400/10 hover:border-fuchsia-300/50',
}

const reasonSeverityClassNames: Record<RiskReasonSeverity, string> = {
  info: 'border-zinc-700 bg-zinc-950 text-zinc-300',
  warning: 'border-yellow-400/25 bg-yellow-400/10 text-yellow-100',
  danger: 'border-red-400/25 bg-red-400/10 text-red-100',
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
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-5">
            <p className="font-semibold text-emerald-100">현재 안정 기준을 벗어난 사용자가 없습니다.</p>
            <div className="mt-4 grid gap-3 text-sm text-emerald-100/75 md:grid-cols-3">
              <span className="rounded-lg border border-emerald-400/15 bg-zinc-950/40 px-3 py-2">
                협업 신호 정상
              </span>
              <span className="rounded-lg border border-emerald-400/15 bg-zinc-950/40 px-3 py-2">
                장기 미활동 없음
              </span>
              <span className="rounded-lg border border-emerald-400/15 bg-zinc-950/40 px-3 py-2">
                발표 위험 없음
              </span>
            </div>
          </div>
        ) : (
          riskMembers.map((member) => (
            <div
              className={cx(
                'rounded-lg border px-4 py-4 transition-colors',
                riskCardClassNames[member.riskLevel],
              )}
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

              <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                <RiskMetric label="총점" value={`${member.scores.total}/100`} />
                <RiskMetric label="협업" value={`${member.scores.collaboration}/100`} />
                <RiskMetric label="활동 공백" value={`${member.longestInactivityDays}일`} />
                <RiskMetric label="편중도" value={`${member.primaryRepositoryShare}%`} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(member.riskAnalysis.deficitAreas.length > 0
                  ? member.riskAnalysis.deficitAreas
                  : ['주요 부족 요소 없음']
                ).map((area) => (
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
                  <li
                    className={cx(
                      'rounded-lg border px-3 py-2',
                      reasonSeverityClassNames[reason.severity],
                    )}
                    key={reason.code}
                  >
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

function RiskMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold text-zinc-100">{value}</p>
    </div>
  )
}

function hasNonStableRiskLevel(
  member: MemberActivity,
): member is MemberActivity & { riskLevel: Exclude<RiskLevel, 'stable'> } {
  return member.riskLevel !== 'stable'
}
