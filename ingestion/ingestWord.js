const fs = require('fs'), path = require('path'), chalk = require('chalk');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const putItemHtml = entry => fs.writeFileSync(path.join(process.cwd(),
    `../dictionary/html/${entry.word.split('').map(c =>
        c.match(/[A-Z]/g) ? c + '`' : c).join('')}.json`),
    JSON.stringify(entry,null,2));
const getItemHtml = word => {
    try { return require(path.join(process.cwd(), `../dictionary/html/${word.split('').map(c =>
        c.match(/[A-Z]/g) ? c + '`' : c).join('')}.json`));
    } catch (e) { return undefined; }
};
const { Entry, log } = require('./ingestDictionary/Entry');

return ingestWord(process.argv[2]);

async function ingestWord(word = 'quirrito') {
    let entry = {word: word.toLowerCase(), href: `https://en.wiktionary.org/wiki/${word}#Latin`};
    console.log('HREF', entry.href);
    console.log('HTML: file://' + path.join(process.cwd(),`../dictionary/html/${entry.word}.json`));
    console.log('JSON: file://' + path.join(process.cwd(),`../dictionary/json/${entry.word}.json`));

    let $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}));
    const section = $('span#Latin').parent().nextUntil('hr');
    if (section.length < 1) return log(`Error "${entry.word}" - no latin entry in wiktionary`);
    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`;
    putItemHtml(entry);

    entry = getItemHtml(entry.word);
    entry = new Entry(entry);
    console.log(JSON.stringify(entry,null,2))
}