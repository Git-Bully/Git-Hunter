type ClassNameValue = string | false | null | undefined

export function cx(...classNames: ClassNameValue[]): string {
  return classNames.filter(Boolean).join(' ')
}

