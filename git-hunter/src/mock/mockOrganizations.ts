import type { MockOrganizationPreset } from '../types/analysis'

const REFERENCE_WARNING =
  '데모 모드: Git-Hunter는 로컬 모의 데이터만 사용하며 GitHub API를 호출하지 않습니다.'

export const mockOrganizationPresets: Record<string, MockOrganizationPreset> = {
  'kookmin-sw-team': {
    organization: {
      login: 'kookmin-sw-team',
      displayName: '국민 SW 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('repo-git-hunter-web', 'git-hunter-web', 'high', 168, 31),
      createRepository('repo-analysis-core', 'analysis-core', 'high', 132, 26),
      createRepository('repo-course-project', 'course-project-api-docs', 'medium', 74, 13),
      createRepository('repo-design-system', 'design-system', 'medium', 45, 8),
      createRepository('repo-legacy-docs', 'legacy-docs', 'low', 12, 1, false, true),
    ],
    members: [
      createMember('member-sharon', 'sharon77770', 64, 13, 16, 7, 22, 4, 38, 23, 3, '2026-05-12'),
      createMember('member-mina', 'frontend-mina', 52, 10, 12, 6, 17, 4, 42, 21, 4, '2026-05-11'),
      createMember('member-park', 'backend-park', 47, 9, 7, 5, 12, 3, 48, 18, 5, '2026-05-10'),
      createMember('member-kim', 'frontend-kim', 34, 6, 2, 3, 6, 2, 63, 14, 8, '2026-05-08'),
      createMember('member-jun', 'docs-jun', 18, 2, 1, 5, 3, 1, 82, 10, 13, '2026-05-03'),
      createMember('member-ghost', 'ghost-member', 5, 0, 0, 0, 0, 1, 91, 3, 24, '2026-04-21'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 46, 7, 8],
      ['3주 전', 62, 10, 11],
      ['2주 전', 88, 17, 10],
      ['이번 주', 124, 27, 9],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
  'balanced-team': {
    organization: {
      login: 'balanced-team',
      displayName: '정상 협업 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('repo-product-web', 'product-web', 'high', 142, 24),
      createRepository('repo-api-contracts', 'api-contracts', 'medium', 86, 17),
      createRepository('repo-ops-docs', 'ops-docs', 'medium', 39, 6),
    ],
    members: [
      createMember('balanced-1', 'alice-dev', 44, 9, 10, 8, 15, 3, 44, 19, 4, '2026-05-12'),
      createMember('balanced-2', 'bruno-dev', 41, 8, 9, 7, 13, 3, 46, 18, 4, '2026-05-11'),
      createMember('balanced-3', 'cora-dev', 39, 7, 8, 6, 12, 3, 51, 17, 5, '2026-05-10'),
      createMember('balanced-4', 'danny-dev', 36, 6, 7, 7, 10, 2, 55, 16, 6, '2026-05-09'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 38, 8, 7],
      ['3주 전', 44, 9, 8],
      ['2주 전', 42, 7, 9],
      ['이번 주', 36, 6, 10],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
  'hero-team': {
    organization: {
      login: 'hero-team',
      displayName: '특정 인원 몰빵 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('hero-main', 'hero-main-app', 'high', 238, 33),
      createRepository('hero-admin', 'admin-console', 'medium', 42, 6),
      createRepository('hero-docs', 'handoff-docs', 'low', 18, 2),
    ],
    members: [
      createMember('hero-1', 'solo-hero', 154, 24, 3, 2, 8, 2, 78, 22, 6, '2026-05-11'),
      createMember('hero-2', 'quiet-ui', 24, 4, 5, 3, 6, 2, 62, 12, 9, '2026-05-07'),
      createMember('hero-3', 'quiet-api', 19, 3, 4, 2, 5, 2, 66, 11, 11, '2026-05-05'),
      createMember('hero-4', 'quiet-docs', 8, 1, 0, 1, 1, 1, 88, 4, 18, '2026-04-29'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 22, 4, 2],
      ['3주 전', 58, 9, 3],
      ['2주 전', 97, 16, 4],
      ['이번 주', 126, 17, 3],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
  'low-collab-team': {
    organization: {
      login: 'low-collab-team',
      displayName: '협업 부족 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('collab-web', 'frontend-lab', 'medium', 96, 7),
      createRepository('collab-api', 'api-lab', 'medium', 88, 5),
      createRepository('collab-docs', 'docs-lab', 'low', 24, 1),
    ],
    members: [
      createMember('collab-1', 'commit-heavy-a', 58, 2, 0, 1, 2, 2, 72, 14, 7, '2026-05-09'),
      createMember('collab-2', 'commit-heavy-b', 51, 1, 0, 0, 1, 2, 76, 13, 8, '2026-05-08'),
      createMember('collab-3', 'commit-heavy-c', 45, 1, 0, 1, 1, 1, 84, 12, 10, '2026-05-06'),
      createMember('collab-4', 'review-light', 19, 1, 1, 2, 2, 1, 81, 8, 13, '2026-05-03'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 34, 2, 0],
      ['3주 전', 56, 2, 1],
      ['2주 전', 70, 3, 0],
      ['이번 주', 53, 0, 0],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
  'ghost-team': {
    organization: {
      login: 'ghost-team',
      displayName: '유령 팀원 포함 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('ghost-product', 'student-product', 'high', 117, 19),
      createRepository('ghost-report', 'final-report', 'medium', 43, 6),
    ],
    members: [
      createMember('ghost-active-1', 'steady-lead', 50, 9, 11, 6, 14, 2, 55, 20, 5, '2026-05-11'),
      createMember('ghost-active-2', 'steady-peer', 38, 7, 8, 4, 11, 2, 58, 18, 6, '2026-05-10'),
      createMember('ghost-low-1', 'almost-absent', 6, 0, 0, 0, 0, 1, 92, 3, 23, '2026-04-22'),
      createMember('ghost-low-2', 'missing-student', 1, 0, 0, 0, 0, 1, 100, 1, 31, '2026-04-10'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 47, 8, 9],
      ['3주 전', 38, 7, 8],
      ['2주 전', 26, 5, 3],
      ['이번 주', 21, 2, 1],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
  'gap-team': {
    organization: {
      login: 'gap-team',
      displayName: '활동 공백 팀',
      analysisPeriodLabel: '최근 30일',
      repositoryCountLabel: '상위 5개 리포지토리',
    },
    repositories: [
      createRepository('gap-web', 'release-web', 'medium', 76, 12),
      createRepository('gap-api', 'release-api', 'medium', 62, 10),
      createRepository('gap-docs', 'release-notes', 'low', 20, 3),
    ],
    members: [
      createMember('gap-1', 'burst-lead', 46, 8, 7, 4, 9, 3, 50, 11, 17, '2026-05-02'),
      createMember('gap-2', 'burst-ui', 35, 6, 4, 3, 7, 2, 69, 9, 21, '2026-04-28'),
      createMember('gap-3', 'burst-api', 31, 5, 4, 2, 6, 2, 71, 8, 24, '2026-04-25'),
      createMember('gap-4', 'recent-helper', 18, 3, 5, 5, 8, 2, 57, 12, 8, '2026-05-11'),
    ],
    activityTimeline: createTimeline([
      ['4주 전', 64, 12, 8],
      ['3주 전', 78, 11, 9],
      ['2주 전', 36, 6, 5],
      ['이번 주', 14, 3, 3],
    ]),
    warningMessage: REFERENCE_WARNING,
  },
}

export const defaultMockOrganization = mockOrganizationPresets['kookmin-sw-team']

function createRepository(
  id: string,
  name: string,
  activityLevel: MockOrganizationPreset['repositories'][number]['activityLevel'],
  commitCount: number,
  pullRequestCount: number,
  isFork = false,
  isArchived = false,
): MockOrganizationPreset['repositories'][number] {
  return {
    id,
    name,
    activityLevel,
    commitCount,
    pullRequestCount,
    isFork,
    isArchived,
  }
}

function createMember(
  id: string,
  username: string,
  commits: number,
  pullRequests: number,
  reviews: number,
  issues: number,
  prInteractions: number,
  activeRepositories: number,
  primaryRepositoryShare: number,
  activeDays: number,
  longestInactivityDays: number,
  lastActivityAt: string,
): MockOrganizationPreset['members'][number] {
  return {
    id,
    username,
    commits,
    pullRequests,
    reviews,
    issues,
    prInteractions,
    activeRepositories,
    primaryRepositoryShare,
    activeDays,
    longestInactivityDays,
    lastActivityAt,
  }
}

function createTimeline(
  points: [label: string, commitCount: number, pullRequestCount: number, reviewCount: number][],
): MockOrganizationPreset['activityTimeline'] {
  return points.map(([label, commitCount, pullRequestCount, reviewCount]) => ({
    label,
    commitCount,
    pullRequestCount,
    reviewCount,
    totalActivity: commitCount + pullRequestCount + reviewCount,
  }))
}
