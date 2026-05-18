# 흐름 문서 - Git-Hunter

주요 기능 흐름을 단계별로 기록한다.

## 흐름 템플릿
### Flow Name
- Actor:
- Entry point:
- Preconditions:
- Steps:
- Validation:
- Empty state:
- Error state:
- Permission behavior:
- Retry or recovery:
- Side effects:
- Related API:
- Related DB tables:

## Sprint 1 Analyze Flow
- Actor: 발표/데모 사용자
- Entry point: `/` Home page
- Preconditions: 브라우저에서 React app이 실행 중이어야 한다.
- Steps:
  1. 사용자가 organization 이름 또는 GitHub organization URL을 입력한다.
  2. 사용자가 분석 기간, repository 개수, fork/archived 제외 옵션을 선택한다.
  3. Home page가 organization 입력값을 검증한다.
  4. Analyze 클릭 시 loading UI를 표시한다.
  5. `runMockOrganizationAnalysis`가 local mock preset 또는 fallback mock result를 반환한다.
  6. Home page가 React Router state에 결과를 담아 `/result`로 이동한다.
  7. Result page가 summary cards, repository list, team table, warning banner를 렌더링한다.
- Validation: 빈 값, 잘못된 GitHub organization name 또는 URL을 막는다.
- Empty state: `/result`에 route state가 없으면 empty state와 Home 이동 버튼을 표시한다.
- Error state: mock service 실패 시 Home page form에 error message를 표시한다.
- Permission behavior: Sprint 1에서는 인증/권한 없음.
- Retry or recovery: 사용자는 Home으로 돌아가 다시 분석할 수 있다.
- Side effects: 외부 API 호출, DB 저장, localStorage 저장 없음.
- Related API: 없음.
- Related DB tables: 없음.

## Sprint 2 Analyze Flow

- Actor: 발표/데모 사용자
- Entry point: `/` Home page
- Preconditions: 브라우저에서 React app이 실행 중이어야 하며, 분석은 local mock preset만 사용한다.
- Steps:
  1. 사용자가 organization 이름 또는 GitHub organization URL을 입력한다.
  2. Home page가 organization 입력값을 검증한다.
  3. Analyze 클릭 시 loading UI를 표시한다.
  4. `runMockOrganizationAnalysis`가 organization 이름에 맞는 mock preset을 선택한다.
  5. preset이 없으면 기본 fallback preset을 사용하고 mock warning message를 반환한다.
  6. service가 raw member activity metric을 기반으로 Activity Score, Collaboration Score, Consistency Score, Total Health Score를 계산한다.
  7. service가 총 점수, 최근 활동 부족, 협업 참여 부족, repository 편중, 활동 공백을 기반으로 Risk Level과 Risk Reason을 생성한다.
  8. Home page가 React Router state에 `OrganizationAnalysisResult`를 담아 `/result`로 이동한다.
  9. Result page가 summary cards, team table, repository list, risk review, warning banner를 렌더링한다.
- Validation: 빈 값, 잘못된 GitHub organization name 또는 URL을 막는다.
- Empty state: `/result`에 route state가 없으면 card 기반 empty state와 Home 이동 버튼을 표시한다.
- Error state: mock service 실패 시 card 기반 `ErrorView`와 retry button을 표시한다.
- Permission behavior: Sprint 2에서는 인증/권한 없음.
- Retry or recovery: 사용자는 retry button 또는 Home 이동 후 다시 분석할 수 있다.
- Side effects: 외부 API 호출, DB 저장, localStorage 저장 없음.
- Related API: 없음.
- Related DB tables: 없음.
