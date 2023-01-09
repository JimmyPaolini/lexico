import { useContext } from 'react'

import Menu from '@mui/icons-material/Menu'
import { Grid, IconButton, Typography, useTheme } from '@mui/material'

import { useFormik } from 'formik'
import { v4 as uuid } from 'uuid'

import { createCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomText, useCreateCustomTextMutation } from 'src/graphql/generated'

import { Link } from '../../accessories/Link'
import { SubmitButton } from '../../accessories/SubmitButton'
import { TextBox } from '../../accessories/TextBox'
import { Context } from '../../layout/Context'
import { validateCustomText } from './validateCustomText'

type Props = { text?: CustomText }

export const CustomTextForm = ({ text }: Props) => {
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)
  const theme = useTheme()

  // const router = useRouter()
  const formik = useFormik<CustomText>({
    initialValues: {
      id: text?.id ?? uuid(),
      title: text?.title ?? '',
      text: text?.text ?? '',
    } as CustomText,
    validate: validateCustomText,
    onSubmit: async () => {
      try {
        if (text?.user) {
          await createCustomText(formik.values)
        } else {
          createCustomTextLocal(formik.values)
        }
        // await router.push(`/userText/${formik.values.id}`)
      } catch {
        formik.setStatus('Error creating custom text')
      }
    },
  })
  const { mutateAsync: createCustomText } = useCreateCustomTextMutation()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
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
        <Typography align="center" sx={{ marginBottom: theme.spacing(2) }}>
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
          sx={{ marginBottom: theme.spacing(2) }}
          style={{ flexGrow: 1 }}
          InputProps={{ style: { height: '100%', alignItems: 'flex-start' } }}
          inputProps={{ style: { height: '100%', overflow: 'inherit' } }}
          placeholder={
            'automatically numbered line\n#LBL manually labelled line'
          }
        />
        <Link href={`/userText/${formik.values.id}`}>
          <SubmitButton name="Save" sx={{ marginBottom: theme.spacing(2) }} />
        </Link>
      </Grid>
    </form>
  )
}
