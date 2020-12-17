"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const typeorm_1 = require("typeorm");
const Word_1 = __importDefault(require("../../../../entity/Word"));
const Ingester_1 = __importDefault(require("../../Ingester"));
const forms_1 = require("../forms");
class Verb extends Ingester_1.default {
    constructor() {
        super(...arguments);
        this.firstPrincipalPartName = "present active";
    }
    ingestInflection() {
        const $ = this.$;
        const elt = this.elt;
        if (!$(elt).text().includes(";"))
            throw new Error(`no inflection`);
        let inflection = $(elt).text().trim().split("; ")[1];
        inflection = inflection
            .replace(/(conjugation)|[\d\[\]]/gi, "")
            .replace(" ,", ",")
            .replace(/\s+/g, " ")
            .trim();
        if (!inflection.length)
            return "uninflected";
        return inflection;
    }
    ingestForms() {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = this.$;
            const elt = this.elt;
            const word = this.word;
            const table = forms_1.parseFormTable($, elt);
            if (!table)
                throw new Error(`no forms`);
            function parseWords(cell, number, person) {
                const isMood = (word) => [
                    "indicative",
                    "subjunctive",
                    "imperative",
                    "non-finite",
                    "verbal nouns",
                ].includes(word);
                const isVoice = (word) => ["active", "passive"].includes(word);
                const isTense = (word) => [
                    "present",
                    "imperfect",
                    "future",
                    "perfect",
                    "pluperfect",
                    "future perfect",
                ].includes(word);
                cell = cell
                    .trim()
                    .replace(/[\d*]+/g, "")
                    .toLowerCase();
                if (cell.includes(", "))
                    return cell.split(", ");
                else if (cell.includes(" + ")) {
                    const identifiers = cell.split(" ");
                    let mood = "";
                    let voice = "";
                    let tense = "";
                    for (const identifier of identifiers)
                        if (isMood(identifier))
                            mood = identifier;
                        else if (isVoice(identifier))
                            voice = identifier;
                        else if (isTense(identifier))
                            tense = identifier;
                    return sum_esse_fui[mood][voice][tense][number][person].map((ext) => identifiers[0] + " " + ext);
                }
                else
                    return [cell];
            }
            function findIdentifiers(i, j, table) {
                const identifiers = new Set();
                const isForm = (cell) => cell.includes("<span ") || cell.includes("—") || cell.includes(" + ");
                let m = i;
                while (isForm(table[m][j]))
                    m--;
                identifiers
                    .add(table[m][j].toLowerCase().trim())
                    .add(table[m - 1][j].toLowerCase().trim());
                let n = j;
                while (isForm(table[i][n]))
                    n--;
                identifiers
                    .add(table[i][n].toLowerCase().trim())
                    .add(table[i][n - 1].toLowerCase().trim());
                identifiers.add(table[m][n].toLowerCase().trim());
                return Array.from(identifiers).map((id) => id
                    .replace("non-finite forms", "nonFinite")
                    .replace("verbal nouns", "verbalNouns")
                    .replace(/s$/, ""));
            }
            let forms = {};
            let disorganizedForms = table.reduce((disorganizedForms, row, i) => {
                return row.reduce((_, cell, j) => {
                    if (cell.includes("<span ") || cell.includes(" + ")) {
                        const c = cheerio_1.default.load(cell);
                        const identifiers = findIdentifiers(i, j, table);
                        if (!c.text().match(/[A-Za-zāēīōūȳ\-\s]+/))
                            return disorganizedForms;
                        disorganizedForms.push({
                            word: parseWords(c.text(), identifiers[1], identifiers[0]),
                            identifiers,
                        });
                    }
                    return disorganizedForms;
                });
            }, []);
            const Words = typeorm_1.getConnection().getRepository(Word_1.default);
            for (const inflection of JSON.parse(JSON.stringify(disorganizedForms))) {
                forms_1.sortIdentifiers(inflection, forms);
                for (const wordString of inflection.word) {
                    yield forms_1.insertForm(wordString, word, Words);
                }
            }
            return forms;
        });
    }
}
exports.default = Verb;
const sum_esse_fui = {
    "indicative": {
        active: {
            "present": {
                singular: {
                    first: ["sum"],
                    second: ["es"],
                    third: ["est"],
                },
                plural: {
                    first: ["sumus"],
                    second: ["estis"],
                    third: ["sunt"],
                },
            },
            "imperfect": {
                singular: {
                    first: ["eram"],
                    second: ["erās"],
                    third: ["erat"],
                },
                plural: {
                    first: ["erāmus"],
                    second: ["erātis"],
                    third: ["erant"],
                },
            },
            "future": {
                singular: {
                    first: ["erō"],
                    second: ["eris"],
                    third: ["erit"],
                },
                plural: {
                    first: ["erimus"],
                    second: ["eritis"],
                    third: ["erunt"],
                },
            },
            "perfect": {
                singular: {
                    first: ["fuī"],
                    second: ["fuistī"],
                    third: ["fuit"],
                },
                plural: {
                    first: ["fuimus"],
                    second: ["fuistis"],
                    third: ["fuērunt", "fuēre"],
                },
            },
            "pluperfect": {
                singular: {
                    first: ["fueram"],
                    second: ["fuerās"],
                    third: ["fuerat"],
                },
                plural: {
                    first: ["fuerāmus"],
                    second: ["fuerātis"],
                    third: ["fuerant"],
                },
            },
            "future perfect": {
                singular: {
                    first: ["fuerō"],
                    second: ["fueris"],
                    third: ["fuerit"],
                },
                plural: {
                    first: ["fuerimus"],
                    second: ["fueritis"],
                    third: ["fuerint"],
                },
            },
        },
    },
    "subjunctive": {
        active: {
            present: {
                singular: {
                    first: ["sim"],
                    second: ["sīs"],
                    third: ["sit"],
                },
                plural: {
                    first: ["sīmus"],
                    second: ["sītis"],
                    third: ["sint"],
                },
            },
            imperfect: {
                singular: {
                    first: ["essem", "forem"],
                    second: ["essēs", "forēs"],
                    third: ["esset", "foret"],
                },
                plural: {
                    first: ["essēmus", "forēmus"],
                    second: ["essētis", "forētis"],
                    third: ["essent", "forent"],
                },
            },
            perfect: {
                singular: {
                    first: ["fuerim"],
                    second: ["fuerīs"],
                    third: ["fuerit"],
                },
                plural: {
                    first: ["fuerīmus"],
                    second: ["fuerītis"],
                    third: ["fuerint"],
                },
            },
            pluperfect: {
                singular: {
                    first: ["fuissem"],
                    second: ["fuissēs"],
                    third: ["fuisset"],
                },
                plural: {
                    first: ["fuissēmus"],
                    second: ["fuissētis"],
                    third: ["fuissent"],
                },
            },
        },
    },
    "imperative": {
        active: {
            present: {
                singular: {
                    second: ["es"],
                },
                plural: {
                    second: ["este"],
                },
            },
            future: {
                singular: {
                    second: ["estō"],
                    third: ["estō"],
                },
                plural: {
                    second: ["estōte"],
                    third: ["suntō"],
                },
            },
        },
    },
    "non-finite forms": {
        infinitives: {
            active: {
                present: ["esse"],
                perfect: ["fuisse"],
                future: ["futūrum esse", "fore"],
            },
        },
        participles: {
            active: {
                future: ["futūrus"],
            },
        },
    },
};
//# sourceMappingURL=Verb.js.map