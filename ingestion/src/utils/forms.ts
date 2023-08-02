export function flattenForms(
  obj: string[] | Record<string, string[]>
): string[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return Object.values(obj).reduce(
    (acc, val) => [...acc, ...flattenForms(val)],
    []
  )
}

export function isNumber(str: string): boolean {
  return !!str.match(/^((singular)|(plural))$/i)
}

export function isCase(str: string): boolean {
  return !!str.match(
    /^((nominative)|(genitive)|(dative)|(accusative)|(ablative)|(vocative)|(locative))$/i
  )
}

export function isGender(str: string): boolean {
  return !!str.match(/^((masculine)|(feminine)|(neuter))$/i)
}
