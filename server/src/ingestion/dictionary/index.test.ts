import path from "path"
import ingestHtml from "./ingestHtml"

// const verbs = ["amo", "video", "duco", "capio", "audio"]

// const nouns = [
//   "aqua",
//   "nauta",
//   "filius",
//   "bellum",
//   "flumen",
//   "os",
//   "manus",
//   "res",
// ]

// const adjectives = ["aeternus", "sapiens"]

export default async function main(word = "amo") {
  const obj = require(path.join(
    process.cwd(),
    `data/wiktionary/lemma/${word}.json`,
  ))
  await ingestHtml(obj)
  console.log("done")
}
