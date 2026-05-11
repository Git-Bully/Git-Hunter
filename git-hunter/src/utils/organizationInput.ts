const ORGANIZATION_NAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/

export function normalizeOrganizationInput(inputValue: string): string {
  const trimmedInput = inputValue.trim()

  if (!trimmedInput) {
    return ''
  }

  if (trimmedInput.includes('github.com')) {
    try {
      const url = new URL(
        trimmedInput.startsWith('http') ? trimmedInput : `https://${trimmedInput}`,
      )
      const [organizationName] = url.pathname.split('/').filter(Boolean)

      return organizationName ?? ''
    } catch {
      return ''
    }
  }

  return trimmedInput.replace(/^@/, '')
}

export function validateOrganizationInput(inputValue: string): string | null {
  const organizationName = normalizeOrganizationInput(inputValue)

  if (!organizationName) {
    return '조직 이름 또는 GitHub URL을 입력하세요.'
  }

  if (!ORGANIZATION_NAME_PATTERN.test(organizationName)) {
    return '올바른 GitHub 조직 이름 또는 조직 URL을 입력하세요.'
  }

  return null
}
