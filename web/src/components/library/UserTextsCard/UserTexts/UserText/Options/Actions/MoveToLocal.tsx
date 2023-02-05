import { Home } from '@mui/icons-material'

import { createUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { CustomText, useDeleteUserTextMutation } from 'src/graphql/generated'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshUserTexts: () => Promise<void>
  closeMenu: () => void
}

export const MoveToLocal = ({ text, refreshUserTexts, closeMenu }: Props) => {
  const { mutate: deleteUserTextRemote } = useDeleteUserTextMutation({
    onMutate: () => closeMenu(),
    onSettled: async () => await refreshUserTexts(),
  })

  return (
    <Action
      onClick={async (e) => {
        createUserTextLocal(text)
        await deleteUserTextRemote({ id: text.id })
        e.stopPropagation()
      }}
      Icon={<Home />}
      text="Move to Local"
    />
  )
}
