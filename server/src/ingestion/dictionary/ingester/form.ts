import cheerio from "cheerio"
import cheerioTableParser from "cheerio-tableparser"
import { Logger } from "tslog"
import { getConnection, Repository } from "typeorm"
import { Forms } from "../../../entity/forms/Forms"
import Word from "../../../entity/Word"
import { normalize } from "../../../utils/string"

const log = new Logger()

export default async function parseForms(
  $: cheerio.Root,
  elt: any,
  word: Word,
): Promise<Forms> {
  const table = parseFormTable($, elt)
  if (!table) throw new Error(`no forms`)

  function parseWords(cell: string) {
    return cell.trim().replace(/[\d*]/g, "").toLowerCase().split(", ")
  }

  function findIdentifiers(i: number, j: number, table: any) {
    const identifiers = new Set()
    const isForm = (cell: string) =>
      cell.includes("<span ") ||
      cell.includes("—") ||
      cell.includes(" + ") ||
      !cell.length

    let m = i
    while (isForm(table[m][j])) m--
    while (m >= 0 && !isForm(table[m][j]))
      identifiers.add(table[m--][j].replace(/\.|\//g, "").toLowerCase().trim())

    let n = j
    while (isForm(table[i][n])) n--
    while (n >= 0 && !isForm(table[i][n]))
      identifiers.add(table[i][n--].replace(/\.|\//g, "").toLowerCase().trim())

    if (["Singular", "Plural"].includes(table[++m][++n]))
      identifiers.add(table[m][n].toLowerCase().trim())
    return Array.from(identifiers)
  }

  let forms = {}
  let disorganizedForms = table.reduce(
    (disorganizedForms: any, row: string[], i: number) => {
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
    },
    [],
  )
  const Words = getConnection().getRepository(Word)
  for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
    sortIdentifiers(inflection, forms)
    for (const wordString of inflection.word) {
      await insertForm(wordString, word, Words)
    }
  }
  return forms as Forms
}
export function parseFormTable($: cheerio.Root, elt: any) {
  const tableHtml = $(elt).nextUntil("h3", "table").first()
  if (tableHtml.length <= 0) return
  const $table = cheerio.load($.html(tableHtml))
  cheerioTableParser($table)
  let table = ($table("table") as any).parsetable(true, true, false)

  table = table[0].map((_: any, i: number) => table.map((row: any) => row[i]))
  table = table.map((tr: any) => {
    return tr.map((tc: any) => {
      const c = cheerio.load(tc)
      if (c("span").length <= 0) return (c as any).text().trim()
      // Headers
      else return c("body").html()
    })
  })

  return table
}
export function sortIdentifiers(inflection: any, obj: any) {
  const identifier = inflection.identifiers.pop()
  if (!inflection.identifiers.length) {
    obj[identifier] = inflection.word
    return obj
  } else {
    if (!obj[identifier]) obj[identifier] = {}
    obj[identifier] = sortIdentifiers(inflection, obj[identifier])
    return obj
  }
}

export async function insertForm(
  wordString: string,
  word: Word,
  Words: Repository<Word>,
) {
  if (normalize(wordString).toLowerCase() === word.word.toLowerCase()) return
  log.info("ingesting form", normalize(wordString))
  let wordForm = await Words.findOne({
    word: normalize(wordString),
    partOfSpeech: word.partOfSpeech,
  })
  if (!wordForm)
    wordForm = Words.create({
      word: normalize(wordString),
      partOfSpeech: word.partOfSpeech,
    })
  if (!wordForm.roots) wordForm.roots = []
  wordForm.roots = [...wordForm.roots, word]
  await Words.save(wordForm)
}
