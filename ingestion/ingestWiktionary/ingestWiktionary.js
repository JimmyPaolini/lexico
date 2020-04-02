const fs = require('fs')
const request = require('request-promise-native')
const cheerio = require('cheerio')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, htmlTable } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
require('events').EventEmitter.defaultMaxListeners = 300;
const putEntryInDynamo = async entry => await dynamo.put({TableName: htmlTable, Item: entry}).promise()

const logFilename = require('path').relative(process.cwd(),
    `/Users/jimmy/Documents/GitHub/Lexico/ingestion/ingestWiktionary/logs/${process.pid}.txt`)
function log(message) {
    fs.appendFileSync(logFilename, message + '\n')
    return console.error(message)
}

async function ingestWiktionary() {
    const alphabet = "abcdefghijklmnopqrstubwxyz".split('')
    log(`${(new Date()).toLocaleString()} - START`)
    for (const letter of alphabet) {
        log(`${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        const $ = cheerio.load(await request.get(`https://en.wiktionary.org/wiki/Index:Latin/${letter}`, {forever: true}))
        for (const wordLink of $('div.index>ol>li>a:first-child').get())
            await ingestWord($(wordLink).text(), $(wordLink).attr('href'))
        log(`${(new Date()).toLocaleString()} - Finished letter "${letter}"`)
    }
    log(`${(new Date()).toLocaleString()} - FINISH`)
}

async function ingestWord(word, href) {
    const entry = {word, href: `https://en.wiktionary.org${href}`}
    if (entry.href.includes(`/w/index.php`)) return log(`Error "${entry.word}" - no wiktionary page`)
    let $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}))
    const section = $('span#Latin').parent().nextUntil('hr')
    if (section.length < 1) return log(`Error "${entry.word}" - no latin entry in wiktionary`)

    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
    await putEntryInDynamo(entry)
    console.log(`Ingested "${entry.word}" HTML`)
}

ingestWiktionary()

