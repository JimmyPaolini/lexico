const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('../../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const { appendRowsToSpreadsheet, entriesToRows, clearTable, sortTable } = require('./google_sheets_interface')
const { emailMe } = require('../../notifications')

try { return buildSpreadsheet(process.argv[2]) }
catch (e) { return emailMe('Error Ingesting Dictionary', e.toString()) }

async function buildSpreadsheet(alphabet = "abcdefghijklmnopqrstuvwxyz") {
    for (const letter of alphabet.split('')) await buildLetterSheet(letter)
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISH`)
    await emailMe('Finished Building Spreadsheet', process.argv.slice(2).join(' '))
}

async function buildLetterSheet(letter) {
    try {
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        await clearTable(letter)
        let dCount = 0, sCount = 0
        const params = {TableName, FilterExpression: 'begins_with( #word, :letter )',
            ExpressionAttributeNames: {'#word': 'word'}, ExpressionAttributeValues: {":letter": letter} }
        for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
             scan = await dynamo.scan({...params, ExclusiveStartKey: scan.LastEvaluatedKey}).promise(), first = false) {
            dCount += scan.Items.reduce((acc, e) => acc + e.etymologies.length, 0)
            const entries = scan.Items.filter(entry => entry.etymologies.some(e => e.inflection !== 'referential'))
            sCount += entries.reduce((acc, e) => acc + e.etymologies.length, 0)
            while (entries.length) await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, 32)))
        }
        await sortTable(letter)
        console.log("\x1b[0m", `Etymologies beginning with "${letter}" in dynamo: ${dCount}`)
        console.log("\x1b[0m", `Etymologies beginning with "${letter}" in sheets: ${sCount}`)
    } catch (e) {
        console.error(` Error building letter "${letter}" sheet, retrying from it`)
        return await buildLetterSheet(letter)
    }
}