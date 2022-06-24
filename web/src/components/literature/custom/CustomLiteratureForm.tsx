import { memo, useContext } from 'react'

import Menu from '@mui/icons-material/Menu'
import { Grid, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { useCreateCustomTextMutation } from '../../../graphql/generated'
import {
  CustomText,
  createCustomTextLocal,
} from '../../../utils/literatureLocal'
import SubmitButton from '../../accessories/SubmitButton'
import TextBox from '../../accessories/TextBox'
import { Context } from '../../layout/Context'

const PREFIX = 'CustomLiteratureForm'

const classes = {
  customReader: `${PREFIX}-customReader`,
  item: `${PREFIX}-item`,
}

const Root = styled('form')(({ theme }) => ({
  [`& .${classes.customReader}`]: {
    width: '100%',
    maxWidth: theme.custom.card.maxWidth * 2,
    height: '100vh',
    padding: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'black',
  },

  [`& .${classes.item}`]: {
    marginBottom: theme.spacing(2),
  },
}))

type Props = {
  text?: CustomText
}
export default memo(function CustomLiteratureForm({ text }: Props) {
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  const router = useRouter()
  const formik = useFormik<CustomText>({
    initialValues: text || { id: uuid(), title: '', text: '' },
    validate,
    onSubmit: async () => {
      try {
        if (!text || text.local) createCustomTextLocal(formik.values)
        else await createCustomText(formik.values)
        router.replace(`/reader/custom/` + formik.values.id)
      } catch {
        formik.setStatus('Error creating custom text')
      }
    },
  })
  const { mutateAsync: createCustomText } = useCreateCustomTextMutation()

  return (
    <Root onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.customReader}
      >
        <Grid
          item
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.item}
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
        <Typography align="center" className={classes.item}>
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
          className={classes.item}
          style={{ flexGrow: 1 }}
          InputProps={{ style: { height: '100%', alignItems: 'flex-start' } }}
          inputProps={{ style: { height: '100%', overflow: 'inherit' } }}
          placeholder={`automatically numbered line\n#LBL manually labelled line`}
        />
        <SubmitButton name="Save" className={classes.item} />
      </Grid>
    </Root>
  )
})

export function validate({ title, text }: CustomText): CustomText {
  const errors = {} as CustomText
  if (!title) errors.title = 'Title cannot be empty'
  if (!text) errors.text = 'Text cannot be empty'
  if (title.length >= 100)
    errors.title = 'Title must be less than 100 characters'
  if (text.length >= 100000)
    errors.text = 'Text must be less than 100,000 characters'
  return errors
}
