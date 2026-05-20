# Git-Hunter Frontend MVP TODO

> Frontend-Only React MVP  
> Stack: React + TypeScript + Vite + Tailwind CSS  
> 목표: 발표 가능한 수준의 GitHub 협업 분석 프로토타입 완성

> 작업 관리 기준: 이 파일을 TODO 관리 문서로 사용한다. 루트 `TODO.md`는 사용하지 않는다.

---

# Sprint 1 완료 기록

- [x] React Router 의존성 추가
- [x] React Router 설정
- [x] 기본 라우트 구성 (`/`, `/result`, fallback)
- [x] 확장 가능한 frontend 폴더 구조 생성
- [x] 중앙 타입 정의 생성
- [x] mock organization preset 데이터 생성
- [x] mock analysis service 구현
- [x] 재사용 UI 컴포넌트 구현 (`Button`, `Input`, `Card`, `Badge`, `PageContainer`, `SectionTitle`)
- [x] Home page 입력 폼 구현
- [x] Home page validation 구현
- [x] Analyze 클릭 시 fake loading 표시
- [x] Analyze 결과를 Result page로 전달
- [x] Result page summary cards 구현
- [x] Result page repository list 구현
- [x] Result page team table 구현
- [x] Demo Mode / Mock Data warning banner 구현
- [x] Result page empty state 구현
- [x] 웹사이트 노출 문구 한글화
- [x] Sprint 1 관련 architecture/state/flow/component/directory 문서 업데이트
- [x] `npm run build` 성공 확인
- [x] `npm run lint` 성공 확인

---

# 0. 프로젝트 초기 세팅

- [x] Vite + React + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설정
- [ ] ESLint / Prettier 설정
- [ ] 절대 경로 alias 설정 (`@/`)
- [x] 폴더 구조 설계
- [ ] 환경 변수 구조 정의
- [x] 다크 UI 기본 구조 추가
- [x] 공통 디자인 토큰 정의
- [x] mock 데이터 디렉토리 생성
- [x] sample organization preset 추가

---

# 1. 프로젝트 구조 설계

## 1.1 기본 디렉토리 구조

- [x] `components/`
- [x] `pages/`
- [ ] `layouts/`
- [x] `features/`
- [x] `services/`
- [x] `mock/`
- [x] `types/`
- [x] `utils/`
- [x] `constants/`
- [ ] `hooks/`

---

# 2. 타입 시스템 정의

## 2.1 Core Types

- [x] OrganizationAnalysisResult 타입 정의
- [x] RepositorySummary 타입 정의
- [x] MemberActivity 타입 정의
- [x] RiskLevel 타입 정의
- [x] RiskReason 타입 정의
- [x] ScoreBreakdown 타입 정의
- [x] AnalysisStatus 타입 정의

---

## 2.2 상태 타입 정의

- [x] Loading State 타입
- [x] Error State 타입
- [x] Warning State 타입
- [x] Empty State 타입

---

# 3. Mock 데이터 시스템

## 3.1 Mock Dataset 설계

- [x] organization preset 데이터 생성
- [x] 정상 협업 팀 시나리오 생성
- [x] 협업 부족 팀 시나리오 생성
- [x] 특정 인원 몰빵 시나리오 생성
- [x] 활동 공백 시나리오 생성
- [x] 위험 사용자 포함 시나리오 생성

---

## 3.2 Mock Service

- [x] mock 분석 service 구현
- [x] organization 이름 기반 preset 매핑
- [x] loading delay 시뮬레이션
- [ ] random fallback 데이터 생성
- [x] fallback mock 데이터 생성
- [x] mock warning 메시지 반환

---

# 4. 점수 계산 로직

## 4.1 Activity Score

- [x] commit 기반 점수 계산
- [x] PR 기반 점수 계산
- [x] 활동 repository 수 계산
- [x] 활동량 normalization 처리

---

## 4.2 Collaboration Score

- [x] review 활동 반영
- [x] issue 참여 반영
- [x] PR 상호작용 반영
- [x] repository 분산도 계산

---

## 4.3 Consistency Score

- [x] 활동 지속성 계산
- [x] 최근 활동 반영
- [x] 활동 공백 감점 처리
- [x] 주기적 활동 보정

---

## 4.4 Total Score

- [x] 가중치 계산 구현
- [x] 0~100 범위 clamp 처리
- [x] score rounding 처리

---

# 5. Risk 분석 시스템

## 5.1 Risk Level 계산

- [x] Stable 조건 정의
- [x] Watch 조건 정의
- [x] Risk 조건 정의
- [x] Critical 조건 정의

---

## 5.2 Risk Reason 생성

