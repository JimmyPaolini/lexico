import { getBookmarksLocal } from '../useBookmarks/getBookmarksLocal'

export function isBookmarkedLocal(id: string): boolean {
  const bookmarks = getBookmarksLocal()
  return bookmarks.includes(id)
}
