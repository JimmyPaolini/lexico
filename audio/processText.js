const fs = require('fs'), path = require('path')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, TableName } = require('../secrets/aws_credentials')
const dynamo = new AWS.DynamoDB.DocumentClient({accessKeyId, secretAccessKey, region, httpOptions: {
        agent: new (require('https')).Agent({keepAlive: true}) }})
const getItem = async word => (await dynamo.get({TableName, Key: {word}}).promise()).Item
String.prototype.norm = function() {return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

const textFilePath = path.join(process.cwd(), 'audio/data/text/virgil/aeneid_1.txt')
const text = fs.readFileSync(textFilePath,'utf8')
// console.log(normalizeText(text))
return macronizeText(normalizeText(text)).then(console.log)

function normalizeText(text) {
    text = text.replace(/[0-9]|[`—\-=~!@#$%^&*()_+\[\]\\;',\/{}|:"<>?]/g,'')
    text = text.replace(/\s+|\//g,' ')
    text = text.split('').map((c, i, arr) =>
        c === '.' && i + 1 < arr.length && i > 0 && !arr[i+1].match(/[A-Z]/) && !arr[i-1].match(/[A-Z]/) ? '': c
    ).join('')
    return text.trim()
}

async function macronizeText(text) {
    const macronized = []
    for (const word of text.split(' ')) macronized.push(await macronizeWord(word))
    return macronized.join(' ')
}

async function macronizeWord(word) {
    const entry = await getItem(word.norm())
    if (entry) return entry.etymologies[0].principalParts[0].split(': ')[1]

    const detackoned = await removeTackons(word.norm())
    if (detackoned) return detackoned

    if (word.match(/^[A-Z]/)) return await macronizeWord(word.toLowerCase())

    console.log(`\tOOV: ${word}`)
    return word
}

async function removeTackons(word) {
    const tackons = {
        "-que": "-que",
        "-ne": "-ne",
        "-ve": "-ve",
        "ve-": "vē-",
        "al-": "al-",
        "in-": "in-",
        "a-": "ā-",
        "sub-": "sub-",
        "ab-": "ab-",
        "dis-": "dis-",
        "e-": "ē-",
        "re-": "re-",
        "ac-": "ac-",
        "abs-": "abs-",
        "ne-": "ne-",
        "dys-": "dys-",
        "con-": "con-",
        "uni-": "ūni-",
        "im-": "im-",
        "hebe-": "hēbē-",
        "xeno-": "xeno-",
        "arthr-": "arthr-",
        "centi-": "centi-",
        "pseudo-": "pseudo-",
        "angusti-": "angusti-"
    }
    for (const tackon of Object.entries(tackons)) {
        if (tackon[0] === '-' + word.slice(-(tackon[0].length - 1))) { //suffix
            const detackoned = await getItem(word.replace(tackon[0].slice(1),''))
            if (detackoned) return detackoned.etymologies[0].principalParts[0].split(': ')[1] + tackon[1].replace('-','')
        } else if (tackon[0] === word.slice(0,(tackon[0].length - 1)) + '-') { //prefix
            const detackoned = await getItem(word.replace(tackon[0].slice(0,-1),''))
            if (detackoned) return tackon[1].replace('-','') + detackoned.etymologies[0].principalParts[0].split(': ')[1]
        }
    }
    return null
}