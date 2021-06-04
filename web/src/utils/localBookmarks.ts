type Bookmarks = string[]

export function getBookmarksLocal() {
  if (typeof window === "undefined") return []
  return JSON.parse(window.localStorage.bookmarks || "[]") as Bookmarks
}

export function setBookmarksLocal(bookmarks: Bookmarks) {
  if (typeof window === "undefined") return
  window.localStorage.bookmarks = JSON.stringify(bookmarks)
}

export function isBookmarkedLocal(id: string) {
  const bookmarks = getBookmarksLocal()
  return bookmarks.includes(id)
}

export function bookmarkLocal(id: string) {
  const bookmarks = getBookmarksLocal()
  setBookmarksLocal([...bookmarks, id])
}

export function unbookmarkLocal(id: string) {
  const bookmarks = getBookmarksLocal()
  setBookmarksLocal(bookmarks.filter((bookmark) => bookmark !== id))
}

class ShowBookmarkInstructions {
  showAfter: Date = new Date()
  seenCount: number = 0
}

// only called when the user is not signed in
export function showBookmarkInstructions() {
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
