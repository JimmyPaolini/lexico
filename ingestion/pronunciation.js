function getClassicalPhonemes(wordString) {
    const classicalPhonemes = { // first array lists possibilities, nested array lists sequence of phonemes
        b: 'b',
        c: 'k', //
        ch: 'kh', //
        d: 'd',
        f: 'f',
        g: 'g',
        gn: [['ng', 'n'], ['g', 'n']],
        h: 'h',
        // i is a consonant 'j' if at the beginning or surrounded by vowels
        k: 'k',
        // l is long 'll' if at the end or preceding a consonant
        m: 'm',
        n: 'n',
        ng: [['ng', 'g']],
        nc: [['ng', 'k']],
        nq: [['ng', 'q']],
        nx: [['ng', 'ks']],
        p: 'p',
        ph: 'ph', // not f, but aspirated p
        qu: 'kw',
        r: 'r',
        s: 's',
        t: 't',
        th: 'th', // not th, but aspirated t
        v: 'w', //
        x: 'ks',
        z: 'z',
        // vowels
        a: 'a', ā: 'a:',
        e: 'e', ē: 'e:',
        i: 'i', ī: 'i:',
        o: 'o', ō: 'o:',
        u: 'u', ū: 'u:',
        y: 'y', ȳ: 'y:',
        // diphthongs
        ae: ['ae', ['a', 'e']],
        oe: ['oe', ['o', 'e']],
        au: ['au', ['a', 'u']],
        eu: ['eu', ['e', 'u']],
        ui: ['ui', ['u', 'i']],
        // space
        ' ': '_'
    }
    const phonemes = []
    const isVowel = letter => ['a', 'e', 'i', 'o', 'u'].includes(letter)
    const word = wordString.split('')
    for (let i = 0; i < word.length; i++) {
        if (word[i] === 'ī') phonemes.push(classicalPhonemes['ī'])
        else if (word[i] === 'i') {
            if (i === 0 && i + 1 < word.length && isVowel(word[i+1])) phonemes.push('j')
            else if (i - 1 > 0 && i + 1 < word.length && isVowel(word[i-1]) && isVowel(word[i+1])) phonemes.push('j')
            else phonemes.push(classicalPhonemes['i'])
        } else if (word[i] === 'l') {
            if (i + 1 < word.length && (isVowel(word[i+1]) || word[i+1] === 'l')) {
                phonemes.push('l')
            } else phonemes.push('ll')
            if (i + 1 < word.length && word[i+1] === 'l') i++
        } else if (i + 1 < word.length && classicalPhonemes[word[i] + word[i+1]])
            phonemes.push(classicalPhonemes[word[i] + word[++i]])
        else phonemes.push(classicalPhonemes[word[i]])
    }
    return phonemes
}

