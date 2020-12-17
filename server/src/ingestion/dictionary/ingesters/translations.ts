import Translation from "../../../entity/Translation"
import Word from "../../../entity/Word"
import { normalize } from "../../../utils/string"

export default function parseTranslations(
  $: cheerio.Root,
  elt: any,
  word: Word,
): Translation[] {
  const translationsHeader = $(elt).nextAll("ol").first()
  if (translationsHeader.length <= 0) throw new Error(`no translations`)
  let translations: Translation[] = []

  for (const li of $(translationsHeader).children("li").get()) {
    if ($(li).find("span.form-of-definition-link .selflink").length) continue
    if ($(li).text().length <= 0) continue
    $(li).children("ol, ul, dl").remove()
    let translation = $(li).text()
    if (translation.match(/This term needs a translation to English/)) continue
    translation = translation.trim().replace(/\.$/, "")
    translations.push({
      text: translation.charAt(0).toUpperCase() + translation.slice(1),
      word,
    } as Translation)

    if ($(li).find("span.form-of-definition-link").length > 0)
      translations.push({
        text:
          translations.pop()?.text +
          " " +
          $(li)
            .find("span.form-of-definition-link i.Latn.mention")
            .get()
            .map((ref) => `{*${normalize($(ref).text())}*}`)
            .join(" "),
        word,
      } as Translation)
  }
  translations = translations.filter((translation) => !!translation)
  if (!translations.length) throw new Error("no translations")
  return translations
}
