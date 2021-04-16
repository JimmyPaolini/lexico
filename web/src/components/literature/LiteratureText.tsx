import { Avatar, CardActionArea, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import React from "react"
import LinesEllipsis from "react-lines-ellipsis"
import Text from "../../../../entity/literature/Text"
import { romanNumeralize } from "../../utils/romanNumeral"
import { sentenceCase } from "../../utils/string"

interface Props {
  text: Text
}
export default function LiteratureText({ text }: Props) {
  const classes = useStyles()
  const router = useRouter()

  const isTitleBook = text.title.match(/book \d+/i)

  return (
    <Grid item xs={isTitleBook ? 2 : 4} container justify="center">
      <CardActionArea onClick={() => router.push(`literature/${text.id}`)}>
        {isTitleBook ? (
          <Avatar className={classes.bookText}>
            {text.title.match(/\d+/)?.[0]}
          </Avatar>
        ) : (
          <Grid className={classes.standaloneTextContainer}>
            <Typography className={classes.standaloneText}>
              <LinesEllipsis
                text={romanNumeralize(sentenceCase(text.title))}
                maxLine="3"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </Typography>
          </Grid>
        )}
      </CardActionArea>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  textContainer: {
    flex: "20%",
  },
  bookText: {
    margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  standaloneTextContainer: {
    height: 56,
    margin: theme.spacing(1),
    padding: "8px 8px",
    borderRadius: 16,
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.primary.main,
    overflow: "hidden",
  },
  standaloneText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "auto",
    lineHeight: 1.1,
    textAlign: "center",
  },
}))
