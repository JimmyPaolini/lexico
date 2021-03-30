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
import React, { useContext, useState } from "react"
import { useMutation } from "react-query"
import commentMutation from "../../graphql/comment.graphql"
import { graphQLClient } from "../../pages/_app"
import { capitalizeFirstLetter } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import SubmitButton from "../accessories/SubmitButton"
import TextBox from "../accessories/TextBox"
import { Context } from "../Context"

export default function CommentBox() {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async () => {
      await comment()
    },
  })
  const { mutateAsync: comment, error: commentError, isSuccess } = useMutation(
    "comment",
    async () => {
      const { comment: data } = await graphQLClient.request(
        commentMutation,
        formik.values,
      )
      return data
    },
  )
  const error: string = commentError
    ? (commentError as any).response.errors[0].message
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
            {!user ? (
              <SubmitButton
                name={"login to leave a comment"}
                href="/user"
                className={classes.textBox}
              />
            ) : (
              <>
                <TextBox
                  formik={formik}
                  name="comment"
                  className={classes.textBox}
                  multiline
                  rows={4}
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
              </>
            )}
          </Grid>
        </form>
      </Collapse>
    </>
  )
}

const useStyles = makeStyles((theme: any) => ({
  textBox: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  formError: {
    width: "100%",
    marginTop: theme.spacing(1),
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
