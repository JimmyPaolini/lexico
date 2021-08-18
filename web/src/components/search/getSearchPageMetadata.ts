export default function getPageMetadata(
  searched: string,
  isLatin: boolean,
): { title: string; description: string; keywords: string } {
  let title = `Lexico - Search`
  if (searched) {
    if (isLatin) title += ` Latin: ${searched}`
    else title += ` English: ${searched}`
  }

  let description = "Search for Latin and English"
  if (searched) {
    description = `Search ${isLatin ? "Latin" : "English"} for ${searched}`
  }
  description +=
    " translations, principle parts, part of speech, and other grammatical information"

  let keywords = "Latin, English"
  if (searched) {
    if (isLatin) keywords += ", Latin " + searched
    else keywords += ", English " + searched
  }
  keywords += ", translation, grammar, principle parts, part of speech"

  return { title, description, keywords }
}
