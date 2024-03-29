import { Divider, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import { memo } from "react"
import { MyTheme } from "../../../theme/theme"
import { CustomText } from "../../../utils/literatureLocal"
import CustomLiteratureOptions from "./CustomLiteratureOptions"

interface CustomLiteratureRowProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}
export default memo(function CustomLiteratureRow({
  text,
  refreshCustomTexts,
}: CustomLiteratureRowProps): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Divider className={classes.divider} />
      <ListItem button onClick={() => router.push(`/reader/custom/` + text.id)}>
        <ListItemText
          primary={text.title}
          primaryTypographyProps={{ variant: "body1" }}
        />
        <CustomLiteratureOptions {...{ text, refreshCustomTexts }} />
      </ListItem>
    </>
  )
})

const useStyles = makeStyles((theme: MyTheme) => ({
  divider: {
    marginRight: theme.spacing(1),
  },
}))
