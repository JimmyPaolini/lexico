import { Home } from '@mui/icons-material'

import { createCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomText, useDeleteCustomTextMutation } from 'src/graphql/generated'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}

export const MoveToLocal = ({ text, refreshCustomTexts, closeMenu }: Props) => {
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onMutate: closeMenu,
    onSettled: async () => await refreshCustomTexts(),
  })

  return (
    <Action
      onClick={(e) => {
        e.stopPropagation()
        createCustomTextLocal(text)
        deleteCustomTextUser(text)
      }}
      Icon={<Home />}
      text="Move to Local"
    />
  )
}
