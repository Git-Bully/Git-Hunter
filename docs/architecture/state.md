# 상태 문서 - Git-Hunter

중요한 상태 모델과 상태 전이를 이 문서에 기록한다.

## 상태 종류
| State | Owner | Source of Truth | Persisted | Notes |
| --- | --- | --- | --- | --- |
| Analysis form state | `HomePage` | React local state | No | organization input, period, repository count, fork/archive options |
| Analysis loading state | `HomePage` | React local state | No | fake analysis delay 동안 loading UI 표시 |
| Analysis error state | `HomePage` | React local state | No | validation 또는 mock service error message |
| Analysis result state | React Router location state | `navigate('/result', { state })` | No | Sprint 1에서는 새로고침 시 사라질 수 있음 |
| Empty result state | `ResultPage` | route state absence | No | 결과 없이 `/result` 접근 시 표시 |

## Enum 값
| Enum | Value | Meaning | Terminal | Notes |
| --- | --- | --- | --- | --- |
| `RiskLevel` | `stable` | 협업 건강 상태가 안정적임 | No | 초록 badge |
| `RiskLevel` | `watch` | 관찰이 필요한 상태 | No | 노랑 badge |
| `RiskLevel` | `risk` | 위험 사용자로 검토 필요 | No | 빨강 badge |
| `RiskLevel` | `critical` | 심각한 위험 상태 | No | Sprint 1 데이터에는 포함하지 않지만 badge variant는 지원 |
| `AnalysisStatus` | `idle` | 분석 전 상태 | No | 타입 계약에 정의 |
| `AnalysisStatus` | `loading` | mock service 실행 중 | No | Home loading UI |
| `AnalysisStatus` | `error` | 검증 또는 mock service 실패 | No | Home error message |
| `AnalysisStatus` | `empty` | result state 없음 | No | Result empty state |
| `AnalysisStatus` | `success` | result 렌더링 가능 | Yes | 화면상 완료 상태 |

## 상태 전이 규칙
| From | To | Trigger | Validator | Side Effects |
| --- | --- | --- | --- | --- |
| `idle` | `loading` | Analyze 클릭 | organization 입력 검증 | mock service 호출 |
| `loading` | `success` | mock result 반환 | service result 존재 | `/result` route 이동 |
| `loading` | `error` | mock service 실패 | Error instance 확인 | form error message 표시 |
| `success` | `empty` | `/result` 새로고침 또는 직접 접근 | route state 없음 | EmptyState 표시 |
