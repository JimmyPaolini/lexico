export const getSearchPageMetadata = (
  searched: string
): {
  title: string
  description: string
  keywords: string
} => {
  return {
    title: `Lexico - Search${searched ? `: "${searched}"` : ''}`,
    description: `${
      searched ? `Search for "${searched}"` : 'Search for Latin and English'
    } translations, principle parts, part of speech, and other grammatical information`,
    keywords: `Latin, English, ${searched}, translation, grammar, principle parts, part of speech`,
  }
}
