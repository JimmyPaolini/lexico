import Entry from '../../../../server/src/entity/dictionary/Entry'
import Translation from '../../../../server/src/entity/dictionary/Translation'
import { capitalizeFirstLetter, normalize } from '../../../../utils/string'

const translationSkipRegex =
  /(alternative)|(alternate)|(abbreviation)|(initialism)|(archaic)|(synonym)|(clipping)|(spelling)/gi

export default async function parseTranslations(
  $: cheerio.Root,
  elt: any,
  entry: Entry,
): Promise<Translation[]> {
  const translationsHeader = $(elt).nextAll('ol').first()
  if (translationsHeader.length <= 0) return []
  let translations: Translation[] = []

  for (const li of $(translationsHeader).children('li').get()) {
    if ($(li).find('span.form-of-definition-link .selflink').length) continue
    if ($(li).text().length <= 0) continue
    $(li).children('ol, ul, dl').remove()
    let translation = $(li).text()
    if (translation.match(/This term needs a translation to English/)) continue
    translation = capitalizeFirstLetter(translation.trim().replace(/\.$/, ''))

    if ($(li).find('span.form-of-definition-link').length > 0) {
      if (!translation.match(translationSkipRegex)) continue
      translation +=
        ' ' +
        $(li)
          .find('span.form-of-definition-link')
          .get()
          .map((ref) => `{*${normalize($(ref).text())}*}`)
          .join(' ')
    }

    translations.push({ translation, entry } as Translation)
  }

  translations = translations.filter((translation) => !!translation.translation)
  return translations
}
