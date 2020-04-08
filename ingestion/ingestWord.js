const fs = require('fs'), path = require('path')
const request = require('request-promise-native')
const cheerio = require('cheerio')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, lemmaTable } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const putItem = async entry => await dynamo.put({TableName: lemmaTable, Item: entry}).promise()
const Entry = require('./ingestDictionary/Entry')

return ingestWord(process.argv[2])

async function ingestWord(word = 'Italia') {
    const entry = {word, href: `https://en.wiktionary.org/wiki/${word}#Latin`}
    if (entry.href.includes(`/w/index.php`)) return log(`Error "${entry.word}" - no wiktionary page`)
    let $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}))
    const section = $('span#Latin').parent().nextUntil('hr')
    if (section.length < 1) return log(`Error "${entry.word}" - no latin entry in wiktionary`)

    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
    await putItem(entry)
    console.log(`Ingested "${entry.word}" HTML`)
    await (new Entry(entry)).ingest(entry.html)
}

function log(message) {
    const logFilename = path.join(process.cwd(), `ingestion/ingestWiktionary/logs/${process.pid}.txt`)
    if (process.argv.length === 2) fs.appendFileSync(logFilename, message + '\n')
    return console.error(message)
}