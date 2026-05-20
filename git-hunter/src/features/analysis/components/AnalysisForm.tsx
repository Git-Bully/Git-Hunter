import type { ChangeEvent, FormEvent } from 'react'
import {
  ANALYSIS_PERIOD_OPTIONS,
  REPOSITORY_COUNT_OPTIONS,
} from '../../../constants/analysisOptions'
import { ANALYSIS_SCENARIOS } from '../../../constants/analysisScenarios'
import type {
  AnalysisFormState,
  AnalysisPeriod,
  RepositoryCountOption,
} from '../../../types/analysis'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'

interface AnalysisFormProps {
  errorMessage: string | null
  formState: AnalysisFormState
  isSubmitting: boolean
  onChange: (formState: AnalysisFormState) => void
  onSubmit: () => void
}

export function AnalysisForm({
  errorMessage,
  formState,
  isSubmitting,
  onChange,
  onSubmit,
}: AnalysisFormProps) {
  function updateFormState(nextFormState: Partial<AnalysisFormState>) {
    onChange({
      ...formState,
      ...nextFormState,
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
    updateFormState({
      analysisPeriod: event.target.value as AnalysisPeriod,
    })
  }

  function handleRepositoryCountChange(event: ChangeEvent<HTMLSelectElement>) {
    updateFormState({
      repositoryCount: event.target.value as RepositoryCountOption,
    })
  }

  return (
    <Card className="h-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">조직 분석</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            모의 시나리오 이름 또는 GitHub 조직 URL을 입력하세요. 실제 GitHub API는
            호출하지 않습니다.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-300">빠른 시나리오</p>
          <div className="mt-3 grid gap-2">
            {ANALYSIS_SCENARIOS.map((scenario) => (
              <button
                className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-left transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
                key={scenario.id}
                onClick={() =>
                  updateFormState({
                    organizationInput: scenario.id,
                  })
                }
                type="button"
              >
                <span className="block text-sm font-semibold text-zinc-100">
                  {scenario.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-zinc-500">
                  {scenario.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          autoComplete="off"
          errorMessage={errorMessage}
          id="organizationInput"
          label="조직"
          onChange={(event) =>
            updateFormState({
              organizationInput: event.target.value,
            })
          }
          placeholder="kookmin-sw-team 또는 github.com/kookmin-sw-team"
          value={formState.organizationInput}
        />

        <label className="block" htmlFor="analysisPeriod">
          <span className="text-sm font-medium text-zinc-300">분석 기간</span>
          <select
            className="mt-2 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-300"
            id="analysisPeriod"
            onChange={handlePeriodChange}
            value={formState.analysisPeriod}
          >
            {ANALYSIS_PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block" htmlFor="repositoryCount">
          <span className="text-sm font-medium text-zinc-300">리포지토리 개수</span>
          <select
            className="mt-2 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none transition-colors focus:border-emerald-300"
            id="repositoryCount"
            onChange={handleRepositoryCountChange}
            value={formState.repositoryCount}
          >
            {REPOSITORY_COUNT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-3 text-sm text-zinc-300">
          <label className="flex items-center gap-3">
            <input
              checked={formState.excludeForks}
              className="h-4 w-4 accent-emerald-400"
              onChange={(event) =>
                updateFormState({
                  excludeForks: event.target.checked,
                })
              }
              type="checkbox"
            />
            포크 제외
          </label>
          <label className="flex items-center gap-3">
            <input
              checked={formState.excludeArchived}
              className="h-4 w-4 accent-emerald-400"
              onChange={(event) =>
                updateFormState({
                  excludeArchived: event.target.checked,
                })
              }
              type="checkbox"
            />
            보관된 리포지토리 제외
          </label>
        </div>

        <Button
          className="w-full"
          disabled={Boolean(errorMessage) || isSubmitting}
          type="submit"
        >
          {isSubmitting ? '분석 중...' : '분석하기'}
        </Button>
      </form>
    </Card>
  )
}
