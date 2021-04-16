import axios from "axios"
import cheerio from "cheerio"
import fs from "fs-extra"
import { romanToDecimal } from "../../../web/src/utils/romanNumeral"

export default async function ingestBible(origin: string, request: string) {
  const response = await axios.get(request)
  const $ = cheerio.load(response.data)

  let chapters = $("#masterdiv a")
    .get()
    .map((link: any) => ({
      name: $(link).text().replace(/\s+/, " "),
      href: origin + $(link).attr("href"),
    })) as Chapter[]

  await Promise.all(chapters.map((chapter) => ingestChapter(chapter)))
}

interface Chapter {
  name: string
  href: string
}
async function ingestChapter(chapter: Chapter) {
  const response = await axios.get(chapter.href)
  const $ = cheerio.load(response.data)

  const text = $("span.Latin")
    .get()
    .map((node: any) => $(node).text())
    .join("\n")

  let bookTitle = chapter.name.replace(/\s?\d/g, "").toLowerCase()
  if (bookTitle.match(/^([IVXLCDM]+) /i)) {
    bookTitle = bookTitle.replace(
      /^([IVXLCDM]+) (.*)/i,
      (_: any, roman: string, title: string) =>
        title + " " + romanToDecimal(roman),
    )
  }
  if (bookTitle === "abdias -") bookTitle = "abdias"
  if (bookTitle === "james -") bookTitle = "james"
  const bookNumber = chapters.indexOf(bookTitle) + 1
  bookTitle = bookNumber + " " + bookTitle
  const chapterNumber = chapter.name.match(/\d+/)![0]

  const fileName = `../data/literature/vulgate bible/${bookTitle}/book ${chapterNumber}.txt`
  fs.ensureFileSync(fileName)
  fs.writeFileSync(fileName, text)
}

// console.log(chapters.reduce(
//   (list: string[], { name }: Chapter) => {
//     const chapterName = decimalize(
//       name
//         .replace(/\d+|-|(^[IVXLCDM]+ )/g, "")
//         .trim()
//         .toLowerCase(),
//     )
//     return !list.includes(chapterName) ? [...list, chapterName] : list
//   },
//   [],
// ))
const chapters = [
  "genesis",
  "exodus",
  "leviticus",
  "numeri",
  "deuteronomium",
  "josue",
  "judicum",
  "ruth",
  "samuhel",
  "regum 1",
  "regum 2",
  "paralipomenon 1",
  "paralipomenon 2",
  "esdrae",
  "nehemiae",
  "tobiae",
  "judith",
  "esther",
  "job",
  "psalmi",
  "proverbia",
  "ecclesiastes",
  "canticum canticorum",
  "sapientia",
  "ecclesiasticus",
  "isaias",
  "jeremias",
  "lamentationes",
  "baruch",
  "ezechiel",
  "daniel",
  "osee",
  "joel",
  "amos",
  "abdias",
  "jonas",
  "michaea",
  "nahum",
  "habacuc",
  "sophonias",
  "aggaeus",
  "zacharias",
  "malachias",
  "machabaeorum 1",
  "machabaeorum 2",
  "matthaeum",
  "marcum",
  "lucam",
  "ioannem",
  "actus",
  "romanos",
  "corinthios 1",
  "corinthios 2",
  "galatas",
  "ephesios",
  "philippenses",
  "colossenses",
  "thessalonicenses 1",
  "thessalonicenses 2",
  "timotheum 1",
  "timotheum 2",
  "titum",
  "philemonem",
  "hebraeos",
  "james",
  "petri 1",
  "petri 2",
  "ioannis 1",
  "ioannis 2",
  "ioannis 3",
  "iudae",
  "apocalypsis",
]
