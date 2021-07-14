import { CardHeader as CardHeaderMui, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { memo } from "react"

export default memo(function LiteratureLiteratureRows(): JSX.Element {
  const classes = useStyles()
  classes

  return (
    <>
      <Divider style={{ marginRight: 8 }} />
      <CardHeaderMui />
    </>
  )
})

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