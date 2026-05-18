# 아키텍처 문서 - Git-Hunter

## 요약
깃허브 리포지토리의 기여도를 분석해주는 서비스 입니다.

## 기본 정보
- 스택: React
- 데이터베이스: 미지정
- 인증 사용: 미사용
- 외부 API 연동: 사용

## 계층 방향
- `pages`는 라우팅 단위 화면 조립과 navigation만 담당한다.
- `features/analysis`는 분석 기능 전용 UI 조각을 담당한다.
- `components`는 재사용 UI와 공통 상태 표시만 담당한다.
- `services`는 mock 분석 비동기 흐름과 향후 API 교체 경계를 담당한다.
- `mock`은 local preset 데이터만 보유하며 UI 컴포넌트에서 직접 import하지 않는다.
- `types`는 DTO/view model 성격의 frontend 계약을 중앙에서 정의한다.
- 권장 의존성 방향은 `Page -> Feature Component -> Service -> Mock`이다.
- UI 컴포넌트는 `services`, `mock`, router 객체를 직접 import하지 않는다.

## 프로필별 아키텍처 메모

### React
- page는 라우팅 단위 화면 조립을 담당한다.
- component는 재사용 가능한 UI와 표시 책임을 담당한다.
- hook은 화면 상태, 비동기 흐름, UI 유스케이스를 캡슐화한다.
- service는 API 호출과 외부 클라이언트 경계만 담당한다.
- store는 전역 상태를 담당하고 서버 응답 원본을 무분별하게 복제하지 않는다.
- 권장 흐름: Page -> Hook/Store -> Service -> API.

## 흐름 메모
- 데이터 흐름: Home page form state -> mock analysis service -> route state -> Result page render.
- 인증 흐름: Sprint 1에서는 인증 없음.
- API 흐름: Sprint 1에서는 내부/외부 API 호출 없음.
- 저장 흐름: Sprint 1에서는 DB와 persistent storage 없음. 새로고침 시 route state 결과는 사라질 수 있다.
- 외부 연동 흐름: GitHub API 연동 없음. 향후 실제 연동은 `services` 하위 client/adapter 경계에서 추가한다.

## 아키텍처 결정
| Date | Decision | Reason | Impact |
| --- | --- | --- | --- |
| 2026-05-11 | Sprint 1 결과 데이터는 React Router state로 전달 | 백엔드/저장소 없는 demo flow를 빠르게 검증 | 새로고침 시 결과가 없어질 수 있으며 Result empty state로 처리 |
| 2026-05-11 | Mock service를 UI와 분리 | 향후 GitHub API service로 교체 가능한 경계 확보 | Component는 API/mock 세부사항을 알지 않음 |

## Sprint 2 아키텍처 업데이트

- Git-Hunter는 Sprint 2에서도 frontend-only React MVP로 유지한다.
- backend, DB, OAuth, 실제 GitHub API 연동은 추가하지 않는다.
- mock preset은 계산 완료 결과가 아니라 raw 활동 지표를 보유한다.
- `services/analysisMockService.ts`는 mock source metric을 UI-facing `OrganizationAnalysisResult`로 변환하는 use-case 경계다.
- 점수 계산은 `git-hunter/src/utils/score`에 분리한다.
- 위험도 판정과 위험 사유 생성은 `git-hunter/src/utils/risk`에 분리한다.
- 마지막 활동일, 활동 공백 상태 같은 날짜 보조 로직은 `git-hunter/src/utils/date`에 분리한다.
- Result UI는 계산된 view model만 렌더링하며, page/component 내부에 점수 계산이나 risk 판정 로직을 두지 않는다.

## Sprint 3 아키텍처 업데이트

- Git-Hunter는 Sprint 3에서도 frontend-only React MVP로 유지하며 실제 GitHub API, backend, OAuth, DB를 추가하지 않는다.
- Recharts를 chart rendering library로 사용한다.
- `services/analysisMockService.ts`는 mock preset의 raw 활동 지표와 timeline 데이터를 `OrganizationAnalysisResult`로 변환한다.
- `git-hunter/src/utils/analytics`는 score aggregation, team distribution, risk distribution, repository insight, timeline fallback 생성을 담당한다.
- `git-hunter/src/utils/chart`는 `OrganizationAnalysisResult`를 dashboard chart dataset으로 변환하는 경계다.
- `features/analysis/components/charts`는 Recharts 기반 presentation component만 보유하고 score/risk/repository 분석 로직을 직접 계산하지 않는다.
- Result dashboard 흐름은 `ResultPage -> createDashboardChartDataset -> DashboardCharts/RepositoryInsights`로 구성한다.
- Chart 색상은 `constants/chartTheme.ts`에서 Risk Level 및 repository activity level과 일관되게 관리한다.
