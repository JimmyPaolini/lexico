const fs = require('fs'), path = require('path');
const { emailMe } = require('../../notifications');
const { Entry, log } = require('./Entry');
const { getFirstLetter } = require('../buildSpreadsheet/google_sheets_interface');

try { return ingestDictionary(process.argv[2], process.argv[3]) }
catch (e) { return emailMe('Error Ingesting Dictionary', e.toString()) }

async function ingestDictionary(firstLetter = 'a', lastLetter = 'z') {
    log(`${(new Date()).toLocaleString()} - READING HTML FILES`);
    const files = fs.readdirSync(path.join(process.cwd(), `../dictionary/html`));
    files.splice(files.indexOf('.DS_Store'), 1);
    files.sort((a,b) => getFirstLetter(a).localeCompare(getFirstLetter(b)));
    log(`${(new Date()).toLocaleString()} - STARTING INGESTION`);
    for (let fileName of files) {
        if (getFirstLetter(fileName) < firstLetter || getFirstLetter(fileName) > lastLetter) continue;
        if (fileName.slice(0,-5).match(/\s|\.|-/g)) continue;
        const entry = require(path.join(process.cwd(), `../dictionary/html/${fileName}`));
        const _ = new Entry(entry);
        await new Promise(r => setTimeout(r,5))
    }
    log(`${(new Date()).toLocaleString()} - FINISH`);
    await emailMe('Finished Ingesting Dictionary', `firstLetter: ${firstLetter}\nlastLetter: ${lastLetter}`)
}
