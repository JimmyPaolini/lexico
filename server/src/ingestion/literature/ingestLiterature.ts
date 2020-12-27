import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import { ingestWork } from "./ingestWork"
import library from "./library.json"
import { IngestionWork } from "./literatureIngestionTypes"
import { authorNameMap } from "./literatureMaps"

export default async function ingestWorks() {
  const Authors = getConnection().getRepository(Author)
  const authorNames = Object.keys(authorNameMap)
  for (const authorName of authorNames) {
    const ingestionAuthor = library.find(
      (ingestionAuthor) => ingestionAuthor.nickname === authorName,
    )
    if (!ingestionAuthor) continue
    const author = await Authors.save({
      name: authorNameMap[ingestionAuthor.nickname],
      nickname: ingestionAuthor.nickname,
    })
    for (const ingestionWork of ingestionAuthor.works as IngestionWork[]) {
      await ingestWork(ingestionAuthor.nickname, ingestionWork.path, author)
    }
  }
}
