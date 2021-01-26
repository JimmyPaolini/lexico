import axios from "axios"
import cheerio from "cheerio"
import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import Text from "../../entity/literature/Text"
import logger from "../../utils/log"
import ingestLines from "./ingestLines"
import { IngestionText } from "./literatureIngestionTypes"
import { worksMap } from "./literatureMaps"

const log = logger.getChildLogger()

export async function ingestText(author: Author, ingestionText: IngestionText) {
  const Texts = getConnection().getRepository(Text)
  try {
    const host = "https://www.thelatinlibrary.com/"
    const html = (await axios.get(host + ingestionText.path)).data
      // .replace(/[^\x00-\x7F]/g, "")
      .match(/<html>(.|\n)*<\/html>/i)[0]
    const $ = cheerio.load(html, { decodeEntities: false })

    $("body").find(".pagehead, .internal_navigation, .footer, :header").remove()
    $("p").children("br, font, span, a").html("\n")

    const title = getTitle(ingestionText.path, author.nickname)
    // const text = await Texts.save({ title, author })
    const text = Texts.create({ title, author })

    await ingestLines($, text, author)

    log.info(`Ingested ${author.name}/${title}.txt`)
  } catch (e) {
    log.error(`Error ${author.name} - ${ingestionText.path} - ${e.toString()}`)
  }
}

function getTitle(path: string, authorName: string): string {
  // console.log(path.split("/").slice(-1)[0])
  const title = path
    .split("/")
    .slice(-1)[0]
    .replace(new RegExp(authorName + "\\."), "")
    .replace("ponto.shtml", "pontoalone.shtml")
    .replace("resgestae1.html", "resgestae2.html")
    .replace("resgestae.html", "resgestae1.html")
    .replace(/\.s?html/, "")
    .replace(/[a-z]+/, (w) => worksMap[w])
    .replace(/[0-9]+/, (d) => "/book " + d)
  // .replace("/", " ")
  if (!title.length) throw new Error(`no title`)
  return title
}
