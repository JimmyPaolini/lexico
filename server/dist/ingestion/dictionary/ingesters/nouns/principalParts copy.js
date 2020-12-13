"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parsePrincipalParts(ingester, $, elt, firstPrincipalPartName) {
    let principalParts = [];
    principalParts.push({
        name: firstPrincipalPartName,
        text: $(elt)
            .children("strong.Latn.headword")
            .get()
            .map((p1) => $(p1).text().toLowerCase())
            .join(" or "),
    });
    for (const b of $(elt).children("b").get()) {
        if ($(b).prev("i").text() === "or") {
            const lastPrincipalPart = principalParts.pop();
            if (!lastPrincipalPart)
                continue;
            lastPrincipalPart.text += ` or ${$(b).text().toLowerCase()}`;
            principalParts.push(lastPrincipalPart);
        }
        else {
            principalParts.push({
                name: $(b).prev("i").text(),
                text: $(b).text().toLowerCase(),
            });
        }
    }
    ingester.macronizedWord = principalParts[0].text;
    return principalParts;
}
exports.default = parsePrincipalParts;
//# sourceMappingURL=principalParts%20copy.js.map