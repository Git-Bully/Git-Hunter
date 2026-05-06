# Git-Hunter PRD (Frontend-Only MVP Version)

## 1. 문서 목적

Git-Hunter는 GitHub organization의 repository 활동 데이터를 기반으로 팀 협업 건강도를 시각적으로 분석하는 React 기반 frontend-only 웹 애플리케이션이다.

본 MVP는 실제 GitHub API 기반 운영 서비스가 아니라, 팀 활동 분석 흐름과 사용자 경험을 검증하기 위한 발표/데모 중심 프로토타입 구현을 목표로 한다.

이 문서는 제품 목표, 사용자 시나리오, 기능 요구사항, 비기능 요구사항, MVP 범위를 정의한다.

---

# 2. 제품 배경

소프트웨어 팀 프로젝트에서는 단순 commit 수만으로는 팀원의 실제 협업 상태를 설명하기 어렵다.

PR 작성, issue 참여, review, discussion, 활동 지속성 등 다양한 활동 신호를 함께 분석해야 팀 협업 상태를 더 설득력 있게 설명할 수 있다.

Git-Hunter는 GitHub organization 활동을 기반으로 다음 정보를 시각적으로 제공한다.

- 팀 활동 요약
- 팀원별 협업 건강 점수
- 위험 사용자 탐지
- 활동 편중 및 협업 부족 경고
- 발표용 분석 화면

현재 MVP는 빠른 데모와 UI 검증을 우선하며, mock/fallback 데이터를 기반으로 동작한다.

---

# 3. 목표

- GitHub organization 입력 기반 분석 UX 제공
- React 기반 SPA 형태의 결과 화면 구현
- Activity / Collaboration / Consistency 점수 제공
- Stable / Watch / Risk / Critical 위험 레벨 제공
- 발표용 카드/표 중심 UI 제공
- mock 데이터 기반으로 안정적인 데모 흐름 제공
- 향후 실제 GitHub API 기반 서비스로 확장 가능한 구조 유지

---

# 4. 비목표

- 사용자 인증 및 로그인
- 데이터베이스 저장
- 실시간 GitHub 동기화
- 장기 데이터 보관
- 실제 운영 환경 수준의 정확한 분석
- private repository 분석
- 백엔드 서버 구현
- GitHub OAuth 연동

---

# 5. 대상 사용자

## 5.1 1차 사용자

- 소프트웨어 공학 수업 팀 프로젝트 참여자
- 팀 활동 상태를 발표 자료로 설명해야 하는 학생
- GitHub 활동 기반 팀 협업 상태를 시각적으로 보여주고 싶은 사용자

## 5.2 2차 사용자

- 프로젝트를 평가하는 교수자 또는 조교
- 팀 협업 흐름을 빠르게 확인하려는 멘토

---

# 6. 핵심 사용자 시나리오

1. 사용자는 홈 화면에 접속한다.
2. GitHub organization 이름 또는 URL을 입력한다.
3. 분석 기간과 repository 개수를 선택한다.
4. 사용자는 Analyze 버튼을 클릭한다.
5. 시스템은 mock/fallback 데이터를 기반으로 분석 결과를 생성한다.
6. 시스템은 팀원별 점수와 위험 레벨을 계산한다.
7. 결과 페이지에서 팀 상태와 위험 요소를 시각적으로 표시한다.
8. 사용자는 옵션을 변경해 다시 분석할 수 있다.

---

# 7. 기능 요구사항

## 7.1 입력 화면

- organization 이름 또는 URL 입력 지원
- 분석 기간 선택
- repository 개수 선택
- fork 제외 여부 선택
- archived 제외 여부 선택
- 입력값 검증 지원
- 잘못된 입력 시 오류 메시지 표시

---

## 7.2 분석 데이터 처리

- MVP에서는 mock/fallback 데이터를 사용한다.
- organization별 preset mock 데이터를 제공할 수 있다.
- 추후 실제 GitHub API 연동이 가능하도록 데이터 구조를 유지한다.
- 분석 결과 생성 시 loading 상태를 표시한다.

