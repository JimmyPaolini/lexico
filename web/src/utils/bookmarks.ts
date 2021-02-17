import { Dispatch, SetStateAction } from "react"
import { useMutation, useQuery } from "react-query"
import bookmarkMutation from "../graphql/bookmarks/bookmark.gql"
import bookmarksQuery from "../graphql/bookmarks/bookmarks.gql"
import unbookmarkMutation from "../graphql/bookmarks/unbookmark.gql"
import { graphQLClient, queryClient } from "../pages/_app"

export const useBookmarks = () =>
  useQuery(
    "bookmarks",
    async () => {
      const { bookmarks: data } = await graphQLClient.request(bookmarksQuery)
      return data
    },
    { cacheTime: 0 },
  )

export const useBookmark = (setBookmarked: Dispatch<SetStateAction<boolean>>) =>
  useMutation(
    async (entryId: string) => {
      console.log(typeof entryId)
      const { bookmark: data } = await graphQLClient.request(bookmarkMutation, {
        entryId,
      })
      return data
    },
    {
      onMutate: async () => {
        await queryClient.cancelMutations()
        setBookmarked(true)
      },
      onError: async () => {
        await queryClient.cancelMutations()
        setBookmarked(false)
      },
    },
  )

export const useUnbookmark = (
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) =>
  useMutation(
    async (entryId: string) => {
      const {
        unbookmark: data,
      } = await graphQLClient.request(unbookmarkMutation, { entryId })
      return data
    },
    {
      onMutate: async () => {
        await queryClient.cancelMutations()
        setBookmarked(false)
      },
      onError: async () => {
        await queryClient.cancelMutations()
        setBookmarked(true)
      },
    },
  )
