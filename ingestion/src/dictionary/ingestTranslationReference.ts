import { getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import Translation from "../../../entity/dictionary/Translation"
import { escapeCapitals } from "../../../utils/string"

export async function ingestTranslationReference(translation: Translation) {
  const Translations = getConnection().getRepository(Translation)
  const Entries = getConnection().getRepository(Entry)
  const references = [
    ...(translation.translation.match(/(?<=\{\*)\w*(?=\*\})/) || []),
  ]
  for (const reference of references) {
    // log.info("ingesting translation reference", reference)
    const referencedEntry = await Entries.findOne({
      word: escapeCapitals(reference),
    })
    for (const referencedTranslation of referencedEntry?.translations || []) {
      // log.info("ingesting translation", referencedTranslation.translation)
      const newTranslation = new Translation(
        referencedTranslation.translation,
        translation.entry,
      )
      await Translations.createQueryBuilder()
        .insert()
        .values(newTranslation)
        .updateEntity(false)
        .execute()
    }
  }
  const translationWithoutReferences = translation.translation
    .replace(/{\*.*\*}/g, "")
    .trim()
  await Translations.createQueryBuilder()
    .update()
    .set({ translation: translationWithoutReferences })
    .where({ id: translation.id })
    .execute()
}
