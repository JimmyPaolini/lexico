import cheerio from "cheerio"
import path from "path"
import { Logger } from "tslog"
import { getConnection, Repository } from "typeorm"
import Word from "../../entity/Word"
import { normalize } from "../../utils/string"
import Ingester from "./Ingester"
import Adjective from "./ingester/partOfSpeech/Adjective"
import Adverb from "./ingester/partOfSpeech/Adverb"
import Conjunction from "./ingester/partOfSpeech/Conjunction"
import Noun from "./ingester/partOfSpeech/Noun"
import Prefix from "./ingester/partOfSpeech/Prefix"
import Preposition from "./ingester/partOfSpeech/Preposition"
import Pronoun from "./ingester/partOfSpeech/Pronoun"
import Verb from "./ingester/partOfSpeech/Verb"

const log = new Logger()

export default async function ingestWord(wordString: string) {
  log.info("ingesting root", wordString)
  const data = require(path.join(
    process.cwd(),
    `./data/wiktionary/lemma/${wordString}.json`,
  ))
  const Words = getConnection().getRepository(Word)
  const $ = cheerio.load(data.html)

  try {
    for (const elt of $("p:has(strong.Latn.headword)").get()) {
      const word = await ingestEtymology($, elt, data.word, Words)
      await Words.save(word)
    }
  } catch (e) {
    log.error(e.toString())
  }
}

async function ingestEtymology(
  $: cheerio.Root,
  elt: any,
  wordString: string,
  Words: Repository<Word>,
): Promise<Word> {
  const word = Words.create({
    word: normalize(wordString),
    partOfSpeech: Ingester.getPartOfSpeech($, elt),
  })

  const ingester: Ingester = new ingestersMap[word.partOfSpeech]($, elt, word)

  word.inflection = ingester.ingestInflection()
  word.principalParts = ingester.ingestPrincipalParts()
  word.etymology = ingester.ingestEtymology()
  word.translations = ingester.ingestTranslations()
  word.pronunciation = ingester.ingestPronunciation()
  word.forms = await ingester.ingestForms()
  word.roots = [word]

  return word
}

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
