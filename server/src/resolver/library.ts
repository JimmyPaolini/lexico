import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Like } from 'typeorm'

import log from '../../../utils/log'
import Author from '../entity/library/Author'
import Book from '../entity/library/Book'
import Line from '../entity/library/Line'
import Text from '../entity/library/Text'

const compareIds = (a: { id: string }, b: { id: string }) =>
  a.id.localeCompare(b.id, undefined, {
    numeric: true,
    sensitivity: 'base',
  })

@Resolver(Text)
export class LibraryResolver {
  // LIST

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    const authors = await Author.find()
    await Promise.all(
      authors.map(async (author) => {
        author.texts = await Text.createQueryBuilder()
          .select()
          .where({ author })
          .getMany()
        author.books = await Book.find({ where: { author: { id: author.id } } })
        await Promise.all(
          author.books.map(async (book) => {
            book.texts = await Text.createQueryBuilder()
              .select()
              .where({ author, book })
              .getMany()
          })
        )
      })
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
  async books(): Promise<Book[]> {
    const books = await Book.find({
      relations: ['texts'],
      order: { title: 'ASC' },
    })
    return books.map((book) => {
      book.texts.sort((a, b) => compareIds(a, b))
      return book
    })
  }

  @Query(() => [Text])
  async texts(): Promise<Text[]> {
    return await Text.find({
      order: { title: 'ASC' },
    })
  }

  @Query(() => [ID])
  async textIds(): Promise<string[]> {
    const texts = await Text.createQueryBuilder().getMany()
    return texts.map(({ id }) => id)
  }

  // GET

  @Query(() => Author)
  async author(@Arg('id') id: string): Promise<Author> {
    const author = await Author.findOneOrFail({
      where: { id },
      relations: { books: { texts: true }, texts: true },
    })
    author.books?.sort((a, b) => compareIds(a, b))
    author.books?.map((book) => book.texts.sort((a, b) => compareIds(a, b)))
    author.texts.sort((a, b) => compareIds(a, b))
    return author
  }

  @Query(() => Book)
  async book(@Arg('id') id: string): Promise<Book> {
    const book = await Book.findOneOrFail({
      where: { id },
      relations: { texts: true },
    })
    book.texts.sort((a, b) => compareIds(a, b))
    return book
  }

  @Query(() => Text)
  async text(@Arg('id') id: string): Promise<Text> {
    const text = await Text.createQueryBuilder('text')
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
    @Arg('book', { nullable: true }) book?: string
  ): Promise<Text> {
    let query = Text.createQueryBuilder('text').innerJoinAndSelect(
      'text.author',
      'author',
      'author.name = :author',
      {
        author,
      }
    )
    if (book) {
      query = query.innerJoinAndSelect(
        'text.book',
        'book',
        'book.title = :book',
        { book }
      )
    }
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
    const authors = await Author.createQueryBuilder('author')
      .innerJoinAndSelect('author.books', 'book', 'book.title = :search', {
        search,
      })
      .innerJoinAndSelect(
        'book.texts',
        'bookText',
        'bookText.title = :search',
        { search }
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
    return await Author.find({
      where: [{ id: Like(`%${search}%`) }, { name: Like(`%${search}%`) }],
      relations: ['texts'],
      order: { id: 'ASC' },
    })
  }

  @Query(() => [Book])
  async searchBooks(@Arg('search') search: string): Promise<Book[]> {
    return await Book.find({
      where: { title: Like(`%${search}%`) },
      relations: ['texts'],
      order: { title: 'ASC' },
    })
  }

  @Query(() => [Text])
  async searchTexts(@Arg('search') search: string): Promise<Text[]> {
    return await Text.find({
      where: { title: Like(`%${search}%`) },
      relations: ['lines'],
      order: { title: 'ASC' },
    })
  }

  @Query(() => [Line])
  async searchLines(@Arg('search') search: string): Promise<Line[]> {
    return await Line.find({
      where: [{ line: Like(`%${search}%`) }],
      order: { lineNumber: 'ASC' },
    })
  }
}
