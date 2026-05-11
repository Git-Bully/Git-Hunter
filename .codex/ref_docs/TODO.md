# Git-Hunter Frontend MVP TODO

> Frontend-Only React MVP  
> Stack: React + TypeScript + Vite + Tailwind CSS  
> 목표: 발표 가능한 수준의 GitHub 협업 분석 프로토타입 완성

---

# 0. 프로젝트 초기 세팅

- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] ESLint / Prettier 설정
- [ ] 절대 경로 alias 설정 (`@/`)
- [ ] 폴더 구조 설계
- [ ] 환경 변수 구조 정의
- [ ] 다크모드 기본 구조 추가
- [ ] 공통 디자인 토큰 정의
- [ ] mock 데이터 디렉토리 생성
- [ ] sample organization preset 추가

---

# 1. 프로젝트 구조 설계

## 1.1 기본 디렉토리 구조

- [ ] `components/`
- [ ] `pages/`
- [ ] `layouts/`
- [ ] `features/`
- [ ] `services/`
- [ ] `mock/`
- [ ] `types/`
- [ ] `utils/`
- [ ] `constants/`
- [ ] `hooks/`

---

# 2. 타입 시스템 정의

## 2.1 Core Types

- [ ] OrganizationAnalysisResult 타입 정의
- [ ] RepositorySummary 타입 정의
- [ ] MemberActivity 타입 정의
- [ ] RiskLevel enum 정의
- [ ] RiskReason 타입 정의
- [ ] ScoreBreakdown 타입 정의
- [ ] AnalysisStatus 타입 정의

---

## 2.2 상태 타입 정의

- [ ] Loading State 타입
- [ ] Error State 타입
- [ ] Warning State 타입
- [ ] Empty State 타입

---

# 3. Mock 데이터 시스템

## 3.1 Mock Dataset 설계

- [ ] organization preset 데이터 생성
- [ ] 정상 협업 팀 시나리오 생성
- [ ] 협업 부족 팀 시나리오 생성
- [ ] 특정 인원 몰빵 시나리오 생성
- [ ] 활동 공백 시나리오 생성
- [ ] 위험 사용자 포함 시나리오 생성

---

## 3.2 Mock Service

- [ ] mock 분석 service 구현
- [ ] organization 이름 기반 preset 매핑
- [ ] loading delay 시뮬레이션
- [ ] random fallback 데이터 생성
- [ ] mock warning 메시지 반환

---

# 4. 점수 계산 로직

## 4.1 Activity Score

- [ ] commit 기반 점수 계산
- [ ] PR 기반 점수 계산
- [ ] 활동 repository 수 계산
- [ ] 활동량 normalization 처리

---

## 4.2 Collaboration Score

- [ ] review 활동 반영
- [ ] issue 참여 반영
- [ ] PR 상호작용 반영
- [ ] repository 분산도 계산

---

## 4.3 Consistency Score

- [ ] 활동 지속성 계산
- [ ] 최근 활동 반영
- [ ] 활동 공백 감점 처리
- [ ] 주기적 활동 보정

---

## 4.4 Total Score

- [ ] 가중치 계산 구현
- [ ] 0~100 범위 clamp 처리
- [ ] score rounding 처리

---

# 5. Risk 분석 시스템

## 5.1 Risk Level 계산

- [ ] Stable 조건 정의
- [ ] Watch 조건 정의
- [ ] Risk 조건 정의
- [ ] Critical 조건 정의

---

## 5.2 Risk Reason 생성

- [ ] 최근 활동 부족 탐지
- [ ] 협업 부족 탐지
- [ ] repository 편중 탐지
- [ ] 활동 공백 탐지
- [ ] 낮은 총 점수 탐지

---

# 6. 라우팅 구성

- [ ] React Router 설치
- [ ] Home 페이지 생성
- [ ] Result 페이지 생성
- [ ] Not Found 페이지 생성

---

# 7. 입력 페이지 구현

## 7.1 입력 폼

- [ ] organization 입력 필드
- [ ] GitHub URL 파싱 처리
- [ ] 분석 기간 선택
- [ ] repository 개수 선택
- [ ] fork 제외 옵션
- [ ] archived 제외 옵션

---

