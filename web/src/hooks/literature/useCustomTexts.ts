import { useEffect, useState } from "react"
import { UseQueryResult } from "react-query"
import {
  CustomText,
  deleteCustomTextLocal,
  listCustomTextsLocal,
} from "../../utils/literatureLocal"
import useListCustomTexts from "../user/useListCustomTexts"

interface useCustomTextsReturn {
  customTexts: CustomText[]
  refreshCustomTexts: () => Promise<void>
  isLoading: boolean
}
export default function useCustomTexts(): useCustomTextsReturn {
  const [customTextsLocal, setCustomTextsLocal] = useState<CustomText[]>(
    listCustomTextsLocal(),
  )

  const {
    data: customTextsUser,
    isLoading,
    refetch: refreshCustomTextsUser,
  } = useListCustomTexts() as UseQueryResult<CustomText[], unknown>

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
      if (customTextsCopy.some((duplicate) => duplicate.id === customText.id))
        deleteCustomTextLocal(customText.id)
    }
  }, [customTexts])

  return { customTexts, refreshCustomTexts, isLoading }
}
