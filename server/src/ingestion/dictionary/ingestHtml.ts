import cheerio from "cheerio"
import Word from "../../entity/Word"
import { getCircularReplacer } from "../../utils/circularReplacer"
import Ingester from "./Ingester"
import Adjective from "./ingesters/partOfSpeech/Adjective"
import Adverb from "./ingesters/partOfSpeech/Adverb"
import Conjunction from "./ingesters/partOfSpeech/Conjunction"
import Noun from "./ingesters/partOfSpeech/Noun"
import Prefix from "./ingesters/partOfSpeech/Prefix"
import Preposition from "./ingesters/partOfSpeech/Preposition"
import Pronoun from "./ingesters/partOfSpeech/Pronoun"
import Verb from "./ingesters/partOfSpeech/Verb"

export default async function ingestHtml(word: { word: string; html: string }) {
  console.log("ingesting", word)
  const $ = cheerio.load(word.html)
  for (const elt of $("p:has(strong.Latn.headword)").get()) {
    ingestWord($, elt)
  }
}

function ingestWord($: cheerio.Root, elt: any) {
  const word = new Word()
  word.partOfSpeech = Ingester.getPartOfSpeech($, elt)

  const ingestersMap: { [key: string]: any } = {
    "noun": Noun,
    "proper noun": Noun,
    "verb": Verb,
    "adjective": Adjective,
    "participle": Adjective,
    "numeral": Adjective,
    "suffix": Adjective,
    "prefix": Prefix,
    "pronoun": Pronoun,
    "determiner": Pronoun,
    "adverb": Adverb,
    "preposition": Preposition,
    "conjunction": Conjunction,
    "interjection": Conjunction,
    "phrase": Conjunction,
    "proverb": Conjunction,
    "idiom": Conjunction,
  }
  const ingester: Ingester = new ingestersMap[word.partOfSpeech]($, elt)

  word.inflection = ingester.ingestInflection()
  word.principalParts = ingester.ingestPrincipalParts()
  word.translations = ingester.ingestTranslations()
  word.forms = ingester.ingestForms()
  word.pronunciation = ingester.ingestPronunciation()
  word.etymology = ingester.ingestEtymology()
  word.roots = [word]

  console.log(JSON.stringify(word, getCircularReplacer(), 2))
}
