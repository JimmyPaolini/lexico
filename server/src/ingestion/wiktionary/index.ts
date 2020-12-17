import cheerio from "cheerio"
import fs from "fs"
import fp from "path"
import request from "request-promise-native"
import { Logger } from "tslog"
import { getFirstLetter } from "../../utils/string"
const putItemHtml = (entry: any) =>
  fs.writeFileSync(
    fp.join(
      process.cwd(),
      `./data/wiktionary/${entry.category}/${cleanup(entry.word)}.json`,
    ),
    JSON.stringify(entry, null, 2),
  )
const cleanup = (word: string): string =>
  word
    .split("")
    .map((c: string) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("")

const log = new Logger()
const categories: { [key: string]: string } = {
  lemma: "Latin_lemmas",
  nonlemma: "Latin_non-lemma_forms",
  participle: "Latin_participle_forms",
  comparativeadverb: "Latin_comparative_adverbs",
}

ingestWiktionary(...process.argv.slice(2, 5))

async function ingestWiktionary(
  category = "lemma",
  firstLetter = "a",
  lastLetter = "z",
): Promise<any> {
  log.info(
    `${new Date().toLocaleString()} - START - category="${category}", ` +
      `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`,
  )
  const host = `https://en.wiktionary.org`
  let path = categories[category]
    ? `/w/index.php?title=Category:${categories[category]}&pagefrom=${firstLetter}`
    : category.replace(host, "")
  firstLetter = firstLetter.toLowerCase()
  lastLetter = lastLetter.toLowerCase()
  try {
    while (path) {
      log.info(`${new Date().toLocaleString()} - ${host + path}`)
      let $ = cheerio.load(await request.get(host + path, { forever: true }))
      for (const a of $(
        "#mw-pages div.mw-category > div.mw-category-group > ul > li a",
      ).get()) {
        const word = $(a).text()
        const href = $(a).attr("href") || ""
        if (word.match(/(Reconstruction:)|(Appendix:)/gi)) continue
        if (
          getFirstLetter(word) < firstLetter ||
          getFirstLetter(word) > lastLetter
        ) {
          log.info(
            `${new Date().toLocaleString()} - FINISH - category="${category}", ` +
              `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`,
          )
          return
        }
        await ingestWord(word, href, category)
      }
      path = $('a:contains("next page")').eq(0).attr("href") || ""
    }
  } catch (e) {
    log.error(
      `Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`,
    )
    return await ingestWiktionary(path, firstLetter, lastLetter)
  }
}

async function ingestWord(
  word: string,
  path: string,
  category: string,
): Promise<any> {
  // if (!word.match(/^[A-Za-z-.`,!; ]*\$/)) return log.info(chalk.error(`Error "${entry.word}" - contains special characters`));
  if (!path.match(/.*#Latin/)) path += "#Latin"
  const entry: { [key: string]: any } = {
    word,
    category,
    href: `https://en.wiktionary.org${path}`,
  }
  if (entry.href.includes(`/w/index.php`))
    return log.info(`Error "${entry.word}" - no wiktionary page`)
  const $ = cheerio.load(
    await request.get(entry.href, { timeout: 10000, forever: true }),
  )
  const section = $("span#Latin").parent().nextUntil("hr")
  if (section.length < 1)
    return log.info(`Error "${entry.word}" - no latin entry in wiktionary`)

  entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
  putItemHtml(entry)
  log.info(`Ingested "${entry.word}" HTML`)
}
