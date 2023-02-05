import { useEffect, useState } from 'react'

import {
  deleteUserTextLocal,
  listUserTextsLocal,
} from 'src/components/library/UserTextsCard/UserTexts/localUserTexts'
import { CustomText, useUserTextsQuery } from 'src/graphql/generated'

type UseUserTexts = {
  userTexts: CustomText[]
  refreshUserTexts: () => Promise<void>
  isLoading: boolean
  isError: boolean
}

export const useUserTexts = (): UseUserTexts => {
  const [userTextsLocal, setUserTextsLocal] = useState<CustomText[]>(
    listUserTextsLocal()
  )

  const {
    data,
    isLoading,
    isError,
    refetch: refreshUserTextsRemote,
  } = useUserTextsQuery()
  const userTextsUser = (data?.userTexts || []) as CustomText[]

  const userTexts = [...userTextsUser, ...userTextsLocal]

  const refreshUserTexts = async () => {
    setUserTextsLocal(listUserTextsLocal())
    await refreshUserTextsRemote()
  }

  // Deduplicate custom texts
  useEffect(() => {
    const userTextsCopy = [...userTexts]
    while (userTextsCopy.length) {
      const userText = userTextsCopy.pop() as CustomText
      if (userTextsCopy.some((duplicate) => duplicate.id === userText.id)) {
        deleteUserTextLocal(userText.id)
      }
    }
  }, [userTexts])

  return { userTexts, refreshUserTexts, isLoading, isError }
}
