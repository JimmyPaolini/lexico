const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const { appendRowsToSpreadsheet, entriesToRows, clearTable, sortTable } = require('./google_sheets_interface')

async function buildSpreadsheet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - START`)
    for (const letter of alphabet) {
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        await clearTable(letter)

        let dCount = 0, sCount = 0
        const params = { TableName,
            FilterExpression: 'begins_with( #word, :letter )',
            ExpressionAttributeNames: {'#word': 'word'},
            ExpressionAttributeValues: {":letter": letter}
        }
        for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
        scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false) {
            dCount += scan.Items.reduce((acc, e) => acc + e.etymologies.length, 0)
            const entries = scan.Items.filter(entry => entry.etymologies.some(e => e.inflection !== 'referential'))
            sCount += entries.reduce((acc, e) => acc + e.etymologies.length, 0)
            while (entries.length) await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, 32)))
        }

        await sortTable(letter)
        console.log("\x1b[0m", `Etymologies beginning with "${letter}" in dynamo: ${dCount}`)
        console.log("\x1b[0m", `Etymologies beginning with "${letter}" in sheets: ${sCount}`)
    }
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISH`)
}

return buildSpreadsheet()
