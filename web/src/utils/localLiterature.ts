export interface CustomText {
  id: string
  title: string
  text: string
}
export type CustomLiterature = CustomText[]

const localLiteraturePrefix = "literature-"

export function listLiteratureLocal(): CustomLiterature {
  if (typeof window === "undefined") return []
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith(localLiteraturePrefix))
    .map((key) => {
      try {
        return JSON.parse(window.localStorage[key])
      } catch {
        return null
      }
    })
    .filter((x) => x) as CustomLiterature
}

export function createLiteratureLocal(customText: CustomText): void {
  if (typeof window === "undefined") return
  const customTextString = JSON.stringify(customText)
  window.localStorage[localLiteraturePrefix + customText.id] = customTextString
}

export function getLiteratureLocal(id: string): CustomText {
  if (typeof window === "undefined") return { id, title: "", text: "" }
  try {
    console.log(window.localStorage[localLiteraturePrefix + id])
    return JSON.parse(window.localStorage[localLiteraturePrefix + id])
  } catch {
    return { id, title: "", text: "" }
  }
}

export function deleteLiteratureLocal(id: string): void {
  if (typeof window === "undefined") return
  delete window.localStorage[localLiteraturePrefix + id]
}
