export class IngestionAuthor {
  name: string
  path: string
  works: IngestionWork[]
}

export class IngestionWork {
  path: string
  title: string
  text: string
}
