import { AccountCircle } from '@mui/icons-material'

import { deleteUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { CustomText, useCreateUserTextMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { GraphqlError } from 'src/utils/graphqlError.type'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshUserTexts: () => Promise<void>
  closeMenu: () => void
}

export const MoveToRemote = ({ text, refreshUserTexts, closeMenu }: Props) => {
  const enqueueSnackbar = useSnackbar()

  const { mutate: createUserTextRemote } =
    useCreateUserTextMutation<GraphqlError>({
      onMutate: closeMenu,
      onSuccess: () => deleteUserTextLocal(text.id),
      onSettled: async () => await refreshUserTexts(),
      onError: (error) => {
        const errorMessage = error?.response?.errors?.[0]?.message
        const userHasMoreThan3Texts = errorMessage?.match(
          /user cannot have more than 3 remote user texts/
        )
        if (userHasMoreThan3Texts) {
          enqueueSnackbar(
            'You cannot have more than 3 custom texts saved to your account at once. Move ome to local in order to this one to your account'
          )
        }
      },
    })

  return (
    <Action
      onClick={async (e) => {
        e.stopPropagation()
        await createUserTextRemote(text)
      }}
      Icon={<AccountCircle />}
      text="Move To User"
    />
  )
}
