import type {
  AnalysisFormState,
  AnalysisPeriod,
  RepositoryCountOption,
} from '../types/analysis'

interface SelectOption<TValue extends string> {
  value: TValue
  label: string
}

export const ANALYSIS_PERIOD_OPTIONS: SelectOption<AnalysisPeriod>[] = [
  { value: 'last-30-days', label: '최근 30일' },
  { value: 'last-90-days', label: '최근 90일' },
  { value: 'this-semester', label: '이번 학기' },
]

export const REPOSITORY_COUNT_OPTIONS: SelectOption<RepositoryCountOption>[] = [
  { value: 'top-5', label: '상위 5개 리포지토리' },
  { value: 'top-10', label: '상위 10개 리포지토리' },
  { value: 'all', label: '전체 리포지토리' },
]

export const DEFAULT_ANALYSIS_FORM_STATE: AnalysisFormState = {
  organizationInput: 'kookmin-sw-team',
  analysisPeriod: 'last-30-days',
  repositoryCount: 'top-5',
  excludeForks: true,
  excludeArchived: true,
}
