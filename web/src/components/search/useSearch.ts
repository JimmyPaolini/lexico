import { useSearchQuery } from 'src/graphql/generated'

export function useSearch(searched: string) {
  const { data, isLoading } = useSearchQuery(
    { search: searched },
    { enabled: !!searched }
  )
  return { entries: data?.search ?? [], isLoading }
}

export type Entry = ReturnType<typeof useSearch>['entries'][0]
