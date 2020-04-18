const fs = require('fs'), path = require('path')
const putItem = entry => fs.writeFileSync(path.join(process.cwd(), `../dictionary/json/${entry.word}.json`),
    JSON.stringify(entry,null,2))
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)) }
    catch (e) { return undefined }
}
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
const getPronunciations = require('./pronunciation')

return countEntries()

function countEntries() {
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`))
    files.splice(files.indexOf('.DS_Store'), 1)
    // files = files.filter(fileName => !fileName.match(/^[A-Za-z`, ]*\.json$/))
    console.log(JSON.stringify(files,null,2), files.length)
    // for (const file of files) fs.unlinkSync(path.join(process.cwd(),`../dictionary/html/${file}`))
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
