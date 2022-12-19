import { FindManyOptions, Like, getConnection } from 'typeorm'

import Translation from '../../../server/entity/dictionary/Translation'
import log from '../../../utils/log'
import { ingestTranslationReference } from './ingestTranslationReference'

export default async function ingestTranslationReferences(): Promise<void> {
  log.info('Ingesting Translation References')

  const Translations = getConnection().getRepository(Translation)
  const params = {
    where: { translation: Like('%{*%*}%') },
    order: { translation: 'ASC' },
    relations: ['entry'],
    take: 100,
  } as FindManyOptions<Translation>

  for (
    let translations = await Translations.find(params);
    translations.length;
    translations = await Translations.find(params)
  ) {
    log.info(
      `selected ${translations.length} from translation ${translations[0].translation}`,
    )
    for (const translation of translations) {
      await ingestTranslationReference(translation)
    }
  }

  log.info('Ingested Translation References')
}
