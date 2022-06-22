import {
  Entry,
  useSearchEnglishQuery,
  useSearchLatinQuery,
} from '../../graphql/generated'

export default function useSearch(
  isLatin: boolean,
  searched: string,
): { entries: Entry[]; isLoading: boolean } {
  const { data: dataLatin, isLoading: isLoadingLatin } = useSearchLatinQuery(
    { search: searched },
    { enabled: isLatin && !!searched },
  )
  const { data: dataEnglish, isLoading: isLoadingEnglish } =
    useSearchEnglishQuery(
      { search: searched },
      { enabled: !isLatin && !!searched },
    )
  const entries = (
    isLatin ? dataLatin?.searchLatin : dataEnglish?.searchEnglish
  ) as Entry[]
  const isLoading = isLatin ? isLoadingLatin : isLoadingEnglish
  return { entries, isLoading }
}
