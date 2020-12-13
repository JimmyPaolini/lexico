class Doc {
    constructor($) {
        this.$ = $;
        this.words = $("p:has(strong.Latn.headword)").get();
    }
}
//# sourceMappingURL=doc.js.map