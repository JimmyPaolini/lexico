class Etymology {
    errors = []

    partOfSpeech // defined in individual word class constructors

    translations = []
    ingestTranslations($, elt) {
        const translationsHeader = $(elt).nextAll('ol').first()
        if (translationsHeader.length <= 0) throw new Error(`no translations found`)

        $(translationsHeader).children('li').each((_, li) => {
            if ($(li).text().length <= 0) return
            $(li).children('ul').remove()
            $(li).children('dl').remove()
            if ($(li).children('span.form-of-definition.use-with-mention').length > 0) this.errors.push(`Reference translation: ${$(li).text().trim()}`)
            else this.translations.push($(li).text().trim())
        })

        if (!this.translations.length) throw new Error(`only reference translations found`)
    }

    etymology = ``
    ingestEtymology($, elt) {
        const etymologyHeader = $(elt).prevAll(':header:contains("Etymology")').first()
        if ($(etymologyHeader).length <= 0) throw new Error(`no etymology found`)
        this.etymology = $(etymologyHeader).next().text().trim()
    }

    pronunciation = {}
    ingestPronunciation($, elt) {
        const pronunciationHeader = $(elt).prevAll(':header:contains("Pronunciation")')
        if ($(pronunciationHeader).length <= 0) throw new Error(`no pronunciation found`)

        const parsePhonics = pronunciations => {
            const parsed = {}
            for (const pronunciation of pronunciations)
                if (/\/.*\//.test(pronunciation)) parsed.phonemic = pronunciation
                else if (/\[.*\]/.test(pronunciation)) parsed.phonetic = pronunciation
            return parsed
        }

        $(pronunciationHeader).next('ul').children().each((_, pr) => {
            if ($(pr).find('a').text().includes('Classical'))
                this.pronunciation.classical = parsePhonics($(pr).text().split(': ')[1].split(', '))
            else if ($(pr).find('a').text().includes('Ecclesiastical'))
                this.pronunciation.ecclesiastical = parsePhonics($(pr).text().split(': ')[1].split(', '))
            else if ($(pr).find('a').text().includes('Vulgar'))
                this.pronunciation.vulgar = parsePhonics($(pr).text().split(': ')[1].split(', '))
        })
    }

    ingest($, elt) {
        try { this.ingestTranslations($, elt) }
        catch (e) { this.errors.push(`Translations ${e}`); delete this.translations }
        try { this.ingestEtymology($, elt) }
        catch (e) { this.errors.push(`Etymology ${e}`); delete this.etymology }
        try { this.ingestPronunciation($, elt) }
        catch (e) { this.errors.push(`Pronunciation ${e}`); delete this.pronunciation }
    }
}


module.exports = Etymology