const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('./secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const deleteItem = async word => await dynamo.delete({TableName, Key: {word}}).promise()
async function deleteAllWords() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - START`)
    let totalCount = 0
    for (const letter of alphabet) {
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        let letterCount = 0

        const params = { TableName,
            FilterExpression: 'begins_with( #word, :letter )',
            ExpressionAttributeNames: {'#word': 'word'},
            ExpressionAttributeValues: {":letter": letter}
        }
        for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
        scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false) {
            for (const entry of scan.Items) {
                console.log(`Deleting "${entry.word}"`)
                await deleteItem(entry.word)
                totalCount++, letterCount++
                await new Promise(r => setTimeout(r, 10))
            }
        }
        console.log("\x1b[0m", `Words deleted starting with "${letter}": ${letterCount}`)
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Finished letter "${letter}"`)
    }
    console.log("\x1b[0m", `Words deleted total: ${totalCount}`)
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISH`)
}

return deleteAllWords()