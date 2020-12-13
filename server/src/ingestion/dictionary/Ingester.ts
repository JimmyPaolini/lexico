import cheerio from "cheerio"
import cheerioTableParser from "cheerio-tableparser"
import PrincipalPart from "src/entity/PrincipalPart"
import { Pronunciation } from "src/entity/Pronunciation"
import Translation from "src/entity/Translation"
import getPronunciations from "./pronunciation"

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

  ingestTranslations(): Translation[] {
    const $ = this.$
    const elt = this.elt
    const translationsHeader = $(elt).nextAll("ol").first()
    if (translationsHeader.length <= 0) throw new Error(`no translations`)
    let translations: Translation[] = []

    for (const li of $(translationsHeader).children("li").get()) {
      if ($(li).find("span.form-of-definition-link .selflink").length) continue
      if ($(li).text().length <= 0) continue
      $(li).children("ol, ul, dl").remove()
      let translation = $(li).text()
      if (translation.match(/This term needs a translation to English/))
        continue
      translation = translation.trim().replace(/\.$/, "")
      translations.push({
        text: translation.charAt(0).toUpperCase() + translation.slice(1),
      } as Translation)

      if ($(li).find("span.form-of-definition-link").length > 0)
        translations.push({
          text:
            translations.pop()?.text +
            " " +
            $(li)
              .find("span.form-of-definition-link i.Latn.mention")
              .get()
              .map(ref => `{*${normalize($(ref).text())}*}`)
              .join(" "),
        } as Translation)
    }
    translations = translations.filter(translation => !!translation)
    if (!translations.length) throw new Error("no translations")
    return translations
  }

  firstPrincipalPartName: string = ""
  ingestPrincipalParts(): PrincipalPart[] {
    const $ = this.$
    const elt = this.elt
    let principalParts: PrincipalPart = []

    principalParts.push({
      name: this.firstPrincipalPartName,
      text: $(elt)
        .children("strong.Latn.headword")
        .get()
        .map(p1 => $(p1).text().toLowerCase())
        .join(" or "),
    } as PrincipalPart)

    for (const b of $(elt).children("b").get()) {
      if ($(b).prev("i").text() === "or") {
        principalParts.push({
          text: principalParts.pop() + ` or ${$(b).text().toLowerCase()}`,
        })
      } else {
        principalParts.push({
          text: `${$(b).prev("i").text()}: ${$(b).text().toLowerCase()}`,
        })
      }
    }

    return principalParts
  }
  getMacWord(): string {
    return this.ingestPrincipalParts()[0].text.split(": ")[1]
  }
  // getNormWord() {
  //   return this.getMacWord.norm()
  // }

  ingestForms() {
    const $ = this.$
    const elt = this.elt
    const table = this.parseFormTable($, elt)
    if (!table) throw new Error(`no forms`)

    function parseWords(cell: string) {
      cell = cell.trim().replace(/[\d*]/g, "").toLowerCase()
      return cell.split(", ")
    }

    function findIdentifiers(i: number, j: number, table: any) {
      const identifiers = new Set()
      const isForm = cell =>
        cell.includes("<span ") ||
        cell.includes("—") ||
        cell.includes(" + ") ||
        !cell.length

      let m = i
      while (isForm(table[m][j])) m--
      while (m >= 0 && !isForm(table[m][j]))
        identifiers.add(
          table[m--][j].replace(/\.|\//g, "").toLowerCase().trim(),
        )

      let n = j
      while (isForm(table[i][n])) n--
      while (n >= 0 && !isForm(table[i][n]))
        identifiers.add(
          table[i][n--].replace(/\.|\//g, "").toLowerCase().trim(),
        )

      if (["Singular", "Plural"].includes(table[++m][++n]))
        identifiers.add(table[m][n].toLowerCase().trim())
      return Array.from(identifiers)
    }

    this.forms = {}
    this.disorganizedForms = table.reduce((disorganizedForms, row, i) => {
      return row.reduce((_, cell, j) => {
        if (cell.includes("<span ")) {
          const c = cheerio.load(cell)
          const words = c("span")
            .map((_, s) => c(s).text())
            .get()
            .join(", ")
          if (!words.match(/[A-Za-zāēīōūȳ\-\s]+/)) return disorganizedForms
          disorganizedForms.push({
            word: parseWords(words),
            identifiers: findIdentifiers(i, j, table),
          })
        }
        return disorganizedForms
      })
    }, [])
    for (const inflection of JSON.parse(JSON.stringify(this.disorganizedForms)))
      this.sortIdentifiers(inflection, this.forms)
    delete this.disorganizedForms
  }
  parseFormTable($, elt) {
    const tableHtml = $(elt).nextUntil("h3", "table").first()
    if (tableHtml.length <= 0) return
    const $table = cheerio.load($.html(tableHtml))
    cheerioTableParser($table)
    let table = $table("table").parsetable(true, true, false)

    table = table[0].map((col, i) => table.map(row => row[i]))
    table = table.map(tr => {
      return tr.map(tc => {
        const c = cheerio.load(tc)
        if (c("span").length <= 0) return c.text().trim()
        // Headers
        else return c("body").html()
      })
    })

    return table
  }
  sortIdentifiers(inflection, obj) {
    const identifier = inflection.identifiers.pop()
    if (!inflection.identifiers.length) {
      obj[identifier] = inflection.word
      return obj
    } else {
      if (!obj[identifier]) obj[identifier] = {}
      obj[identifier] = this.sortIdentifiers(inflection, obj[identifier])
      return obj
    }
  }

  ingestPronunciation(): Pronunciation {
    const $ = this.$
    const elt = this.elt
    let pronunciation = {
      classical: {
        phonemes: getPronunciations(this.getMacWord(), "classical"),
      },
      ecclesiastical: {
        phonemes: getPronunciations(this.getMacWord(), "ecclesiastical"),
      },
      vulgar: { phonemes: getPronunciations(this.getMacWord(), "vulgar") },
    } as Pronunciation

    const pronunciationHeader = $(elt)
      .prevAll(':header:contains("Pronunciation")')
      .first()
    if ($(pronunciationHeader).length <= 0) throw new Error(`no pronunciation`)

    const parsePhonics = (pronunciations: string[]) => {
      const parsed: any = {}
      for (const pronunciation of pronunciations)
        if (/\/.*\//.test(pronunciation)) parsed.phonemic = pronunciation.trim()
        else if (/\[.*\]/.test(pronunciation))
          parsed.phonetic = pronunciation.trim()
      return parsed
    }

    for (const pr of $(pronunciationHeader).next("ul").children().get()) {
      const pronunciations = $(pr).text().split("IPA(key):")[1].split(", ")
      if ($(pr).find("a").text().includes("Classical")) {
        pronunciation.classical = Object.assign(
          pronunciation.classical,
          parsePhonics(pronunciations),
        )
      } else if ($(pr).find("a").text().includes("Ecclesiastical")) {
        pronunciation.ecclesiastical = Object.assign(
          pronunciation.ecclesiastical,
          parsePhonics(pronunciations),
        )
      } else if ($(pr).find("a").text().includes("Vulgar")) {
        pronunciation.vulgar = Object.assign(
          pronunciation.vulgar,
          parsePhonics(pronunciations),
        )
      }
    }

    return pronunciation
  }

  ingestEtymology(): string {
    const $ = this.$
    const elt = this.elt
    const etymologyHeader = $(elt)
      .prevAll(':header:contains("Etymology")')
      .first()
    if (
      $(etymologyHeader).length <= 0 ||
      $(etymologyHeader).next()[0].name !== "p" ||
      !$(etymologyHeader).next().text().trim().length
    )
      throw new Error(`no etymology`)
    let etymology: string = $(etymologyHeader).next().text().trim()

    const participle = etymology.match(
      /((present)|(perfect)|(future)) ((active)|(passive) )?participle (\(gerundive\) )?of [A-Za-z\u00C0-\u017F]+/i,
    )
    if (participle) this.translations.push(cap1(participle[0].trim()))

    return etymology
  }

  ingestInflection($, elt) {}

  extractForm(text) {
    function getNumber() {
      if (text.match(/singular/i)) return "singular"
      if (text.match(/plural/i)) return "plural"
      return null
    }

    function getCase() {
      if (text.match(/nominative/i)) return "nominative"
      if (text.match(/genitive/i)) return "genitive"
      if (text.match(/dative/i)) return "dative"
      if (text.match(/accusative/i)) return "accusative"
      if (text.match(/ablative/i)) return "ablative"
      if (text.match(/vocative/i)) return "vocative"
      if (text.match(/locative/i)) return "locative"
      return null
    }

    function getMood() {
      if (text.match(/indicative/i)) return "indicative"
      if (text.match(/subjunctive/i)) return "subjunctive"
      if (text.match(/imperative/i)) return "imperative"
      return null
    }

    function getVoice() {
      if (text.match(/active/i)) return "active"
      if (text.match(/passive/i)) return "passive"
      return null
    }

    function getTense() {
      if (text.match(/present/i)) return "present"
      if (text.match(/imperfect/i)) return "imperfect"
      if (text.match(/future/i)) return "future"
      if (text.match(/perfect/i)) return "perfect"
      if (text.match(/pluperfect/i)) return "pluperfect"
      if (text.match(/future perfect/i)) return "future perfect"
      return null
    }

    function getPerson() {
      if (text.match(/first/i)) return "first"
      if (text.match(/second/i)) return "second"
      if (text.match(/third/i)) return "third"
      return null
    }

    function getGender() {
      if (text.match(/masculine/i)) return "masculine"
      if (text.match(/feminine/i)) return "feminine"
      if (text.match(/neuter/i)) return "neuter"
      return null
    }

    function getDegree() {
      if (text.match(/positive/i)) return "positive"
      if (text.match(/comparative/i)) return "comparative"
      if (text.match(/superlative/i)) return "superlative"
      return null
    }

    if (this.partOfSpeech.includes("noun"))
      return {
        case: getCase(),
        number: getNumber(),
      }
    if (this.partOfSpeech === "verb")
      if (text.match(/gerund/i))
        return {
          mood: "gerund",
          case: getCase(),
        }
      else if (text.match(/infinitive/i))
        return {
          mood: "infintive",
          voice: getVoice(),
          tense: getTense(),
        }
      else if (text.match(/supine/i))
        return {
          mood: "supine",
          case: getCase(),
        }
      else
        return {
          mood: getMood(),
          voice: getVoice(),
          tense: getTense(),
          number: getNumber(),
          person: getPerson(),
        }
    if (
      [
        "adjective",
        "pronoun",
        "participle",
        "numeral",
        "prefix",
        "suffix",
      ].includes(this.partOfSpeech)
    )
      return {
        case: getCase(),
        gender: getGender(),
        number: getNumber(),
      }
    if (this.partOfSpeech === "adverb")
      return {
        degree: getDegree(),
      }
  }
}

function normalize(str: string): string {
  if (!str) return ""
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
