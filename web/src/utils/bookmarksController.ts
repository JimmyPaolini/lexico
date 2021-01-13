import Entry from "../../../server/src/entity/dictionary/Entry"

function validateBookmarks() {
  if (!window.localStorage.bookmarks)
    window.localStorage.bookmarks = JSON.stringify({})

  try {
    JSON.parse(window.localStorage.bookmarks)
  } catch (e) {
    console.error(
      "Malformed bookmarks object in local storage. Clearing bookmarks to fix the issue",
    )
    window.localStorage.bookmarks = JSON.stringify({})
  }
}

export function getBookmarks() {
  validateBookmarks()
  return JSON.parse(window.localStorage.bookmarks)
}

export function setBookmarks(bookmarks: Entry[]) {
  validateBookmarks()
  window.localStorage.bookmarks = JSON.stringify(bookmarks)
}

export function isBookmarked(entry: Entry) {
  validateBookmarks()
  const bookmarks = getBookmarks()
  return !!bookmarks[entry.id]
}

export function createBookmark(entry: Entry) {
  validateBookmarks()
  const bookmarks = getBookmarks()
  bookmarks[entry.id] = entry
  setBookmarks(bookmarks)
}

export function deleteBookmark(entry: Entry) {
  validateBookmarks()
  const bookmarks = getBookmarks()
  delete bookmarks[entry.id]
  setBookmarks(bookmarks)
}