## 7.2 Validation

- [ ] 빈 입력 validation
- [ ] GitHub organization 형식 validation
- [ ] URL validation
- [ ] 에러 메시지 UI 구현

---

## 7.3 Analyze Flow

- [ ] Analyze 버튼 구현
- [ ] loading 상태 전환
- [ ] 결과 페이지 이동
- [ ] mock service 연결

---

# 8. 결과 페이지 구현

## 8.1 Summary Cards

- [ ] 총 멤버 수 카드
- [ ] repository 수 카드
- [ ] 총 commit 수 카드
- [ ] 총 PR 수 카드
- [ ] 위험 사용자 수 카드

---

## 8.2 Repository 목록

- [ ] repository 리스트 UI
- [ ] activity badge 표시
- [ ] archived/fork badge 처리
- [ ] scroll 처리

---

## 8.3 팀원 점수 테이블

- [ ] member row UI
- [ ] score badge UI
- [ ] risk badge UI
- [ ] sortable column 처리
- [ ] hover interaction 추가

---

## 8.4 Risk Review 영역

- [ ] Watch 이상 사용자 필터링
- [ ] 위험 사유 표시
- [ ] 부족 요소 표시
- [ ] risk card UI 구현

---

# 9. 상태 UI 구현

## 9.1 Loading

- [ ] skeleton UI 구현
- [ ] spinner 구현
- [ ] loading overlay 구현

---

## 9.2 Empty

- [ ] empty state illustration
- [ ] empty message UI

---

## 9.3 Error

- [ ] error card UI
- [ ] retry button 구현
- [ ] fallback warning 표시

---

## 9.4 Warning

- [ ] mock/fallback warning banner
- [ ] demo mode badge 추가

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

- [ ] Button
- [ ] Input
- [ ] Select
- [ ] Checkbox
- [ ] Card
- [ ] Table
- [ ] Badge
- [ ] Modal
- [ ] Tooltip

---

## 11.2 상태 컴포넌트

- [ ] LoadingView
- [ ] ErrorView
- [ ] EmptyView
- [ ] WarningBanner

---

# 12. 디자인 시스템

## 12.1 Theme

- [ ] color palette 정의
- [ ] risk level 색상 정의
- [ ] typography 설정
- [ ] spacing 규칙 정의

---

## 12.2 다크모드

- [ ] dark mode toggle
- [ ] localStorage 저장
- [ ] chart dark theme 대응

---

# 13. 발표용 UX 개선

- [ ] 큰 화면 기준 spacing 조정
- [ ] 발표용 대비 강화
- [ ] 핵심 위험 사용자 강조
- [ ] summary section 시각 강화
- [ ] 애니메이션 최소 추가
- [ ] card hover 효과 추가

---

# 14. 유지보수성 작업

- [ ] utility 함수 분리
- [ ] constants 중앙화
- [ ] reusable component 정리
- [ ] mock 데이터와 UI 분리
- [ ] feature 단위 구조 정리

---

# 15. 향후 API 연동 대비

- [ ] API response interface 정의
- [ ] service abstraction 적용
- [ ] fetch layer 분리
- [ ] mock ↔ real API 교체 가능 구조 유지

---

# 16. 최종 QA

## 16.1 기능 검증

- [ ] organization 입력 가능
- [ ] 결과 렌더링 가능
- [ ] 점수 계산 정상 동작
- [ ] 위험 레벨 표시 정상 동작
- [ ] warning 상태 정상 동작
- [ ] error 상태 정상 동작

---

## 16.2 UI 검증

- [ ] desktop 해상도 확인
- [ ] overflow 문제 확인
- [ ] table 가독성 확인
- [ ] chart 정상 렌더링 확인

---

## 16.3 Build 검증

- [ ] TypeScript build 성공
- [ ] Vite production build 성공
- [ ] lint 통과
- [ ] unused import 제거

---

# 17. MVP 종료 조건

- [ ] organization 입력 가능
- [ ] mock 분석 가능
- [ ] 결과 페이지 완성
- [ ] 위험 사용자 탐지 가능
- [ ] 발표 가능한 UI 완성
- [ ] fallback/demo 흐름 안정화
- [ ] React production build 성공

---