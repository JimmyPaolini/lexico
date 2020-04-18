'use strict';
const fs = require('fs'), path = require('path')
const { emailMe } = require('../../notifications')
const { Entry, log } = require('./Entry')
const { getLetter } = require('../buildSpreadsheet/google_sheets_interface')

try { return ingestDictionary(process.argv[2], process.argv[3]) }
catch (e) { return emailMe('Error Ingesting Dictionary', e.toString()) }

async function ingestDictionary(firstLetter = 'a', lastLetter = 'z') {
    log(`${(new Date()).toLocaleString()} - START`)
    const files = fs.readdirSync(path.join(process.cwd(), `../dictionary/html`))
    files.splice(files.indexOf('.DS_Store'), 1)
    for (let fileName of files) {
        if (getLetter(fileName) < firstLetter || getLetter(fileName) > lastLetter) continue
        const entry = require(path.join(process.cwd(), `../dictionary/html/${fileName}`));
        (new Entry(entry)).ingest(entry.html)
        await new Promise(r => setTimeout(r,5))
    }
    log(`${(new Date()).toLocaleString()} - FINISH`)
    await emailMe('Finished Ingesting Dictionary', `firstLetter: ${firstLetter}\nlastLetter: ${lastLetter}`)
}
