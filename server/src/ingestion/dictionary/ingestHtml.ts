import cheerio from "cheerio"
import Word from "../../entity/Word"
import Ingester from "./Ingester"
import Noun from "./ingesters/nouns/Noun"
// import Adjective from "./ingesters/adjectives/Adjective"
// import Numeral from "./ingesters/adjectives/Numeral"
// import Participle from "./ingesters/adjectives/Participle"
// import Prefix from "./ingesters/adjectives/Prefix"
// import Pronoun from "./ingesters/adjectives/Pronoun"
// import Suffix from "./ingesters/adjectives/Suffix"
// import Adverb from "./ingesters/Adverb"
// import ProperNoun from "./ingesters/nouns/ProperNoun"
// import Preposition from "./ingesters/Preposition"
// import Conjunction from "./ingesters/simple/Conjunction"
// import Interjection from "./ingesters/simple/Interjection"
// import Phrase from "./ingesters/simple/Phrase"
// import Verb from "./ingesters/Verb"

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
    noun: Noun,
    // "proper noun": ProperNoun,
    // "verb": Verb,
    // "adjective": Adjective,
    // "participle": Participle,
    // "numeral": Numeral,
    // "prefix": Prefix,
    // "suffix": Suffix,
    // "pronoun": Pronoun,
    // "determiner": Pronoun,
    // "adverb": Adverb,
    // "preposition": Preposition,
    // "conjunction": Conjunction,
    // "interjection": Interjection,
    // "phrase": Phrase,
    // "proverb": Phrase,
    // "idiom": Phrase,
  }
  const ingester: Ingester = new ingestersMap[word.partOfSpeech]($, elt)

  word.inflection = ingester.ingestInflection()
  word.principalParts = ingester.ingestPrincipalParts()
  word.translations = ingester.ingestTranslations()
  word.pronunciation = ingester.ingestPronunciation()
  word.etymology = ingester.ingestEtymology()

  console.log(JSON.stringify(word, null, 2))
}
