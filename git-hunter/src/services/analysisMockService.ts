import {
  ANALYSIS_PERIOD_OPTIONS,
  REPOSITORY_COUNT_OPTIONS,
} from '../constants/analysisOptions'
import { defaultMockOrganization, mockOrganizationPresets } from '../mock/mockOrganizations'
import type {
  AnalysisFormState,
  OrganizationAnalysisResult,
  RiskLevel,
} from '../types/analysis'
import { normalizeOrganizationInput } from '../utils/organizationInput'

const MOCK_ANALYSIS_DELAY_MS = 1200

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

function countRiskUsers(result: OrganizationAnalysisResult): number {
  return result.members.filter((member) => member.riskLevel !== 'stable').length
}

function getOptionLabel<TValue extends string>(
  options: { value: TValue; label: string }[],
  value: TValue,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}

function mapFallbackRiskLevel(totalScore: number): RiskLevel {
  if (totalScore < 40) {
    return 'risk'
  }

  if (totalScore < 70) {
    return 'watch'
  }

  return 'stable'
}

function createFallbackResult(formState: AnalysisFormState): OrganizationAnalysisResult {
  const organizationLogin = normalizeOrganizationInput(formState.organizationInput)
  const clonedResult: OrganizationAnalysisResult = structuredClone(defaultMockOrganization)
  const riskLevel = mapFallbackRiskLevel(clonedResult.members[0]?.scores.total ?? 80)

  return {
    ...clonedResult,
    organization: {
      login: organizationLogin,
      displayName: organizationLogin,
      analysisPeriodLabel: getOptionLabel(
        ANALYSIS_PERIOD_OPTIONS,
        formState.analysisPeriod,
      ),
      repositoryCountLabel: getOptionLabel(
        REPOSITORY_COUNT_OPTIONS,
        formState.repositoryCount,
      ),
    },
    members: clonedResult.members.map((member, index) => ({
      ...member,
      riskLevel: index === 0 ? riskLevel : member.riskLevel,
    })),
    warningMessage:
      '데모 모드: 일치하는 프리셋이 없어 Git-Hunter가 대체 모의 데이터를 사용했습니다.',
    generatedAt: new Date().toISOString(),
  }
}

export async function runMockOrganizationAnalysis(
  formState: AnalysisFormState,
): Promise<OrganizationAnalysisResult> {
  await delay(MOCK_ANALYSIS_DELAY_MS)

  const organizationLogin = normalizeOrganizationInput(formState.organizationInput)

  if (!organizationLogin) {
    throw new Error('조직 입력값이 필요합니다.')
  }

  const presetResult = mockOrganizationPresets[organizationLogin.toLowerCase()]
  const result = presetResult ? structuredClone(presetResult) : createFallbackResult(formState)

  return {
    ...result,
    totals: {
      ...result.totals,
      riskUserCount: countRiskUsers(result),
    },
  }
}
