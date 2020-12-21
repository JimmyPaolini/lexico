export default function flattenForms(obj: object | string[] | undefined | null): string[] {
  if (!obj) return []
  if (Array.isArray(obj)) return obj
  return Object.values(obj).reduce(
    (acc, val) => [...acc, ...flattenForms(val)],
    [],
  )
}
