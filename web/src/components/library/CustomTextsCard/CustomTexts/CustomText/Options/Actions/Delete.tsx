import { Delete as DeleteIcon } from '@mui/icons-material'

import { deleteCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomText, useDeleteCustomTextMutation } from 'src/graphql/generated'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}

export const Delete = ({ text, refreshCustomTexts }: Props) => {
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onSuccess: async () => await refreshCustomTexts(),
  })

  return (
    <Action
      onClick={async (e) => {
        e.stopPropagation()
        if (text.user) {
          deleteCustomTextUser(text)
        } else {
          deleteCustomTextLocal(text.id)
        }
        await refreshCustomTexts()
      }}
      Icon={<DeleteIcon />}
      text="Delete"
    />
  )
}
