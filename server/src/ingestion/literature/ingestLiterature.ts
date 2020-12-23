import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import ingestionAuthors from "./ingestionAuthors.json"
import { ingestWork } from "./ingestWork"
import { IngestionAuthor, IngestionWork } from "./literatureIngestionTypes"
import { authorNameMap } from "./literatureMaps"

export default async function ingestWorks() {
  const Authors = getConnection().getRepository(Author)
  const authorNames = ["virgil", "caesar", "ovid", "augustus"]
  for (const authorName of authorNames) {
    const ingestionAuthor = (ingestionAuthors as IngestionAuthor[]).find(
      (ingestionAuthor) => ingestionAuthor.name === authorName,
    )
    if (!ingestionAuthor) continue
    const author = await Authors.save({
      name: authorNameMap[ingestionAuthor.name],
      nickname: ingestionAuthor.name,
    })
    for (const ingestionWork of ingestionAuthor.works as IngestionWork[]) {
      // if (ingestionWork.path === 'resgestae1.html') continue
      await ingestWork(ingestionAuthor.name, ingestionWork.path, author)
    }
  }
}
