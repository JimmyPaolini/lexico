type Bookmarks = string[]

export function getBookmarksLocal(): Bookmarks {
  if (typeof window === 'undefined') return []
  if (!window.localStorage.bookmarks) {
    window.localStorage.bookmarks = JSON.stringify([])
  }
  const bookmarks = JSON.parse(window.localStorage.bookmarks) as Bookmarks
  if (
    !Array.isArray(bookmarks) ||
    (bookmarks.length && typeof bookmarks[0] !== 'string')
  ) {
    window.localStorage.bookmarks = JSON.stringify([])
  }
  return JSON.parse(window.localStorage.bookmarks) as Bookmarks
}
