import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Author from "../entity/literature/Author"
import Book from "../entity/literature/Book"
import Line from "../entity/literature/Line"
import Text from "../entity/literature/Text"

@Resolver(Text)
export default class LiteratureResolver {
  Authors = getConnection().getRepository(Author)
  Books = getConnection().getRepository(Book)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  // LIST

  @Query(() => [Author])
  async getAuthors() {
    const authors = await this.Authors.find({
      relations: ["books", "books.texts", "texts"],
      order: { name: "ASC" },
    })
    return authors.map((author) => {
      author.books?.sort().reverse()
      author.books?.map((book) => book.texts.sort().reverse())
      author.texts.sort().reverse()
      return author
    })
  }

  @Query(() => [Book])
  async getBooks() {
    return await this.Books.find({
      relations: ["texts"],
      order: { title: "ASC" },
    })
  }

  @Query(() => [Text])
  async getTexts() {
    return await this.Texts.find({
      order: { title: "ASC" },
    })
  }

  // GET

  @Query(() => Author)
  async getAuthor(@Arg("name") name: string) {
    return await this.Authors.findOneOrFail(name, {
      relations: ["books", "books.texts", "texts"],
    })
  }

  @Query(() => Book)
  async getBook(@Arg("id") id: string) {
    return await this.Books.findOneOrFail(id, { relations: ["texts"] })
  }

  @Query(() => Text)
  async getText(@Arg("id") id: string) {
    return await this.Texts.findOneOrFail(id, { relations: ["lines"] })
  }

  // @Query(() => Text)
  // async getText(
  //   @Arg("author") author: string,
  //   @Arg("title") title: string,
  //   @Arg("book", { nullable: true }) book?: string,
  // ) {
  //   const where = {
  //     title,
  //     author: { name: author },
  //     book: book ? { title: book } : undefined,
  //   } as FindConditions<Text>
  //   console.log(where)
  //   const text = await this.Texts.findOne({
  //     where,
  //     relations: ["lines"],
  //   })
  //   text?.lines.sort((l1, l2) => l1.lineNumber - l2.lineNumber)
  //   return text
  // }

  // SEARCH

  @Query(() => [Author])
  async searchAuthors(@Arg("search") search: string) {
    return await this.Authors.find({
      where: [{ name: Like(`%${search}%`) }, { fullname: Like(`%${search}%`) }],
      relations: ["texts"],
      order: { name: "ASC" },
    })
  }

  @Query(() => [Book])
  async searchBooks(@Arg("search") search: string) {
    return await this.Books.find({
      where: { title: Like(`%${search}%`) },
      relations: ["texts"],
      order: { title: "ASC" },
    })
  }

  @Query(() => [Text])
  async searchTexts(@Arg("search") search: string) {
    return await this.Texts.find({
      where: { title: Like(`%${search}%`) },
      relations: ["lines"],
      order: { title: "ASC" },
    })
  }

  @Query(() => [Line])
  async searchLines(@Arg("search") search: string) {
    return await this.Lines.find({
      where: [{ line: Like(`%${search}%`) }],
      order: { lineNumber: "ASC" },
    })
  }
}
