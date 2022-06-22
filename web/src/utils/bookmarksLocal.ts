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

function setBookmarksLocal(bookmarks: Bookmarks): void {
  if (typeof window === 'undefined') return
  window.localStorage.bookmarks = JSON.stringify(bookmarks)
}

export function isBookmarkedLocal(id: string): boolean {
  const bookmarks = getBookmarksLocal()
  return bookmarks.includes(id)
}

export function bookmarkLocal(id: string): void {
  const bookmarks = getBookmarksLocal()
  if (bookmarks.length > 999) return
  setBookmarksLocal([...bookmarks, id])
}

export function unbookmarkLocal(id: string): void {
  const bookmarks = getBookmarksLocal()
  setBookmarksLocal(bookmarks.filter((bookmark) => bookmark !== id))
}
