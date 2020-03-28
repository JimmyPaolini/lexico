class Etymology {

    ingest($, elt) {
        this.errors = []
        try { this.ingestTranslations($, elt) }
        catch (e) { this.errors.push(`Translations ${e}`); delete this.translations }
        try { this.ingestPronunciation($, elt) }
        catch (e) { /*this.errors.push(`Pronunciation ${e}`);*/ }
        try { this.ingestEtymology($, elt) }
        catch (e) { /*this.errors.push(`Etymology ${e}`);*/ }
        if (!(this instanceof require('./inflected_etymologies/InflectedEtymology'))
            && !this.errors.length) delete this.errors
    }

    ingestTranslations($, elt) {
        this.translations = []
        const translationsHeader = $(elt).nextAll('ol').first()
        if (translationsHeader.length <= 0) throw new Error(`no translations`)

        const Entry = require('../Entry')
        for (const li of $(translationsHeader).children('li').get()) {
            if ($(li).text().length <= 0) continue
            $(li).children('ul').remove()
            $(li).children('dl').remove()
            if ($(li).find('span.form-of-definition-link').length > 0) {
                this.translations.push({
                    translation: $(li).text().trim(),
                    reference: new Entry($(li).find('span.form-of-definition-link a').attr('title'),
                        $(li).find('span.form-of-definition-link a').attr('href'))
                })
            } else this.translations.push({ translation: $(li).text().trim() })
        }
    }

    ingestEtymology($, elt) {
        const etymologyHeader = $(elt).prevAll(':header:contains("Etymology")').first()
        if ($(etymologyHeader).length <= 0 || $(etymologyHeader).next()[0].name !== 'p') throw new Error(`no etymology`)
        this.etymology = $(etymologyHeader).next().text().trim()
    }

    ingestPronunciation($, elt) {
        const pronunciationHeader = $(elt).prevAll(':header:contains("Pronunciation")')
        if ($(pronunciationHeader).length <= 0) throw new Error(`no pronunciation`)

        function parsePhonics(pronunciations) {
            const parsed = {}
            for (const pronunciation of pronunciations)
                if (/\/.*\//.test(pronunciation)) parsed.phonemic = pronunciation
                else if (/\[.*\]/.test(pronunciation)) parsed.phonetic = pronunciation
            return parsed
        }

        this.pronunciation = {}
        for (const pr of $(pronunciationHeader).next('ul').children().get()) {
            const pronunciations = $(pr).text().split(': ')[1].split(', ')
            if ($(pr).find('a').text().includes('Classical')) this.pronunciation.classical = parsePhonics(pronunciations)
            else if ($(pr).find('a').text().includes('Ecclesiastical')) this.pronunciation.ecclesiastical = parsePhonics(pronunciations)
            else if ($(pr).find('a').text().includes('Vulgar')) this.pronunciation.vulgar = parsePhonics(pronunciations)
        }
    }
}

module.exports = Etymology