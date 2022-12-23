export type GraphqlError = {
  response?: {
    errors?: [
      {
        message: string
      }
    ]
  }
}
