import { Arg, Query, Resolver } from 'type-graphql'
import { getConnection, Like } from 'typeorm'
import Author from '../../entity/literature/Author'
import Book from '../../entity/literature/Book'
import Line from '../../entity/literature/Line'
import Text from '../../entity/literature/Text'
import log from '../../../utils/log'

const compareIds = (a: { id: string }, b: { id: string }) =>
  a.id.localeCompare(b.id, undefined, {
    numeric: true,
    sensitivity: 'base',
  })

@Resolver(Text)
export default class LiteratureResolver {
  Authors = getConnection().getRepository(Author)
  Books = getConnection().getRepository(Book)
  Texts = getConnection().getRepository(Text)
  Lines = getConnection().getRepository(Line)

  // LIST

  @Query(() => [Author])
  async getAuthors(): Promise<Author[]> {
    const authors = await this.Authors.find()
    await Promise.all(
      authors.map(async (author) => {
        author.texts = await this.Texts.createQueryBuilder()
          .select()
          .where({ author })
          .getMany()
        author.books = await this.Books.find({ author })
        await Promise.all(
          author.books.map(async (book) => {
            book.texts = await this.Texts.createQueryBuilder()
              .select()
              .where({ author, book })
              .getMany()
          }),
        )
      }),
    )
    return authors
      .sort((a, b) => compareIds(a, b))
      .map((author) => {
        author.texts.sort((a, b) => compareIds(a, b))
        author.books?.sort((a, b) => compareIds(a, b))
        author.books?.map((book) => book.texts.sort((a, b) => compareIds(a, b)))
        return author
      })
  }

  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    const books = await this.Books.find({
      relations: ['texts'],
      order: { title: 'ASC' },
    })
    return books.map((book) => {
      book.texts.sort((a, b) => compareIds(a, b))
      return book
    })
  }

  @Query(() => [Text])
  async getTexts(): Promise<Text[]> {
    return await this.Texts.find({
      order: { title: 'ASC' },
    })
  }

  @Query(() => [Text])
  async getTextIds(): Promise<Text[]> {
    return await this.Texts.createQueryBuilder().getMany()
  }

  // GET

  @Query(() => Author)
  async getAuthor(@Arg('id') id: string): Promise<Author> {
    const author = await this.Authors.findOneOrFail(id, {
      relations: ['books', 'books.texts', 'texts'],
    })
    author.books?.sort((a, b) => compareIds(a, b))
    author.books?.map((book) => book.texts.sort((a, b) => compareIds(a, b)))
    author.texts.sort((a, b) => compareIds(a, b))
    return author
  }

  @Query(() => Book)
  async getBook(@Arg('id') id: string): Promise<Book> {
    const book = await this.Books.findOneOrFail(id, { relations: ['texts'] })
    book.texts.sort((a, b) => compareIds(a, b))
    return book
  }

  @Query(() => Text)
  async getText(@Arg('id') id: string): Promise<Text> {
    const text = await this.Texts.createQueryBuilder('text')
      .where('text.id = :id', { id })
      .leftJoinAndSelect('text.author', 'author')
      .leftJoinAndSelect('text.book', 'book')
      .leftJoinAndSelect('text.lines', 'line')
      .getOne()
    if (!text) throw new Error('Text not found')
    text?.lines.sort((a, b) => a.lineNumber - b.lineNumber)
    return text
  }

  // FIND

  @Query(() => Text)
  async findText(
    @Arg('author') author: string,
    @Arg('title') title: string,
    @Arg('book', { nullable: true }) book?: string,
  ): Promise<Text> {
    let query = this.Texts.createQueryBuilder('text').innerJoinAndSelect(
      'text.author',
      'author',
      'author.name = :author',
      {
        author,
      },
    )
    if (book)
      query = query.innerJoinAndSelect(
        'text.book',
        'book',
        'book.title = :book',
        { book },
      )
    query = query
      .where('text.title = :title', { title })
      .innerJoinAndSelect('text.lines', 'lines')

    const text = await query.getOneOrFail()
    text.lines.sort((l1, l2) => compareIds(l1, l2))
    log.info('findText', { id: text.id })
    return text
  }

  // SEARCH

  @Query(() => [Author])
  async searchLiterature(@Arg('search') search: string): Promise<Author[]> {
    const authors = await this.Authors.createQueryBuilder('author')
      .innerJoinAndSelect('author.books', 'book', 'book.title = :search', {
        search,
      })
      .innerJoinAndSelect(
        'book.texts',
        'bookText',
        'bookText.title = :search',
        { search },
      )
      .innerJoinAndSelect('author.texts', 'text', 'text.title = :search', {
        search,
      })
      .orderBy('author.id', 'ASC')
      .getMany()
    return authors
      .filter((author) => !!author.texts || !!author.books)
      .sort((a, b) => compareIds(a, b))
      .map((author) => {
        author.books?.sort((a, b) => compareIds(a, b))
        author.books?.map((book) => book.texts.sort((a, b) => compareIds(a, b)))
        author.texts.sort((a, b) => compareIds(a, b))
        return author
      })
  }

  @Query(() => [Author])
  async searchAuthors(@Arg('search') search: string): Promise<Author[]> {
    return await this.Authors.find({
      where: [{ id: Like(`%${search}%`) }, { name: Like(`%${search}%`) }],
      relations: ['texts'],
      order: { id: 'ASC' },
    })
  }

  @Query(() => [Book])
  async searchBooks(@Arg('search') search: string): Promise<Book[]> {
    return await this.Books.find({
      where: { title: Like(`%${search}%`) },
      relations: ['texts'],
      order: { title: 'ASC' },
    })
  }

  @Query(() => [Text])
  async searchTexts(@Arg('search') search: string): Promise<Text[]> {
    return await this.Texts.find({
      where: { title: Like(`%${search}%`) },
      relations: ['lines'],
      order: { title: 'ASC' },
    })
  }

  @Query(() => [Line])
  async searchLines(@Arg('search') search: string): Promise<Line[]> {
    return await this.Lines.find({
      where: [{ line: Like(`%${search}%`) }],
      order: { lineNumber: 'ASC' },
    })
  }
}
