"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../../../utils/string");
function parseTranslations($, elt, word) {
    var _a;
    const translationsHeader = $(elt).nextAll("ol").first();
    if (translationsHeader.length <= 0)
        throw new Error(`no translations`);
    let translations = [];
    for (const li of $(translationsHeader).children("li").get()) {
        if ($(li).find("span.form-of-definition-link .selflink").length)
            continue;
        if ($(li).text().length <= 0)
            continue;
        $(li).children("ol, ul, dl").remove();
        let translation = $(li).text();
        if (translation.match(/This term needs a translation to English/))
            continue;
        translation = translation.trim().replace(/\.$/, "");
        translations.push({
            text: translation.charAt(0).toUpperCase() + translation.slice(1),
            word,
        });
        if ($(li).find("span.form-of-definition-link").length > 0)
            translations.push({
                text: ((_a = translations.pop()) === null || _a === void 0 ? void 0 : _a.text) +
                    " " +
                    $(li)
                        .find("span.form-of-definition-link i.Latn.mention")
                        .get()
                        .map((ref) => `{*${string_1.normalize($(ref).text())}*}`)
                        .join(" "),
                word,
            });
    }
    translations = translations.filter((translation) => !!translation);
    if (!translations.length)
        throw new Error("no translations");
    return translations;
}
exports.default = parseTranslations;
//# sourceMappingURL=translations.js.map