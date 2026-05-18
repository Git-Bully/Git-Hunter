import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorView } from '../components/common/ErrorView'
import { LoadingView } from '../components/common/LoadingView'
import { WarningBanner } from '../components/common/WarningBanner'
import { PageContainer } from '../components/layout/PageContainer'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { DEFAULT_ANALYSIS_FORM_STATE } from '../constants/analysisOptions'
import { AnalysisForm } from '../features/analysis/components/AnalysisForm'
import { runMockOrganizationAnalysis } from '../services/analysisMockService'
import type { AnalysisFormState } from '../types/analysis'
import { validateOrganizationInput } from '../utils/organizationInput'

export function HomePage() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<AnalysisFormState>(
    DEFAULT_ANALYSIS_FORM_STATE,
  )
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationErrorMessage = useMemo(
    () => validateOrganizationInput(formState.organizationInput),
    [formState.organizationInput],
  )
  const visibleErrorMessage = submitErrorMessage ?? validationErrorMessage

  async function handleAnalyze() {
    const nextValidationErrorMessage = validateOrganizationInput(
      formState.organizationInput,
    )

    if (nextValidationErrorMessage) {
      setSubmitErrorMessage(nextValidationErrorMessage)
      return
    }

    setSubmitErrorMessage(null)
    setIsSubmitting(true)

    try {
      const analysisResult = await runMockOrganizationAnalysis(formState)
      navigate('/result', {
        state: {
          analysisResult,
        },
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '모의 분석 중 예상하지 못한 오류가 발생했습니다.'
      setSubmitErrorMessage(message)
      setIsSubmitting(false)
    }
  }

  function handleFormChange(nextFormState: AnalysisFormState) {
    setFormState(nextFormState)
    setSubmitErrorMessage(null)
  }

  return (
    <PageContainer>
      <header className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            GitHub 협업 건강도 분석기
          </p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-50">Git-Hunter</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            조직 활동 신호를 발표 가능한 건강도 점수, 위험도, 검토 문구로 변환합니다.
          </p>
        </div>
        <Badge variant="watch">데모 모드 / 모의 데이터</Badge>
      </header>

      <section className="grid flex-1 gap-6 lg:grid-cols-[420px_1fr]">
        <AnalysisForm
          errorMessage={visibleErrorMessage}
          formState={formState}
          isSubmitting={isSubmitting}
          onChange={handleFormChange}
          onSubmit={handleAnalyze}
        />

        {isSubmitting ? (
          <LoadingView />
        ) : submitErrorMessage ? (
          <ErrorView
            action={<Button onClick={handleAnalyze}>다시 분석</Button>}
            message={submitErrorMessage}
          />
        ) : (
          <section className="space-y-6">
            <WarningBanner message="스프린트 2는 여전히 로컬 모의 데이터만 사용합니다. 실제 GitHub API, OAuth, 백엔드, 저장소는 구현 범위가 아닙니다." />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <p className="text-sm text-zinc-400">점수 모델</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">4</p>
                <p className="mt-1 text-xs text-zinc-500">활동, 협업, 지속성, 총점</p>
              </Card>
              <Card>
                <p className="text-sm text-zinc-400">위험 단계</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">4</p>
                <p className="mt-1 text-xs text-zinc-500">안정부터 심각까지</p>
              </Card>
              <Card>
                <p className="text-sm text-zinc-400">모의 데이터</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">6</p>
                <p className="mt-1 text-xs text-zinc-500">정상, 몰빵, 협업 부족, 유령, 공백</p>
              </Card>
              <Card tone="danger">
                <p className="text-sm text-red-300">외부 API</p>
                <p className="mt-2 text-3xl font-bold text-red-300">0</p>
                <p className="mt-1 text-xs text-red-200/70">스프린트 2에서는 GitHub 호출 없음</p>
              </Card>
            </div>

            <Card>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">스프린트 2 미리보기</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                    결과 화면은 원본 활동 지표를 점수로 계산하고, 관찰/위험/심각 사용자가 왜 표시됐는지 설명합니다.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">점수 분해</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">위험 사유</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">밀도 높은 표</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">모의 데이터 경고</span>
                </div>
              </div>
            </Card>
          </section>
        )}
      </section>
    </PageContainer>
  )
}
