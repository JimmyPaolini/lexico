const fs = require('fs'), path = require('path')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const getItem = async word => (await dynamo.get({TableName, Key: {word}}).promise()).Item
const deleteItem = async word => await dynamo.delete({TableName, Key: {word}}).promise()
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
const getPronunciations = require('./pronunciation')

return countEntries()

function countEntries() {
    const files = fs.readdirSync(path.join(process.cwd(),`./dictionary/wiktionary/lemma`))
    files.splice(files.indexOf('.DS_Store'), 1)
    console.log(JSON.stringify(files,null,2))
}

async function countLetter(letter) {
    let count = 0
    const params = { TableName, FilterExpression: 'begins_with( #word, :letter )', Select: 'COUNT',
        ExpressionAttributeNames: {'#word': 'word'}, ExpressionAttributeValues: {":letter": letter} }
    for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
         scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false) {
        console.log(count += scan.Count)
    }
    return count
}

async function compareClassicalPronunciation() {
    let count = 0
    for (const letter of "s".split('')) {
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        const params = { TableName, FilterExpression: 'begins_with( #word, :letter )',
            ExpressionAttributeNames: {'#word': 'word'}, ExpressionAttributeValues: {":letter": letter} }
        for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
        scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false) {
            for (const entry of scan.Items) {
                if (!entry.etymologies[0].pronunciation.classical.phonemic) continue
                const macronized = entry.etymologies[0].principalParts[0].split(': ')[1].split(' or ')[0]
                const phonemic = entry.etymologies[0].pronunciation.classical.phonemic
                    .norm().replace(/[ː:]/g,'').replace(/ˈ|\.|\/|\s|(,.*)/g,'').replace(/ʰ/g,'h').replace(/ʷ/g,'w')
                    .replace(/ɡ/g,'g').replace(/zz/g,'z').replace(/jj/g,'j')
                    .replace(/ng/g,'ngg').replace(/nc/g,'ngk').replace(/nk/g,'ngk').replace(/nqu/g,'ngkw')
                    .replace(/kh/g,'k')
                const phonemes = getPronunciations(macronized, 'classical')
                    .map(p => p.replace(/\s|_/g,'').replace(/:/g,''))
                for (const pronunciation of phonemes) {
                    if (pronunciation !== phonemic) {
                        console.log(macronized + '\nExp: ' + phonemic + '\nAct: ' + pronunciation + '\n')
                        count++
                    }
                    // if (macronized === 'arātiuncula') {
                    //     phonemic.split('').forEach((l,i) =>
                    //         console.log(l, l === pronunciation.charAt(i), l === pronunciation.charAt(i)))
                    // }
                }
            }
        }
    }
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISHED: ${count}`)
}

async function findTackons() {
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - START`)
    const tackons = {}
    const params = { TableName,
        FilterExpression: 'contains( #word, :letter )',
        ExpressionAttributeNames: {'#word': 'word'},
        ExpressionAttributeValues: {":letter": '-'}
    }
    for (let scan = await dynamo.scan(params).promise(), first = true; scan.LastEvaluatedKey || first;
         scan = await dynamo.scan({...params,ExclusiveStartKey:scan.LastEvaluatedKey}).promise(),first=false) {
        for (const entry of scan.Items) {
            console.log(`Found "${entry.word}" - "${entry.etymologies[0].principalParts[0].split(': ')[1]}"`)
            tackons[entry.word] = entry.etymologies[0].principalParts[0].split(': ')[1]
        }
    }
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISH`)
    console.log(JSON.stringify(tackons,null,2))
    return tackons
}

async function deleteAllWords() {
    let totalCount = 0
    for (const letter of "abcdefghijklmnopqrstuvwxyz".split('')) {
        console.log("\x1b[0m", `${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        let letterCount = 0

        const params = { TableName, FilterExpression: 'begins_with( #word, :letter )',
            ExpressionAttributeNames: {'#word': 'word'}, ExpressionAttributeValues: {":letter": letter} }
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
    }
    console.log("\x1b[0m", `Words deleted total: ${totalCount}`)
    console.log("\x1b[0m", `${(new Date()).toLocaleString()} - FINISH`)
}