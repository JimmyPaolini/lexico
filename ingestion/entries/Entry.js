const request = require('request-promise-native')
const cheerio = require('cheerio')
const _ = require('lodash')

const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('../aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region})
const putEntryInDynamo   = async entry => await dynamo.put({TableName, Item: entry}).promise()
const getEntryFromDynamo = async word => (await dynamo.get({TableName, Key: {word}}).promise()).Item
const { appendEntryToSpreadsheet, entryToSheetsFormat } = require('../google_sheets_interface')

const Noun = require("./etymologies/inflected_etymologies/nouns/Noun")
const ProperNoun = require("./etymologies/inflected_etymologies/nouns/ProperNoun")
const Adjective = require("./etymologies/inflected_etymologies/adjectives/Adjective")
const Prefix = require("./etymologies/inflected_etymologies/adjectives/Prefix")
const Suffix = require("./etymologies/inflected_etymologies/adjectives/Suffix")
const Participle = require("./etymologies/inflected_etymologies/adjectives/Participle")
const Verb = require("./etymologies/inflected_etymologies/Verb")
const Adverb = require("./etymologies/inflected_etymologies/Adverb")
const Pronoun = require("./etymologies/inflected_etymologies/adjectives/Pronoun")
const Preposition = require("./etymologies/inflected_etymologies/Preposition")
const Reference = require("./etymologies/inflected_etymologies/Reference")
const Conjunction = require("./etymologies/Conjunction")

String.prototype.norm = function () {
    return this.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

class Entry {
    constructor(word, path) {
        this.word = word
        this.href = `https://en.wiktionary.org${path}`
        this.etymologies = []
    }

    isEqual(entry) { return entry instanceof Entry && this.word === entry.word && this.href === entry.href }

    ingestEtymology($, elt) {
        let etymology
        const partOfSpeech = $(elt).prevAll(':header').first().text()
            .toLowerCase().replace('[edit]', '')
        if (partOfSpeech === 'noun') etymology = new Noun()
        else if (partOfSpeech === 'proper noun') etymology = new ProperNoun()
        else if (partOfSpeech === 'verb') etymology = new Verb()
        else if (partOfSpeech === 'adjective') etymology = new Adjective()
        else if (partOfSpeech === 'participle') etymology = new Participle()
        else if (partOfSpeech === 'prefix') etymology = new Prefix()
        else if (partOfSpeech === 'suffix') etymology = new Suffix()
        else if (['pronoun', 'determiner'].includes(partOfSpeech)) etymology = new Pronoun()
        else if (partOfSpeech === 'adverb') etymology = new Adverb()
        else if (partOfSpeech === 'preposition') etymology = new Preposition()
        else if (partOfSpeech === 'conjunction') etymology = new Conjunction()
        else return
        etymology.ingest($, elt)
        if (etymology) this.etymologies.push(etymology)
    }

    async ingest() {
        // await new Promise(r => setTimeout(r, 1000))
        try {
            if (this.href.includes(`/w/index.php`)) return console.warn(`Skipped ${this.word} - unknown to wiktionary`)
            let $ = cheerio.load(await request.get(this.href, {timeout: 10000}))
            const section = ($('span#Latin').length ? $('span#Latin') : $('span#Translingual')).parent().nextUntil('hr')
            if (section.length < 1) return console.warn(`Skipped ${this.word} - no Latin entry in Wiktionary`)

            $ = cheerio.load(`<div class="${this.word}">${$.html(section)}</div>`)
            for (const elt of $('p:has(strong.Latn.headword)').get()) await this.ingestEtymology($, elt)

            this.prettyPrint()

            await this.ingestReferences()
            putEntryInDynamo(this)
            // await appendEntryToSpreadsheet(entryToSheetsFormat(this))
            if (process.argv[2] === 'printWord') console.log("\x1b[0m", JSON.stringify(this.etymologies, null, 2))
        } catch (e) { return console.error(`Error unknown, word "${this.word}" - ${e}`) }
    }

    prettyPrint() {
        if (!this.etymologies.length) return console.warn(` Skipped ${this.word} - no viable etymologies`)
        console.log("\x1b[34m", `Translated "${this.word}" - ${
            this.etymologies.map(etymology => etymology.partOfSpeech).join(', ')}`)
        for (const etymology of this.etymologies) {
            if (etymology.errors) {
                console.log("\x1b[33m", `\t${etymology.errors.join('\n\t')}`)
                delete etymology.errors
            }
        }
    }

    async ingestReferences() {
        for (const etymology of this.etymologies) {
            if (!etymology.disorganizedForms) continue
            for (const form of etymology.disorganizedForms) {
                for (const word of form.word) {
                    if (word.norm() === this.word) continue
                    const ref = new Reference(etymology, form.identifiers)
                    const existingEntry = await getEntryFromDynamo(word.norm())
                    if (existingEntry) {
                        const sameEtymology = existingEntry.etymologies.find(etym => etym.inflection === 'referential'
                            && _.isEqual(etym.principalParts, ref.principalParts)
                            && _.isEqual(etym.translations,   ref.translations) )

                        if (sameEtymology) {
                            if (!sameEtymology.forms.find(form => _.isEqual(form, ref.forms[0]))) {
                                sameEtymology.forms.push(...ref.forms)
                            }
                        } else {
                            existingEntry.etymologies.push(ref)
                        }
                        putEntryInDynamo(existingEntry)
                    } else {
                        const newEntry = new Entry(word.norm(), `/wiki/${word.norm()}#Latin`)
                        newEntry.etymologies.push(ref)
                        putEntryInDynamo(newEntry)
                    }
                }
            }
            delete etymology.disorganizedForms
        }
    }

}

module.exports = Entry