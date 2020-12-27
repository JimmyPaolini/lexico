import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Author from "../entity/literature/Author"
import Line from "../entity/literature/Line"
import Work from "../entity/literature/Work"

@Resolver(Work)
export default class LiteratureResolver {
  Authors = getConnection().getRepository(Author)
  Works = getConnection().getRepository(Work)
  Lines = getConnection().getRepository(Line)

  @Query(() => [Author])
  async searchAuthors(@Arg("name") name: string) {
    const where = [{ name: Like(`%${name}%`) }, { nickname: Like(`%${name}%`) }]
    const author = await this.Authors.find({ where, relations: ["works"] })
    return author
  }

  @Query(() => Author)
  async findAuthor(@Arg("name") name: string) {
    const where = [{ name }, { nickname: name }]
    const author = await this.Authors.findOne({
      where,
      relations: ["works"],
      order: { name: "ASC" },
    })
    return author
  }

  @Query(() => [Work])
  async searchWorks(@Arg("title") title: string) {
    const where = [{ title: Like(`%${title}%`) }]
    const works = await this.Works.find({
      where,
      relations: ["author", "lines"],
      order: { title: "ASC" },
    })
    works.forEach((work) =>
      work.lines.sort((l1, l2) => l1.lineNumber - l2.lineNumber),
    )
    return works
  }

  @Query(() => [Line])
  async searchLines(@Arg("search") search: string) {
    const where = [
      { text: Like(`%${search}%`) },
      { comments: Like(`%${search}%`) },
    ]
    const lines = await this.Lines.find({ where, order: { lineNumber: "ASC" } })
    return lines
  }
}
