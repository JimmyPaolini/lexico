const fs = require('fs'), path = require('path'), chalk = require('chalk')
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
const dataSlash = p => path.join(process.cwd(), `./audio/data/${p}`)

// originals.forEach(fileName => generateTextAnnotator(fileName))
// annotates.forEach(fileName => generateTextSplits(fileName))
// return generatePhonemicDictionary();


function generateTextAnnotator(originalDirectoryPath) {
    const originalText = fs.readFileSync(dataSlash(`original/${originalDirectoryPath}/${originalDirectoryPath}.txt`),'utf8')
    const textAnnotator = normalizeText(originalText)
    fs.writeFileSync(dataSlash(`annotate/${originalDirectoryPath}/${originalDirectoryPath}_annotator.txt`), textAnnotator)
    console.log(chalk.blue(`Generated annotator for "${originalDirectoryPath}"`))
    console.log(textAnnotator)
}

function generateTextSplits(annotatorDirectoryName) {
    const annotatorSplit = fs.readFileSync(dataSlash(
        `annotate/${annotatorDirectoryName}/${annotatorDirectoryName}_annotator.txt`),'utf8').split('1')
    let longest = [0, '']
    for (const phraseNum in annotatorSplit) {
        const phrase = annotatorSplit[phraseNum].trim()
        let label = phrase + ' \n' + phonemeateText(phrase) + ' _ '
        console.log(chalk.blue(phraseNum + '\n' + label + '\n'))
        fs.writeFileSync(dataSlash(
            `labelled/${annotatorDirectoryName}/${annotatorDirectoryName}_${phraseNum}.txt`), label)
        if (phrase.trim().split(' ').length >= longest[0])
            longest = [phrase.trim().split(' ').length, phrase]
    }
    console.log(`Generated text splits for "${annotatorDirectoryName}"`)
}

function generatePhonemicDictionary() {
    // fs.writeFileSync(`./audio/cmudict-la-cl.dict`, '')
    const files = fs.readdirSync(path.join(process.cwd(), `../dictionary/json`))
    for (const file of files) {
        const word = file.replace(/\.json/g,'')
        if (word <= 'murmuraremur') continue
        let phonemes = phonemeateWord(word).toUpperCase()
        while (phonemes.indexOf(':') >= 0)
            phonemes = phonemes.replace(':', phonemes.slice(phonemes.indexOf(':') - 1, phonemes.indexOf(':')))
        const line = word + ' ' + phonemes + '\n'
        console.log(line)
        fs.appendFileSync(`./audio/cmudict-la-cl.dict`, line)
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
    console.log(chalk.blue(`Phonemeated "${word}" - ${phonemes}`))
    return phonemes
}

async function macronizeText(text) {
    const macronizedWords = []
    for (const word of text.norm().split(' '))
        macronizedWords.push(await macronizeWord(word))
    return macronizedWords.join(' ')
}

async function macronizeWord(word) {
    let entry = getItem(word), macronized = ''
    if (!entry) {
        if (word.match(/.*que/)) {
            entry = getItem(word.slice(0,-3))
            if (entry) macronized = entry.etymologies[0].principalParts[0].split(': ')[0].split(' ')[0] + 'que'
            else macronized = getPronunciationsAndLog(word)
        } else if (word.match(/.*ve/)) {
            entry = getItem(word.slice(0,-2))
            if (entry) macronized = entry.etymologies[0].principalParts[0].split(': ')[0].split(' ')[0] + 've'
            else macronized = getPronunciationsAndLog(word)
        } else if (word.match(/.*ne/)) {
            entry = getItem(word.slice(0,-2))
            if (entry) macronized = entry.etymologies[0].principalParts[0].split(': ')[0].split(' ')[0] + 'ne'
            else macronized = getPronunciationsAndLog(word)
        } else macronized = getPronunciationsAndLog(word)
    } else macronized = entry.etymologies[0].principalParts[0].split(': ')[0].split(' ')[0]
    console.log(chalk.blue(`Macronized "${word}" - ${phonemes}`))
    return macronized
}

function normalizeText(text) {
    return text.toLowerCase().norm().replace(/[^A-Za-z.\s]|(\.$)/g,'')
        .replace(/((?<!\.[A-Za-z])\.[^A-Za-z])/g,' ')
        .replace(/(\s+)|(\/)/g,' ').trim()
}

function unabbreviateText(text) {
    return text
        .replace(/Agr\./gi,'agrippa')
        .replace(/Ap\./gi,'appius')
        .replace(/A\./gi,'aulus')
        .replace(/K\./gi,'caeso')
        .replace(/D\./gi,'decimo')
        .replace(/F\./gi,'faustus')
        .replace(/C\./gi,'gaius')
        .replace(/Gn\./gi,'gnaeus')
        .replace(/L\./gi,'lucius')
        .replace(/Mam\./gi,'mamercus')
        .replace(/M'\./gi,'manius')
        .replace(/M\./gi,'marcus')
        .replace(/N\./gi,'numerius')
        .replace(/O\./gi,'octavius')
        .replace(/Opt\./gi,'opiter')
        .replace(/Post\./gi,'postumus')
        .replace(/Pr\./gi,'proculus')
        .replace(/P\./gi,'publius')
        .replace(/A\./gi,'quintus')
        .replace(/Sert\./gi,'sertor')
        .replace(/Ser\./gi,'servius')
        .replace(/Sex\./gi,'sextus')
        .replace(/Ti\./gi,'tiberius')
        .replace(/T\./gi,'titus')
        .replace(/V\./gi,'vibius')
        .replace(/Vol\./gi,'volesus')
        .replace(/Vop\./gi,'vopiscus');
}

module.exports = { normalizeText, unabbreviateText };