'use strict';
const fs = require('fs'), path = require('path'), chalk = require('chalk');
const { appendRowsToSpreadsheet, entriesToRows, getFirstLetter, clearTable, sortTable } = require('./google_sheets_interface');
const { emailMe } = require('../../notifications');
const getItem = word => {
    try { return require(path.join(process.cwd(),`../dictionary/json/${word}.json`)) }
    catch (e) { return undefined }
};

const BATCH_SIZE = 256;
let action = 'roots';
if (process.argv.length >= 2 && ['roots','all','clear'].includes(process.argv[2])) action = process.argv[2];
let firstLetter = 'a';
if (process.argv.length >= 3 && process.argv[3].match(/[a-z]/)) firstLetter = process.argv[3];
let lastLetter = 'z';
if (process.argv.length >= 4 && process.argv[4].match(/[a-z]/)) lastLetter = process.argv[4];

try {
    if (action === 'roots') return buildSpreadsheet();
    if (action === 'all') return buildSpreadsheet();
    if (action === 'clear') return clearSpreadsheet();
} catch (e) { return emailMe('Error Spreadsheet', `e.toString()`); }

async function buildSpreadsheet() {
    console.log(chalk.red(`${(new Date()).toLocaleString()} - START`));
    let files = fs.readdirSync(path.join(process.cwd(), `../dictionary/json`));
    files = files.filter(fileName => getFirstLetter(fileName) >= firstLetter && getFirstLetter(fileName) <= lastLetter);
    files.sort((a, b) => getFirstLetter(a).localeCompare(getFirstLetter(b)));

    let entries = [];
    let curLetter = firstLetter;
    await clearTable(curLetter);
    for (let fileName of files) {
        if (entries.length >= BATCH_SIZE || getFirstLetter(fileName) > curLetter) {
            await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, entries.length)));
            if (getFirstLetter(fileName) !== curLetter) {
                await sortTable(curLetter);
                curLetter = getFirstLetter(fileName);
                await clearTable(curLetter);
            }
        }
        const entry = require(path.join(process.cwd(), `../dictionary/json/${fileName}`));
        if (action === 'all') entries.push(entry);
        else if (entry.etymologies.some(etymology => etymology.root))
            entries.push({etymologies: entry.etymologies.filter(etymology => etymology.root), ...entry});
    }
    if (entries.length) await appendRowsToSpreadsheet(entriesToRows(entries.splice(0, entries.length)));
    await sortTable(curLetter);

    console.log(chalk.red(`${(new Date()).toLocaleString()} - FINISH`));
    await emailMe('Finished Building Spreadsheet', `firstLetter: ${firstLetter}\nlastLetter: ${lastLetter}`);
}

async function clearSpreadsheet() {
    console.log(chalk.red(`${(new Date()).toLocaleString()} - START`));
    const letters = [..."abcdefghijklmnopqrstuvwxyz"].filter(fileName =>
        getFirstLetter(fileName) >= firstLetter && getFirstLetter(fileName) <= lastLetter);
    for (const letter of letters) await clearTable(letter);
    console.log(chalk.red(`${(new Date()).toLocaleString()} - FINISH`));
    await emailMe('Finished Clearing Spreadsheet', `firstLetter: ${firstLetter}\nlastLetter: ${lastLetter}`);
}


