const fs = require('fs'), path = require('path')
const chalk = require('chalk')
const cheerio = require('cheerio')
const _ = require('lodash')
const putItem = async entry => fs.writeFileSync(path.join(process.cwd(), `../latin/dictionary/${entry.word}.json`),
    JSON.stringify(entry,null,2))
const getItem = async word => {
    try { return require(path.join(process.cwd(),`../latin/dictionary/${word}.json`)) }
    catch (e) { return undefined }
}
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

const Noun = require("./wordTypes/nouns/Noun")
const ProperNoun = require("./wordTypes/nouns/ProperNoun")
const Adjective = require("./wordTypes/adjectives/Adjective")
const Prefix = require("./wordTypes/adjectives/Prefix")
const Suffix = require("./wordTypes/adjectives/Suffix")
const Participle = require("./wordTypes/adjectives/Participle")
const Numeral = require("./wordTypes/adjectives/Numeral")
const Verb = require("./wordTypes/Verb")
const Adverb = require("./wordTypes/Adverb")
const Pronoun = require("./wordTypes/adjectives/Pronoun")
const Preposition = require("./wordTypes/Preposition")
const Reference = require("./wordTypes/Reference")
const Conjunction = require("./wordTypes/simple/Conjunction")
const Interjection = require("./wordTypes/simple/Interjection")
const Phrase = require("./wordTypes/simple/Phrase")

function log(message) {
    const logFilename = path.join(process.cwd(), `ingestion/ingestDictionary/logs/${process.pid}.txt`)
    if (process.argv.length === 2) fs.appendFileSync(logFilename, message + '\n')
    return console.log(chalk.red(message))
}

class Entry {
    constructor(entry) {
        this.word = entry.word.toLowerCase()
        this.href = entry.href.includes('#Latin') ? entry.href : entry.href + '#Latin'
        this.etymologies = []
    }

    async ingest(html) {
        try {
            const $ = cheerio.load(html)
            for (const elt of $('p:has(strong.Latn.headword)').get())
                await this.ingestEtymology($, elt)

            if (!this.etymologies.length) return log(`Skipped "${this.word}" - ${this.href}`)
            console.log(chalk.blue(`Ingested "${this.word}" - ${this.etymologies.map(etymology => etymology.partOfSpeech).join(', ')}`))
            for (const etymology of this.etymologies) {
                if (etymology.errors) {
                    console.log(chalk.yellow(`${etymology.errors.join('\n')}`))
                    delete etymology.errors
                }
            }

            await this.ingestReferences()
            await putItem(this)

            if (process.argv[2] === 'printWord') console.log(chalk.white(JSON.stringify(this.etymologies, null, 2)))
        } catch (e) { return log(`Error "${this.word}" - ${e}`) }
    }

    ingestEtymology($, elt) {
        let etymology
        const partOfSpeech = $(elt).prevAll(':header').first().text()
            .toLowerCase().replace(/(\[edit\])|\d+/g, '').trim()
        if (partOfSpeech === 'noun') etymology = new Noun()
        else if (partOfSpeech === 'proper noun') etymology = new ProperNoun()
        else if (partOfSpeech === 'verb') etymology = new Verb()
        else if (partOfSpeech === 'adjective') etymology = new Adjective()
        else if (partOfSpeech === 'participle') etymology = new Participle()
        else if (partOfSpeech === 'numeral') etymology = new Numeral()
        else if (partOfSpeech === 'prefix') etymology = new Prefix()
        else if (partOfSpeech === 'suffix') etymology = new Suffix()
        else if (['pronoun','determiner'].includes(partOfSpeech)) etymology = new Pronoun()
        else if (['adverb','particle'].includes(partOfSpeech)) etymology = new Adverb()
        else if (partOfSpeech === 'preposition') etymology = new Preposition()
        else if (partOfSpeech === 'conjunction') etymology = new Conjunction()
        else if (partOfSpeech === 'interjection') etymology = new Interjection()
        else if (['phrase','proverb','idiom'].includes(partOfSpeech)) etymology = new Phrase()
        else return
        etymology.ingest($, elt)
        if (etymology && etymology.inflection !== 'repeat') this.etymologies.push(etymology)
    }

    async ingestReferences() {
        for (const etymology of this.etymologies) {
            if (!etymology.disorganizedForms) continue
            for (const form of etymology.disorganizedForms) {
                for (const word of form.word) {
                    if (word.norm() === this.word) continue
                    const ref = new Reference(word, etymology, form.identifiers)
                    const existingEntry = await getItem(word.norm())
                    if (existingEntry) {
                        const sameEtymology = existingEntry.etymologies.find(etymology =>
                            etymology.inflection === 'referential'
                            && _.isEqual(etymology.principalParts, ref.principalParts)
                            && _.isEqual(etymology.translations, ref.translations))

                        if (sameEtymology && sameEtymology.forms.every(form => !_.isEqual(form, ref.forms[0])))
                            sameEtymology.forms.push(...ref.forms)
                        else if (!sameEtymology) existingEntry.etymologies.push(ref)
                        putItem(existingEntry)
                    } else {
                        const newEntry = new Entry({word: word.norm(),
                            href: `https://en.wiktionary.org/wiki/${word.norm()}#Latin`})
                        newEntry.etymologies.push(ref)
                        putItem(newEntry)
                    }
                    console.log(chalk.cyan(`Referred "${this.word}" - ${word.norm()}`))
                }
            }
            delete etymology.disorganizedForms
        }
    }

}

module.exports = { Entry, log }