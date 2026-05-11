import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingView } from '../components/common/LoadingView'
import { WarningBanner } from '../components/common/WarningBanner'
import { PageContainer } from '../components/layout/PageContainer'
import { Badge } from '../components/ui/Badge'
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
        error instanceof Error ? error.message : '모의 분석 중 예상하지 못한 오류가 발생했습니다.'
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
            조직 활동 데이터를 발표용 협업 건강도 대시보드로 변환합니다.
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
        ) : (
          <section className="space-y-6">
            <WarningBanner message="스프린트 1은 GitHub API나 백엔드 서비스를 호출하지 않습니다." />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <p className="text-sm text-zinc-400">팀원</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">6</p>
              </Card>
              <Card>
                <p className="text-sm text-zinc-400">커밋</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">284</p>
              </Card>
              <Card>
                <p className="text-sm text-zinc-400">풀 리퀘스트</p>
                <p className="mt-2 text-3xl font-bold text-zinc-50">47</p>
              </Card>
              <Card tone="danger">
                <p className="text-sm text-red-300">위험 사용자</p>
                <p className="mt-2 text-3xl font-bold text-red-300">3</p>
              </Card>
            </div>

            <Card>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">스프린트 1 미리보기</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                    첫 번째 스프린트에서는 조직 입력부터 모의 결과 렌더링까지 데모 경로를 연결합니다.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">로딩</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">결과</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">빈 상태</span>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">오류</span>
                </div>
              </div>
            </Card>
          </section>
        )}
      </section>
    </PageContainer>
  )
}
