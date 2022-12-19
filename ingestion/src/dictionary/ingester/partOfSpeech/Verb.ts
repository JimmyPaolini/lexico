import cheerio from 'cheerio'

import { Forms } from '../../../../../server/entity/dictionary/word/Forms'
import { Inflection } from '../../../../../server/entity/dictionary/word/Inflection'
import Uninflected from '../../../../../server/entity/dictionary/word/inflection/Uninflected'
import VerbInflection, {
  VerbConjugation,
  verbConjugationRegex,
} from '../../../../../server/entity/dictionary/word/inflection/VerbInflection'
import Ingester from '../../Ingester'
import { parseFormTable, sortIdentifiers } from '../form'

export default class Verb extends Ingester {
  firstPrincipalPartName = 'present active'

  async ingestInflection(): Promise<Inflection> {
    const $ = this.$
    const elt = this.elt
    if (!$(elt).text().includes(';')) return new Uninflected()
    let conjugation = $(elt).text().trim().split('; ')[1]
    conjugation = conjugation
      .replace(/(conjugation)|[\d[\]]/gi, '')
      .replace(' ,', ',')
      .replace(/\s+/g, ' ')
      .trim()
    const other = conjugation
    if (conjugation.match(/third.*io-variant/)) conjugation = 'third-io'
    else conjugation = conjugation.match(verbConjugationRegex)?.[0] || ''

    if (!conjugation.length) return new VerbInflection('', other)
    return new VerbInflection(conjugation as VerbConjugation, other)
  }

  async ingestForms(): Promise<Forms | null> {
    const $ = this.$
    const elt = this.elt
    const table = parseFormTable($, elt)
    if (!table) return null

    function parseWords(cell: string, number: string, person: string) {
      const isMood = (word: string) =>
        [
          'indicative',
          'subjunctive',
          'imperative',
          'non-finite',
          'verbal nouns',
        ].includes(word)
      const isVoice = (word: string) => ['active', 'passive'].includes(word)
      const isTense = (word: string) =>
        [
          'present',
          'imperfect',
          'future',
          'perfect',
          'pluperfect',
          'future perfect',
        ].includes(word)

      cell = cell
        .trim()
        .replace(/[\d*]+/g, '')
        .toLowerCase()
      if (cell.includes(', ')) return cell.split(', ')
      else if (cell.includes(' + ')) {
        const identifiers = cell.split(' ')
        let mood = ''
        let voice = ''
        let tense = ''
        for (const identifier of identifiers)
          if (isMood(identifier)) mood = identifier
          else if (isVoice(identifier)) voice = identifier
          else if (isTense(identifier)) tense = identifier
        return sum_esse_fui[mood][voice][tense][number][person].map(
          (ext: string) => identifiers[0] + ' ' + ext,
        )
      } else return [cell]
    }

    function findIdentifiers(i: number, j: number, table: any) {
      const identifiers = new Set()
      const isForm = (cell: string) =>
        cell.includes('<span ') || cell.includes('—') || cell.includes(' + ')

      let m = i
      while (isForm(table[m][j])) m--
      identifiers
        .add(table[m][j].toLowerCase().trim())
        .add(table[m - 1][j].toLowerCase().trim())

      let n = j
      while (isForm(table[i][n])) n--
      identifiers
        .add(table[i][n].toLowerCase().trim())
        .add(table[i][n - 1].toLowerCase().trim())

      identifiers.add(table[m][n].toLowerCase().trim())
      return Array.from(identifiers).map((id: any) =>
        (id as string)
          .replace(/future\s?perfect/i, 'futurePerfect')
          .replace('non-finite forms', 'nonFinite')
          .replace('verbal nouns', 'verbalNouns')
          .replace(/s$/, ''),
      )
    }

    const forms = {}
    const disorganizedForms = table.reduce(
      (disorganizedForms: any[], row: any[], i: number) => {
        return row.reduce((_, cell, j) => {
          if (cell.includes('<span ') || cell.includes(' + ')) {
            const c = cheerio.load(cell)
            const identifiers = findIdentifiers(i, j, table)
            if (!(c as any).text().match(/[A-Za-zāēīōūȳ\-\s]+/))
              return disorganizedForms
            disorganizedForms.push({
              word: parseWords(
                (c as any).text(),
                identifiers[1],
                identifiers[0],
              ),
              identifiers,
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
}

const sum_esse_fui: { [key: string]: any } = {
  indicative: {
    active: {
      present: {
        singular: {
          first: ['sum'],
          second: ['es'],
          third: ['est'],
        },
        plural: {
          first: ['sumus'],
          second: ['estis'],
          third: ['sunt'],
        },
      },
      imperfect: {
        singular: {
          first: ['eram'],
          second: ['erās'],
          third: ['erat'],
        },
        plural: {
          first: ['erāmus'],
          second: ['erātis'],
          third: ['erant'],
        },
      },
      future: {
        singular: {
          first: ['erō'],
          second: ['eris'],
          third: ['erit'],
        },
        plural: {
          first: ['erimus'],
          second: ['eritis'],
          third: ['erunt'],
        },
      },
      perfect: {
        singular: {
          first: ['fuī'],
          second: ['fuistī'],
          third: ['fuit'],
        },
        plural: {
          first: ['fuimus'],
          second: ['fuistis'],
          third: ['fuērunt', 'fuēre'],
        },
      },
      pluperfect: {
        singular: {
          first: ['fueram'],
          second: ['fuerās'],
          third: ['fuerat'],
        },
        plural: {
          first: ['fuerāmus'],
          second: ['fuerātis'],
          third: ['fuerant'],
        },
      },
      'future perfect': {
        singular: {
          first: ['fuerō'],
          second: ['fueris'],
          third: ['fuerit'],
        },
        plural: {
          first: ['fuerimus'],
          second: ['fueritis'],
          third: ['fuerint'],
        },
      },
    },
  },
  subjunctive: {
    active: {
      present: {
        singular: {
          first: ['sim'],
          second: ['sīs'],
          third: ['sit'],
        },
        plural: {
          first: ['sīmus'],
          second: ['sītis'],
          third: ['sint'],
        },
      },
      imperfect: {
        singular: {
          first: ['essem', 'forem'],
          second: ['essēs', 'forēs'],
          third: ['esset', 'foret'],
        },
        plural: {
          first: ['essēmus', 'forēmus'],
          second: ['essētis', 'forētis'],
          third: ['essent', 'forent'],
        },
      },
      perfect: {
        singular: {
          first: ['fuerim'],
          second: ['fuerīs'],
          third: ['fuerit'],
        },
        plural: {
          first: ['fuerīmus'],
          second: ['fuerītis'],
          third: ['fuerint'],
        },
      },
      pluperfect: {
        singular: {
          first: ['fuissem'],
          second: ['fuissēs'],
          third: ['fuisset'],
        },
        plural: {
          first: ['fuissēmus'],
          second: ['fuissētis'],
          third: ['fuissent'],
        },
      },
    },
  },
  imperative: {
    active: {
      present: {
        singular: {
          second: ['es'],
        },
        plural: {
          second: ['este'],
        },
      },
      future: {
        singular: {
          second: ['estō'],
          third: ['estō'],
        },
        plural: {
          second: ['estōte'],
          third: ['suntō'],
        },
      },
    },
  },
  'non-finite forms': {
    infinitives: {
      active: {
        present: ['esse'],
        perfect: ['fuisse'],
        future: ['futūrum esse', 'fore'],
      },
    },
    participles: {
      active: {
        future: ['futūrus'],
      },
    },
  },
}
