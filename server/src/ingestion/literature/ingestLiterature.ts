import ingestionAuthors from "./ingestionAuthors.json"
import { ingestWork } from "./ingestWork"
import { IngestionAuthor } from "./literatureIngestionTypes"

// const authorMap: { [key: string]: string } = {
//   virgil: "publius vergilius maro",
//   caesar: "gaius iulius caesar",
//   ovid: "publius ovidius naso",
//   augustus: "caesar divi filius augustus",
// }

export default async function ingestAuthors() {
  const authors: IngestionAuthor[] = ingestionAuthors
  const authorNames = ["vergil", "caesar", "ovid", "augustus"]
  for (const authorName of authorNames) {
    const author = authors.find((author) => author.name === authorName)
    if (!author) continue
    for (const work of author.works) {
      // if (work.path === 'resgestae1.html') continue
      await ingestWork(author, work)
    }
  }
}