---

## 7.3 점수 계산

다음 점수를 계산해야 한다.

- Activity Score
- Collaboration Score
- Consistency Score
- Total Health Score

점수 범위는 0~100이다.

총 점수는 다음 가중치를 사용한다.

- Activity: 45%
- Collaboration: 30%
- Consistency: 25%

---

## 7.4 위험 레벨 산정

다음 위험 레벨을 제공한다.

- Stable
- Watch
- Risk
- Critical

위험 사유는 다음을 포함할 수 있다.

- 최근 활동 부족
- 협업 참여 부족
- 특정 repository 편중
- 활동 공백
- 낮은 건강 점수

---

## 7.5 결과 화면

결과 페이지는 다음 요소를 포함해야 한다.

### 요약 카드

- 총 멤버 수
- 분석 repository 수
- 총 commit 수
- 총 PR 수
- 위험 사용자 수

### Repository 목록

- 분석 대상 repository 목록 표시

### 팀원 점수 테이블

다음 정보를 표시한다.

- 사용자 이름
- Activity 점수
- Collaboration 점수
- Consistency 점수
- Total 점수
- Risk 레벨
- commit 수
- PR 수
- review 수
- 활동 repository 수
- 마지막 활동일

### Risk Review 영역

Watch 이상 사용자에 대해:

- 위험 레벨
- 위험 사유
- 주요 부족 요소

를 표시해야 한다.

---

## 7.6 상태 처리

다음 상태를 지원해야 한다.

- Loading
- Empty
- Error
- Warning

fallback/mock 데이터 사용 시 warning을 표시해야 한다.

---

# 8. 비기능 요구사항

## 8.1 기술 스택

- React
- TypeScript
- Tailwind CSS
- Vite
- Chart Library 사용 가능

---

## 8.2 UI 요구사항

- 발표 환경 기준 가독성 우선
- 카드 기반 레이아웃 사용
- Risk Level badge 제공
- 데스크톱 중심 UI
- 다크모드 지원 가능
- 시각적으로 직관적인 정보 구조 제공

---

## 8.3 유지보수성

- component 단위 책임 분리
- mock 데이터와 UI 로직 분리
- 점수 계산 로직 별도 utility 관리
- 타입 정의 중앙화
- API 연동 가능성을 고려한 구조 유지

---

# 9. 데이터 요구사항

- mock JSON 기반 데이터 사용
- 사용자 활동 데이터 preset 제공
- repository 목록 preset 제공
- 위험 사용자 시나리오 preset 제공

---

# 10. 성공 지표

다음 흐름이 동작하면 MVP 성공으로 본다.

- organization 입력 가능
- 결과 화면 렌더링 가능
- mock 데이터 기반 분석 가능
- 점수 계산 가능
- 위험 레벨 표시 가능
- 발표용 UI 완성
- empty/error/loading 상태 정상 동작
- React build 성공

---

# 11. MVP 범위

MVP는 다음 흐름이 완성되면 종료한다.

- organization 입력
- mock 데이터 분석
- 팀 활동 시각화
- 점수 계산
- 위험 레벨 산정
- 결과 페이지 렌더링
- warning/error 상태 처리

---

# 12. 향후 확장 방향

- 실제 GitHub API 연동
- 백엔드 서버 추가
- GitHub OAuth 인증
- private repository 지원
- DB 저장
- 장기 활동 분석
- 활동 트렌드 그래프
- PDF 리포트 다운로드
- 발표용 export 기능
- 팀 전체 건강 점수 추이 분석

---

# 13. 주요 가정

- 현재 MVP는 frontend-only prototype이다.
- 실제 GitHub API 기반 운영 서비스는 향후 확장 범위다.
- 현재 구현은 발표와 UX 검증을 우선한다.
- mock 데이터 기반 데모 안정성을 우선한다.
- 점수는 협업 상태를 설명하기 위한 참고 지표다.