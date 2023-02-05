import { CustomText, User } from 'src/graphql/generated'

import { validateUserText } from '../../../reader/UserTextForm/validateUserText'

const KEY_PREFIX = 'userText-'

export function listUserTextsLocal(): CustomText[] {
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

export function createUserTextLocal(userText: CustomText): void {
  if (typeof window === 'undefined') return
  if (Object.keys(validateUserText(userText)).length) {
    console.error('Invalid UserText')
    return
  }
  userText.user = undefined as unknown as User
  window.localStorage[KEY_PREFIX + userText.id] = JSON.stringify(userText)
}

export function getUserTextLocal(id: string): CustomText | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return JSON.parse(window.localStorage[KEY_PREFIX + id])
  } catch {
    return undefined
  }
}

export function deleteUserTextLocal(id: string): void {
  if (typeof window === 'undefined') return
  delete window.localStorage[KEY_PREFIX + id]
}
