const request = require('request-promise-native')
const cheerio = require('cheerio')
const Entry = require("./entries/Entry")

async function ingestDictionary() {
    console.log((new Date()).toLocaleString())
    const alphabet = ['a'] //"abcdefghijklmnopqrstubwxyz".split('')
    for (const letter of alphabet) {
        const $ = cheerio.load(await request.get(`https://en.wiktionary.org/wiki/Index:Latin/${letter}`))
        for (const wordLink of $('div.index>ol>li>a:first-child').get())
            await (new Entry($(wordLink).text(), $(wordLink).attr('href'))).ingest()
    }
    console.log((new Date()).toLocaleString())
}

if (process.argv[2] === 'ingestDictionary') return ingestDictionary()
const word = 'a'
const entry = new Entry(word, `/wiki/${word}#Latin`)
entry.ingest()