const fs = require('fs'), path = require('path')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, htmlTable } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const getItem = async word => (await dynamo.get({TableName: htmlTable, Key: {word}}).promise()).Item
const Entry = require('./Entry')

async function ingestDictionary() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
    function log(message) {
        const logFilename = path.join(process.cwd(), `/logs/${process.pid}.txt`)
        if (process.argv.length === 2) fs.appendFileSync(logFilename, message + '\n')
        return console.error(message)
    }
    log(`${(new Date()).toLocaleString()} - START`)
    for (const letter of alphabet) {
        log(`${(new Date()).toLocaleString()} - Starting letter "${letter}"`)

        const params = { TableName: htmlTable, FilterExpression: 'begins_with( #name0, :value0 )',
            ExpressionAttributeNames: {"#name0": "word"}, ExpressionAttributeValues: {":value0": letter} }
        for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
        scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false)
            for (const entry of scan.Items)
                await (new Entry(entry)).ingest(entry.html)

    }
    log(`${(new Date()).toLocaleString()} - FINISH`)
}

async function retryErrors() {
    const lines = fs.readFileSync('./ingestion/ingestDictionary/logs/???.txt', 'utf8').split('\n')
    for (const line of lines) {
        if (line.match(/^\s*$/)) continue
        if (line.match(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{1,2}:\d{1,2} [AP]M/)) continue
        const word = line.split(' "')[1].split('" - ')[0]
        const entry = new Entry(word, `/wiki/${word}#Latin`)
        await entry.ingest()
    }
}

if (process.argv.length === 2) return ingestDictionary()
else if (process.argv[2] === 'retryErrors') return retryErrors()
const word = 'a'
getItem(word).then(entry => (new Entry(entry)).ingest(entry.html))

