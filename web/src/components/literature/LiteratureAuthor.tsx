import {
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Dispatch, SetStateAction, useContext } from "react"
import Author from "../../../../entity/literature/Author"
import { sentenceCase } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"
import { Context } from "../Context"

interface Props {
  author: Author
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function LiteratureAuthor({
  author,
  expanded,
  setExpanded,
}: Props) {
  const classes = useStyles()
  const { isMobile } = useContext(Context)
  let summary = [
    ...(author.books || []),
    ...author.texts.filter((text) => !text.book),
  ]
    .map((item) => sentenceCase(item.title))
    .join(" • ")
  if (author.id === "catullus") summary = "Carmina 1-116"

  const cardHeader = (
    <CardHeaderMui
      title={sentenceCase(author.id)}
      subheader={
        <>
          <Typography variant="body1" color="textSecondary">
            {sentenceCase(author.name)}
          </Typography>
          {isMobile ? (
            <Collapse in={!expanded}>
              <Typography
                variant="caption"
                color="textPrimary"
                className={classes.summary}
              >
                {summary}
              </Typography>
            </Collapse>
          ) : null}
        </>
      }
      action={isMobile && <ExpandIcon {...{ expanded }} />}
    />
  )

  return isMobile ? (
    <CardActionArea
      onClick={() => setExpanded((expanded) => !expanded)}
      classes={{ focusHighlight: classes.none }}
      disableRipple
      disableTouchRipple
    >
      {cardHeader}
    </CardActionArea>
  ) : (
    cardHeader
  )
}

const useStyles = makeStyles(() => ({
  summary: {
    display: "block",
    lineHeight: 1.3,
    marginTop: 4,
  },
  none: {
    display: "none",
  },
}))
