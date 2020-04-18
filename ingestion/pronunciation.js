function getClassicalPhonemes(wordString) {
    const classicalPhonemes = { // first array lists possibilities, nested array lists sequence of phonemes
        b: 'b', c: 'k', d: 'd', f: 'f', g: 'g', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n',
        p: 'p', q: 'kw', r: 'r', s: 's', t: 't', v: 'w', w: 'w', x: 'ks', xs: 'ks', z: 'z',
        // vowels
        a: 'a', ā: 'a:',
        e: 'e', ē: 'e:',
        i: 'i', ī: 'i:',
        o: 'o', ō: 'o:',
        u: 'u', ū: 'u:',
        y: 'y', ȳ: 'y:',
        // diphthongs
        ae: 'ae', oe: 'oe', au: 'au', eu: 'eu', // ui: ['ui', ['u', 'i']],
        ' ': '_', '.': '_', // space (also for abbreviations)
        '-': '' // dash for tackons
    }
    const phonemes = []
    const i2j = { iace: 'jace', iacē: 'jacē', iact: 'jact', iacu: 'jacu',
        iect: 'ject', ien: 'jen', ier: 'jer', io$: 'jo',
        iud: 'jud', iue: 'jue', iug: 'jug', iun: 'jun', iur: 'jur', iut: 'jut', iuv: 'juv',
        iūd: 'jūd', iūe: 'jūe', iūg: 'jūg', iūn: 'jūn', iūr: 'jūr', iūt: 'jūt', iūv: 'jūv' }
    for (const [i, j] of Object.entries(i2j)) wordString = wordString.replace(new RegExp(i), j)
    wordString = wordString.replace(/qu/g,'q').replace(/th/g,'t').replace(/ph/g,'p').replace(/ch/g,'c')
    let word = wordString.toLowerCase().split('')
    const isVowel = i => i >= 0 && i < word.length && "aeiouāēīōūȳ".split('').includes(word[i])
    const devocalize = { b: 'p', d: 't', g: 'k', z: 's'}
    for (let i = 0; i < word.length; i++) {
        if (word[i] === 'h') {
            if (i === 0 || isVowel(i+1) && i - 1 >= 0 && word[i-1] !== 'r') phonemes.push('h')
        } else if (word[i] === 'i') {
            if (isVowel(i+1) && (i === 0 || isVowel(i-1))) phonemes.push('j')
            else phonemes.push(classicalPhonemes[word[i]])
        } else if (word[i] === 'j') {
            if (!isVowel(i-1) && ['l','m','n','q','t'].includes(word[i-1])) phonemes.push('i')
            else phonemes.push(classicalPhonemes[word[i]])
        } else if (word[i] === 'n') {
            if (!isVowel(i+1) && ['c','g','q','x'].includes(word[i+1])) phonemes.push('ng')
            else phonemes.push(classicalPhonemes[word[i]])
        } else if (Object.keys(devocalize).includes(word[i])) {
            if (i + 1 < word.length && ['c','f','k','p','q','s','t'].includes(word[i+1]))
                 phonemes.push(devocalize[word[i]])
            else phonemes.push(classicalPhonemes[word[i]])
        } else if (i + 2 < word.length && classicalPhonemes[word[i] + word[i+1] + word[i+2]]) {
            phonemes.push(classicalPhonemes[word[i] + word[++i] + word[++i]])
        } else if (i + 1 < word.length && classicalPhonemes[word[i] + word[i+1]])
            phonemes.push(classicalPhonemes[word[i] + word[++i]])
        else phonemes.push(classicalPhonemes[word[i]])
    }
    return phonemes.join(' ')
}

const classicalPhonemes = [
    'a', 'a:',
    'b',
    'k', 'kh',
    'd',
    'e', 'e:',
    'f',
    'g',
    'h',
    'i', 'i:',
    'j',
    'l', 'll',
    'm',
    'n', 'ng',
    'o', 'o:',
    'p', 'ph',
    'kw',
    'r',
    's',
    't', 'th',
    'u', 'u:',
    'w',
    'ks',
    'y', 'y:',
    'z',
    '_', '-'
] // 37 phonemes

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
        a: 'a:', ā: 'a:',
        e: 'e:', ē: 'e:',
        i: 'i:', ī: 'i:',
        o: 'o:', ō: 'o:',
        u: 'u:', ū: 'u:',
        y: 'y:', ȳ: 'y:',
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

function getClassicalPronunciations(word) { return getClassicalPhonemes(word) }

function getEcclesiasticalPronunciations(word) { return phonemesToPronunciations(getEcclesiasticalPhonemes(word)) }

function getPronunciations(word, style) {
    if (style === 'classical') return getClassicalPronunciations(word)
    else if (style === 'ecclesiastical') return getEcclesiasticalPronunciations(word)
    else if (style === 'vulgar') return []
    else throw new Error(`unknown pronunciation style`)
}

// console.log(getPronunciations('adtrahō', 'classical'))

module.exports = getPronunciations