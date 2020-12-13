const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const fullname = {
    "virgil": "publius vergilius maro",
    "caesar": "gaius iulius caesar",
    "ovid": "publius ovidius naso",
    "augustus": "caesar divi filius augustus",
}

summarize("literature");

function summarize(path) {
    if (!fs.lstatSync(path).isDirectory()) return;
    const title = path.split("/").pop();
    const children = fs.readdirSync(path)
        .filter(file => !file.match(/\.json/))
        .map(title => {
            if (!fs.lstatSync(`${path}/${title}`).isDirectory()) return title;
            const children = fs.readdirSync(`${path}/${title}`)
                .filter(file => !file.match(/\.json/))
                // .map(title => title.replace(/\.txt/, ''))
                .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));
            summarize(`${path}/${title}`);
            const author = `${path}/${title}`.replace("literature/", '').split("/")[0];
            return {title, author: fullname[author], children};
        })
        .sort((a, b) => {
            if (a.title && b.title) return a.title.localeCompare(b.title, undefined, {numeric: true, sensitivity: 'base'});
            if (a.title && !b.title) return -1;
            if (!a.title && b.title) return 1;
            return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
        });
    const author = path.replace("literature/", '').split("/")[0];
    const json = JSON.stringify({title, author: fullname[author], children}, null, 2);
    console.log(path, json);
    fs.writeFileSync(`${path}/info.json`, json);
}