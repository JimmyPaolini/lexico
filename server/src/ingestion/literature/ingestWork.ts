import cheerio from "cheerio"
import request from "request-promise-native"
import { Logger } from "tslog"
import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import Text from "../../entity/literature/Text"
import ingestLines from "./ingestLines"
import { worksMap } from "./literatureMaps"

const log = new Logger()

export async function ingestWork(
  authorName: string,
  path: string,
  author: Author,
) {
  const Works = getConnection().getRepository(Text)
  try {
    const host = "https://www.thelatinlibrary.com/"
    const html = (await request(host + path))
      // .replace(/[^\x00-\x7F]/g, "")
      .match(/<html>(.|\n)*<\/html>/i)[0]
    const $ = cheerio.load(html, { decodeEntities: false })

    $("body").find(".pagehead, .internal_navigation, .footer, :header").remove()
    $("p").children("br, font, span, a").html("\n")

    const title = getTitle(path, authorName)
    const work = await Works.save({ title, author })

    await ingestLines($, work, author)

    log.info(`Ingested ${authorName}/${title}.txt`)
  } catch (e) {
    log.error(`Error ${authorName} - ${path} - ${e.toString()}`)
  }
}

function getTitle(path: string, authorName: string): string {
  const title = path
    .split("/")
    .slice(-1)[0]
    .replace(new RegExp(authorName + "."), "")
    .replace("ponto.shtml", "pontoalone.shtml")
    .replace("resgestae1.html", "resgestae2.html")
    .replace("resgestae.html", "resgestae1.html")
    .replace(/\.s?html/, "")
    .replace(/[a-z]+/, (w) => worksMap[w])
    .replace(/[0-9]+/, (d) => "/book " + d)
    .replace("/", " ")
  if (!title.length) throw new Error(`no title`)
  return title
}
