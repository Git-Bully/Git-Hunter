import type { AnalysisScenario } from '../types/analysis'

export const ANALYSIS_SCENARIOS: AnalysisScenario[] = [
  {
    id: 'healthy-team',
    label: 'Healthy Team',
    description: '점수와 협업 신호가 고르게 유지되는 안정 시나리오',
    presetKey: 'balanced-team',
    aliases: ['healthy', 'healthy-team', 'balanced-team', 'stable-team'],
  },
  {
    id: 'burnout-team',
    label: 'Burnout Team',
    description: '초반 활동 이후 최근 활동량이 급격히 떨어지는 시나리오',
    presetKey: 'gap-team',
    aliases: ['burnout', 'burnout-team', 'gap-team', 'activity-gap-team'],
  },
  {
    id: 'ghost-member-team',
    label: 'Ghost Member Team',
    description: '장기 미활동 팀원이 포함된 발표용 위험 시나리오',
    presetKey: 'ghost-team',
    aliases: ['ghost', 'ghost-team', 'ghost-member-team', 'inactive-team'],
  },
  {
    id: 'one-man-army-team',
    label: 'One-Man Army Team',
    description: '특정 사용자의 기여가 과도하게 집중된 시나리오',
    presetKey: 'hero-team',
    aliases: ['hero-team', 'one-man-army', 'one-man-army-team', 'solo-team'],
  },
  {
    id: 'collaboration-failure-team',
    label: 'Collaboration Failure',
    description: '리뷰와 PR 상호작용이 부족한 협업 실패 시나리오',
    presetKey: 'low-collab-team',
    aliases: [
      'collaboration-failure',
      'collaboration-failure-team',
      'low-collab-team',
      'reviewless-team',
    ],
  },
]

export function resolveScenarioPresetKey(organizationLogin: string): string | null {
  const normalizedLogin = organizationLogin.toLowerCase()
  const scenario = ANALYSIS_SCENARIOS.find((candidate) =>
    candidate.aliases.includes(normalizedLogin),
  )

  return scenario?.presetKey ?? null
}
