import { useRouter } from 'next/router'

import Menu from '@mui/icons-material/Menu'
import { Grid, IconButton, Typography, useTheme } from '@mui/material'

import { useFormik } from 'formik'
import { v4 as uuid } from 'uuid'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { createUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { CustomText, useCreateUserTextMutation } from 'src/graphql/generated'

import { SubmitButton } from '../../accessories/SubmitButton'
import { TextBox } from '../../accessories/TextBox'
import { validateUserText } from './validateUserText'

type Props = { text?: CustomText }

export const UserTextForm = ({ text }: Props) => {
  const theme = useTheme()
  const router = useRouter()
  const { isMobile, isNavOpen, setNavOpen } = useLexicoContext()

  const formik = useFormik<CustomText>({
    initialValues: {
      id: text?.id ?? uuid(),
      title: text?.title ?? '',
      text: text?.text ?? '',
    } as CustomText,
    validate: validateUserText,
    onSubmit: async (userText) => {
      console.log('🐋 ~ userText', userText)
      try {
        if (text?.user) {
          await createUserTextRemote(userText)
        } else {
          createUserTextLocal(userText)
        }
        router.push(`/userText/${userText.id}`)
      } catch {
        formik.setStatus('Error creating user text')
      }
    },
  })
  const { mutateAsync: createUserTextRemote } = useCreateUserTextMutation()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        gap={theme.spacing(2)}
        sx={{
          height: '100vh',
          width: '100%',
          maxWidth: theme.custom.card.maxWidth * 2,
          padding: theme.spacing(2),
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'black',
        }}
      >
        <Grid
          item
          container
          wrap="nowrap"
          alignItems="center"
          sx={{ marginBottom: theme.spacing(2) }}
        >
          {isMobile ? (
            <IconButton
              onClick={() => setNavOpen(!isNavOpen)}
              style={{ marginRight: 8 }}
              aria-label="menu"
              size="large"
            >
              <Menu />
            </IconButton>
          ) : null}
          <TextBox name="title" formik={formik} color="secondary" autoFocus />
        </Grid>
        <Typography align="center" gutterBottom>
          Line Numbers are automatically assigned to each line;
          <br />
          Line Labels can be manually assigned by starting a line with a #Label
        </Typography>
        <TextBox
          name="text"
          formik={formik}
          color="secondary"
          multiline
          minRows={4}
          style={{ flexGrow: 1 }}
          InputProps={{ style: { height: '100%', alignItems: 'flex-start' } }}
          inputProps={{ style: { height: '100%', overflow: 'inherit' } }}
          placeholder={
            'automatically numbered line\n#LBL manually labelled line'
          }
        />
        <SubmitButton name="Save" />
      </Grid>
    </form>
  )
}
