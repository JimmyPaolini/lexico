const fs = require("fs"),
  path = require("path"),
  chalk = require("chalk")
import cheerio from "cheerio"
import request from "request-promise-native"
const putItemHtml = (entry: any) =>
  fs.writeFileSync(
    path.join(
      process.cwd(),
      `../dictionary/html/${entry.word
        .split("")
        .map((c: string) => (c.match(/[A-Z]/g) ? c + "`" : c))
        .join("")}.json`,
    ),
    JSON.stringify(entry, null, 2),
  )
const now = () => new Date().toLocaleString()
const cleanup = (word: string): string =>
  word
    .split("")
    .map((c: string) => (c.match(/[A-Z]/g) ? c + "`" : c))
    .join("")

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
) {
  console.log(
    chalk.red(
      `${now()} - START - category="${category}", ` +
        `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`,
    ),
  )
  const host = `https://en.wiktionary.org`
  let path: string = categories[category]
    ? `/w/index.php?title=Category:${categories[category]}&pagefrom=${firstLetter}`
    : category.replace(host, "")
  firstLetter = firstLetter.toLowerCase()
  lastLetter = lastLetter.toLowerCase()
  try {
    while (path) {
      console.log(chalk.yellow(`${now()} - ${host + path}`))
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
          console.log(
            chalk.red(
              `${now()} - FINISH - category="${category}", ` +
                `firstLetter="${firstLetter}", lastLetter="${lastLetter}"`,
            ),
          )
        }
        fs.writeFileSync(
          `./data/wiktionary/${category}/${cleanup(word)}.json`,
          fs.readFileSync(`./data/wiktionary/${cleanup(word)}.json`),
        )
        // await ingestWord(word, href)
      }
      path = $('a:contains("next page")').eq(0).attr("href") || ""
    }
  } catch (e) {
    console.log(
      chalk.red(
        `Error on url "https://en.wiktionary.org${path}" - ${e.toString()}`,
      ),
    )
  }
}

async function ingestWord(word: string, path: string) {
  // if (!word.match(/^[A-Za-z-.`,!; ]*\$/)) return console.log(chalk.error(`Error "${entry.word}" - contains special characters`));
  if (!path.match(/.*#Latin/)) path += "#Latin"
  const entry: { [key: string]: string } = {
    word,
    href: `https://en.wiktionary.org${path}`,
  }
  if (entry.href.includes(`/w/index.php`))
    return console.log(chalk.red(`Error "${entry.word}" - no wiktionary page`))
  const $ = cheerio.load(
    await request.get(entry.href, { timeout: 10000, forever: true }),
  )
  const section = $("span#Latin").parent().nextUntil("hr")
  if (section.length < 1)
    return console.log(
      chalk.red(`Error "${entry.word}" - no latin entry in wiktionary`),
    )

  entry.html = `<div class="${entry.word}">${$.html(section)}</div>`
  await putItemHtml(entry)
  console.log(chalk.blue(`Ingested "${entry.word}" HTML`))
}

function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}
