import { useEffect, useState } from 'react'

import {
  CustomText,
  deleteCustomTextLocal,
  listCustomTextsLocal,
} from 'src/components/library/custom/customTextsLocal'
import { useCustomTextsQuery } from 'src/graphql/generated'

type useCustomTextsReturn = {
  customTexts: CustomText[]
  refreshCustomTexts: () => Promise<void>
  isLoading: boolean
}

export const useCustomTexts = (): useCustomTextsReturn => {
  const [customTextsLocal, setCustomTextsLocal] = useState<CustomText[]>(
    listCustomTextsLocal()
  )

  const {
    data,
    isLoading,
    refetch: refreshCustomTextsUser,
  } = useCustomTextsQuery()
  const customTextsUser = data?.customTexts

  const [customTexts, setCustomTexts] = useState<CustomText[]>([
    ...(customTextsUser || []),
    ...customTextsLocal,
  ])

  useEffect(() => {
    setCustomTexts([...(customTextsUser || []), ...customTextsLocal])
  }, [customTextsLocal, customTextsUser])

  const refreshCustomTexts = async () => {
    await refreshCustomTextsUser()
    setCustomTextsLocal(listCustomTextsLocal())
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

  return { customTexts, refreshCustomTexts, isLoading }
}