# 컴포넌트 및 모듈 문서 - Git-Hunter

프로젝트 단위를 어떻게 분리하고 재사용하는지 기록한다.

## 분리 기준
- 공통 단위: `components/ui`, `components/layout`, `components/common`에 둔다.
- 기능 전용 단위: `features/analysis/components`에 둔다.
- Service/Application 단위: `services/analysisMockService.ts`처럼 use-case 기반 메서드를 노출한다.
- Repository/Adapter 단위: Sprint 1에서는 없음. 향후 GitHub API는 service 뒤 adapter/client로 추가한다.
- UI 또는 Presentation 단위: `pages`는 화면 조립과 route navigation만 담당한다.

## 계약 규칙
- Props 또는 입력 모델 규칙: 모든 컴포넌트 props는 명시적 TypeScript interface로 정의한다.
- 출력/result 모델 규칙: `OrganizationAnalysisResult`, `MemberActivity`, `RepositorySummary`를 중앙 타입으로 사용한다.
- 재사용 기준: primitive UI는 도메인 데이터를 알지 않는다. 분석 전용 UI는 `features/analysis` 안에서 소유한다.
- 소유 경계: mock 데이터는 service만 읽고 page/component는 service result만 사용한다.

## 프로필 메모

### React
- 컴포넌트 안에서 fetch/axios 호출을 직접 수행하지 않는다.
- 복잡한 상태 전이는 hook 또는 store action으로 분리한다.
- 공통 UI 컴포넌트와 기능 전용 컴포넌트를 분리한다.
- API 타입과 UI view model의 변환 위치를 명확히 둔다.

## Sprint 2 컴포넌트 계약

- `features/analysis/components/TeamHealthTable.tsx`는 계산된 팀원 점수와 활동 지표를 표로 표시한다.
- `TeamHealthTable.tsx`는 Activity, Collaboration, Consistency, Total Score를 직접 계산하지 않는다.
- `features/analysis/components/RiskReview.tsx`는 Watch 이상 사용자만 카드로 표시한다.
- `RiskReview.tsx`는 Risk Level, 위험 사유, 부족 요소, 마지막 활동 상태를 렌더링하지만 위험 사유를 직접 생성하지 않는다.
- `features/analysis/components/SummaryCards.tsx`는 service result의 집계값만 표시한다.
- `components/common/ErrorView.tsx`는 카드 기반 error 상태 UI를 제공한다.
- `services/analysisMockService.ts`는 mock preset을 분석 결과로 변환하는 service/use-case 경계다.
- `mock/mockOrganizations.ts`는 local mock scenario source data만 보유하며 UI에서 직접 import하지 않는다.
