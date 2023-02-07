export const clientEndpoint =
  process.env.NEXT_ENV === 'build'
    ? 'https://lexicolatin.com/api'
    : typeof window === 'undefined'
    ? 'http://localhost:3001/graphql'
    : window.location.origin + '/api'

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): (() => Promise<TData>) => {
  return async () => {
    const res = await fetch(clientEndpoint, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', ...options },
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()
    if (json.errors) throw new Error(json?.errors?.[0]?.message || 'Error…')
    return json.data
  }
}
