import { Delete } from '@mui/icons-material'

import { useDeleteCustomTextMutation } from 'src/graphql/generated'
import { CustomText, deleteCustomTextLocal } from 'src/utils/literatureLocal'

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
