import cheerio from 'cheerio'
import cheerioTableParser from 'cheerio-tableparser'

import Entry from '../../../../server/src/entity/dictionary/Entry'
import { Forms } from '../../../../server/src/entity/dictionary/word/Forms'
import { isCase, isGender, isNumber } from '../../utils/forms'

//
export default async function parseForms(
  $: cheerio.Root,
  elt: any,
  entry: Entry,
): Promise<Forms | null> {
  const table = parseFormTable($, elt)
  if (!table) return null

  function parseWords(cell: string) {
    return cell.trim().replace(/[\d*]/g, '').toLowerCase().split(', ')
  }

  function findIdentifiers(i: number, j: number, table: any) {
    const identifiers = new Set<string>()
    const isForm = (cell: string) =>
      cell.includes('<span ') ||
      cell.includes('—') ||
      cell.includes(' + ') ||
      !cell.length

    let m = i
    while (isForm(table[m][j])) m--
    while (m >= 0 && !isForm(table[m][j]))
      identifiers.add(table[m--][j].replace(/\.|\//g, '').toLowerCase().trim())

    let n = j
    while (isForm(table[i][n])) n--
    while (n >= 0 && !isForm(table[i][n]))
      identifiers.add(table[i][n--].replace(/\.|\//g, '').toLowerCase().trim())

    if (['Singular', 'Plural'].includes(table[++m][++n]))
      identifiers.add(table[m][n].toLowerCase().trim())

    if (
      ['adjective', 'participle', 'numeral', 'suffix'].includes(
        entry.partOfSpeech,
      )
    ) {
      return [
        [...identifiers].find((identifier: string) => isNumber(identifier)),
        [...identifiers].find((identifier: string) => isCase(identifier)),
        [...identifiers].find((identifier: string) => isGender(identifier)) ||
          'neuter',
      ]
    } else return [...identifiers]
  }

  const forms = {}
  const disorganizedForms = table.reduce(
    (disorganizedForms: any, row: string[], i: number) => {
      return row.reduce((_, cell, j) => {
        if (cell.includes('<span ')) {
          const c = cheerio.load(cell)
          const words = c('span')
            .map((_, s) => c(s).text())
            .get()
            .join(', ')
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
  for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
    sortIdentifiers(inflection, forms)
  }
  return forms as Forms
}
export function parseFormTable($: cheerio.Root, elt: any): any {
  const tableHtml = $(elt).nextUntil('h3', 'table').first()
  if (tableHtml.length <= 0) return
  const $table = cheerio.load($.html(tableHtml))
  cheerioTableParser($table)
  let table = ($table('table') as any).parsetable(true, true, false)

  table = table[0].map((_: any, i: number) => table.map((row: any) => row[i]))
  table = table.map((tr: any) => {
    return tr.map((tc: any) => {
      const c = cheerio.load(tc)
      if (c('span').length <= 0) return (c as any).text().trim()
      // Headers
      else return c('body').html()
    })
  })

  return table
}

export function sortIdentifiers(inflection: any, obj: any): any {
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
