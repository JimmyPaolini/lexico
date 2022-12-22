import { useEffect, useState } from 'react'

import { useListCustomTextsQuery } from 'src/graphql/generated'
import {
  CustomText,
  deleteCustomTextLocal,
  listCustomTextsLocal,
} from 'src/utils/literatureLocal'

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
  } = useListCustomTextsQuery()
  const customTextsUser = data?.listCustomTexts

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
