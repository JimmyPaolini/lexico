import { Forms } from "../../entity/forms/Forms"
import PrincipalPart from "../../entity/PrincipalPart"
import { Pronunciation } from "../../entity/Pronunciation"
import Translation from "../../entity/Translation"
import Word from "../../entity/Word"
import parseEtymology from "./ingesters/etymology"
import parseForms from "./ingesters/forms"
import parsePrincipalParts from "./ingesters/principalParts"
import parsePronunciation from "./ingesters/pronunciation"
import parseTranslations from "./ingesters/translations"

export default abstract class Ingester {
  $: cheerio.Root
  elt: any

  constructor($: cheerio.Root, elt: any) {
    this.$ = $
    this.elt = elt
  }

  static getPartOfSpeech($: cheerio.Root, elt: any): PartOfSpeech {
    return $(elt)
      .prevAll(":header")
      .first()
      .text()
      .toLowerCase()
      .replace(/(\[edit])|\d+/g, "")
      .trim() as PartOfSpeech
  }

  abstract ingestInflection(): Inflection

  firstPrincipalPartName: string = ""
  ingestPrincipalParts(): PrincipalPart[] {
    return parsePrincipalParts(
      this,
      this.$,
      this.elt,
      this.firstPrincipalPartName,
    )
  }

  ingestTranslations(): Translation[] {
    return parseTranslations(this.$, this.elt)
  }

  ingestForms(): Forms {
    return parseForms(this.$, this.elt)
  }

  macronizedWord: string
  ingestPronunciation(): Pronunciation {
    return parsePronunciation(this, this.$, this.elt, this.macronizedWord)
  }

  ingestEtymology(): string {
    return parseEtymology(this.$, this.elt)
  }

  ingestSynonyms(): Word[] {
    return []
  }

  ingestAntonyms(): Word[] {
    return []
  }
}
