import type { MemberActivity, TableSortState, TeamTableSortKey } from '../../types/analysis'

export const DEFAULT_TEAM_TABLE_SORT: TableSortState = {
  key: 'totalScore',
  direction: 'desc',
}

const usernameCollator = new Intl.Collator('ko-KR', {
  numeric: true,
  sensitivity: 'base',
})

export function sortMembersForTable(
  members: MemberActivity[],
  sortState: TableSortState,
): MemberActivity[] {
  const sortedMembers = [...members].sort((firstMember, secondMember) =>
    compareMembers(firstMember, secondMember, sortState.key),
  )

  return sortState.direction === 'desc' ? sortedMembers.reverse() : sortedMembers
}

function compareMembers(
  firstMember: MemberActivity,
  secondMember: MemberActivity,
  sortKey: TeamTableSortKey,
): number {
  switch (sortKey) {
    case 'username':
      return usernameCollator.compare(firstMember.username, secondMember.username)
    case 'totalScore':
      return firstMember.scores.total - secondMember.scores.total
    case 'commits':
      return firstMember.commits - secondMember.commits
    case 'pullRequests':
      return firstMember.pullRequests - secondMember.pullRequests
    case 'lastActivityAt':
      return (
        new Date(firstMember.lastActivityAt).getTime() -
        new Date(secondMember.lastActivityAt).getTime()
      )
  }
}
