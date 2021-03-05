import {
  Card,
  Divider,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { FiberManualRecord } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import React from "react"
import { useMutation } from "react-query"
import CardHeader from "../components/accessories/CardHeader"
import SubmitButton from "../components/accessories/SubmitButton"
import TextBox from "../components/accessories/TextBox"
import sendEmailMutation from "../graphql/sendEmail.gql"
import { capitalizeFirstLetter } from "../utils/string"
import { graphQLClient } from "./_app"

const sampleSuggestions = [
  "Suggest additions/revisions to words, translations, spellings, et cetera",
  "Suggest a Latin text to be added to the Literature section",
  "Leave the developer a note!",
]

export default function Suggestions() {
  const classes = useStyles()
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
    <Grid container justify="center" alignItems="center">
      <Grow in={true}>
        <Card className={classes.card}>
          <CardHeader title="Suggestions" />
          <Divider className={classes.divider} />
          <Typography variant="subtitle1" className={classes.list}>
            Use Suggestions to:
          </Typography>
          <List dense className={classes.list}>
            {sampleSuggestions.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecord fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className={classes.bullet}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" align="center">
            To add/edit an entry yourself, just edit it on Wiktionary!
            <br />
            All words, translations, and grammatical information are parsed
            periodically from Wiktionary
          </Typography>
          <Divider className={classes.divider} />
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
        </Card>
      </Grow>
    </Grid>
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
}))
