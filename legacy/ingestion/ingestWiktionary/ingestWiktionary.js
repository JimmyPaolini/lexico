const fs = require('fs'), path = require('path'), chalk = require('chalk');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const { getFirstLetter } = require('../buildSpreadsheet/google_sheets_interface');
const { emailMe } = require('../../notifications');
const putItemHtml = entry => fs.writeFileSync(path.join(process.cwd(),
    `../dictionary/html/${entry.word.split('').map(c => 
        c.match(/[A-Z]/g) ? c + '`' : c).join('')}.json`),
    JSON.stringify(entry,null,2));

const categories = {
    'lemma': 'Latin_lemmas',
    'nonlemma': 'Latin_non-lemma_forms',
    'participle': 'Latin_participle_forms',
    'comparativeadverb': 'Latin_comparative_adverbs',
};

try {
    return ingestWiktionary(...process.argv.slice(2,5));
} catch (e) {
    return emailMe(`Error Ingesting Wiktionary`, `category="${process.argv[2]}", firstLetter="${process.argv[3]}", lastLetter="${process.argv[4]}"
    error="${e.toString()}"`);
}

async function ingestWiktionary(category = 'lemma', firstLetter = 'a', lastLetter = 'z') {
    console.log(chalk.red(`${(new Date()).toLocaleString()} - START - category="${category}", `
        + `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`));
    const host = `https://en.wiktionary.org`;
    let path = categories[category] ? `/w/index.php?title=Category:${categories[category]}&pagefrom=${firstLetter}` :
        category.replace(host,'');
    firstLetter = firstLetter.toLowerCase();
    lastLetter = lastLetter.toLowerCase();
    try {
        while (path) {
            console.log(chalk.yellow(`${(new Date()).toLocaleString()} - ${host + path}`));
            let $ = cheerio.load(await request.get(host + path, {forever: true}));
            for (const a of $('#mw-pages div.mw-category > div.mw-category-group > ul > li a').get()) {
                const word = $(a).text(), href = $(a).attr('href');
                if (word.match(/(Reconstruction:)|(Appendix:)/gi)) continue;
                if (getFirstLetter(word) < firstLetter || getFirstLetter(word) > lastLetter) {
                    console.log(chalk.red(`${(new Date()).toLocaleString()} - FINISH - category="${category}", `
                        + `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`));
                    return await emailMe(`Finished Ingesting Wiktionary`, `category="${category}", `
                        + `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`);
                }
                await ingestWord(word, href);
            }
            path = $('a:contains("next page")').eq(0).attr('href')
        }
    } catch (e) {
        console.log(chalk.red(`Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`));
        return await ingestWiktionary(path, firstLetter, lastLetter);
    }
}

async function ingestWord(word, path) {
    // if (!word.match(/^[A-Za-z-.`,!; ]*\$/)) return console.log(chalk.error(`Error "${entry.word}" - contains special characters`));
    if (!path.math(/.*#Latin/)) path += '#Latin';
    const entry = {word, href: `https://en.wiktionary.org${path}`};
    if (entry.href.includes(`/w/index.php`)) return console.log(chalk.red(`Error "${entry.word}" - no wiktionary page`));
    const $ = cheerio.load(await request.get(entry.href, {timeout: 10000, forever: true}));
    const section = $('span#Latin').parent().nextUntil('hr');
    if (section.length < 1) return console.log(chalk.red(`Error "${entry.word}" - no latin entry in wiktionary`));

    entry.html = `<div class="${entry.word}">${$.html(section)}</div>`;
    await putItemHtml(entry);
    console.log(chalk.blue(`Ingested "${entry.word}" HTML`));
}