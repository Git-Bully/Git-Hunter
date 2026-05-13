import type { MemberActivity, RiskLevel } from '../../../types/analysis'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { SectionTitle } from '../../../components/layout/SectionTitle'
import { RISK_DISPLAY_LABEL } from '../../../constants/riskLabels'

interface TeamHealthTableProps {
  members: MemberActivity[]
}

const scoreColorClassName = 'font-semibold text-zinc-100'

export function TeamHealthTable({ members }: TeamHealthTableProps) {
  return (
    <Card>
      <SectionTitle
        description="활동량, 협업 신호, 지속성을 기반으로 계산한 팀원별 점수입니다."
        title="팀 건강도 테이블"
      />
      <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">사용자</th>
              <th className="px-4 py-3 font-medium">총점</th>
              <th className="px-4 py-3 font-medium">활동</th>
              <th className="px-4 py-3 font-medium">협업</th>
              <th className="px-4 py-3 font-medium">지속성</th>
              <th className="px-4 py-3 font-medium">위험도</th>
              <th className="px-4 py-3 font-medium">커밋</th>
              <th className="px-4 py-3 font-medium">PR</th>
              <th className="px-4 py-3 font-medium">리뷰</th>
              <th className="px-4 py-3 font-medium">리포지토리</th>
              <th className="px-4 py-3 font-medium">마지막 활동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-900/60">
            {members.map((member) => (
              <tr className="transition-colors hover:bg-zinc-800/50" key={member.id}>
                <td className="px-4 py-4 font-medium text-zinc-100">{member.username}</td>
                <td className="px-4 py-4 text-lg font-bold text-emerald-200">
                  {member.scores.total}
                </td>
                <td className={`px-4 py-4 ${scoreColorClassName}`}>
                  {member.scores.activity}
                </td>
                <td className={`px-4 py-4 ${scoreColorClassName}`}>
                  {member.scores.collaboration}
                </td>
                <td className={`px-4 py-4 ${scoreColorClassName}`}>
                  {member.scores.consistency}
                </td>
                <td className="px-4 py-4">
                  <RiskBadge riskLevel={member.riskLevel} />
                </td>
                <td className="px-4 py-4 text-zinc-300">{member.commits}</td>
                <td className="px-4 py-4 text-zinc-300">{member.pullRequests}</td>
                <td className="px-4 py-4 text-zinc-300">{member.reviews}</td>
                <td className="px-4 py-4 text-zinc-300">{member.activeRepositories}</td>
                <td className="px-4 py-4 text-zinc-400">{member.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <Badge variant={riskLevel}>{RISK_DISPLAY_LABEL[riskLevel]}</Badge>
}
