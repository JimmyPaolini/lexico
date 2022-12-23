import { Delete } from '@mui/icons-material'

import {
  CustomText,
  deleteCustomTextLocal,
} from 'src/components/library/custom/customTextsLocal'
import { useDeleteCustomTextMutation } from 'src/graphql/generated'

import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}

export const CustomLiteratureDelete = ({ text, refreshCustomTexts }: Props) => {
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onSuccess: async () => await refreshCustomTexts(),
  })
  const deleteText = async () => {
    if (text.local) {
      deleteCustomTextLocal(text.id)
      await refreshCustomTexts()
    } else deleteCustomTextUser(text)
  }

  return (
    <CustomLiteratureMenuItem
      action={deleteText}
      icon={<Delete />}
      text="Delete"
    />
  )
}
