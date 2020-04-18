const fs = require('fs'), path = require('path')
const request = require('request-promise-native')
const cheerio = require('cheerio')
require('events').EventEmitter.defaultMaxListeners = 300;
const { emailMe } = require('../../notifications')
const putItem = async entry => fs.writeFileSync(path.join(process.cwd(),
    `../dictionary/html/${entry.word.split('').map(c => 
        c.match(/[A-Z]/g) ? c + '`' : c).join('')}.json`),
    JSON.stringify(entry,null,2))

const lemmasUrl = `https://en.wiktionary.org/wiki/Category:Latin_lemmas`
const participlesUrl = `https://en.wiktionary.org/wiki/Category:Latin_participles`
const comparativeAdjectivesUrl = `https://en.wiktionary.org/wiki/Category:Latin_comparative_adjectives`
const superlativeAdjectivesUrl = `https://en.wiktionary.org/wiki/Category:Latin_superlative_adjectives`

try {
    if (process.argv.length >= 3) return ingestCategory(process.argv[2])
    else return ingestCategory(lemmasUrl).then(_ =>
        ingestCategory(participlesUrl).then(_ =>
            ingestCategory(comparativeAdjectivesUrl).then(_ =>
                ingestCategory(superlativeAdjectivesUrl))))
} catch (e) { return emailMe('Error Ingesting Wiktionary', e.toString()) }

async function ingestCategory(startUrl = lemmasUrl) {
    console.error(`${(new Date()).toLocaleString()} - START`)
    let path = startUrl.replace('https://en.wiktionary.org','')
    try {
        while (path) {
            console.error(`${(new Date()).toLocaleString()} - ${path}`)
            let $ = cheerio.load(await request.get('https://en.wiktionary.org' + path, {forever: true}))
            for (const a of $('#mw-pages div.mw-category > div.mw-category-group > ul > li a').get()) {
                if ($(a).text().match(/(Reconstruction:)|(Appendix:)/gi)) continue
                await ingestWord($(a).text(), $(a).attr('href'))
            }
            path = $('a:contains("next page")').eq(0).attr('href')
        }
    } catch (e) {
        console.error(`Error on url "https://en.wiktionary.org${path}" - ${e}`)
        return path ? await ingestCategory(path) : null
    }
    console.error(`${(new Date()).toLocaleString()} - FINISH`)
    await emailMe('Finished Ingesting Wiktionary', startUrl)
}

async function ingestWord(word, href) {
    if (!word.match(/^[A-Za-z-.`,!; ]*\$/)) return log(`Error "${entry.word}" - contains special characters`)
    const entry = {word, href: `https://en.wiktionary.org${href}`}
    if (entry.href.includes(`/w/index.php`)) return log(`Error "${entry.word}" - no wiktionary page`)
    let $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}))
    const section = $('span#Latin').parent().nextUntil('hr')
    if (section.length < 1) return log(`Error "${entry.word}" - no latin entry in wiktionary`)

    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
    await putItem(entry)
    console.log(`Ingested "${entry.word}" HTML`)
}

async function ingestLetters(alphabet = "abcdefghijklmnopqrstuvwxyz") {
    for (const letter of alphabet.split('')) {
        log(`${(new Date()).toLocaleString()} - Starting letter "${letter}"`)
        const $ = cheerio.load(await request.get(`https://en.wiktionary.org/wiki/Index:Latin/${letter}`, {forever: true}))
        for (const wordLink of $('div.index>ol>li>a:first-child').get()) {
            await ingestWord($(wordLink).text(), $(wordLink).attr('href'))
        }
    }
    log(`${(new Date()).toLocaleString()} - FINISH`)
}

function log(message) {
    const logFilename = path.join(process.cwd(), `ingestion/ingestWiktionary/logs/${process.pid}.txt`)
    if (process.argv.length === 2) fs.appendFileSync(logFilename, message + '\n')
    return console.error(message)
}