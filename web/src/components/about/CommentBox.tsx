import React, { useContext, useState } from 'react'

import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFormik } from 'formik'

import { useCommentMutation } from '../../graphql/generated'
import { capitalizeFirstLetter } from '../../utils/string'
import ExpandIcon from '../accessories/ExpandIcon'
import SubmitButton from '../accessories/SubmitButton'
import TextBox from '../accessories/TextBox'
import { Context } from '../layout/Context'

const PREFIX = 'CommentBox'

const classes = {
  textBox: `${PREFIX}-textBox`,
  formError: `${PREFIX}-formError`,
  dropdown: `${PREFIX}-dropdown`,
  hide: `${PREFIX}-hide`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.textBox}`]: {
    margin: theme.spacing(1),
  },

  [`& .${classes.formError}`]: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  [`& .${classes.dropdown}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },
}))

export default function CommentBox() {
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: async () => {
      await comment(formik.values)
    },
  })
  const {
    mutateAsync: comment,
    error: commentError,
    isSuccess,
  } = useCommentMutation()
  const error: string = commentError
    ? (commentError as any).response.errors[0].message
    : ''

  return (
    <Root>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <CardHeaderMui
          title="Questions and Feedback"
          titleTypographyProps={{ variant: 'body1' }}
          className={classes.dropdown}
          action={
            <Box p={1.5} mt={1} mr={1}>
              <ExpandIcon expanded={expanded} />
            </Box>
          }
        />
      </CardActionArea>
      <Collapse in={expanded}>
        <Typography variant="body1" align="center" gutterBottom={true}>
          Join the Lexico{' '}
          <Link
            href="https://lexico-group.slack.com/archives/C01SN2QN2BF"
            color="secondary"
          >
            Slack channel
          </Link>{' '}
          to chat and stay up to date with improvements!
          <br />
          Or login (so I have a reply email) to send a message below
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            {!user ? (
              <SubmitButton
                name={'login to send a message'}
                href="/user"
                className={classes.textBox}
              />
            ) : (
              <>
                <TextBox
                  formik={formik}
                  name="comment"
                  label="Message"
                  className={classes.textBox}
                  multiline
                  rows={4}
                />
                <SubmitButton
                  name={isSuccess ? 'sent' : 'send'}
                  disabled={isSuccess}
                  onClick={() => null}
                  className={classes.textBox}
                />
                <Typography
                  color="error"
                  variant="caption"
                  align="center"
                  display="block"
                  className={classes.formError}
                >
                  {capitalizeFirstLetter(error as any)}
                </Typography>
              </>
            )}
          </Grid>
        </form>
      </Collapse>
    </Root>
  )
}
