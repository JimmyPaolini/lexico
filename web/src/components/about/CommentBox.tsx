import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useMutation } from "react-query"
import sendEmailMutation from "../../graphql/sendEmail.gql"
import { graphQLClient } from "../../pages/_app"
import { capitalizeFirstLetter } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import SubmitButton from "../accessories/SubmitButton"
import TextBox from "../accessories/TextBox"

export default function CommentBox() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      subject: "",
      body: "",
    },
    onSubmit: async () => {
      await sendEmail()
    },
  })
  const {
    mutateAsync: sendEmail,
    error: sendEmailError,
    isSuccess,
  } = useMutation("sendEmail", async () => {
    const { sendEmail: data } = await graphQLClient.request(
      sendEmailMutation,
      formik.values,
    )
    return data
  })
  const error: string = sendEmailError
    ? (sendEmailError as any).response.errors[0].message
    : ""

  return (
    <>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <CardHeaderMui
          title="Comment Box"
          titleTypographyProps={{ variant: "body1" }}
          className={classes.dropdown}
          action={
            <Box style={{ paddingTop: 8, paddingRight: 8 }}>
              <ExpandIcon expanded={expanded} />
            </Box>
          }
        />
      </CardActionArea>
      <Collapse in={expanded}>
        <Typography variant="body1" align="center" gutterBottom={true}>
          To add/edit an entry yourself, just edit it on Wiktionary!
          <br />
          All words, translations, and grammatical information are parsed
          periodically from Wiktionary
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <TextBox
              formik={formik}
              name="subject"
              className={classes.textBox}
            />
            <TextBox
              formik={formik}
              name="body"
              className={classes.textBox}
              multiline
              rows={4}
              maxRows={4}
            />
            <SubmitButton
              name={isSuccess ? "sent" : "send"}
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
          </Grid>
        </form>
      </Collapse>
    </>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    width: theme.custom.cardWidth,
  },
  textBox: {
    margin: theme.spacing(1),
  },
  body: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  formError: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  list: {
    padding: theme.spacing(1),
    listStyleType: "circle",
    listStylePosition: "inside",
  },
  bullet: {
    position: "relative",
    right: 20,
  },
  dropdown: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
}))
