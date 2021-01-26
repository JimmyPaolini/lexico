import { getConnection } from "typeorm"
import Author from "../../entity/literature/Author"
import { ingestText } from "./ingestText"
import library from "./library.json"
import { IngestionText } from "./literatureIngestionTypes"
import { authorNicknameToName } from "./literatureMaps"

export default async function ingestLiterature() {
  const Authors = getConnection().getRepository(Author)
  const authorNames = Object.keys(authorNicknameToName)
  for (const authorName of authorNames) {
    console.log(authorName)
    const ingestionAuthor = library.find(
      (ingestionAuthor) => ingestionAuthor.nickname === authorName,
    )
    if (!ingestionAuthor) continue
    // const author = await Authors.save({
    //   name: authorNicknameToName[authorName],
    //   nickname: authorName,
    // })
    const author = Authors.create({
      name: authorNicknameToName[authorName],
      nickname: authorName,
    })
    for (const ingestionText of ingestionAuthor.texts as IngestionText[]) {
      await ingestText(author, ingestionText)
    }
  }
}
