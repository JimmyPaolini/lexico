import cheerio from "cheerio"
import Word from "src/entity/Word"
import Ingester from "./Ingester"
import Adjective from "./ingesters/adjectives/Adjective"
import Numeral from "./ingesters/adjectives/Numeral"
import Participle from "./ingesters/adjectives/Participle"
import Pronoun from "./ingesters/adjectives/Pronoun"
import Adverb from "./ingesters/Adverb"
import Noun from "./ingesters/nouns/Noun"
import ProperNoun from "./ingesters/nouns/ProperNoun"
import Preposition from "./ingesters/Preposition"
import Conjunction from "./ingesters/simple/Conjunction"
import Interjection from "./ingesters/simple/Interjection"
import Phrase from "./ingesters/simple/Phrase"
import Verb from "./ingesters/Verb"

export default async function ingestHtml(word: { word: string; html: string }) {
  const $ = cheerio.load(word.html)
  for (const elt of $("p:has(strong.Latn.headword)").get()) {
    ingestWord($, elt)
  }
}

function ingestWord($: cheerio.Root, elt: any) {
  const word = new Word()
  word.partOfSpeech = Ingester.getPartOfSpeech($, elt)
  const ingester: Ingester = new {
    "noun": Noun,
    "proper noun": ProperNoun,
    "verb": Verb,
    "adjective": Adjective,
    "participle": Participle,
    "numeral": Numeral,
    "prefix": Prefix,
    "suffix": Suffix,
    "pronoun": Pronoun,
    "determiner": Pronoun,
    "adverb": Adverb,
    "preposition": Preposition,
    "conjunction": Conjunction,
    "interjection": Interjection,
    "phrase": Phrase,
    "proverb": Phrase,
    "idiom": Phrase,
  }[word.partOfSpeech as string]($, elt)

  word.translations = ingester.ingestTranslations()
  word.principalParts = ingester.ingestPrincipalParts()
  word.pronunciation = ingester.ingestPronunciation()
  word.etymology = ingester.ingestEtymology()
}
