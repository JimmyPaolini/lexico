const fs = require('fs'), path = require('path')
const chalk = require('chalk')
const getPronunciations = require('../ingestion/pronunciation')
const getPronunciationsAndLog = word => {
    console.error(`OOV: ${word}`)
    return getPronunciations(word, 'classical')
}
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)) }
    catch (e) { return undefined }
}
String.prototype.norm = function() {
    return this.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
}
const dataPath = p => path.join(process.cwd(), `./audio/data/${p}`)


// return generateTextSplits('cicero_de_anulo_gygis')
return generateTextAnnotator('latinitium/cicero_de_anulo_gygis')

function generateTextSplits(annotatorDirectoryName) {
    const annotatorSplit = fs.readFileSync(dataPath(
        `annotated/${annotatorDirectoryName}/${annotatorDirectoryName}_annotator.txt`),'utf8').split('1')
    let longest = [0, '']
    for (const phraseNum in annotatorSplit) {
        const phrase = annotatorSplit[phraseNum].trim()
        let label = phrase + ' \n' + phonemeateText(phrase) + ' _ '
        console.log(phraseNum + '\n' + label + '\n')
        fs.writeFileSync(dataPath(
            `labelled/${annotatorDirectoryName}/${annotatorDirectoryName}_${phraseNum}.txt`), label)
        if (phrase.trim().split(' ').length >= longest[0])
            longest = [phrase.trim().split(' ').length, phrase]
    }
}

function phonemeateText(text) {
    let phonemeatedWords = []
    for (const word of text.split(' ')) phonemeatedWords.push(phonemeateWord(word))
    return phonemeatedWords.join(' _ ')
}

function phonemeateWord(word) {
    let entry = getItem(word), phonemes = ''
    if (!entry) {
        if (word.match(/.*que/)) {
            entry = getItem(word.slice(0,-3))
            if (entry) phonemes = entry.etymologies[0].pronunciation.classical.phonemes + ' kw e'
            else phonemes = getPronunciationsAndLog(word)
        } else if (word.match(/.*ve/)) {
            entry = getItem(word.slice(0,-2))
            if (entry) phonemes = entry.etymologies[0].pronunciation.classical.phonemes + ' w e'
            else phonemes = getPronunciationsAndLog(word)
        } else if (word.match(/.*ne/)) {
            entry = getItem(word.slice(0,-2))
            if (entry) phonemes = entry.etymologies[0].pronunciation.classical.phonemes + ' n e'
            else phonemes = getPronunciationsAndLog(word)
        } else phonemes = getPronunciationsAndLog(word)
    } else phonemes = entry.etymologies[0].pronunciation.classical.phonemes
    return phonemes
}

function generateTextAnnotator(originalDirectoryPath) {
    const originalText = fs.readFileSync(dataPath(
        `original/text/${originalDirectoryPath}.txt`),'utf8')
    const textAnnotator = normalizeText(originalText)
    console.log(textAnnotator)
    // fs.writeFileSync(dataPath(`labelled/${annotatorDirectoryName}/${annotatorDirectoryName}_${phraseNum}.txt`),
    //     textAnnotator)
}

function normalizeText(text) {
    return text.toLowerCase().replace(/[^A-Za-z.\s]|(\.$)/g,'')
        .replace(/((?<!\.[A-Za-z])\.[^A-Za-z])/g,' ')
        .replace(/(\s+)|(\/)/g,' ').trim()
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