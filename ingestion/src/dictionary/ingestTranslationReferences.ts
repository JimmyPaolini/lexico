import { FindManyOptions, getConnection, Like } from "typeorm"
import Translation from "../../../entity/dictionary/Translation"
import log from "../../../utils/log"
import { ingestTranslationReference } from "./ingestTranslationReference"

export default async function ingestTranslationReferences() {
  log.info("Ingesting Translation References")
  const Translations = getConnection().getRepository(Translation)
  const params = {
    where: { translation: Like("%{*%*}%") }, //`"translation" ~* '{\\*.*\\*}'`,
    order: { translation: "ASC" },
    relations: ["entry"],
    take: 100,
  } as FindManyOptions<Translation>
  let skip = 0
  let translations = await Translations.find({ ...params, skip })
  while (translations.length) {
    log.info(
      "selected",
      translations.length,
      "from translation",
      skip,
      translations[0].translation,
    )
    for (const translation of translations) {
      await ingestTranslationReference(translation)
    }
    skip += params.take as number
    translations = await Translations.find({ ...params, skip })
  }
  log.info("Ingested Translation References")
  return true
}
