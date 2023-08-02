import { useState } from 'react'

import { useRouter } from 'next/router'

import { Entry as EntryType, useSearchQuery } from 'src/graphql/generated'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'

import { Entry } from '../components/Entry/Entry'
import { NoResultsCard } from '../components/NoResultsCard'
import { Logo } from '../components/accessories/Logo'
import { Deck } from '../components/layout/Deck'
import { SearchDeckLayout } from '../components/layout/SearchDeckLayout'
import { SearchHead } from '../components/search/search.head'

export default function Search() {
  const router = useRouter()

  const [search, setSearch] = useState(router.query.query as string)

  const { data, isLoading } = useSearchQuery(
    { search },
    { enabled: Boolean(search) }
  )
  const entries = (data?.search ?? []) as EntryType[]

  const handleSearch = async (search: string) => {
    setSearch(search)
    const queryString = search ? '?query=' + search : ''
    googleAnalyticsEvent('search', {
      category: 'search',
      label: '',
      value: search,
    })
    await router.push(router.pathname + queryString)
  }

  const Cards = !search
    ? [<Logo key="logo" />]
    : !entries?.length && !isLoading
    ? [<NoResultsCard search={search} key="NoResultsCard" />]
    : entries.map((entry) => <Entry {...{ entry, search }} key={entry.id} />)

  return (
    <>
      <SearchHead query={search} />
      <SearchDeckLayout
        initialSearch={search}
        handleSearch={handleSearch}
        isLoading={isLoading && !!search}
        placeholder="Search Lexico"
      >
        <Deck Cards={Cards} />
      </SearchDeckLayout>
    </>
  )
}
