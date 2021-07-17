import { Divider, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import { memo, useRef } from "react"
import { MyTheme } from "../../../theme/theme"
import { CustomText } from "../../../utils/localLiterature"
import { sentenceCase } from "../../../utils/string"
import CustomLiteratureOptions from "./CustomLiteratureOptions"

interface CustomLiteratureRowProps {
  text: CustomText
  refreshLiteratureLocal: () => void
}
export default memo(function CustomLiteratureRow({
  text,
  refreshLiteratureLocal,
}: CustomLiteratureRowProps): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const listItemRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Divider className={classes.divider} />
      <ListItem
        button
        ref={listItemRef}
        onClick={() => router.push(`/reader/custom/` + text.id)}>
        <ListItemText
          primary={sentenceCase(text.title)}
          primaryTypographyProps={{ variant: "body1" }}
        />
        <CustomLiteratureOptions
          {...{ text, listItemRef, refreshLiteratureLocal }}
        />
      </ListItem>
    </>
  )
})

const useStyles = makeStyles((theme: MyTheme) => ({
  divider: {
    marginRight: theme.spacing(1),
  },
  options: {
    padding: 4,
    marginRight: -4,
  },
}))
