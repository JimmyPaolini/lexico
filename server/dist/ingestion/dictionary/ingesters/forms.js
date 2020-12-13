"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const cheerio_tableparser_1 = __importDefault(require("cheerio-tableparser"));
function parseForms($, elt) {
    const table = parseFormTable($, elt);
    if (!table)
        throw new Error(`no forms`);
    function parseWords(cell) {
        cell = cell.trim().replace(/[\d*]/g, "").toLowerCase();
        return cell.includes(", ") ? cell.split(", ") : [cell];
    }
    function findIdentifiers(i, j, table) {
        const identifiers = new Set();
        const isForm = (cell) => cell.includes("<span ") ||
            cell.includes("—") ||
            cell.includes(" + ") ||
            !cell.length;
        let m = i;
        while (isForm(table[m][j]))
            m--;
        while (m >= 0 && !isForm(table[m][j]))
            identifiers.add(table[m--][j].replace(/\.|\//g, "").toLowerCase().trim());
        let n = j;
        while (isForm(table[i][n]))
            n--;
        while (n >= 0 && !isForm(table[i][n]))
            identifiers.add(table[i][n--].replace(/\.|\//g, "").toLowerCase().trim());
        if (["Singular", "Plural"].includes(table[++m][++n]))
            identifiers.add(table[m][n].toLowerCase().trim());
        return Array.from(identifiers);
    }
    let forms = {};
    let disorganizedForms = table.reduce((disorganizedForms, row, i) => {
        return row.reduce((_, cell, j) => {
            if (cell.includes("<span ")) {
                const c = cheerio_1.default.load(cell);
                const words = c("span")
                    .map((_, s) => c(s).text())
                    .get()
                    .join(", ");
                if (!words.match(/[A-Za-zāēīōūȳ\-\s]+/))
                    return disorganizedForms;
                disorganizedForms.push({
                    word: parseWords(words),
                    identifiers: findIdentifiers(i, j, table),
                });
            }
            return disorganizedForms;
        });
    }, []);
    for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
        sortIdentifiers(inflection, forms);
    }
    return forms;
}
exports.default = parseForms;
function parseFormTable($, elt) {
    const tableHtml = $(elt).nextUntil("h3", "table").first();
    if (tableHtml.length <= 0)
        return;
    const $table = cheerio_1.default.load($.html(tableHtml));
    cheerio_tableparser_1.default($table);
    let table = $table("table").parsetable(true, true, false);
    table = table[0].map((col, i) => table.map((row) => row[i]));
    table = table.map((tr) => {
        return tr.map((tc) => {
            const c = cheerio_1.default.load(tc);
            if (c("span").length <= 0)
                return c.text().trim();
            else
                return c("body").html();
        });
    });
    return table;
}
function sortIdentifiers(inflection, obj) {
    const identifier = inflection.identifiers.pop();
    if (!inflection.identifiers.length) {
        obj[identifier] = inflection.word;
        return obj;
    }
    else {
        if (!obj[identifier])
            obj[identifier] = {};
        obj[identifier] = sortIdentifiers(inflection, obj[identifier]);
        return obj;
    }
}
//# sourceMappingURL=forms.js.map