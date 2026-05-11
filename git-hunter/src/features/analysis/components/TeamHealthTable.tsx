import type { MemberActivity, RiskLevel } from '../../../types/analysis'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { SectionTitle } from '../../../components/layout/SectionTitle'

interface TeamHealthTableProps {
  members: MemberActivity[]
}

const riskLabel: Record<RiskLevel, string> = {
  stable: '안정',
  watch: '관찰',
  risk: '위험',
  critical: '심각',
}

export function TeamHealthTable({ members }: TeamHealthTableProps) {
  return (
    <Card>
      <SectionTitle title="팀 건강도 개요" />
      <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">사용자</th>
              <th className="px-4 py-3 font-medium">총점</th>
              <th className="px-4 py-3 font-medium">위험도</th>
              <th className="px-4 py-3 font-medium">커밋</th>
              <th className="px-4 py-3 font-medium">마지막 활동</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-900/60">
            {members.map((member) => (
              <tr className="transition-colors hover:bg-zinc-800/40" key={member.id}>
                <td className="px-4 py-4 font-medium text-zinc-100">{member.username}</td>
                <td className="px-4 py-4 text-zinc-200">{member.scores.total}</td>
                <td className="px-4 py-4">
                  <Badge variant={member.riskLevel}>{riskLabel[member.riskLevel]}</Badge>
                </td>
                <td className="px-4 py-4 text-zinc-300">{member.commits}</td>
                <td className="px-4 py-4 text-zinc-400">{member.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
