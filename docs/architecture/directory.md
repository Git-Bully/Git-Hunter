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
