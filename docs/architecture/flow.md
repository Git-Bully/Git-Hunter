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
