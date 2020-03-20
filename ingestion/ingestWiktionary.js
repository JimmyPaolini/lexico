const request = require('request-promise-native')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')
const fs = require('fs')

const creds = require('../aws_credentials.json')
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId: creds.accessKeyId, secretAccessKey: creds.secretAccessKey, region: creds.region})
const TableName = creds.TableName
const putEntry = async entry => await dynamo.put({TableName, Item: entry}).promise()
const getEntry = async word => (await dynamo.get({TableName, Key: {word}}).promise()).Item

const Entry = require("./structure/Entry")
const Etymology = require("./structure/Etymology")
const Noun = require("./structure/parts_of_speech/Noun")
const ProperNoun = require("./structure/parts_of_speech/ProperNoun")
const Verb = require("./structure/parts_of_speech/Verb")
const Adjective = require("./structure/parts_of_speech/Adjective")
const Prefix = require("./structure/parts_of_speech/Prefix")
const Suffix = require("./structure/parts_of_speech/Suffix")
const Participle = require("./structure/parts_of_speech/Participle")
const Pronoun = require("./structure/parts_of_speech/Pronoun")
const Adverb = require("./structure/parts_of_speech/Adverb")
const Preposition = require("./structure/parts_of_speech/Preposition")
const Conjunction = require("./structure/parts_of_speech/Conjunction")
const Letter = require("./structure/parts_of_speech/Letter")

async function ingestDictionary() {
    // const alphabet = [...Array(26)].map((q, w) => String.fromCharCode(w + 97))
    const alphabet = ['a']
    for (const letter of alphabet) {
        let entries = await ingestWordsAndHrefs(letter)
        for (let entry of entries) {
            entry = await ingestEntry(entry)
            if (entry) putEntry(entry)
            await new Promise(r => setTimeout(r, 250))
        }
    }
}
async function ingestWordsAndHrefs(letter) {
    const entries = []
    const $ = cheerio.load(await request.get(`https://en.wiktionary.org/wiki/Index:Latin/${letter}`))
    $('div.mw-parser-output>div.index>ol>li>a:first-child').each((_, wordLink) => {
        entries.push(new Entry($(wordLink).text(), $(wordLink).attr('href')))
    })
    return entries
}

async function ingestEntry(entry) {
    try {
        if (entry.href.includes(`/w/index.php`)) {
            console.warn(`Skipped: ${entry.word} - unknown to wiktionary`)
            return null
        }
        let $ = cheerio.load(await request.get(entry.href))
        const section = ($('span#Latin').length ? $('span#Latin') : $('span#Translingual')).parent().nextUntil('hr')
        if (section.length < 1) {
            console.warn(`Skipped: ${entry.word} - no Latin entry in Wiktionary`)
            return null
        }

        entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
        $ = cheerio.load(entry.html)

        $('div').children().each((_, elt) => {
            // Skip siblings until a Latin headword is found
            if (!($(elt)[0].name === 'p' && $(elt).children('strong.Latn.headword').length > 0)) return

            // Handle entries that only point to another principal word(s)
            // if ($(elt).next('ol').children('li').children('span.form-of-definition.use-with-mention').length > 0) {
            //     let etymology = new Etymology()
            //     etymology.ingest($, elt)
            //     entry.addEtymology(etymology)
            //     return
            // }

            const partOfSpeech = $(elt).prevAll(':header').first().text().toLowerCase().replace('[edit]', '')
            let etymology
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
            else if (partOfSpeech === 'letter') etymology = new Letter()
            if (etymology) {
                etymology.ingest($, elt)
                entry.addEtymology(etymology)
            }
        })
        if (!entry.etymologies.length) {
            console.warn(`Skipped: ${entry.word} - unhandled Part of Speech`)
            return null
        }

        console.log(`Translated "${entry.word}" - ${entry.etymologies.map(etym => etym.partOfSpeech).join(', ')}`)
        return entry

    } catch (e) {
        console.error(`Error: ${entry.word} - ${e}`)
        return null
    }
}

(async () => {
    const firstDeclensionNouns = ['stella']
    const secondDeclensionNouns = ['filius', 'puer', 'bellum']
    const thirdDeclensionNouns = ['homo', 'nomen', 'turris', 'animal', 'nox', 'aer', 'tigris']
    const fourthDeclensionNouns = ['manus', 'cornu']
    const fifthDeclensionNouns = ['dies', 'res']
    const verbs = ['amo', 'moneo', 'tego', 'audio']
    const adjectives = ['caecus', 'brevis', 'bonus']
    const adverbs = ['celeriter', 'usque']
    const prepositions = ['a', 'de', 'in', 'propter']
    const pronouns = ['hic', 'ille', 'qui', 'ego']
    const conjunctions = ['et', 'tamen', 'cum']
    const participles = ['amans', 'auditus']

    const arr = []

    // const word = 'ablepsia'
    // const entry = await ingestEntry(new Entry(word, `/wiki/${word}#Latin`))
    // console.log(JSON.stringify(entry.etymologies, null, 2))
    ingestDictionary()
})()
