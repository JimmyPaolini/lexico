'use strict';
const fs = require('fs'), path = require('path'), chalk = require('chalk');
const { appendRowsToSpreadsheet, entriesToRows, getFirstLetter, clearTable, sortTable } = require('./google_sheets_interface');
const { emailMe } = require('../../notifications');
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)) }
    catch (e) { return undefined }
};

if (process.argv[2] === 'clear') return clearSpreadsheet();

try { return buildSpreadsheet(process.argv[2], process.argv[3]); }
catch (e) { return emailMe('Error Ingesting Dictionary', e.toString()); }

async function buildSpreadsheet(firstLetter = 'a', lastLetter = 'z') {
    console.log(chalk.red(`${(new Date()).toLocaleString()} - START`));
    const files = fs.readdirSync(path.join(process.cwd(), `../dictionary/json`));
    files.splice(files.indexOf('.DS_Store'), 1);
    files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)));
    let entries = [];
    let curLetter = firstLetter;
    await clearTable(curLetter);
    for (let fileName of files) {
        if (getFirstLetter(fileName) < firstLetter || getFirstLetter(fileName) > lastLetter) continue;
        if (entries.length >= 128 || getFirstLetter(fileName) > curLetter) {
            await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, entries.length)));
            if (getFirstLetter(fileName) !== curLetter) {
                await sortTable(curLetter);
                curLetter = getFirstLetter(fileName);
                await clearTable(curLetter);
            }
        }
        const entry = require(path.join(process.cwd(), `../dictionary/json/${fileName}`));
        if (entry.etymologies.some(etymology => etymology.inflection !== 'inflection')) entries.push(entry);
    }
    if (entries.length) await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, entries.length)));
    await sortTable(curLetter);
    console.log(chalk.red(`${(new Date()).toLocaleString()} - FINISH`));
    await emailMe('Finished Building Spreadsheet', `firstLetter: ${firstLetter}\nlastLetter: ${lastLetter}`);
}

async function clearSpreadsheet() {
    for (const letter of [..."abcdefghijklmnopqrstuvwxyz"]) await clearTable(letter);
}
