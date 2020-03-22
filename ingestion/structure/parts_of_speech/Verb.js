const cheerio = require('cheerio')
const InflectedEtymology = require("../InflectedEtymology")

class Verb extends InflectedEtymology {
    constructor() {
        super('present_active')
        this.partOfSpeech = 'verb'
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { super.ingestInflections($, elt) }
        catch (e) { this.errors.push(`Inflections ${e}`); delete this.inflections }
        try { this.ingestConjugation($, elt) }
        catch (e) { this.errors.push(`Conjugation ${e}`); delete this.conjugation }
        if (!this.errors) delete this.errors
    }

    conjugation = ``
    ingestConjugation($, elt) {
        this.conjugation = $(elt).text().split('; ')[1].split(' ')[0]
    }

    ingestInflections($, elt) {
        const table = super.parseInflectionTable($, elt)
        if (!table) throw new Error(`inflection table not found`)

        table.reduce((inflections, row, i) => {
            return row.reduce((_, cell, j) => {
                if (cell.includes('<span ') || cell.includes(' + ')) {
                    const identifiers = this.findIdentifiers(i, j, table)
                    inflections.push({
                        word: this.parseWords(cheerio.load(cell).text(), identifiers[1], identifiers[0]),
                        identifiers
                    })
                }
                return inflections
            })
        }, []).forEach(inflection => super.sortInflections(inflection, this.inflections))
    }

    findIdentifiers(i, j, table) {
        const identifiers = new Set()
        const isInflection = cell => cell.includes('<span ') || cell.includes('—') || cell.includes(' + ')

        let m = i
        while (isInflection(table[m][j])) m--
        identifiers.add(table[m][j]).add(table[m-1][j])

        let n = j
        while (isInflection(table[i][n])) n--
        identifiers.add(table[i][n]).add(table[i][n-1])

        identifiers.add(table[m][n])
        return Array.from(identifiers)
    }
    parseWords(cell, number, person) {
        const sum_esse_fui = require("./sum_esse_fui")
        const isMood = word => ['indicative', 'subjunctive', 'imperative', 'non-finite forms', 'verbal nouns'].includes(word)
        const isVoice = word => ['active', 'passive'].includes(word)
        const isTense = word => ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'].includes(word)

        cell = cell.trim().replace(/\d+/, '')
        if (!/\w+/.test(cell)) return null
        else if (cell.includes(', ')) return cell.split(', ')
        else if (cell.includes(' + ')) {
            const parts = cell.split(' ')
            let mood, voice, tense;
            for (const part of parts)
                if (isMood(part)) mood = part
                else if (isVoice(part)) voice = part
                else if (isTense(part)) tense = part
            return sum_esse_fui[mood][voice][tense][number][person].map(ext => parts[0] + ' ' + ext)
        } else return [cell]
    }
}

module.exports = Verb