# 디렉토리 문서 - Git-Hunter

이 파일은 현재 프로젝트 구조를 설명하는 기준 문서다.

## 현재 구조
| Path | Type | Responsibility | Owner | Notes |
| --- | --- | --- | --- | --- |
| `git-hunter` | directory | Vite React frontend app | Frontend | 실제 실행/빌드 대상 앱 |
| `git-hunter/src/App.tsx` | file | React router 진입점 연결 | Frontend | `AppRouter`만 조립 |
| `git-hunter/src/main.tsx` | file | React root mount | Frontend | 전역 CSS import |
| `git-hunter/src/router` | directory | Route table | Frontend routing | `/`, `/result`, fallback route 정의 |
| `git-hunter/src/pages` | directory | 라우팅 단위 화면 조립 | Presentation | Home, Result, NotFound page |
| `git-hunter/src/components/ui` | directory | 재사용 UI primitives | Shared UI | Button, Input, Card, Badge |
| `git-hunter/src/components/layout` | directory | 페이지 레이아웃 컴포넌트 | Shared UI | PageContainer, SectionTitle |
| `git-hunter/src/components/common` | directory | 상태/공통 표시 컴포넌트 | Shared UI | LoadingView, EmptyState, WarningBanner |
| `git-hunter/src/features/analysis` | directory | 분석 기능 전용 UI module | Analysis feature | form, summary, repository list, team table |
| `git-hunter/src/mock` | directory | local mock dataset | Mock data | GitHub API를 호출하지 않는 preset |
| `git-hunter/src/services` | directory | service boundary | Service | mock analysis async flow |
| `git-hunter/src/types` | directory | 중앙 타입 계약 | Types | 분석 result/form/risk 타입 |
| `git-hunter/src/utils` | directory | 순수 유틸리티 | Shared utility | className 조합, organization 입력 검증 |
| `git-hunter/src/constants` | directory | UI/service 공통 상수 | Shared constants | form option과 기본값 |
| `docs/architecture` | directory | 프로젝트 명세 | Documentation | 구조, 흐름, 상태 문서 |
| `.codex/ref_docs` | directory | 사용자 참고자료 | External reference | 프로젝트 명세 생성 위치로 사용하지 않음 |

## Sprint 2 디렉토리 추가/변경

| Path | Type | Responsibility | Owner | Notes |
| --- | --- | --- | --- | --- |
| `git-hunter/src/utils/score` | directory | 점수 계산 및 normalization | Analysis utility | Activity, Collaboration, Consistency, Total Score 계산 |
| `git-hunter/src/utils/risk` | directory | 위험도 판정 및 위험 사유 생성 | Analysis utility | Stable, Watch, Risk, Critical 판정 |
| `git-hunter/src/utils/date` | directory | 활동일 관련 날짜 보조 함수 | Shared utility | 마지막 활동 표시, inactivity 상태 계산 |
| `git-hunter/src/features/analysis/components/RiskReview.tsx` | file | 위험 사용자 리뷰 UI | Analysis feature | Watch 이상 사용자만 카드로 표시 |
| `git-hunter/src/components/common/ErrorView.tsx` | file | 카드 기반 error UI | Shared UI | 분석 실패 및 retry UI 표시 |
| `git-hunter/src/constants/riskLabels.ts` | file | Risk Level 표시 라벨 | Shared constants | service와 UI의 역방향 의존 방지 |

## Sprint 3 디렉토리 추가/변경

| Path | Type | Responsibility | Owner | Notes |
| --- | --- | --- | --- | --- |
| `git-hunter/src/constants/chartTheme.ts` | file | chart 색상과 surface token | Shared constants | Risk Level 및 repository activity 색상 일관성 유지 |
| `git-hunter/src/utils/analytics` | directory | dashboard analytics transform | Analysis utility | score aggregation, distribution, repository insight, timeline fallback |
| `git-hunter/src/utils/chart` | directory | chart dataset assembly | Analysis utility | service result를 chart component 입력으로 변환 |
| `git-hunter/src/features/analysis/components/DashboardCharts.tsx` | file | dashboard chart section 조립 | Analysis feature | 개별 chart component에 dataset 전달 |
| `git-hunter/src/features/analysis/components/RepositoryInsights.tsx` | file | repository insight summary UI | Analysis feature | 가장 활발한 repository, 저활동 repository, 편중, 분산도 표시 |
| `git-hunter/src/features/analysis/components/charts` | directory | Recharts presentation components | Analysis feature | Team score, risk distribution, repository contribution, activity timeline |
| `git-hunter/src/components/common/LoadingView.tsx` | file | dashboard loading skeleton | Shared UI | chart skeleton 형태 포함 |

## Sprint 4 디렉토리 추가/변경

| Path | Type | Responsibility | Owner | Notes |
| --- | --- | --- | --- | --- |
| `git-hunter/src/constants/analysisScenarios.ts` | file | 발표용 mock scenario label, alias, preset mapping | Shared constants | UI는 scenario metadata만 사용하고 mock source data는 import하지 않음 |
| `git-hunter/src/utils/table` | directory | table interaction utility | Shared utility | Team Table 정렬 비교 로직 분리 |
| `git-hunter/src/utils/table/memberTableSorting.ts` | file | `MemberActivity` table sort transform | Shared utility | `TableSortState` 기반 정렬 |
| `git-hunter/src/components/common/WarningBanner.tsx` | file | demo/mock warning banner | Shared UI | Demo Mode, Mock Data, GitHub API 미연동 표시 강화 |
| `git-hunter/src/components/common/EmptyState.tsx` | file | empty state placeholder | Shared UI | result empty 상태 dashboard placeholder 표시 |
| `git-hunter/src/components/common/ErrorView.tsx` | file | error state card | Shared UI | recovery copy와 retry action 표시 |
