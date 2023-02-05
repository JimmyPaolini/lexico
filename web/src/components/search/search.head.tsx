import Head from 'next/head'

type Props = { query: string }
export function SearchHead({ query }: Props) {
  let title = 'Lexico - Search'
  if (query) title += `: "${query}"`

  let description = query ? `Search for "${query}"` : 'Search for Latin'
  description += `translations, principal parts, and other grammatical information`

  const keywords = `Latin, English, ${
    query + ', '
  }translations, grammar, principal parts, part of speech, inflections, forms`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  )
}
