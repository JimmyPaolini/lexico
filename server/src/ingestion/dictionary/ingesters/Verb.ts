import cheerio from "cheerio"
import Ingester from "../Ingester"

export default class Verb extends Ingester {
  firstPrincipalPartName() {
    return "present active"
  }

  ingestInflection($, elt) {
    if (!$(elt).text().includes(";")) throw new Error(`no inflection`)
    this.inflection = $(elt).text().trim().split("; ")[1]
    this.inflection = this.inflection
      .replace(/(conjugation)|[\d\[\]]/gi, "")
      .replace(" ,", ",")
      .replace(/\s+/g, " ")
      .trim()

    if (!this.inflection.length) this.inflection = "uninflected"
  }

  ingestForms($, elt) {
    const table = super.parseFormTable($, elt)
    if (!table) throw new Error(`no forms`)

    function parseWords(cell, number, person) {
      const isMood = word =>
        [
          "indicative",
          "subjunctive",
          "imperative",
          "non-finite",
          "verbal nouns",
        ].includes(word)
      const isVoice = word => ["active", "passive"].includes(word)
      const isTense = word =>
        [
          "present",
          "imperfect",
          "future",
          "perfect",
          "pluperfect",
          "future perfect",
        ].includes(word)

      cell = cell
        .trim()
        .replace(/[\d*]+/g, "")
        .toLowerCase()
      if (cell.includes(", ")) return cell.split(", ")
      else if (cell.includes(" + ")) {
        const identifiers = cell.split(" ")
        let mood, voice, tense
        for (const identifier of identifiers)
          if (isMood(identifier)) mood = identifier
          else if (isVoice(identifier)) voice = identifier
          else if (isTense(identifier)) tense = identifier
        return sum_esse_fui[mood][voice][tense][number][person].map(
          ext => identifiers[0] + " " + ext,
        )
      } else return [cell]
    }

    function findIdentifiers(i, j, table) {
      const identifiers = new Set()
      const isForm = cell =>
        cell.includes("<span ") || cell.includes("—") || cell.includes(" + ")

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
      return Array.from(identifiers).map(id =>
        id
          .replace("non-finite forms", "non-finite")
          .replace("verbal nouns", "verbal-nouns")
          .replace(/s$/, ""),
      )
    }

    this.forms = {}
    this.disorganizedForms = table.reduce((disorganizedForms, row, i) => {
      return row.reduce((_, cell, j) => {
        if (cell.includes("<span ") || cell.includes(" + ")) {
          const c = cheerio.load(cell)
          const identifiers = findIdentifiers(i, j, table)
          if (!c.text().match(/[A-Za-zāēīōūȳ\-\s]+/)) return disorganizedForms
          disorganizedForms.push({
            word: parseWords(c.text(), identifiers[1], identifiers[0]),
            identifiers,
          })
        }
        return disorganizedForms
      })
    }, [])
    for (const inflection of JSON.parse(JSON.stringify(this.disorganizedForms)))
      super.sortIdentifiers(inflection, this.forms)
  }
}

const sum_esse_fui = {
  "indicative": {
    active: {
      "present": {
        singular: {
          first: ["sum"],
          second: ["es"],
          third: ["est"],
        },
        plural: {
          first: ["sumus"],
          second: ["estis"],
          third: ["sunt"],
        },
      },
      "imperfect": {
        singular: {
          first: ["eram"],
          second: ["erās"],
          third: ["erat"],
        },
        plural: {
          first: ["erāmus"],
          second: ["erātis"],
          third: ["erant"],
        },
      },
      "future": {
        singular: {
          first: ["erō"],
          second: ["eris"],
          third: ["erit"],
        },
        plural: {
          first: ["erimus"],
          second: ["eritis"],
          third: ["erunt"],
        },
      },
      "perfect": {
        singular: {
          first: ["fuī"],
          second: ["fuistī"],
          third: ["fuit"],
        },
        plural: {
          first: ["fuimus"],
          second: ["fuistis"],
          third: ["fuērunt", "fuēre"],
        },
      },
      "pluperfect": {
        singular: {
          first: ["fueram"],
          second: ["fuerās"],
          third: ["fuerat"],
        },
        plural: {
          first: ["fuerāmus"],
          second: ["fuerātis"],
          third: ["fuerant"],
        },
      },
      "future perfect": {
        singular: {
          first: ["fuerō"],
          second: ["fueris"],
          third: ["fuerit"],
        },
        plural: {
          first: ["fuerimus"],
          second: ["fueritis"],
          third: ["fuerint"],
        },
      },
    },
  },
  "subjunctive": {
    active: {
      present: {
        singular: {
          first: ["sim"],
          second: ["sīs"],
          third: ["sit"],
        },
        plural: {
          first: ["sīmus"],
          second: ["sītis"],
          third: ["sint"],
        },
      },
      imperfect: {
        singular: {
          first: ["essem", "forem"],
          second: ["essēs", "forēs"],
          third: ["esset", "foret"],
        },
        plural: {
          first: ["essēmus", "forēmus"],
          second: ["essētis", "forētis"],
          third: ["essent", "forent"],
        },
      },
      perfect: {
        singular: {
          first: ["fuerim"],
          second: ["fuerīs"],
          third: ["fuerit"],
        },
        plural: {
          first: ["fuerīmus"],
          second: ["fuerītis"],
          third: ["fuerint"],
        },
      },
      pluperfect: {
        singular: {
          first: ["fuissem"],
          second: ["fuissēs"],
          third: ["fuisset"],
        },
        plural: {
          first: ["fuissēmus"],
          second: ["fuissētis"],
          third: ["fuissent"],
        },
      },
    },
  },
  "imperative": {
    active: {
      present: {
        singular: {
          second: ["es"],
        },
        plural: {
          second: ["este"],
        },
      },
      future: {
        singular: {
          second: ["estō"],
          third: ["estō"],
        },
        plural: {
          second: ["estōte"],
          third: ["suntō"],
        },
      },
    },
  },
  "non-finite forms": {
    infinitives: {
      active: {
        present: ["esse"],
        perfect: ["fuisse"],
        future: ["futūrum esse", "fore"],
      },
    },
    participles: {
      active: {
        future: ["futūrus"],
      },
    },
  },
}
