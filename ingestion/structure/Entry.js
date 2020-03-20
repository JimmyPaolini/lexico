class Entry {
    word = ``
    href = ``
    constructor(word, path) {
        this.word = [...word].map(c => {
            if (c.match(/[A-Z]/g)) return '`' + c
            else return c
        }).join('')
        this.href = `https://en.wiktionary.org${path}`
    }

    html = ``

    etymologies = []
    addEtymology(etymology) { this.etymologies.push(etymology) }
}

module.exports = Entry