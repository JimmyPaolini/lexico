import { Delete as DeleteIcon } from '@mui/icons-material'

import { deleteUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { CustomText, useDeleteUserTextMutation } from 'src/graphql/generated'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshUserTexts: () => Promise<void>
}

export const Delete = ({ text, refreshUserTexts }: Props) => {
  const { mutate: deleteUserTextRemote } = useDeleteUserTextMutation({
    onSuccess: async () => await refreshUserTexts(),
  })

  return (
    <Action
      onClick={async (e) => {
        e.stopPropagation()
        if (text.user) {
          deleteUserTextRemote(text)
        } else {
          deleteUserTextLocal(text.id)
        }
        await refreshUserTexts()
      }}
      Icon={<DeleteIcon />}
      text="Delete"
    />
  )
}
