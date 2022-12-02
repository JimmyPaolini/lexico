import { useEffect } from 'react'

import { AccountCircle } from '@mui/icons-material'

import { useCreateCustomTextMutation } from 'src/graphql/generated'
import { useSnackbarEnhanced } from 'src/hooks/useSnackbarEnhanced'
import { CustomText, deleteCustomTextLocal } from 'src/utils/literatureLocal'

import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}

export const CustomLiteratureMoveToUser = ({
  text,
  refreshCustomTexts,
  closeMenu,
}: Props) => {
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const { mutate: createCustomTextUser, error } = useCreateCustomTextMutation({
    onMutate: closeMenu,
    onSuccess: () => deleteCustomTextLocal(text.id),
    onSettled: () => refreshCustomTexts(),
  })
  const moveToUser = () => createCustomTextUser(text)

  useEffect(() => {
    const errorMessage = (error as any)?.response.errors[0].message
    const userHasMoreThan3Texts =
      error && errorMessage.match(/user cannot have more than 3 custom texts/)
    if (userHasMoreThan3Texts) {
      enqueueSnackbar(
        `You cannot have more than 3 custom texts saved to your user at once. Move one to local in order to move another to the user`,
      )
    }
  }, [error])

  return (
    <CustomLiteratureMenuItem
      action={moveToUser}
      icon={<AccountCircle />}
      text="Move To User"
    />
  )
}
