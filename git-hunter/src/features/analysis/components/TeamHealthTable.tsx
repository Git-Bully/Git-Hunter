import { useMemo, useState } from 'react'
import type { MemberActivity, RiskLevel } from '../../../types/analysis'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { SectionTitle } from '../../../components/layout/SectionTitle'
import { RISK_DISPLAY_LABEL } from '../../../constants/riskLabels'
import { cx } from '../../../utils/classNames'
import {
  DEFAULT_TEAM_TABLE_SORT,
  sortMembersForTable,
} from '../../../utils/table/memberTableSorting'
import type { TableSortState, TeamTableSortKey } from '../../../types/analysis'

interface TeamHealthTableProps {
  members: MemberActivity[]
}

const riskRowClassNames: Record<RiskLevel, string> = {
  stable: 'border-l-2 border-l-transparent hover:bg-emerald-400/5',
  watch: 'border-l-2 border-l-yellow-300 bg-yellow-400/[0.04] hover:bg-yellow-400/10',
  risk: 'border-l-2 border-l-red-300 bg-red-400/[0.05] hover:bg-red-400/10',
  critical:
    'border-l-2 border-l-fuchsia-300 bg-fuchsia-400/[0.06] hover:bg-fuchsia-400/10',
}

const sortableColumns: {
  key: TeamTableSortKey
  label: string
}[] = [
  { key: 'username', label: '사용자' },
  { key: 'totalScore', label: '총점' },
  { key: 'commits', label: '커밋' },
  { key: 'pullRequests', label: 'PR' },
  { key: 'lastActivityAt', label: '마지막 활동' },
]

export function TeamHealthTable({ members }: TeamHealthTableProps) {
  const [sortState, setSortState] = useState<TableSortState>(DEFAULT_TEAM_TABLE_SORT)
  const sortedMembers = useMemo(
    () => sortMembersForTable(members, sortState),
    [members, sortState],
  )

  function handleSort(nextSortKey: TeamTableSortKey) {
    setSortState((currentSortState) => ({
      key: nextSortKey,
      direction:
        currentSortState.key === nextSortKey && currentSortState.direction === 'desc'
          ? 'asc'
          : 'desc',
    }))
  }

  if (members.length === 0) {
    return (
      <Card>
        <SectionTitle
          description="분석 대상 팀원이 없으면 score table 대신 placeholder를 표시합니다."
          title="팀 건강도 테이블"
        />
        <div className="mt-5 rounded-lg border border-dashed border-zinc-700 bg-zinc-950 px-4 py-8 text-center text-sm text-zinc-400">
          표시할 팀원 활동 데이터가 없습니다.
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <SectionTitle
        description="활동량, 협업 신호, 지속성을 기반으로 계산한 팀원별 점수입니다."
        title="팀 건강도 테이블"
      />
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
        {sortableColumns.map((column) => (
          <button
            className={cx(
              'rounded-full border px-3 py-1 font-medium transition-colors',
              sortState.key === column.key
                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:text-zinc-200',
            )}
            key={column.key}
            onClick={() => handleSort(column.key)}
            type="button"
          >
            {column.label}
            {sortState.key === column.key ? (
              <span className="ml-1">{sortState.direction === 'desc' ? '↓' : '↑'}</span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-950/95 text-zinc-400 backdrop-blur">
            <tr>
              <SortableHeader
                label="사용자"
                sortKey="username"
                sortState={sortState}
                onSort={handleSort}
              />
              <SortableHeader
                label="총점"
                sortKey="totalScore"
                sortState={sortState}
                onSort={handleSort}
              />
              <th className="px-4 py-3 font-medium">활동</th>
              <th className="px-4 py-3 font-medium">협업</th>
              <th className="px-4 py-3 font-medium">지속성</th>
              <th className="px-4 py-3 font-medium">위험도</th>
              <SortableHeader
                label="커밋"
                sortKey="commits"
                sortState={sortState}
                onSort={handleSort}
              />
              <SortableHeader
                label="PR"
                sortKey="pullRequests"
                sortState={sortState}
                onSort={handleSort}
              />
              <th className="px-4 py-3 font-medium">리뷰</th>
              <th className="px-4 py-3 font-medium">리포지토리</th>
              <SortableHeader
                label="마지막 활동"
                sortKey="lastActivityAt"
                sortState={sortState}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-900/60">
            {sortedMembers.map((member) => (
              <tr
                className={cx('transition-colors', riskRowClassNames[member.riskLevel])}
                key={member.id}
              >
                <td className="px-4 py-4 font-medium text-zinc-100">{member.username}</td>
                <td className={`px-4 py-4 text-lg font-bold ${getScoreClassName(member.scores.total)}`}>
                  {member.scores.total}
                </td>
                <td className={`px-4 py-4 ${getScoreClassName(member.scores.activity)}`}>
                  {member.scores.activity}
                </td>
                <td className={`px-4 py-4 ${getScoreClassName(member.scores.collaboration)}`}>
                  {member.scores.collaboration}
                </td>
                <td className={`px-4 py-4 ${getScoreClassName(member.scores.consistency)}`}>
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

function SortableHeader({
  label,
  onSort,
  sortKey,
  sortState,
}: {
  label: string
  onSort: (sortKey: TeamTableSortKey) => void
  sortKey: TeamTableSortKey
  sortState: TableSortState
}) {
  const isActive = sortState.key === sortKey

  return (
    <th className="px-4 py-3 font-medium">
      <button
        className={cx(
          'inline-flex items-center gap-1 rounded-md text-left transition-colors hover:text-zinc-100',
          isActive ? 'text-emerald-200' : 'text-zinc-400',
        )}
        onClick={() => onSort(sortKey)}
        type="button"
      >
        {label}
        <span className="text-xs">{isActive && sortState.direction === 'asc' ? '↑' : '↓'}</span>
      </button>
    </th>
  )
}

function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <Badge variant={riskLevel}>{RISK_DISPLAY_LABEL[riskLevel]}</Badge>
}

function getScoreClassName(score: number): string {
  if (score >= 75) {
    return 'text-emerald-200'
  }

  if (score >= 55) {
    return 'text-yellow-200'
  }

  return 'text-red-200'
}
