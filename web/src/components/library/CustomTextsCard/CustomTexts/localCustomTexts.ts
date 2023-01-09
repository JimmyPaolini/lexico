import { CustomText, User } from 'src/graphql/generated'

import { validateCustomText } from '../../../reader/CustomTextForm/validateCustomText'

const KEY_PREFIX = 'customText-'

export function listCustomTextsLocal(): CustomText[] {
  if (typeof window === 'undefined') return []
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith(KEY_PREFIX))
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
  if (Object.keys(validateCustomText(customText)).length) {
    console.error('Invalid CustomText')
    return
  }
  customText.user = undefined as unknown as User
  const customTextString = JSON.stringify(customText)
  window.localStorage[KEY_PREFIX + customText.id] = customTextString
}

export function getCustomTextLocal(id: string): CustomText | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return JSON.parse(window.localStorage[KEY_PREFIX + id])
  } catch {
    return { id } as CustomText
  }
}

export function deleteCustomTextLocal(id: string): void {
  if (typeof window === 'undefined') return
  delete window.localStorage[KEY_PREFIX + id]
}
