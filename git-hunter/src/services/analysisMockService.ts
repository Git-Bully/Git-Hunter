import {
  ANALYSIS_PERIOD_OPTIONS,
  REPOSITORY_COUNT_OPTIONS,
} from '../constants/analysisOptions'
import { defaultMockOrganization, mockOrganizationPresets } from '../mock/mockOrganizations'
import type {
  AnalysisFormState,
  MemberActivity,
  MockOrganizationPreset,
  OrganizationAnalysisResult,
} from '../types/analysis'
import { formatLastActivity } from '../utils/date/activityDate'
import { normalizeOrganizationInput } from '../utils/organizationInput'
import { analyzeMemberRisk } from '../utils/risk/riskAnalyzer'
import { calculateScoreBreakdown } from '../utils/score/scoreCalculator'

const MOCK_ANALYSIS_DELAY_MS = 1200
const ANALYSIS_REFERENCE_DATE = new Date('2026-05-12T12:00:00.000+09:00')

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

function getOptionLabel<TValue extends string>(
  options: { value: TValue; label: string }[],
  value: TValue,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}

function createAnalysisResult(
  preset: MockOrganizationPreset,
  formState: AnalysisFormState,
  organizationLogin: string,
  isFallback: boolean,
): OrganizationAnalysisResult {
  const members = preset.members.map<MemberActivity>((member) => {
    const scores = calculateScoreBreakdown(member, preset.members, ANALYSIS_REFERENCE_DATE)
    const riskAnalysis = analyzeMemberRisk(member, scores, ANALYSIS_REFERENCE_DATE)

    return {
      ...member,
      scores,
      riskAnalysis,
      riskLevel: riskAnalysis.level,
      lastActivity: formatLastActivity(member.lastActivityAt, ANALYSIS_REFERENCE_DATE),
      riskReasons: riskAnalysis.reasons,
    }
  })

  return {
    organization: {
      login: organizationLogin,
      displayName: isFallback ? organizationLogin : preset.organization.displayName,
      analysisPeriodLabel: getOptionLabel(
        ANALYSIS_PERIOD_OPTIONS,
        formState.analysisPeriod,
      ),
      repositoryCountLabel: getOptionLabel(
        REPOSITORY_COUNT_OPTIONS,
        formState.repositoryCount,
      ),
    },
    repositories: preset.repositories,
    members,
    totals: createTotals(members, preset.repositories.length),
    warningMessage: isFallback
      ? '데모 모드: 일치하는 프리셋이 없어 Git-Hunter가 대표 로컬 데이터를 사용했습니다.'
      : preset.warningMessage,
    generatedAt: ANALYSIS_REFERENCE_DATE.toISOString(),
  }
}

function createTotals(
  members: MemberActivity[],
  repositoryCount: number,
): OrganizationAnalysisResult['totals'] {
  const memberCount = members.length
  const riskUserCount = members.filter((member) => member.riskLevel !== 'stable').length
  const stableUserCount = members.filter((member) => member.riskLevel === 'stable').length
  const totalScore = members.reduce((sum, member) => sum + member.scores.total, 0)

  return {
    memberCount,
    repositoryCount,
    totalCommits: members.reduce((sum, member) => sum + member.commits, 0),
    totalPullRequests: members.reduce((sum, member) => sum + member.pullRequests, 0),
    riskUserCount,
    stableUserCount,
    averageTeamScore: memberCount > 0 ? Math.round(totalScore / memberCount) : 0,
    stableRate: memberCount > 0 ? Math.round((stableUserCount / memberCount) * 100) : 0,
    riskUserRate: memberCount > 0 ? Math.round((riskUserCount / memberCount) * 100) : 0,
  }
}

export async function runMockOrganizationAnalysis(
  formState: AnalysisFormState,
): Promise<OrganizationAnalysisResult> {
  await delay(MOCK_ANALYSIS_DELAY_MS)

  const organizationLogin = normalizeOrganizationInput(formState.organizationInput)

  if (!organizationLogin) {
    throw new Error('조직 이름이 필요합니다.')
  }

  const presetResult = mockOrganizationPresets[organizationLogin.toLowerCase()]
  const isFallback = !presetResult
  const preset = presetResult ?? defaultMockOrganization

  return createAnalysisResult(preset, formState, organizationLogin, isFallback)
}
