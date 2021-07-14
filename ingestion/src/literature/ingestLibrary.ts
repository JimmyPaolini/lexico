import axios from "axios"
import cheerio from "cheerio"
import cheerioTableParser from "cheerio-tableparser"
import fs from "fs"
import log from "../../../utils/log"
import { authorIdToName } from "./literatureMaps"

const host = "https://www.thelatinlibrary.com/"

export default async function ingestLibrary(): Promise<void> {
  const tableHtml = cheerio.load((await axios.get(host)).data)
  cheerioTableParser(tableHtml)
  const authors = (tableHtml("p>table").first() as any)
    .parsetable(true, true, false)
    .reduce((table: any, row: any) => [...table, ...row], [])
    .map((elt: any) => {
      const a = cheerio.load(elt.trim())("a")
      const nickname = a.text().replace(/\s/, " ").trim().toLowerCase()
      const name = authorIdToName[nickname] || nickname
      const path = a.attr("href")
      return { nickname, name, path, works: [] }
    })
    .sort((a: any, b: any) => a.nickname.localeCompare(b.nickname))

  for (const i in authors) {
    const author = authors[i]
    log.info(author.nickname)

    const $ = cheerio.load((await axios.get(host + author.path)).data)
    for (const a of $("a").get()) {
      const href = $(a).attr("href")
      if (!href || href.match(/index.html/) || href.match(/classics.html/))
        continue
      const book = $(a).closest("div").prev(":header").text().toLowerCase()
      const title = $(a).text().toLowerCase()
      author.works.push({ title, book, path: href })
    }

    if (!author.works.every((work: any) => work.path.match(/.*.s?html/))) {
      author.works = [{ title: author.nickname, path: author.path }]
    }
  }

  fs.writeFileSync(
    `./src/ingestion/literature/library.json`,
    JSON.stringify(authors, null, 2),
  )
}
