const AWS = require("aws-sdk");
const {region, accessKeyId, secretAccessKey} = require("../secrets/aws_credentials.json");
const dynamo = new AWS.DynamoDB.DocumentClient({region, accessKeyId, secretAccessKey});
const s3 = new AWS.S3({region, accessKeyId, secretAccessKey});
const fs = require('fs'), path = require('path');
const putItem = entry => fs.writeFileSync(path.join(process.cwd(), `../dictionary/json/${entry.word}.json`),
    JSON.stringify(entry,null,2));
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)); }
    catch (e) { return undefined; }
};
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")};
const getPronunciations = require('./pronunciation');

main();
async function main() {
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    console.log("Read files");
    const roots = [];
    for (const file of files) {
        const entry = require(path.join(process.cwd(),`../dictionary/json/${file}`));
        if (entry.etymologies.some(etymology => etymology.root)) {
            roots.push(entry.word);
            console.log(file);
        }
    }
    fs.writeFileSync(path.join(process.cwd(),`../dictionary/words.json`), JSON.stringify(words,null,2));
}

async function uploadDictionaryToS3() {
    const Bucket = "lexico-dictionary";
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    let count = 0;
    for (const file of files) {
        const Body = fs.readFileSync("../dictionary/json/" + file);
        await s3.putObject({
            Bucket,
            Key: file,
            Body
        }).promise();
        console.log(file);
        if (++count >= 1000) await new Promise(r => setTimeout(r, 500));
    }
}

async function uploadDictionaryToDynamo() {
    const TableName = "lexico";
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    files = files.filter(file => file.charAt(0).match(/a/i));
    for (const file of files) {
        const Item = require("../../dictionary/json/" + file);
        await dynamo.put({TableName, Item}).promise();
        console.log(Item);
        await new Promise(r => setTimeout(r, 300));
    }
}

function generateWordList() {
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    const words = files.map(fileName => fileName.replace(/\.json$/,''));
    fs.writeFileSync(path.join(process.cwd(),`../dictionary/words.json`), JSON.stringify(words,null,2));
    fs.writeFileSync(path.join(process.cwd(),`../dictionary/words.txt`), words.join('\n'));
    fs.writeFileSync(path.join(process.cwd(),`../dictionary/words_delin.txt`), words.map(word => `<s>${word}</s>`).join('\n'));
    console.log(JSON.stringify(words,null,2), files.length);
}

function countEntries() {
    let files = fs.readdirSync(path.join(process.cwd(),`../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    // files = files.filter(fileName => !fileName.match(/^a.*/));
    console.log(JSON.stringify(files,null,2), files.length)
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

