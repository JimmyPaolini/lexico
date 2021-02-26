export class IngestionAuthor {
  name: string
  path: string
  texts: IngestionText[]
}

export class IngestionText {
  title: string
  book: string
  path: string
}
