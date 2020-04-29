const fs = require('fs'), path = require('path'), chalk = require('chalk');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const { normalizeText, unabbreviateText } = require('../learning/processText');

class Author {
    name;
    path;
    works = [];
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }
    addWork(path) {
        this.works.push(new Work(path))
    }
    singleWork(path) {
        this.works = [];
        this.works.push(new Work(path))
    }
}

class Work {
    path = '';
    title = '';
    text = '';
    constructor(path) {
        this.path = path
    }
}

const host = 'https://www.thelatinlibrary.com/';
const errors = [];

// return ingestAuthors();
return ingestWorks().then(_=> console.log(JSON.stringify(errors,null,2)));
// return ingestWork({ "name": "caesar" }, { "path": "caesar/gall8.shtml" });

async function ingestAuthors() {
    const tableHtml = cheerio.load(await request(host));
    cheerioTableParser(tableHtml);
    let authors = tableHtml('p>table').first().parsetable(true, true, false)
        .reduce((table, row) => [...table, ...row], [])
        .map(elt => {
            const a = cheerio.load(elt.trim())('a');
            const name = a.text().toLowerCase().replace(/\s/g,'_').trim();
            const path = a.attr('href');
            return new Author(name, path);
        })
        .sort((a,b) => a.name.localeCompare(b.name));

    for (const i in authors) {
        const author = authors[i];

        if (!fs.existsSync(path.join(process.cwd(), `./learning/data/original/${author.name}`)))
            fs.mkdirSync(path.join(process.cwd(), `./learning/data/original/${author.name}`));

        const $$ = cheerio.load(await request(host + author.path));
        for (const a of $$('a').get()) {
            const href = $$(a).attr('href');
            if (!href || href.match(/index.html/) || href.match(/classics.html/)) continue;
            author.addWork(href)
        }

        if (!author.works.every(work => work.path.match(/.*.s?html/)))
            author.singleWork(author.path);

    }

    fs.writeFileSync(path.join(process.cwd(), `./learning/authors.json`), JSON.stringify(authors,null,2));
}

async function ingestWorks() {
    const authors = JSON.parse(fs.readFileSync(path.join(process.cwd(), `./learning/authors.json`)));
    for (const author of authors) {
        for (const work of author.works) {
            if (work.path === 'resgestae1.html') continue
            await ingestWork(author, work)
        }
    }
}

async function ingestWork(author, work) {
    try {
        const html = (await request(host + work.path))
            .replace(/[^\x00-\x7F]/g, "")
            .match(/<html>(.|\n)*<\/html>/i)[0];
        const $ = cheerio.load(html);

        work.title = $('head title').text().toLowerCase().trim()
            .replace(/\s/g, '_')
            .replace(/:/,'');
        work.title = unabbreviateText(work.title);
        if (!work.title.length) throw new Error(`no title`);

        $('body').find('.pagehead, .internal_navigation, .footer').remove();

        for (const p of $('p, :header').get())
            work.text += $(p).clone().children().remove().end().text();
        work.text = work.text.replace(/\n\n+/g, '\n\n').replace(/[\[\]]+ ?/g, '').trim();
        if (!work.text.length) throw new Error(`no text`);

        fs.writeFileSync(path.join(process.cwd(), `./learning/data/original/${author.name}/${work.title}.txt`), work.text);
        console.log(`Ingested ${author.name}/${work.title}.txt`)
    } catch (e) {
        console.error(`Error ${author.name} - ${work.path} - ${e.toString()}`);
        errors.push(host + work.path);
    }
}

// [
//     "https://www.thelatinlibrary.com/ammianus/20.shtml",
//     "https://www.thelatinlibrary.com/ammianus/21.shtml",
//     "https://www.thelatinlibrary.com/ammianus/22.shtml",
//     "https://www.thelatinlibrary.com/florus1.html",
//     "https://www.thelatinlibrary.com/ovid/ovid/ovid.ponto.shtml",
//     "https://www.thelatinlibrary.com/silius/silius3.shtml",
//     "https://www.thelatinlibrary.com/apuleius/apuleius4.shtml",
//     "https://www.thelatinlibrary.com/cicero/quinc.shtml",
//     "https://www.thelatinlibrary.com/cicero/sex.rosc.shtml",
//     "https://www.thelatinlibrary.com/cicero/cluentio.shtml",
//     "https://www.thelatinlibrary.com/cicero/domo.shtml",
//     "https://www.thelatinlibrary.com/frontinus/aqua1.shtml",
//     "https://www.thelatinlibrary.com/prop2.html",
//     "https://www.thelatinlibrary.com/quintilian/quintilian.institutio5.shtml",
//     "https://www.thelatinlibrary.com/suetonius/suet.aug.html",
//     "https://www.thelatinlibrary.com/suetonius/suet.tib.html",
//     "https://www.thelatinlibrary.com/suetonius/suet.nero.html",
//     "https://www.thelatinlibrary.com/apicius.html",
//     "https://www.thelatinlibrary.com/avienus.html",
//     "https://www.thelatinlibrary.com/fronto.html",
//     "https://www.thelatinlibrary.com/reposianus.html",
//     "https://www.thelatinlibrary.com/sha/alexsev.shtml",
//     "https://www.thelatinlibrary.com/hymni.html",
//     "https://www.thelatinlibrary.com/hymni.html",
//     "https://www.thelatinlibrary.com/papal.html",
//     "https://www.thelatinlibrary.com/horace/epist1.shtml",
//     "https://www.thelatinlibrary.com/martial/mart.spec.shtml",
//     "https://www.thelatinlibrary.com/fabe.html",
//     "https://www.thelatinlibrary.com/thesauro.html",
//     "https://www.thelatinlibrary.com/magnacarta.html",
//     "https://www.thelatinlibrary.com/nithardus.html",
//     "https://www.thelatinlibrary.com/justin/1.html",
//     "https://www.thelatinlibrary.com/sen/seneca.ep6.shtml",
//     "https://www.thelatinlibrary.com/sen/seneca.ep16.shtml",
//     "https://www.thelatinlibrary.com/sen/seneca.ep17-18.shtml",
//     "https://www.thelatinlibrary.com/addison.html",
//     "https://www.thelatinlibrary.com/celtis.html",
//     "https://www.thelatinlibrary.com/fletcher.html",
//     "https://www.thelatinlibrary.com/forsett.html",
//     "https://www.thelatinlibrary.com/gwinne.html",
//     "https://www.thelatinlibrary.com/landor.html",
//     "https://www.thelatinlibrary.com/luther.html",
//     "https://www.thelatinlibrary.com/pascoli.html",
//     "https://www.thelatinlibrary.com/piccolomini.html",
//     "https://www.thelatinlibrary.com/psplato.html"
// ]