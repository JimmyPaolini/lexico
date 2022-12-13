import { validate } from '../components/library/custom/CustomLiteratureForm'

export interface CustomText {
  id: string
  title: string
  text: string
  local?: boolean
}

const localLiteraturePrefix = 'customText-'

export function listCustomTextsLocal(): CustomText[] {
  if (typeof window === 'undefined') return []
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith(localLiteraturePrefix))
    .map((key) => {
      try {
        return JSON.parse(window.localStorage[key])
      } catch {
        return null
      }
    })
    .filter((x) => x)
    .sort((a, b) => a.title.localeCompare(b.title)) as CustomText[]
}

export function createCustomTextLocal(customText: CustomText): void {
  if (typeof window === 'undefined') return
  if (Object.keys(validate(customText)).length) {
    console.log('Invalid custom text')
    return
  }
  customText.local = true
  const customTextString = JSON.stringify(customText)
  window.localStorage[localLiteraturePrefix + customText.id] = customTextString
}

export function getCustomTextLocal(id: string): CustomText | undefined {
  if (typeof window === 'undefined') return { id, title: '', text: '' }
  try {
    return JSON.parse(window.localStorage[localLiteraturePrefix + id])
  } catch {
    return undefined
  }
}

export function deleteCustomTextLocal(id: string): void {
  if (typeof window === 'undefined') return
  delete window.localStorage[localLiteraturePrefix + id]
}