- [x] 최근 활동 부족 탐지
- [x] 협업 부족 탐지
- [x] repository 편중 탐지
- [x] 활동 공백 탐지
- [x] 낮은 총 점수 탐지

---

# 6. 라우팅 구성

- [x] React Router 설치
- [x] Home 페이지 생성
- [x] Result 페이지 생성
- [x] Not Found 페이지 생성

---

# 7. 입력 페이지 구현

## 7.1 입력 폼

- [x] organization 입력 필드
- [x] GitHub URL 파싱 처리
- [x] 분석 기간 선택
- [x] repository 개수 선택
- [x] fork 제외 옵션
- [x] archived 제외 옵션

---

## 7.2 Validation

- [x] 빈 입력 validation
- [x] GitHub organization 형식 validation
- [x] URL validation
- [x] 에러 메시지 UI 구현

---

## 7.3 Analyze Flow

- [x] Analyze 버튼 구현
- [x] loading 상태 전환
- [x] 결과 페이지 이동
- [x] mock service 연결

---

# 8. 결과 페이지 구현

## 8.1 Summary Cards

- [x] 총 멤버 수 카드
- [x] repository 수 카드
- [x] 총 commit 수 카드
- [x] 총 PR 수 카드
- [x] 위험 사용자 수 카드

---

## 8.2 Repository 목록

- [x] repository 리스트 UI
- [x] activity badge 표시
- [x] archived/fork badge 처리
- [x] scroll 처리

---

## 8.3 팀원 점수 테이블

- [x] member row UI
- [x] score badge UI
- [x] risk badge UI
- [ ] sortable column 처리
- [x] hover interaction 추가

---

## 8.4 Risk Review 영역

- [x] Watch 이상 사용자 필터링
- [x] 위험 사유 표시
- [x] 부족 요소 표시
- [x] risk card UI 구현

---

# 9. 상태 UI 구현

## 9.1 Loading

- [x] skeleton UI 구현
- [x] spinner 구현
- [ ] loading overlay 구현

---

## 9.2 Empty

- [x] empty state illustration
- [x] empty message UI

---

## 9.3 Error

- [x] error card UI
- [x] retry button 구현
- [x] fallback warning 표시

---

## 9.4 Warning

- [x] mock/fallback warning banner
- [x] demo mode badge 추가

---

# 10. 시각화 요소

## 10.1 Charts

- [ ] 팀 평균 점수 차트
- [ ] activity distribution chart
- [ ] risk level distribution chart
- [ ] repository contribution chart

---

## 10.2 시각화 라이브러리

- [ ] Recharts 또는 Chart.js 선택
- [ ] chart theme 적용
- [ ] responsive chart 처리

---

# 11. 공통 컴포넌트

## 11.1 UI Components

- [x] Button
- [x] Input
- [ ] Select
- [ ] Checkbox
- [x] Card
- [ ] Table
- [x] Badge
- [ ] Modal
- [ ] Tooltip

---

## 11.2 상태 컴포넌트

- [x] LoadingView
- [x] ErrorView
- [x] EmptyView
- [x] WarningBanner

---

# 12. 디자인 시스템

## 12.1 Theme

- [x] color palette 정의
- [x] risk level 색상 정의
- [x] typography 설정
- [x] spacing 규칙 정의

---

## 12.2 다크모드

- [ ] dark mode toggle
- [ ] localStorage 저장
- [ ] chart dark theme 대응

---

# 13. 발표용 UX 개선

- [x] 큰 화면 기준 spacing 조정
- [x] 발표용 대비 강화
- [x] 핵심 위험 사용자 강조
- [x] summary section 시각 강화
- [x] 애니메이션 최소 추가
- [x] card hover 효과 추가

---

# 14. 유지보수성 작업

- [x] utility 함수 분리
- [x] constants 중앙화
- [x] reusable component 정리
- [x] mock 데이터와 UI 분리
- [x] feature 단위 구조 정리

---

# 15. 향후 API 연동 대비

- [x] API response interface 정의
- [x] service abstraction 적용
- [ ] fetch layer 분리
- [x] mock ↔ real API 교체 가능 구조 유지

---

# 16. 최종 QA

## 16.1 기능 검증

- [x] organization 입력 가능
- [x] 결과 렌더링 가능
- [x] 점수 계산 정상 동작
- [x] 위험 레벨 표시 정상 동작
- [x] warning 상태 정상 동작
- [x] error 상태 정상 동작

---

## 16.2 UI 검증

- [x] desktop 해상도 확인
- [x] overflow 문제 확인
- [x] table 가독성 확인
- [x] chart 정상 렌더링 확인

---

## 16.3 Build 검증

