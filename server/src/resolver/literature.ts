import { Arg, Query, Resolver } from "type-graphql"
import { getConnection, Like } from "typeorm"
import Author from "../../../entity/literature/Author"
import Book from "../../../entity/literature/Book"
import Line from "../../../entity/literature/Line"
import Text from "../../../entity/literature/Text"
import log from "../../../utils/log"

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
      order: { id: "ASC" },
    })
    return authors.map((author) => {
      author.books?.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      author.books?.map((book) =>
        book.texts.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        ),
      )
      author.texts.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
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
      book.texts.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      ),
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
  async getAuthor(@Arg("name") name: string) {
    const author = await this.Authors.findOneOrFail(name, {
      relations: ["books", "books.texts", "texts"],
    })
    author.books?.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    author.books?.map((book) =>
      book.texts.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      ),
    )
    author.texts.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    return author
  }

  @Query(() => Book)
  async getBook(@Arg("id") id: string) {
    const book = await this.Books.findOneOrFail(id, { relations: ["texts"] })
    book.texts.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    return book
  }

  @Query(() => Text)
  async getText(@Arg("id") id: string) {
    const text = await this.Texts.findOneOrFail(id, { relations: ["lines"] })
    text.lines.sort((a, b) => a.lineNumber - b.lineNumber)
    log.info("getText", {
      id: text.id,
      author: text.author.id,
      book: text.book?.title,
      title: text.title,
    })
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
    text.lines.sort((l1, l2) => l1.lineNumber - l2.lineNumber)
    log.info("findText", {
      id: text.id,
      author: text.author.id,
      book: text.book?.title,
      title: text.title,
    })
    return text
  }

  // SEARCH

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
