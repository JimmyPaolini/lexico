import Entry from "../../../entity/Entry"
import Translation from "../../../entity/Translation"
import { normalize } from "../../../utils/string"

export default async function parseTranslations(
  $: cheerio.Root,
  elt: any,
  entry: Entry,
): Promise<Translation[]> {
  const translationsHeader = $(elt).nextAll("ol").first()
  if (translationsHeader.length <= 0) return []
  let translations: Translation[] = []

  for (const li of $(translationsHeader).children("li").get()) {
    if ($(li).find("span.form-of-definition-link .selflink").length) continue
    if ($(li).text().length <= 0) continue
    $(li).children("ol, ul, dl").remove()
    let translation = $(li).text()
    if (translation.match(/This term needs a translation to English/)) continue
    translation = translation.trim().replace(/\.$/, "")
    translations.push({
      translation: translation.charAt(0).toUpperCase() + translation.slice(1),
      entry,
    } as Translation)

    if ($(li).find("span.form-of-definition-link").length > 0) {
      translations.push({
        translation:
          translations.pop()?.translation +
          " " +
          $(li)
            .find("span.form-of-definition-link i.Latn.mention")
            .get()
            .map((ref) => `{*${normalize($(ref).text())}*}`)
            .join(" "),
        entry,
      } as Translation)
    }
  }
  translations = translations.filter((translation) => !!translation)
  return translations
}
