const cheerio = require('cheerio')
const cheerioTableParser = require('cheerio-tableparser')
const Etymology = require('../Etymology')

class InflectedEtymology extends Etymology {

    ingest($, elt) {
        super.ingest($, elt)
        if (this.translations.every(trans => trans.reference)) {
            this.inflection = 'referential'
            delete this.firstPrincipalPartName
        } else {
            try { this.ingestInflection($, elt) }
            catch (e) { this.errors.push(`Inflection ${e}`); }
            try { this.ingestPrincipalParts($, elt) }
            catch (e) { this.errors.push(`Principal Parts ${e}`); }
            try { this.ingestForms($, elt) }
            catch (e) { this.errors.push(`Forms ${e}`); }
        }
        if (!this.errors.length) delete this.errors
    }

    ingestPrincipalParts($, elt) {
        this.principalParts = {}
        this.principalParts[this.firstPrincipalPartName] = []
        delete this.firstPrincipalPartName

        const k = Object.keys(this.principalParts)
        this.principalParts[k[k.length - 1]].push($(elt).children('strong.Latn.headword').text())
        for (const b of $(elt).children('b').get()) {
            if ($(b).prev('i').text() === 'or') {
                const k = Object.keys(this.principalParts)
                this.principalParts[k[k.length - 1]].push($(b).text())
            } else this.principalParts[$(b).prev('i').text()] = [$(b).text()]
        }
    }

    ingestForms($, elt) {
        const table = this.parseFormTable($, elt)
        if (!table) throw new Error(`no forms`)
        this.forms = {}

        this.disorganizedForms = table.reduce((disorganizedForms, row, i) => {
            return row.reduce((_, cell, j) => {
                if (cell.includes('<span ')) {
                    const c = cheerio.load(cell)
                    const words = c('span').map((_, s) => c(s).text()).get().join(', ')
                    disorganizedForms.push({
                        word: this.parseWords(words),
                        identifiers: this.findIdentifiers(i, j, table)
                    })
                }
                return disorganizedForms
            })
        }, [])
        for (const inflection of JSON.parse(JSON.stringify(this.disorganizedForms)))
            this.sortIdentifiers(inflection, this.forms)
    }

    parseFormTable($, elt) {
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

    findIdentifiers(i, j, table) {
        const identifiers = new Set()
        const isForm = cell => cell.includes('<span ') || cell.includes('—')
            || cell.includes(' + ') || !cell.length

        let m = i
        while (isForm(table[m][j])) m--
        while (m >= 0 && !isForm(table[m][j]))
            identifiers.add(table[m--][j].replace(/\.|\//g,'').toLowerCase().trim())

        let n = j
        while (isForm(table[i][n])) n--
        while (n >= 0 && !isForm(table[i][n]))
            identifiers.add(table[i][n--].replace(/\.|\//g,'').toLowerCase().trim())

        if (['Singular','Plural'].includes(table[++m][++n]))
            identifiers.add(table[m][n].toLowerCase().trim())
        return Array.from(identifiers)
    }

    parseWords(cell) {
        cell = cell.trim().replace(/\d+/, '')
        if (!/\w+/.test(cell)) return null
        else if (cell.includes(', ')) return cell.split(', ')
        else return [cell]
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

    findIdentifiersOf(form) {
        if (!this.forms) throw Error('no forms')
        String.prototype.norm = function () {
            return this.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
        }

        const inflections = []
        function findFormRec(form, obj, path) {
            if (obj instanceof Array) {
                if (obj.filter(inf => inf.norm() === form).length)
                    inflections.push(path)
            } else
                for (const key of Object.keys(obj))
                    findFormRec(form, obj[key], [...path, key])
        }
        findFormRec(form, this.forms, [])

        return inflections
    }
}

module.exports = InflectedEtymology