- [x] TypeScript build 성공
- [x] Vite production build 성공
- [x] lint 통과
- [x] unused import 제거

---

# 17. MVP 종료 조건

- [x] organization 입력 가능
- [x] mock 분석 가능
- [x] 결과 페이지 완성
- [x] 위험 사용자 표시 가능
- [x] 발표 가능한 UI 완성
- [x] fallback/demo 흐름 안정화
- [x] React production build 성공

---

# Sprint 2 완료 기록

> Sprint 2 범위는 frontend-only MVP 기준으로 구현한다. 실제 GitHub API, backend, DB, OAuth, PDF export, chart library, advanced filtering/sorting, dark mode toggle, local persistence, Zustand/Redux, server state library는 구현하지 않는다.

## 1. 점수 계산 시스템

- [x] Activity Score 계산 로직 구현
- [x] commit 수 기반 활동량 점수 반영
- [x] PR 수 기반 활동량 점수 반영
- [x] 활동 repository 수 기반 점수 반영
- [x] 지나치게 큰 값 방지를 위한 soft-cap normalization 구현
- [x] 특정 사용자 독주 완화를 위한 팀 기준 normalization 구현
- [x] 0~100 clamp 처리 구현
- [x] score rounding 규칙 통일
- [x] Collaboration Score 계산 로직 구현
- [x] review 활동 반영
- [x] issue 참여 반영
- [x] PR interaction 반영
- [x] repository 분산도 반영
- [x] review 없는 사용자 감점 처리
- [x] repository 편중 사용자 감점 처리
- [x] Consistency Score 계산 로직 구현
- [x] 마지막 활동일 반영
- [x] 장기간 inactivity 감점 처리
- [x] 지속적 활동 사용자 가산 반영
- [x] Total Health Score 가중치 계산 구현
- [x] Activity 45%, Collaboration 30%, Consistency 25% 가중치 적용

## 2. Risk 분석 시스템

- [x] Stable risk level 판정 구현
- [x] Watch risk level 판정 구현
- [x] Risk risk level 판정 구현
- [x] Critical risk level 판정 구현
- [x] 총 점수 기반 risk 판정 반영
- [x] 최근 활동 부족 기반 risk 판정 반영
- [x] 협업 참여 부족 기반 risk 판정 반영
- [x] repository 편중 기반 risk 판정 반영
- [x] 활동 공백 기반 risk 판정 반영
- [x] 사람이 읽을 수 있는 Risk Reason 생성 구현
- [x] 최근 활동 부족 사유 생성
- [x] PR 참여 없음 사유 생성
- [x] review 활동 부족 사유 생성
- [x] 특정 repository 편중 사유 생성
- [x] 활동 공백 감지 사유 생성

## 3. Mock 데이터 개선

- [x] 정상 팀 preset 구현
- [x] 특정 인원 몰빵 팀 preset 구현
- [x] 협업 부족 팀 preset 구현
- [x] 유령 팀원 포함 팀 preset 구현
- [x] 활동 공백 팀 preset 구현
- [x] mock 데이터를 계산 로직과 연결 가능한 raw activity metrics 구조로 개선
- [x] 발표용으로 설명 가능한 현실적 수치 적용
- [x] fallback mock 데이터 흐름 유지
- [x] demo/mock warning 메시지 유지

## 4. Result Page 강화

- [x] Team Table에 Activity Score 컬럼 추가
- [x] Team Table에 Collaboration Score 컬럼 추가
- [x] Team Table에 Consistency Score 컬럼 추가
- [x] Team Table에 PR 수 컬럼 추가
- [x] Team Table에 Review 수 컬럼 추가
- [x] Team Table에 Repository Count 컬럼 추가
- [x] Risk Review 영역에서 Watch 이상 사용자만 표시
- [x] Risk Review에 Risk Level 표시
- [x] Risk Review에 주요 위험 사유 표시
- [x] Risk Review에 부족 요소 표시
- [x] Risk Review에 마지막 활동 상태 표시
- [x] 위험도별 badge/card 색상 구분
- [x] Summary 영역에 평균 팀 점수 표시
- [x] Summary 영역에 Stable 비율 표시
- [x] Summary 영역에 위험 사용자 비율 표시

## 5. Utility 구조 정리

- [x] score calculation 로직을 `src/utils/score`로 분리
- [x] risk analysis 로직을 `src/utils/risk`로 분리
- [x] normalization 로직을 `src/utils/score/normalization.ts`로 분리
- [x] date utility 로직을 `src/utils/date`로 분리
- [x] UI 컴포넌트에서 계산/판정 로직 제거
- [x] service layer에서 mock data를 UI-facing result로 변환

## 6. 타입 시스템 강화

