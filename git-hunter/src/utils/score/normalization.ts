export function clampScore(score: number): number {
  return Math.min(100, Math.max(0, score))
}

export function roundScore(score: number): number {
  return Math.round(clampScore(score))
}

export function normalizeBySoftCap(value: number, softCap: number): number {
  if (softCap <= 0) {
    return 0
  }

  const normalized = Math.log1p(Math.max(0, value)) / Math.log1p(softCap)

  return clampScore(normalized * 100)
}
