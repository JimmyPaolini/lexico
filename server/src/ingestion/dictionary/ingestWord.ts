import cheerio from "cheerio"
import path from "path"
import { Logger } from "tslog"
import { getConnection, Repository } from "typeorm"
import Entry from "../../entity/Entry"
import Word from "../../entity/Word"
import Ingester from "./Ingester"
import Adjective from "./ingester/partOfSpeech/Adjective"
import Adverb from "./ingester/partOfSpeech/Adverb"
import Conjunction from "./ingester/partOfSpeech/Conjunction"
import Noun from "./ingester/partOfSpeech/Noun"
import Prefix from "./ingester/partOfSpeech/Prefix"
import Preposition from "./ingester/partOfSpeech/Preposition"
import Pronoun from "./ingester/partOfSpeech/Pronoun"
import Verb from "./ingester/partOfSpeech/Verb"

export default async function ingestWord(wordString: string) {
  const log = new Logger()
  log.info("ingesting entry", wordString)
  const data = require(path.join(
    process.cwd(),
    `./data/wiktionary/lemma/${wordString}.json`,
  ))
  const Entries = getConnection().getRepository(Entry)
  const $ = cheerio.load(data.html)

  try {
    for (const elt of $("p:has(strong.Latn.headword)").get()) {
      const word = await ingestEtymology(wordString, $, elt, Entries)
      await Entries.save(word)
    }
  } catch (e) {
    log.error(e)
  }
}

async function ingestEtymology(
  wordString: string,
  $: cheerio.Root,
  elt: any,
  Entries: Repository<Entry>,
): Promise<Entry> {
  const word = await Entries.save({
    word: wordString,
    partOfSpeech: Ingester.getPartOfSpeech($, elt),
  })

  const ingestersMap: { [key: string]: any } = {
    noun: Noun,
    properNoun: Noun,
    verb: Verb,
    adjective: Adjective,
    participle: Adjective,
    numeral: Adjective,
    suffix: Adjective,
    prefix: Prefix,
    pronoun: Pronoun,
    determiner: Pronoun,
    adverb: Adverb,
    preposition: Preposition,
    conjunction: Conjunction,
    interjection: Conjunction,
    phrase: Conjunction,
    proverb: Conjunction,
    idiom: Conjunction,
  }
  const Words = getConnection().getRepository(Word)
  const IngesterConstructor = ingestersMap[word.partOfSpeech]
  const ingester: Ingester = new IngesterConstructor($, elt, word, Words)

  word.inflection = await ingester.ingestInflection()
  word.principalParts = await ingester.ingestPrincipalParts()
  word.etymology = ingester.ingestEtymology()
  word.translations = ingester.ingestTranslations()
  word.pronunciation = ingester.ingestPronunciation()
  word.forms = await ingester.ingestForms()

  return word
}
