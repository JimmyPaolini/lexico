class ShowBookmarkInstructions {
  showAfter: Date = new Date()
  seenCount = 0
}

// only called when the user is not signed in
export function shouldShowBookmarkInstructions(): boolean {
  if (typeof window === 'undefined') return false
  const showBookmarkInstructions = JSON.parse(
    window.localStorage.showBookmarkInstructions || 'null'
  ) as ShowBookmarkInstructions

  if (!showBookmarkInstructions) {
    window.localStorage.showBookmarkInstructions = JSON.stringify(
      new ShowBookmarkInstructions()
    )
    return true
  }

  if (new Date() >= new Date(showBookmarkInstructions.showAfter)) {
    window.localStorage.showBookmarkInstructions = JSON.stringify(
      updateShowBookmarkInstructions(showBookmarkInstructions)
    )
    return true
  } else {
    return false
  }
}

function updateShowBookmarkInstructions(
  showBookmarkInstructions: ShowBookmarkInstructions
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
