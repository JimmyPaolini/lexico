'use strict';
const path = require('path')
const cheerio = require('cheerio')
const cheerioTableParser = require('cheerio-tableparser')
const getPronunciations = require('../pronunciation')
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)) }
    catch (e) { return undefined }
}
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

class Etymology {
    partOfSpeech
    firstPrincipalPartName

    ingest($, elt) {
        this.errors = []
        try { this.ingestTranslations($, elt) } catch (e) { this.errors.push(`Translations ${e}`); delete this.translations }
        try { this.ingestPrincipalParts($, elt) } catch (e) { this.errors.push(`Principal Parts ${e}`); delete this.translations }
        try { this.ingestInflection($, elt) } catch (e) { this.errors.push(`Inflection ${e}`); delete this.inflection }
        try { this.ingestForms($, elt) } catch (e) { this.errors.push(`Forms ${e}`); delete this.forms }
        if (this.translations.every(translation => translation.match(/{\*.*\*}/g))) {
            if (this.translations.some(translation => translation.match(/(form of)|(spelling of)|(Syncopation)|(Syncopated)|(Diminutive)|(Female Equivalent)|(Archaic)|(Abbreviation)|(Alternative)|(Comparative)|(Superlative)|(Synonym)|(Initialism)|(Clipping)/ig))) {
                this.inflection = 'referential'
                this.ingestReferenceTranslations()
            } else return this.inflection = 'repeat'
        }
        try { this.ingestPronunciation($, elt) } catch (e) {}
        try { this.ingestEtymology($, elt) } catch (e) {}
    }

    ingestTranslations($, elt) {
        const translationsHeader = $(elt).nextAll('ol').first()
        if (translationsHeader.length <= 0) throw new Error(`no translations`)
        this.translations = []

        for (const li of $(translationsHeader).children('li').get()) {
            if ($(li).text().length <= 0) continue
            $(li).children('ol, ul, dl').remove()
            this.translations.push($(li).text().trim())
            if ($(li).find('span.form-of-definition-link').length > 0) {
                this.translations.push(this.translations.pop() + ' ' +
                    $(li).find('span.form-of-definition-link i.Latn.mention').get()
                        .map(ref => `{*${$(ref).text().norm()}*}`).join(' '))
            }
        }
    }

    ingestReferenceTranslations() {
        this.translations = this.translations.reduce((refs, translation) => {
            if (!translation.match(/{\*.*\*}/g)) return [...refs, translation]
            const refWord = translation.split('{*')[1].split('*}')[0]
            if (refs.some(ref => ref.includes(`{*${refWord}*}`))) return [...refs, translation]
            const refEntry = getItem(refWord)
            if (!refEntry) return [...refs, translation]
            const refEtymology = refEntry.etymologies.find(etymology =>
                etymology.partOfSpeech === this.partOfSpeech)
            if (!refEtymology) return [...refs, translation]
            return [...refs, translation, ...refEtymology.translations]
        }, [])
    }

    ingestPrincipalParts($, elt) {
        this.principalParts = []

        this.principalParts.push(`${this.firstPrincipalPartName}: ${
            $(elt).children('strong.Latn.headword').get().map(p1 => 
                $(p1).text().toLowerCase()).join(' or ')}`)
        delete this.firstPrincipalPartName

        for (const b of $(elt).children('b').get())
            if ($(b).prev('i').text() === 'or')
                this.principalParts.push(this.principalParts.pop() + ` or ${$(b).text().toLowerCase()}`)
            else
                this.principalParts.push(`${$(b).prev('i').text()}: ${$(b).text().toLowerCase()}`)
    }

    ingestForms($, elt) {
        const table = this.parseFormTable($, elt)
        if (!table) throw new Error(`no forms`)

        function parseWords(cell) {
            cell = cell.trim().replace(/[\d*]/g, '').toLowerCase()
            return cell.includes(', ') ? cell.split(', ') : [cell]
        }

        function findIdentifiers(i, j, table) {
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

        this.forms = {}
        this.disorganizedForms = table.reduce((disorganizedForms, row, i) => {
            return row.reduce((_, cell, j) => {
                if (cell.includes('<span ')) {
                    const c = cheerio.load(cell)
                    const words = c('span').map((_, s) => c(s).text()).get().join(', ')
                    if (!words.match(/[A-Za-zāēīōūȳ\-\s]+/)) return disorganizedForms
                    disorganizedForms.push({
                        word: parseWords(words),
                        identifiers: findIdentifiers(i, j, table)
                    })
                }
                return disorganizedForms
            })
        }, [])
        for (const inflection of JSON.parse(JSON.stringify(this.disorganizedForms)))
            this.sortIdentifiers(inflection, this.forms)
    }
    parseFormTable($, elt) {
        const tableHtml = $(elt).nextUntil('h3','table').first()
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

    ingestPronunciation($, elt) {
        this.pronunciation = {
            classical: { phonemes: getPronunciations(this.principalParts[0].split(': ')[1], 'classical') },
            ecclesiastical: { phonemes: getPronunciations(this.principalParts[0].split(': ')[1], 'ecclesiastical') },
            vulgar: { phonemes: getPronunciations(this.principalParts[0].split(': ')[1], 'vulgar') }
        }

        const pronunciationHeader = $(elt).prevAll(':header:contains("Pronunciation")').first()
        if ($(pronunciationHeader).length <= 0) throw new Error(`no pronunciation`)

        const parsePhonics = (pronunciations) => {
            const parsed = {}
            for (const pronunciation of pronunciations)
                if (/\/.*\//.test(pronunciation)) parsed.phonemic = pronunciation.trim()
                else if (/\[.*\]/.test(pronunciation)) parsed.phonetic = pronunciation.trim()
            return parsed
        }

        for (const pr of $(pronunciationHeader).next('ul').children().get()) {
            const pronunciations = $(pr).text().split('IPA(key):')[1].split(', ')
            if ($(pr).find('a').text().includes('Classical')) {
                this.pronunciation.classical =
                    Object.assign(this.pronunciation.classical, parsePhonics(pronunciations))
            } else if ($(pr).find('a').text().includes('Ecclesiastical')) {
                this.pronunciation.ecclesiastical=
                    Object.assign(this.pronunciation.ecclesiastical, parsePhonics(pronunciations))
            } else if ($(pr).find('a').text().includes('Vulgar')) {
                this.pronunciation.vulgar =
                    Object.assign(this.pronunciation.vulgar, parsePhonics(pronunciations))
            }
        }
    }

    ingestEtymology($, elt) {
        const etymologyHeader = $(elt).prevAll(':header:contains("Etymology")').first()
        if ($(etymologyHeader).length <= 0 || $(etymologyHeader).next()[0].name !== 'p' ||
            !$(etymologyHeader).next().text().trim().length) throw new Error(`no etymology`)
        this.etymology = $(etymologyHeader).next().text().trim()
    }

    ingestInflection($, elt) {}
}

module.exports = Etymology