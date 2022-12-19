import { getConnection } from 'typeorm'

import Entry from '../../../server/src/entity/dictionary/Entry'
import Translation from '../../../server/src/entity/dictionary/Translation'
import log from '../../../utils/log'
import { escapeCapitals } from '../../../utils/string'

export async function ingestTranslationReference(
  translation: Translation,
): Promise<void> {
  const Translations = getConnection().getRepository(Translation)
  const Entries = getConnection().getRepository(Entry)

  let reference = translation.translation.match(/\{\*.+\*\}/)![0].slice(2, -2)
  if (reference.match(/\(.*\)/)) reference = reference.replace(/ ?\(.*\)/, '')

  const entries = await Entries.createQueryBuilder('entry')
    .where(`entry.id ~* '${escapeCapitals(reference)}:\\d'`)
    .getMany()
  const entry =
    entries.find(
      (entry) => entry.partOfSpeech === translation.entry.partOfSpeech,
    ) || entries[0]
  if (!entry) log.info(translation)

  await Translations.save(
    (entry?.translations || []).map(
      (referencedTranslation) =>
        new Translation(referencedTranslation.translation, translation.entry),
    ),
  )

  translation.translation = translation.translation
    .replace(/{\*.*\*}/g, '')
    .trim()
  await Translations.save(translation)
}
