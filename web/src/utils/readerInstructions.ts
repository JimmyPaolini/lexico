class ShowReaderInstructions {
  showAfter: Date = new Date()
  seenCount: number = 0
}

export function showReaderInstructions() {
  if (typeof window === "undefined") return false
  const showReaderInstructions = JSON.parse(
    window.localStorage.showReaderInstructions || "null",
  ) as ShowReaderInstructions

  if (!showReaderInstructions) {
    window.localStorage.showReaderInstructions = JSON.stringify(
      new ShowReaderInstructions(),
    )
    return true
  }

  if (new Date() >= new Date(showReaderInstructions.showAfter)) {
    window.localStorage.showReaderInstructions = JSON.stringify(
      updateShowReaderInstructions(showReaderInstructions),
    )
    return true
  } else {
    return false
  }
}

function updateShowReaderInstructions(
  showReaderInstructions: ShowReaderInstructions,
) {
  if (showReaderInstructions.seenCount < 3) {
    const immediately = new Date()
    showReaderInstructions.showAfter = immediately
  } else if (showReaderInstructions.seenCount < 5) {
    const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    showReaderInstructions.showAfter = tomorrow
  } else if (showReaderInstructions.seenCount < 8) {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    showReaderInstructions.showAfter = nextWeek
  } else {
    const nextMonth = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)
    showReaderInstructions.showAfter = nextMonth
  }
  showReaderInstructions.seenCount++
  return showReaderInstructions
}
