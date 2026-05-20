import { useEffect, useMemo, useState } from 'react'
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
import type { AnalysisFormState, LoadingState } from '../types/analysis'
import { validateOrganizationInput } from '../utils/organizationInput'

const ANALYSIS_LOADING_STEPS = [
  '리포지토리 활동 신호 수집',
  '협업 점수 계산',
  '위험 사용자 후보 검토',
  '대시보드 차트 구성',
]

const INITIAL_LOADING_STATE: LoadingState = {
  stepIndex: 0,
  label: ANALYSIS_LOADING_STEPS[0],
  progress: 18,
}

export function HomePage() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<AnalysisFormState>(
    DEFAULT_ANALYSIS_FORM_STATE,
  )
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingState, setLoadingState] =
    useState<LoadingState>(INITIAL_LOADING_STATE)

  const validationErrorMessage = useMemo(
    () => validateOrganizationInput(formState.organizationInput),
    [formState.organizationInput],
  )
  const visibleErrorMessage = submitErrorMessage ?? validationErrorMessage

  useEffect(() => {
    if (!isSubmitting) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setLoadingState((currentLoadingState) => {
        const nextStepIndex = Math.min(
          currentLoadingState.stepIndex + 1,
          ANALYSIS_LOADING_STEPS.length - 1,
        )

        return {
          stepIndex: nextStepIndex,
          label: ANALYSIS_LOADING_STEPS[nextStepIndex],
          progress: Math.min(currentLoadingState.progress + 24, 94),
        }
      })
    }, 420)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isSubmitting])

  async function handleAnalyze() {
    const nextValidationErrorMessage = validateOrganizationInput(
      formState.organizationInput,
    )

    if (nextValidationErrorMessage) {
      setSubmitErrorMessage(nextValidationErrorMessage)
      return
    }

    setSubmitErrorMessage(null)
    setLoadingState(INITIAL_LOADING_STATE)
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
          <LoadingView
            activeStepLabel={loadingState.label}
            progressValue={loadingState.progress}
            steps={ANALYSIS_LOADING_STEPS}
          />
        ) : submitErrorMessage ? (
          <ErrorView
            action={<Button onClick={handleAnalyze}>다시 분석</Button>}
            details={[
              'Healthy Team, Burnout Team 같은 빠른 시나리오를 선택할 수 있습니다.',
              '임의 조직명은 fallback mock dataset으로 분석됩니다.',
            ]}
            message={submitErrorMessage}
          />
        ) : (
          <section className="space-y-6">
            <WarningBanner message="현재 MVP는 로컬 모의 데이터만 사용합니다. 실제 GitHub API, OAuth, 백엔드, 저장소는 구현 범위가 아닙니다." />

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
                <p className="text-sm text-zinc-400">차트 뷰</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">4</p>
                <p className="mt-1 text-xs text-zinc-500">점수, 위험도, 리포지토리, timeline</p>
              </Card>
              <Card tone="danger">
                <p className="text-sm text-red-300">외부 API</p>
                <p className="mt-2 text-3xl font-bold text-red-300">0</p>
                <p className="mt-1 text-xs text-red-200/70">MVP에서는 GitHub 호출 없음</p>
              </Card>
            </div>

            <Card>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">대시보드 미리보기</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                    결과 화면은 원본 활동 지표를 점수와 위험도, 리포지토리 인사이트, 발표용 차트로 변환합니다.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">점수 분해</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">위험도 분포</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">리포지토리 분석</span>
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
