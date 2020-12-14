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

const word = "aeternus"
ingestHtml(
  require(path.join(process.cwd(), `server/data/html/${word}.json`)),
).then(() => console.log("done"))
