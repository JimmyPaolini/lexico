const fs = require('fs'), path = require('path')
const { emailMe } = require('../../notifications')
const { Entry, log } = require('./Entry')

try { return ingestDictionary() }
catch (e) { return emailMe('Error Ingesting Dictionary', e.toString()) }

async function ingestDictionary() {
    log(`${(new Date()).toLocaleString()} - START`)
    const files = fs.readdirSync(path.join(process.cwd(), `../latin/wiktionary`))
    files.splice(files.indexOf('.DS_Store'), 1)
    for (let fileName of files) {
        const entry = require(path.join(process.cwd(), `../latin/wiktionary/${fileName}`))
        await (new Entry(entry)).ingest(entry.html)
    }
    log(`${(new Date()).toLocaleString()} - FINISH`)
    await emailMe('Finished Ingesting Dictionary', process.argv.slice(2).join(' '))
}
