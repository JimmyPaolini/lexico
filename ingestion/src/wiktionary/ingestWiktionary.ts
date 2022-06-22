import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import fp from 'path'

import log from '../../../utils/log'
import { escapeCapitals } from '../../../utils/string'

const putItemHtml = (entry: any) =>
  fs.writeFileSync(
    fp.join(
      process.cwd(),
      `./data/wiktionary/${escapeCapitals(entry.word)}.json`,
    ),
    JSON.stringify(entry),
  )

export const categories: { [key: string]: string } = {
  lemma: 'Latin_lemmas',
  participle: 'Latin_participles',
  comparative: 'Latin_comparative_adjectives',
  superlative: 'Latin_superlative_adjectives',
}

export default async function ingestWiktionary(): Promise<void> {
  for (const category of Object.keys(categories)) {
    await ingestCategory(category)
  }
}

async function ingestCategory(category = 'lemma'): Promise<void> {
  log.info(`START - ${category}`)
  const host = `https://en.wiktionary.org`
  let path = categories[category]
    ? `/w/index.php?title=Category:${categories[category]}&pagefrom=a`
    : category.replace(host, '')
  try {
    while (path) {
      log.info(host + path)
      const $ = cheerio.load((await axios.get(host + path)).data)
      for (const a of $(
        '#mw-pages div.mw-category > div.mw-category-group > ul > li a',
      ).get()) {
        const word = $(a).text()
        const href = $(a).attr('href') || ''
        if (word.match(/(Reconstruction:)|(Appendix:)/gi)) continue
        await ingestWord(word, href, category)
      }
      path = $('a:contains("next page")').eq(0).attr('href') || ''
    }
  } catch (e) {
    log.error(
      `Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`,
    )
    return await ingestCategory(path)
  }
}

async function ingestWord(
  word: string,
  path: string,
  category: string,
): Promise<any> {
  // if (!word.match(/^[A-Za-z-.`,!; ]*\$/)) return log.info(chalk.error(`Error "${entry.word}" - contains special characters`));
  if (!path.match(/.*#Latin/)) path += '#Latin'
  const entry: { [key: string]: any } = {
    word,
    category,
    href: `https://en.wiktionary.org${path}`,
  }
  if (entry.href.includes(`/w/index.php`))
    return log.info(`Error "${entry.word}" - no wiktionary page`)
  const $ = cheerio.load((await axios.get(entry.href)).data)
  const section = $('span#Latin').parent().nextUntil('hr')
  if (section.length < 1)
    return log.info(`Error "${entry.word}" - no latin entry in wiktionary`)

  entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
  // log.info(`ingesting raw "${entry.word}"`)
  putItemHtml(entry)
}
