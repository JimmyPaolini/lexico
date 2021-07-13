type Bookmarks = string[]

export function getBookmarksLocal(): Bookmarks {
  if (typeof window === "undefined") return []
  if (!window.localStorage.bookmarks) {
    window.localStorage.bookmarks = JSON.stringify([])
  }
  const bookmarks = JSON.parse(window.localStorage.bookmarks) as Bookmarks
  if (
    !Array.isArray(bookmarks) ||
    (bookmarks.length && typeof bookmarks[0] !== "string")
  ) {
    window.localStorage.bookmarks = JSON.stringify([])
  }
  return JSON.parse(window.localStorage.bookmarks) as Bookmarks
}

function setBookmarksLocal(bookmarks: Bookmarks): void {
  if (typeof window === "undefined") return
  window.localStorage.bookmarks = JSON.stringify(bookmarks)
}

export function isBookmarkedLocal(id: string): boolean {
  const bookmarks = getBookmarksLocal()
  console.log(bookmarks)
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

class ShowBookmarkInstructions {
  showAfter: Date = new Date()
  seenCount = 0
}

// only called when the user is not signed in
export function showBookmarkInstructions(): boolean {
  if (typeof window === "undefined") return false
  const showBookmarkInstructions = JSON.parse(
    window.localStorage.showBookmarkInstructions || "null",
  ) as ShowBookmarkInstructions

  if (!showBookmarkInstructions) {
    window.localStorage.showBookmarkInstructions = JSON.stringify(
      new ShowBookmarkInstructions(),
    )
    return true
  }

  if (new Date() >= new Date(showBookmarkInstructions.showAfter)) {
    window.localStorage.showBookmarkInstructions = JSON.stringify(
      updateShowBookmarkInstructions(showBookmarkInstructions),
    )
    return true
  } else {
    return false
  }
}

function updateShowBookmarkInstructions(
  showBookmarkInstructions: ShowBookmarkInstructions,
) {
  if (showBookmarkInstructions.seenCount < 10) {
    const nextHour = new Date(Date.now() + 1 * 60 * 60 * 1000)
    showBookmarkInstructions.showAfter = nextHour
  } else {
    const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    showBookmarkInstructions.showAfter = tomorrow
  }
  showBookmarkInstructions.seenCount++
  return showBookmarkInstructions
}
