const request = require('request-promise-native')
const cheerio = require('cheerio')

const credentials = require('../aws_credentials.json')
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey, region: credentials.region})
const TableName = credentials.TableName
const putEntry = async entry => await dynamo.put({TableName, Item: entry}).promise()
const getEntry = async word => (await dynamo.get({TableName, Key: {word}}).promise()).Item

const Entry = require("./structure/Entry")
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
    const alphabet = ['d']
    for (const letter of alphabet) {
        let entries = await ingestWordsAndHrefs(letter)
        for (let entry of entries) {
            entry = await ingestEntry(entry)
            if (entry) await putEntry(entry)
            // await new Promise(r => setTimeout(r, 250))
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
        if (entry.href.includes(`/w/index.php`)) return console.warn(`Skipped ${entry.word} - unknown to wiktionary`)
        let $ = cheerio.load(await request.get(entry.href))
        const section = ($('span#Latin').length ? $('span#Latin') : $('span#Translingual')).parent().nextUntil('hr')
        if (section.length < 1) return console.warn(`Skipped ${entry.word} - no Latin entry in Wiktionary`)

        entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
        $ = cheerio.load(entry.html)

        $('p:has(strong.Latn.headword)').each((_, elt) => {
            // Skip etymologies with only reference translations
            if ($(elt).nextAll('ol').first().children('li').length <=  $(elt).nextAll('ol').first().find('li span.form-of-definition.use-with-mention').length) return

            let etymology
            const partOfSpeech = $(elt).prevAll(':header').first().text().toLowerCase().replace('[edit]', '')
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
        if (!entry.etymologies.length) return console.warn(` Skipped ${entry.word} - no viable etymologies`)

        console.log("\x1b[34m", `Translated "${entry.word}" - ${entry.etymologies.map(etymology => etymology.partOfSpeech).join(', ')}`)
        for (const etymology of entry.etymologies)
            if (etymology.errors.length) console.log("\x1b[33m", `\t${etymology.errors.join('\n\t')}`)
        return entry

    } catch (e) { return console.error(`Error word: ${entry.word} - ${e}`) }
}

(async () => {
    if (process.argv[2] === 'ingestDictionary') return await ingestDictionary()
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
    //
    const word = 'baumannii'
    const entry = await ingestEntry(new Entry(word, `/wiki/${word}#Latin`))
    if (process.argv[2] === 'ingestWord' && entry)
        await putEntry(entry)
    else if (entry)
        console.log("\x1b[0m", JSON.stringify(entry.etymologies, null, 2))
})()
