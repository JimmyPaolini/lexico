import {
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Dispatch, SetStateAction } from "react"
import Author from "../../../../entity/literature/Author"
import { sentenceCase } from "../../utils/string"
import ExpandIcon from "../accessories/ExpandIcon"

interface Props {
  author: Author
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function LiteratureAuthor({
  author,
  expanded,
  setExpanded,
}: Props): JSX.Element {
  const classes = useStyles()
  let summary = [
    ...(author.books || []),
    ...author.texts.filter(
      (text) =>
        !(author.books || []).some((book) =>
          book.texts.some((bookText) => bookText.id === text.id),
        ),
    ),
  ]
    .sort()
    .map((item) => sentenceCase(item.title).replace(/^\d+ /, ""))
    .join(" • ")
  if (author.id === "catullus") summary = "Carmina 1-116"

  return (
    <CardActionArea
      onClick={() => setExpanded((expanded) => !expanded)}
      classes={{ focusHighlight: classes.none }}
      disableRipple
      disableTouchRipple>
      <CardHeaderMui
        title={sentenceCase(author.id)}
        subheader={
          <>
            <Typography variant="body1" color="textSecondary">
              {sentenceCase(author.name)}
            </Typography>
            <Collapse in={!expanded}>
              <Typography
                variant="caption"
                color="textPrimary"
                className={classes.summary}>
                {summary}
              </Typography>
            </Collapse>
          </>
        }
        action={<ExpandIcon {...{ expanded }} />}
      />
    </CardActionArea>
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