- [x] ScoreBreakdown 타입 유지 및 계산 결과와 연결
- [x] RiskReason 타입 정의
- [x] RiskAnalysisResult 타입 정의
- [x] MemberActivityInput 타입 정의
- [x] MemberActivity와 mock source metric 구조 분리
- [x] `any` 사용 없이 Sprint 2 계산 함수 작성

## 7. 상태 처리 및 UI 품질

- [x] loading 상태 유지
- [x] error 상태 카드 기반 UI 추가
- [x] retry button 구현
- [x] empty 상태 유지
- [x] mock warning 상태 유지
- [x] table 가독성 개선
- [x] spacing 개선
- [x] score 강조 표시 개선
- [x] badge 스타일 유지 및 risk level 연결
- [x] hover interaction 추가

## 8. 문서화

- [x] `docs/architecture/architecture.md` 갱신
- [x] `docs/architecture/component.md` 갱신
- [x] `docs/architecture/directory.md` 갱신
- [x] `docs/architecture/flow.md` 갱신
- [x] `docs/architecture/state.md` 갱신
- [x] `.codex/ref_docs/TODO.md` 기존 원문 복구 후 Sprint 2 완료 기록 추가

## 9. Sprint 2 검증

- [x] `git diff --check` 통과
- [x] `any` 사용 여부 점검
- [x] 핵심 TypeScript 모듈 parse check 통과
- [x] `npm run build` 성공
- [x] TypeScript build 오류 점검 완료
- [x] 실제 브라우저 UI 렌더링 확인

## 10. Sprint 2 잔여/보류 항목

- [x] `npm` 실행 가능 환경에서 `npm run build` 재검증
- [x] build 성공 후 TypeScript build 관련 Sprint 2 체크 상태 갱신
- [x] dev server 실행 가능 환경에서 desktop UI overflow 확인
- [x] dev server 실행 가능 환경에서 ResultPage 실제 렌더링 확인

---

# Sprint 3 작업 계획

> Sprint 3 범위는 frontend-only MVP 기준으로 구현한다. 실제 GitHub API, backend, OAuth, DB, PDF export, local persistence, advanced filtering/search/sorting, realtime sync, Zustand/Redux, server state library는 구현하지 않는다.

## 1. Chart 시스템

- [x] Recharts 의존성 추가
- [x] 공통 chart shell/component 구조 구현
- [x] dark dashboard chart theme 적용
- [x] responsive chart 처리

## 2. Dashboard 차트

- [x] Team Score Distribution chart 구현
- [x] Risk Level Distribution chart 구현
- [x] Repository Contribution chart 구현
- [x] Activity Timeline chart 구현
- [x] 차트 empty state 처리

## 3. Analytics / Transform 계층

- [x] chart transform utility 분리
- [x] score aggregation utility 분리
- [x] repository analytics utility 분리
- [x] timeline generation utility 분리
- [x] mock 데이터와 chart presentation logic 분리

## 4. 타입 시스템

- [x] `TimelinePoint` 타입 추가
- [x] `RepositoryInsight` 타입 추가
- [x] `TeamDistribution` 타입 추가
- [x] `RiskDistribution` 타입 추가
- [x] `ChartDataset` 타입 추가
- [x] `any` 없이 Sprint 3 타입 작성

## 5. Result Dashboard UI

- [x] ResultPage dashboard layout 재구성
- [x] Summary Cards 정보 밀도 강화
- [x] Team Table risk row 강조 개선
- [x] Repository Insights 영역 추가
- [x] SaaS dashboard 기준 spacing, border, typography 개선

## 6. 상태 UI

- [x] chart/dashboard loading skeleton 개선
- [x] chart 영역 empty UI 제공

## 7. 문서화

- [x] `docs/architecture/architecture.md` Sprint 3 업데이트
- [x] `docs/architecture/component.md` Sprint 3 업데이트
- [x] `docs/architecture/directory.md` Sprint 3 업데이트
- [x] `docs/architecture/flow.md` Sprint 3 업데이트
- [x] `docs/architecture/state.md` Sprint 3 업데이트

## 8. Sprint 3 검증

- [x] `npm run build` 성공
- [x] TypeScript 오류 점검 완료
- [x] unused import 제거
- [x] chart rendering 확인
- [x] dashboard overflow 문제 확인
- [x] dark UI와 chart 색상 조화 확인
- [x] `npm run lint` 성공
- [x] `rg "\bany\b" git-hunter/src` 결과 없음
- [x] headless Chrome 기반 `/` -> `/result` 분석 흐름에서 Recharts wrapper 4개 렌더링 확인
- [x] headless Chrome 기반 chart empty state 없음, horizontal overflow 없음 확인
