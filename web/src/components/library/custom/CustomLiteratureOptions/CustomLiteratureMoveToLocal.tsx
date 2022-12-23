import { Home } from '@mui/icons-material'

import {
  CustomText,
  createCustomTextLocal,
} from 'src/components/library/custom/customTextsLocal'
import { useDeleteCustomTextMutation } from 'src/graphql/generated'

import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}

export const CustomLiteratureMoveToLocal = ({
  text,
  refreshCustomTexts,
  closeMenu,
}: Props) => {
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onMutate: closeMenu,
    onSettled: async () => await refreshCustomTexts(),
  })
  const moveToLocal = () => {
    createCustomTextLocal(text)
    deleteCustomTextUser(text)
  }

  return (
    <CustomLiteratureMenuItem
      action={moveToLocal}
      icon={<Home />}
      text="Move to Local"
    />
  )
}
