import { getBookmarksLocal } from '../../useBookmarks'

export function createBookmarkLocal(id: string) {
  if (typeof window === 'undefined') return
  const bookmarks = getBookmarksLocal()
  if (bookmarks.length > 999) return
  window.localStorage.bookmarks = JSON.stringify([...bookmarks, id])
}
