import { SettingsInput } from "../../../entity/user/Settings"

const settingsInput = () =>
  ({
    theme: "dark",
    fontSize: 24,
    formsExpandedDefault: false,
    translationsExpandedDefault: false,
    dictionaryMacronized: false,
    literatureMacronized: false,
  } as SettingsInput & { [index: string]: any })

export function getSettingsLocal() {
  if (typeof window === "undefined") return settingsInput()
  return window.localStorage?.settings
    ? (JSON.parse(window.localStorage.settings) as SettingsInput)
    : settingsInput()
}

export function setSettingsLocal(settings: SettingsInput) {
  if (typeof window === "undefined") return
  window.localStorage.settings = JSON.stringify(settings)
}

class ShowSettingsInstructions {
  showAfter: Date = new Date()
  seenCount: number = 0
}

// only called when the user is not signed in
export function showSettingsInstructions() {
  if (typeof window === "undefined") return false
  const showSettingsInstructions = JSON.parse(
    window.localStorage.showSettingsInstructions || "null",
  ) as ShowSettingsInstructions

  if (!showSettingsInstructions) {
    window.localStorage.showSettingsInstructions = JSON.stringify(
      new ShowSettingsInstructions(),
    )
    return true
  }

  if (new Date() >= new Date(showSettingsInstructions.showAfter)) {
    window.localStorage.showSettingsInstructions = JSON.stringify(
      updateShowSettingsInstructions(showSettingsInstructions),
    )
    return true
  } else {
    return false
  }
}

function updateShowSettingsInstructions(
  showSettingsInstructions: ShowSettingsInstructions,
) {
  if (showSettingsInstructions.seenCount < 10) {
    const nextHour = new Date(Date.now() + 1 * 60 * 60 * 1000)
    showSettingsInstructions.showAfter = nextHour
  } else {
    const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    showSettingsInstructions.showAfter = tomorrow
  }
  showSettingsInstructions.seenCount++
  return showSettingsInstructions
}
