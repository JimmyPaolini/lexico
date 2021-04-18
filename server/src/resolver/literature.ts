import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"
import log from "../../../utils/log"

const compareField = (a: any, b: any, field: string) =>
  a[field].localeCompare(b[field], undefined, {
    numeric: true,
    sensitivity: "base",
  })

@Resolver(Text)
export default class LiteratureResolver {
  Authors = getConnection().getRepository(Author)
  Books = getConnection().getRepository(Book)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  // LIST

  @Query(() => [Author])
  async getAuthors() {
    const authors = await this.Authors.createQueryBuilder("author")
      .innerJoinAndSelect("author.books", "book")
      .innerJoinAndSelect("book.texts", "bookText")
      .innerJoinAndSelect("author.texts", "text")
      .orderBy("author.id", "ASC")
      .getMany()
    return authors
      .sort((a, b) => compareField(a, b, "id"))
      .map((author) => {
        author.books?.sort((a, b) => compareField(a, b, "id"))
        author.books?.map((book) =>
          book.texts.sort((a, b) => compareField(a, b, "id")),
        )
        author.texts.sort((a, b) => compareField(a, b, "id"))
        return author
      })
  }

  @Query(() => [Book])
  async getBooks() {
    const books = await this.Books.find({
      relations: ["texts"],
      order: { title: "ASC" },
    })
    return books.map((book) =>
      book.texts.sort((a, b) => compareField(a, b, "id")),
    )
  }

  @Query(() => [Text])
  async getTexts() {
    return await this.Texts.find({
      order: { title: "ASC" },
    })
  }

  // GET

  @Query(() => Author)
  async getAuthor(@Arg("id") id: string) {
    const author = await this.Authors.findOneOrFail(id, {
      relations: ["books", "books.texts", "texts"],
    })
    author.books?.sort((a, b) => compareField(a, b, "id"))
    author.books?.map((book) =>
      book.texts.sort((a, b) => compareField(a, b, "id")),
    )
    author.texts.sort((a, b) => compareField(a, b, "id"))
    return author
  }

  @Query(() => Book)
  async getBook(@Arg("id") id: string) {
    const book = await this.Books.findOneOrFail(id, { relations: ["texts"] })
    book.texts.sort((a, b) => compareField(a, b, "id"))
    return book
  }

  @Query(() => Text)
  async getText(@Arg("id") id: string) {
    const text = await this.Texts.findOneOrFail(id, { relations: ["lines"] })
    text.lines.sort((a, b) => a.lineNumber - b.lineNumber)
    // log.info("getText", {
    //   id: text.id,
    //   author: text.author.id,
    //   book: text.book?.title,
    //   title: text.title,
    // })
    return text
  }

  // FIND

  @Query(() => Text)
  async findText(
    @Arg("author") author: string,
    @Arg("title") title: string,
    @Arg("book", { nullable: true }) book?: string,
  ) {
    let query = this.Texts.createQueryBuilder("text").innerJoinAndSelect(
      "text.author",
      "author",
      "author.name = :author",
      {
        author,
      },
    )
    if (book)
      query = query.innerJoinAndSelect(
        "text.book",
        "book",
        "book.title = :book",
        { book },
      )
    query = query
      .where("text.title = :title", { title })
      .innerJoinAndSelect("text.lines", "lines")

    const text = await query.getOneOrFail()
    text.lines.sort((l1, l2) => compareField(l1, l2, "id"))
    log.info("findText", { id: text.id })
    return text
  }

  // SEARCH

  @Query(() => [Author])
  async searchLiterature(@Arg("search") search: string) {
    const authors = await this.Authors.createQueryBuilder("author")
      .innerJoinAndSelect("author.books", "book", "book.title = :search", {
        search,
      })
      .innerJoinAndSelect(
        "book.texts",
        "bookText",
        "bookText.title = :search",
        { search },
      )
      .innerJoinAndSelect("author.texts", "text", "text.title = :search", {
        search,
      })
      .orderBy("author.id", "ASC")
      .getMany()
    return authors
      .filter((author) => !!author.texts || !!author.books)
      .sort((a, b) => compareField(a, b, "id"))
      .map((author) => {
        author.books?.sort((a, b) => compareField(a, b, "id"))
        author.books?.map((book) =>
          book.texts.sort((a, b) => compareField(a, b, "id")),
        )
        author.texts.sort((a, b) => compareField(a, b, "id"))
        return author
      })
  }

  @Query(() => [Author])
  async searchAuthors(@Arg("search") search: string) {
    return await this.Authors.find({
      where: [{ id: Like(`%${search}%`) }, { name: Like(`%${search}%`) }],
      relations: ["texts"],
      order: { id: "ASC" },
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
