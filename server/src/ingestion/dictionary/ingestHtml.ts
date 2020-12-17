import cheerio from "cheerio"
import { Logger } from "tslog"
import { getConnection } from "typeorm"
import Word from "../../entity/Word"
import { normalize } from "../../utils/string"
import Ingester from "./Ingester"
import Adjective from "./ingesters/partOfSpeech/Adjective"
import Adverb from "./ingesters/partOfSpeech/Adverb"
import Conjunction from "./ingesters/partOfSpeech/Conjunction"
import Noun from "./ingesters/partOfSpeech/Noun"
import Prefix from "./ingesters/partOfSpeech/Prefix"
import Preposition from "./ingesters/partOfSpeech/Preposition"
import Pronoun from "./ingesters/partOfSpeech/Pronoun"
import Verb from "./ingesters/partOfSpeech/Verb"

const log = new Logger()

export default async function ingestHtml(data: { word: string; html: string }) {
  log.info("ingesting", data.word)
  const Words = getConnection().getRepository(Word)
  const $ = cheerio.load(data.html)
  try {
    for (const elt of $("p:has(strong.Latn.headword)").get()) {
      const word = await ingestWord($, elt, data.word)
      await Words.save(word)
    }
  } catch (e) {
    log.error(e)
  }
}

async function ingestWord(
  $: cheerio.Root,
  elt: any,
  wordString: string,
): Promise<Word> {
  const word = new Word()
  word.word = normalize(wordString)
  word.partOfSpeech = Ingester.getPartOfSpeech($, elt)

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
  const ingester: Ingester = new ingestersMap[word.partOfSpeech]($, elt, word)

  word.inflection = ingester.ingestInflection()
  word.principalParts = ingester.ingestPrincipalParts()
  word.translations = ingester.ingestTranslations()
  word.forms = await ingester.ingestForms()
  word.pronunciation = ingester.ingestPronunciation()
  word.etymology = ingester.ingestEtymology()
  word.roots = [word]

  return word
}
