const fs = require('fs'), path = require('path')
const request = require('request-promise-native')
const cheerio = require('cheerio')
require('events').EventEmitter.defaultMaxListeners = 300;
const { emailMe } = require('../../notifications')
const putItem = async entry => fs.writeFileSync(path.join(process.cwd(),
    `../latin/wiktionary/lemma/${entry.word.split('').map(c => 
        c.match(/[A-Z]/g) ? c + '`' : c).join('')}.json`),
    JSON.stringify(entry,null,2))

const lemmasUrl = `https://en.wiktionary.org/wiki/Category:Latin_lemmas`
const nonlemmasUrl = `https://en.wiktionary.org/wiki/Category:Latin_non-lemma_forms`

try { return ingestLemmas(process.argv[2]) }
catch (e) { return emailMe('Error Ingesting Wiktionary', e.toString()) }

async function ingestLemmas(startUrl = lemmasUrl) {
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
        return path ? await ingestLemmas(path) : null
    }
    console.error(`${(new Date()).toLocaleString()} - FINISH`)
    await emailMe('Finished Ingesting Wiktionary', process.argv.slice(2).join(' '))
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

async function ingestWord(word, href) {
    const entry = {word, href: `https://en.wiktionary.org${href}`}
    if (entry.href.includes(`/w/index.php`)) return log(`Error "${entry.word}" - no wiktionary page`)
    let $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}))
    const section = $('span#Latin').parent().nextUntil('hr')
    if (section.length < 1) return log(`Error "${entry.word}" - no latin entry in wiktionary`)

    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
    await putItem(entry)
    console.log(`Ingested "${entry.word}" HTML`)
}

function log(message) {
    const logFilename = path.join(process.cwd(), `ingestion/ingestWiktionary/logs/${process.pid}.txt`)
    if (process.argv.length === 2) fs.appendFileSync(logFilename, message + '\n')
    return console.error(message)
}