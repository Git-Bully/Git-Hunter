const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export function getDaysSince(dateValue: string, referenceDate = new Date()): number {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 999
  }

  return Math.max(
    0,
    Math.floor((referenceDate.getTime() - date.getTime()) / DAY_IN_MILLISECONDS),
  )
}

export function formatLastActivity(dateValue: string, referenceDate = new Date()): string {
  const daysSince = getDaysSince(dateValue, referenceDate)

  if (daysSince === 0) {
    return '오늘'
  }

  if (daysSince === 1) {
    return '어제'
  }

  return `${daysSince}일 전`
}

export function getLastActivityStatus(daysSinceLastActivity: number): string {
  if (daysSinceLastActivity <= 3) {
    return '이번 주 활동'
  }

  if (daysSinceLastActivity <= 10) {
    return '관찰 필요'
  }

  if (daysSinceLastActivity <= 21) {
    return '최근 활동 부족'
  }

  return '장기 미활동'
}
