class Etymology {
    partOfSpeech // defined in individual word class constructors

    translations = []
    ingestTranslations($, elt) {
        const translationsHeader = $(elt).nextAll('ol').first()
        if (translationsHeader.length <= 0) return

        $(translationsHeader).children('li').each((_, li) => {
            if ($(li).text().length <= 0) return
            $(li).children('ul').remove()
            $(li).children('dl').remove()
            this.translations.push($(li).text().trim())
        })
    }

    etymology = ``
    ingestEtymology($, elt) {
        const etymologyHeader = $(elt).prevAll(':header:contains("Etymology")').first()
        if ($(etymologyHeader).length > 0) this.etymology = $(etymologyHeader).next().text().trim()

    }

    pronunciation = {}
    ingestPronunciation($, elt) {
        const pronunciationHeader = $(elt).prevAll(':header:contains("Pronunciation")')
        if ($(pronunciationHeader).length <= 0) return

        function parsePhonics(pronunciations) {
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
        catch (e) { console.error(`Trouble ingesting translations - ${e}`)}
        try { this.ingestEtymology($, elt) }
        catch (e) { console.error(`Trouble ingesting etymology - ${e}`)}
        try { this.ingestPronunciation($, elt) }
        catch (e) { console.error(`Trouble ingesting pronunciation - ${e}`)}
        if (!Object.keys(this.etymology).length) delete this.etymology
        if (!Object.keys(this.pronunciation).length) delete this.pronunciation
    }
}


module.exports = Etymology