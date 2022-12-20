import praenomenAbbreviationTemplate from '../../../data/dictionary/template/praenomenAbbreviation.json'
import Entry from '../../../server/src/entity/dictionary/Entry'
import Translation from '../../../server/src/entity/dictionary/Translation'
import PrincipalPart from '../../../server/src/entity/dictionary/word/PrincipalPart'
import NounInflection from '../../../server/src/entity/dictionary/word/inflection/NounInflection'
import log from '../../../utils/log'
import { sentenceCase } from '../../../utils/string'
import { createManual } from './ingestManual'

export default async function ingestPraenomenAbbreviations(): Promise<void> {
  log.info('ingesting praenomen abbreviations')
  for (const abbreviation of Object.keys(praenomenAbbreviations)) {
    const praenomen = praenomenAbbreviations[abbreviation]
    const entry = praenomenAbbreviationTemplate as Entry & {
      principalParts: PrincipalPart[]
      inflection: NounInflection
    }
    entry.id = abbreviation.toLowerCase() + ':100'
    entry.principalParts[0].text[0] = abbreviation.toLowerCase()
    entry.principalParts[1].text[0] = (abbreviation + '.').toLowerCase()
    entry.translations = []
    if (praenomen.masculine) {
      entry.translations.push({
        translation: `Praenomen abbreviation: ${sentenceCase(
          praenomen.masculine,
        )} (male)`,
      } as Translation)
    }
    if (praenomen.feminine) {
      entry.translations.push({
        translation: `Praenomen abbreviation: ${sentenceCase(
          praenomen.feminine,
        )} (female)`,
      } as Translation)
    }
    if (praenomen.masculine && !praenomen.feminine) {
      entry.inflection.gender = 'masculine'
    } else if (!praenomen.masculine && praenomen.feminine) {
      entry.inflection.gender = 'feminine'
    } else {
      entry.inflection.gender = 'neuter'
    }
    await createManual(entry)
  }
  log.info('ingested praenomen abbreviations')
}

// data from wikipedia page on praenomen: https://en.wikipedia.org/wiki/Praenomen
const praenomenAbbreviations = {
  a: { masculine: 'aulus', feminine: 'aula' },
  agr: { masculine: 'agrippa' },
  ap: { masculine: 'appius', feminine: 'appia' },
  d: { masculine: 'decimo', feminine: 'decima' },
  f: { masculine: 'faustus', feminine: 'fausta' },
  c: { masculine: 'gaius', feminine: 'gaia' },
  gn: { masculine: 'gnaeus', feminine: 'gnaea' },
  h: { feminine: 'hosta' },
  k: { masculine: 'caeso' },
  l: { masculine: 'lucius', feminine: 'lucia' },
  m: { masculine: 'marcus', feminine: 'marcia' },
  "m'": { masculine: 'manius', feminine: 'mania' },
  mai: { feminine: 'maio' },
  mam: { masculine: 'mamercus', feminine: 'mamerca' },
  min: { feminine: 'mino' },
  n: { masculine: 'numerius', feminine: 'numeria' },
  o: { masculine: 'octavius' },
  oct: { feminine: 'octavia' },
  opet: { masculine: 'opiter' },
  post: { masculine: 'postumus', feminine: 'postuma' },
  p: { masculine: 'publius' },
  pro: { masculine: 'proculus', feminine: 'procula' },
  q: { masculine: 'quintus', feminine: 'quinta' },
  s: { masculine: 'spurius' },
  sp: { feminine: 'spuria' },
  st: { masculine: 'statius', feminine: 'statia' },
  sec: { feminine: 'secunda' },
  seq: { feminine: 'secunda' },
  ser: { masculine: 'servius', feminine: 'servia' },
  sert: { masculine: 'sertor' },
  sex: { masculine: 'sextus', feminine: 'sexta' },
  t: { masculine: 'titus', feminine: 'titia' },
  ti: { masculine: 'tiberius', feminine: 'tiberia' },
  v: { masculine: 'vibius', feminine: 'vibia' },
  vol: { masculine: 'volesus', feminine: 'volusa' },
  vop: { masculine: 'vopiscus', feminine: 'vopisca' },
} as Record<string, { masculine?: string; feminine?: string }>
