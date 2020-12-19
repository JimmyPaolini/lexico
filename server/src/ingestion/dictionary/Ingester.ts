import { Repository } from "typeorm"
import Entry from "../../entity/Entry"
import Translation from "../../entity/Translation"
import Word from "../../entity/Word"
import { Forms } from "../../entity/word/Forms"
import { Inflection } from "../../entity/word/Inflection"
import PrincipalPart from "../../entity/word/PrincipalPart"
import { Pronunciation } from "../../entity/word/Pronunciation"
import parseEtymology from "./ingester/etymology"
import parseForms from "./ingester/form"
import parsePrincipalParts from "./ingester/principalPart"
import parsePronunciation from "./ingester/pronunciation"
import parseTranslations from "./ingester/translation"

export default abstract class Ingester {
  $: cheerio.Root
  elt: any
  entry: Entry
  Words: Repository<Word>

  constructor(
    $: cheerio.Root,
    elt: any,
    entry: Entry,
    Words: Repository<Word>,
  ) {
    this.$ = $
    this.elt = elt
    this.entry = entry
    this.Words = Words
  }

  static getPartOfSpeech($: cheerio.Root, elt: any): PartOfSpeech {
    return $(elt)
      .prevAll(":header")
      .first()
      .text()
      .toLowerCase()
      .replace(/(\[edit])|\d+/g, "")
      .trim()
      .replace("proper noun", "properNoun") as PartOfSpeech
  }

  abstract ingestInflection(): Promise<Inflection>

  firstPrincipalPartName: string = ""
  principalParts: PrincipalPart[]
  async ingestPrincipalParts(): Promise<PrincipalPart[]> {
    this.principalParts = await parsePrincipalParts(
      this,
      this.$,
      this.elt,
      this.firstPrincipalPartName,
    )
    return this.principalParts
  }

  translations: Translation[]
  ingestTranslations(): Translation[] {
    const translations = parseTranslations(this.$, this.elt, this.entry)
    if (this.translations) this.translations.unshift(...translations)
    else this.translations = translations
    return this.translations
  }

  async ingestForms(): Promise<Forms | null> {
    return await parseForms(this.$, this.elt, this.entry, this.Words)
  }

  macronizedWord: string
  ingestPronunciation(): Pronunciation {
    return parsePronunciation(this, this.$, this.elt, this.macronizedWord)
  }

  ingestEtymology(): string {
    return parseEtymology(this, this.$, this.elt)
  }

  ingestSynonyms(): Entry[] {
    return []
  }

  ingestAntonyms(): Entry[] {
    return []
  }
}
