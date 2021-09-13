import { Entry } from "../../graphql/generated"
import { normalize } from "../../utils/string"

export default function filterBookmarks(
  entries: Entry[] | undefined,
  search: string,
): Entry[] {
  if (!entries) return []
  const re = new RegExp(search, "i")
  return (
    entries?.filter((entry: Entry) => {
      return (
        entry.principalParts?.some((principalPart) =>
          principalPart.text.some((principalPartText) =>
            normalize(principalPartText).match(re),
          ),
        ) ||
        entry.translations?.some((translation) =>
          translation.translation.match(re),
        ) ||
        entry.partOfSpeech.match(re) ||
        normalize(JSON.stringify(entry?.forms || "false")).match(re)
      )
    }) || []
  )
}
