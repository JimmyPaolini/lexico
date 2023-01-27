import { getBookmarksLocal } from '../../useBookmarks'

export function deleteBookmarkLocal(id: string) {
  if (typeof window === 'undefined') return
  const bookmarks = getBookmarksLocal()
  window.localStorage.bookmarks = JSON.stringify(
    bookmarks.filter((bookmark: string) => bookmark !== id)
  )
}