import type {
  MemberActivity,
  RepositoryContribution,
  RepositoryInsight,
  RepositorySummary,
} from '../../types/analysis'

export function createRepositoryContributions(
  repositories: RepositorySummary[],
): RepositoryContribution[] {
  return [...repositories]
    .map((repository) => ({
      repositoryId: repository.id,
      name: repository.name,
      activityLevel: repository.activityLevel,
      commitCount: repository.commitCount,
      pullRequestCount: repository.pullRequestCount,
      contributionCount: repository.commitCount + repository.pullRequestCount,
    }))
    .sort(
      (firstRepository, secondRepository) =>
        secondRepository.contributionCount - firstRepository.contributionCount,
    )
}

export function createRepositoryInsights(
  repositories: RepositorySummary[],
  members: MemberActivity[],
): RepositoryInsight[] {
  const repositoryContributions = createRepositoryContributions(repositories)
  const mostActiveRepository = repositoryContributions[0] ?? null
  const lowActivityRepositories = repositories.filter(
    (repository) =>
      repository.activityLevel === 'low' ||
      repository.commitCount + repository.pullRequestCount < 20,
  )
  const highestConcentrationMember = findHighestConcentrationMember(members)
  const averageActiveRepositories = calculateAverageActiveRepositories(members)

  return [
    {
      id: 'most-active-repository',
      label: '가장 활발한 리포지토리',
      value: mostActiveRepository?.name ?? '없음',
      description: mostActiveRepository
        ? `커밋과 PR을 합산해 ${mostActiveRepository.contributionCount}건의 활동이 집중되었습니다.`
        : '분석 가능한 리포지토리 활동이 없습니다.',
      tone: 'success',
    },
    {
      id: 'low-activity-repositories',
      label: '활동 부족 리포지토리',
      value: `${lowActivityRepositories.length}개`,
      description:
        lowActivityRepositories.length > 0
          ? lowActivityRepositories.map((repository) => repository.name).join(', ')
          : '낮은 활동량으로 분류된 리포지토리가 없습니다.',
      tone: lowActivityRepositories.length > 0 ? 'warning' : 'success',
    },
    {
      id: 'member-concentration',
      label: '사용자 편중 신호',
      value: highestConcentrationMember
        ? `${highestConcentrationMember.username} ${highestConcentrationMember.primaryRepositoryShare}%`
        : '없음',
      description: highestConcentrationMember
        ? '한 사용자의 활동이 특정 리포지토리에 집중된 정도입니다.'
        : '편중도를 계산할 팀원 데이터가 없습니다.',
      tone:
        highestConcentrationMember && highestConcentrationMember.primaryRepositoryShare >= 85
          ? 'danger'
          : 'warning',
    },
    {
      id: 'team-repository-spread',
      label: '팀 활동 분산도',
      value: `${averageActiveRepositories}개/인`,
      description: '팀원이 평균적으로 활동한 리포지토리 수입니다.',
      tone: averageActiveRepositories >= 2 ? 'success' : 'warning',
    },
  ]
}

function findHighestConcentrationMember(
  members: MemberActivity[],
): MemberActivity | null {
  if (members.length === 0) {
    return null
  }

  return [...members].sort(
    (firstMember, secondMember) =>
      secondMember.primaryRepositoryShare - firstMember.primaryRepositoryShare,
  )[0]
}

function calculateAverageActiveRepositories(members: MemberActivity[]): number {
  if (members.length === 0) {
    return 0
  }

  const totalActiveRepositories = members.reduce(
    (sum, member) => sum + member.activeRepositories,
    0,
  )

  return Math.round((totalActiveRepositories / members.length) * 10) / 10
}
