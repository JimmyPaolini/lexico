import { useEffect, useState } from 'react'

import {
  deleteCustomTextLocal,
  listCustomTextsLocal,
} from 'src/components/library/CustomTextsCard/CustomTexts/localCustomTexts'
import { CustomText, useCustomTextsQuery } from 'src/graphql/generated'

type useCustomTextsReturn = {
  customTexts: CustomText[]
  refreshCustomTexts: () => Promise<void>
  isLoading: boolean
  isError: boolean
}

export const useCustomTexts = (): useCustomTextsReturn => {
  const [customTextsLocal, setCustomTextsLocal] = useState<CustomText[]>(
    listCustomTextsLocal()
  )

  const {
    data,
    isLoading,
    isError,
    refetch: refreshCustomTextsUser,
  } = useCustomTextsQuery()
  const customTextsUser = (data?.customTexts || []) as CustomText[]

  const [customTexts, setCustomTexts] = useState([
    ...customTextsUser,
    ...customTextsLocal,
  ])

  useEffect(() => {
    setCustomTexts([...(customTextsUser || []), ...customTextsLocal])
  }, [customTextsLocal, customTextsUser])

  const refreshCustomTexts = async () => {
    setCustomTextsLocal(listCustomTextsLocal())
    await refreshCustomTextsUser()
  }

  // Deduplicate custom texts
  useEffect(() => {
    const customTextsCopy = [...customTexts]
    while (customTextsCopy.length) {
      const customText = customTextsCopy.pop() as CustomText
      if (customTextsCopy.some((duplicate) => duplicate.id === customText.id)) {
        deleteCustomTextLocal(customText.id)
      }
    }
  }, [customTexts])

  return { customTexts, refreshCustomTexts, isLoading, isError }
}
