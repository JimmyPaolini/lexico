const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('./aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region})
const { appendEntryToSpreadsheet, entryToSheetsFormat } = require('./google_sheets_interface')

async function dynamoToSheets(letter) {
    console.log((new Date()).toLocaleString())
    const params = {
        TableName, FilterExpression : 'begins_with( #name0, :value0 )',
        ExpressionAttributeNames: { "#name0": "word"},
        ExpressionAttributeValues: { ":value0": letter }
    }
    for (let res = await dynamo.scan(params).promise();
         res.LastEvaluatedKey;
         res = await dynamo.scan({...params, ExclusiveStartKey: res.LastEvaluatedKey}).promise()) {
        for (const entry of res.Items) {
            if (entry.etymologies.every(e => e.inflection === 'referential')) continue
            try {
                await appendEntryToSpreadsheet(entryToSheetsFormat(entry))
                console.log("\x1b[34m", `Transferred "${entry.word}" - ${
                    entry.etymologies.map(etymology => etymology.partOfSpeech).join(', ')}`)
                await new Promise(r => setTimeout(r, 1000))
            } catch (e) { console.error(`Error transferring "${entry.word}" - ${e}`) }
        }
    }
    console.log((new Date()).toLocaleString())
}

dynamoToSheets('a')