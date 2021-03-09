import { CardActionArea, CardHeader } from "@material-ui/core"
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

  const cardHeader = (
    <CardHeader
      title={sentenceCase(author.name)}
      subheader={sentenceCase(author.fullname)}
      action={isMobile && <ExpandIcon {...{ expanded }} />}
      classes={{
        action: classes.expandIcon,
      }}
    />
  )

  return isMobile ? (
    <CardActionArea onClick={() => setExpanded((expanded) => !expanded)}>
      {cardHeader}
    </CardActionArea>
  ) : (
    cardHeader
  )
}

const useStyles = makeStyles(() => ({
  expandIcon: {
    marginTop: "auto",
  },
}))