function getEcclesiasticalPhonemes(wordString) {
    const ecclesiasticalPhonemes = { // first array lists possibilities, nested array lists sequence of phonemes
        b: 'b',
        // c is sometimes softened to ch
        d: 'd',
        f: 'f',
        // g is often softened to j
        gn: 'gn',
        // h is often omitted
        // i is a consonant 'j' if at the beginning or surrounded by vowels
        k: 'k',
        l: 'l',
        m: 'm',
        n: 'n',
        ng: [['ng', 'g']],
        nc: [['ng', 'k']],
        nq: [['ng', 'q']],
        nx: [['ng', 'ks']],
        p: 'p',
        ph: 'f',
        qu: 'kw',
        r: 'r',
        // s becomes z between vowels
        // t can become italian ts
        v: 'v',
        // x can be ks, gz, or some sh sound
        z: 'dz',
        // vowels
        a: 'a', ā: 'a',
        e: 'e', ē: 'e',
        i: 'i', ī: 'i',
        o: 'o', ō: 'o',
        u: 'u', ū: 'u',
        y: 'y', ȳ: 'y',
        // diphthongs
        ae: 'e',
        oe: 'e',
        au: 'au',
        eu: 'eu',
        ei: 'ei',
        ui: 'ui',
        // space
        ' ': '_'
    }
    const phonemes = []
    const isVowel = letter => ['a', 'e', 'i', 'o', 'u'].includes(letter)
    const word = wordString.split('')
    for (let i = 0; i < word.length; i++) {
        if (word[i] === 'c') {
            if (i + 1 < word.length && ['e', 'i', 'y'].includes(word[i+1])
            || i + 2 < word.length && ['ae', 'oe'].includes(word[i+1] + word[i+2])) phonemes.push('ch')
            else if (i + 1 < word.length && word[i+1] === 'c') {
                phonemes.push('ch')
                i++
            } else phonemes.push('k')
        } else if (word[i] === 'g') {
            if (i + 2 < word.length && ['ae', 'oe'].includes(word[i+1] + word[i+2])
                || ['e', 'i', 'y'].includes(word[i+1])) phonemes.push('dg')
            else if (i + 1 < word.length && word[i+1] === 'g') {
                phonemes.push('dg')
                i++
            } else phonemes.push('g')
        } else if (word[i] === 'h') {
            if (i - 2 >= 0 && i + 1 < word.length && wordString.slice(i-2, i+2) === 'mihi'
             || i - 2 >= 0 && i + 2 < word.length && wordString.slice(i-2, i+3) === 'nihil') phonemes.push('k')
        } else if (word[i] === 'i') {
            if (i === 0 && i + 1 < word.length && isVowel(word[i+1])) phonemes.push('j')
            else if (i - 1 > 0 && i + 1 < word.length && isVowel(word[i-1]) && isVowel(word[i+1])) phonemes.push('j')
            else phonemes.push(ecclesiasticalPhonemes['i'])
        } else if (word[i] === 's') {
            if (i > 0 && isVowel(word[i-1]) && isVowel(word[i+1])) phonemes.push('z')
            else if (i + 2 < word.length && ['ce', 'ci'].includes(word[i+1] + word[i+2])) {
                phonemes.push('sh')
                i++
            } else phonemes.push('s')
            if (word[i+1] === 's') i++
        } else if (word[i] === 't') {
            if (word[i+1] === 'i') phonemes.push('ts')
            else phonemes.push('t')
        } else if (word[i] === 'x') {
            if (i > 0 && isVowel(word[i-1]) && isVowel(word[i+1])) phonemes.push('gz')
            else if (i + 2 < word.length && ['ce', 'ci'].includes(word[i+1] + word[i+2])) {
                phonemes.push('ksh')
                i++
            } else phonemes.push('ks')
        } else if (ecclesiasticalPhonemes[word[i] + word[i+1]])
            phonemes.push(ecclesiasticalPhonemes[word[i] + word[++i]])
        else phonemes.push(ecclesiasticalPhonemes[word[i]])
    }
    return phonemes
}

function phonemesToPronunciations(phonemes) {
    const pronunciations = []
    function buildPronunciations(prev, next) {
        if (next.length === 0) return pronunciations.push(prev.join(' '))
        const phoneme = next.shift()
        if (Array.isArray(phoneme))
            for (const option of phoneme)
                if (Array.isArray(option)) buildPronunciations([...prev, ...option], [...next])
                else buildPronunciations([...prev, option], [...next])
        else buildPronunciations([...prev, phoneme], [...next])
    }
    buildPronunciations([], phonemes)
    return pronunciations
}

function getClassicalPronunciations(word) { return phonemesToPronunciations(getClassicalPhonemes(word)) }

function getEcclesiasticalPronunciations(word) { return phonemesToPronunciations(getEcclesiasticalPhonemes(word)) }

function getPronunciations(word, style) {
    if (style === 'ecclesiastical') return getEcclesiasticalPronunciations(word)
    else if (style === 'classical') return getClassicalPronunciations(word)
    else if (style === 'vulgar') return []
    else throw new Error(`unknown pronunciation style`)
}

module.exports = getPronunciations