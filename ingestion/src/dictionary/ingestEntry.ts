import cheerio from 'cheerio'
import path from 'path'
import { getConnection } from 'typeorm'

import Entry from '../../../entity/dictionary/Entry'
import Translation from '../../../entity/dictionary/Translation'
import { PartOfSpeech } from '../../../entity/dictionary/word/PartOfSpeech'
import log from '../../../utils/log'
import { normalize } from '../../../utils/string'
import Ingester from './Ingester'
import Adjective from './ingester/partOfSpeech/Adjective'
import Adverb from './ingester/partOfSpeech/Adverb'
import Conjunction from './ingester/partOfSpeech/Conjunction'
import Noun from './ingester/partOfSpeech/Noun'
import Prefix from './ingester/partOfSpeech/Prefix'
import Preposition from './ingester/partOfSpeech/Preposition'
import Pronoun from './ingester/partOfSpeech/Pronoun'
import Verb from './ingester/partOfSpeech/Verb'

export default async function ingestEntryWord(
  entryWord: string,
): Promise<void> {
  // log.info("ingesting entry", entryWord)
  const data = require(path.join(
    process.cwd(),
    `./data/wiktionary/${entryWord}.json`,
  ))
  const $ = cheerio.load(data.html)

  entryWord = normalize(entryWord)
  await Promise.all(
    $('p:has(strong.Latn.headword)')
      .get()
      .map(async (elt, i) => await ingestEntry(entryWord, $, elt, i)),
  )
  // for (const elt of $("p:has(strong.Latn.headword)").get()) {
  //   await ingestEntry(entryWord, $, elt)
  // }
}

async function ingestEntry(
  word: string,
  $: cheerio.Root,
  elt: any,
  i: number,
): Promise<void> {
  const Entries = getConnection().getRepository(Entry)
  const Translations = getConnection().getRepository(Translation)

  const entry = await Entries.save({
    id: word + ':' + i,
    partOfSpeech: Ingester.getPartOfSpeech($, elt),
  })
  try {
    const ingestersMap: { [key in PartOfSpeech]: any } = {
      noun: Noun,
      properNoun: Noun,
      verb: Verb,
      adjective: Adjective,
      participle: Adjective,
      numeral: Adjective,
      suffix: Adjective,
      prefix: Prefix,
      interfix: Prefix,
      circumfix: Prefix,
      pronoun: Pronoun,
      determiner: Pronoun,
      adverb: Adverb,
      preposition: Preposition,
      conjunction: Conjunction,
      interjection: Conjunction,
      abbreviation: Conjunction,
      inflection: Conjunction,
      particle: Conjunction,
      phrase: Conjunction,
      proverb: Conjunction,
      idiom: Conjunction,
    }
    const IngesterConstructor = ingestersMap[entry.partOfSpeech]
    if (!IngesterConstructor) {
      if ((entry.partOfSpeech as PartOfSpeech | '') === '')
        log.info('No partOfSpeech:', entry.id)
      else if ((entry.partOfSpeech as PartOfSpeech | 'letter') !== 'letter')
        log.info('skipping entry', entry)
      await Entries.delete(entry.id)
      return
    }

    const ingester: Ingester = new IngesterConstructor($, elt, entry)
    entry.inflection = await ingester.ingestInflection()
    entry.principalParts = await ingester.ingestPrincipalParts()
    entry.etymology = ingester.ingestEtymology()
    const translations = await ingester.ingestTranslations()
    entry.pronunciation = ingester.ingestPronunciation()
    entry.forms = await ingester.ingestForms()

    await Translations.createQueryBuilder()
      .insert()
      .values(translations)
      .updateEntity(false)
      .execute()
    await Entries.createQueryBuilder()
      .update(Entry)
      .set(entry)
      .where(entry.id)
      .execute()
  } catch (e) {
    log.warn(entry.id, e)
    await Entries.delete(entry.id)
  }
}
