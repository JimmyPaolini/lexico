import cheerio from "cheerio"
import request from "request-promise-native"
import { unabbreviateText } from "../../utils/string"
import { IngestionAuthor, IngestionWork } from "./literatureIngestionTypes"

export async function ingestWork(author: IngestionAuthor, work: IngestionWork) {
  try {
    const host = "https://www.thelatinlibrary.com/"
    const html = (await request(host + work.path))
      // .replace(/[^\x00-\x7F]/g, "")
      .match(/<html>(.|\n)*<\/html>/i)[0]
    const $ = cheerio.load(html, { decodeEntities: false })

    work.title = $("head title")
      .text()
      .toLowerCase()
      .trim()
      .replace(/\s/g, "_")
      .replace(/:/, "")
    work.title = unabbreviateText(work.title)
    if (!work.title.length) throw new Error(`no title`)

    $("body").find(".pagehead, .internal_navigation, .footer, :header").remove()

    $("p").children("br, font, span, a").html("\n")
    for (const p of $("p").get()) {
      work.text += $(p).text()
    }
    work.text = work.text.replace(/undefined/g, "")
    work.text = work.text.replace(/[\[\]]+ ?/g, "")
    work.text = work.text.replace(/(\s)(\s+)/g, "\n")
    work.text = work.text
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim()
    if (!work.text.length) throw new Error(`no text`)

    work.title = work.path
      .split("/")
      .slice(-1)[0]
      .replace(new RegExp(author.name + "."), "")
      .replace("ponto.shtml", "pontoalone.shtml")
      .replace("resgestae1.html", "resgestae2.html")
      .replace("resgestae.html", "resgestae1.html")
      .replace(/\.s?html/, "")
      .replace(/[a-z]+/, (w) => worksMap[w])
      .replace(/[0-9]+/, (d) => "/book " + d)
    if (author.name === "vergil") author.name = "virgil"
    // const fileName = `literature/${author.name}/${work.title}.txt`
    console.log(`Ingested ${author.name}/${work.title}.txt`)
  } catch (e) {
    console.error(`Error ${author.name} - ${work.path} - ${e.toString()}`)
  }
}

const worksMap: { [key: string]: string } = {
  aen: "aeneid",
  ec: "eclogues",
  geo: "georgicon",
  gall: "de bello gallico",
  bc: "de bello civili",
  alex: "de bello alexandrino",
  bellafr: "de bello africo",
  hisp: "de bello hispaniensi",
  met: "metamorphoses",
  amor: "amores",
  her: "heroides",
  artis: "ars amatoria",
  tristia: "tristia",
  ponto: "ex ponto",
  fasti: "fasti",
  rem: "remedia amoris",
  ibis: "ibis",
  pontoalone: "ponto",
  resgestae: "res gestae divi augusti",
}
