const cheerio = require('cheerio')
const cheerioTableParser = require('cheerio-tableparser')
const Etymology = require('./Etymology')

class InflectedEtymology extends Etymology {
    constructor(firstPrincipalPartName) {
        super()
        this.principalParts[firstPrincipalPartName] = []
    }

    principalParts = {}

    ingestPrincipalParts($, elt) {
        const addTermToLastPrincipalPart = part => {
            const keys = Object.keys(this.principalParts)
            this.principalParts[keys[keys.length - 1]].push(part)
        }
        addTermToLastPrincipalPart($(elt).children('strong.Latn.headword').text())
        $(elt).children('b').each((_, b) => {
            const key = $(b).prev('i').text().replace(' ', '_')
            if (key === 'or') addTermToLastPrincipalPart($(b).text())
            else this.principalParts[key] = [$(b).text()]
        })
    }

    ingest($, elt) {
        super.ingest($, elt)
        try { this.ingestPrincipalParts($, elt) }
        catch (e) { console.error(`Trouble ingesting principal parts - ${e}`)}
    }

    inflections = {}
    parseInflectionTable($, elt) {
        const tableHtml = $(elt).nextAll('table').first()
        if (tableHtml.length <= 0) return
        const $table = cheerio.load($.html(tableHtml))
        cheerioTableParser($table)
        let table = $table('table').parsetable(true, true, false)

        table = table[0].map((col, i) => table.map(row => row[i]))
        table = table.map(tr => {
            return tr.map(tc => {
                const c = cheerio.load(tc)
                if (c('span').length <= 0) return c.text().trim() // Headers
                else return c('body').html()
            })
        })

        return table
    }
    ingestInflections($, elt) {
        const table = this.parseInflectionTable($, elt)
        if (!table) throw new Error(`inflection table not found`)

        const disorganizedInflections = table.reduce((inflections, row, i) => {
            return row.reduce((_, cell, j) => {
                if (cell.includes('<span ')) {
                    const c = cheerio.load(cell)
                    const words = c('span').map((_, s) => c(s).text()).get().join(', ')
                    inflections.push({
                        word: this.parseWords(words),
                        identifiers: this.findIdentifiers(i, j, table)
                    })
                }
                return inflections
            })
        }, [])
        disorganizedInflections.forEach(inflection => this.sortInflections(inflection, this.inflections))
    }
    findIdentifiers(i, j, table) {
        const identifiers = new Set()
        const isInflection = cell => cell.includes('<span ') || cell.includes('—')
            || cell.includes(' + ') || !cell.length

        let m = i
        while (isInflection(table[m][j])) m--
        while (m >= 0 && !isInflection(table[m][j])) identifiers.add(table[m--][j].replace(/\.|\//g,''))

        let n = j
        while (isInflection(table[i][n])) n--
        while (n >= 0 && !isInflection(table[i][n])) identifiers.add(table[i][n--].replace(/\.|\//g,''))

        return Array.from(identifiers)
    }

    parseWords(cell) {
        cell = cell.trim().replace(/\d+/, '')
        if (!/\w+/.test(cell)) return null
        else if (cell.includes(', ')) return cell.split(', ')
        else return [cell]
    }
    sortInflections(inflection, obj) {
        const identifier = inflection.identifiers.pop().toLowerCase().trim()
        if (!inflection.identifiers.length) {
            obj[identifier] = inflection.word
            return obj
        } else {
            if (!obj[identifier]) obj[identifier] = {}
            obj[identifier] = this.sortInflections(inflection, obj[identifier])
            return obj
        }
    }
}

module.exports = InflectedEtymology