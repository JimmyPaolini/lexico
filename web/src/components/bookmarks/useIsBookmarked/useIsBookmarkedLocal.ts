import { getBookmarksLocal } from '../useBookmarks/getBookmarksLocal'

export function useIsBookmarkedLocal(id: string): boolean {
  const bookmarks = getBookmarksLocal()
  return bookmarks.includes(id)
}
