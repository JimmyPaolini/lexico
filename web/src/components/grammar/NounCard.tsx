import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader as CardHeaderMui,
  Collapse,
  Divider,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import { MyTheme } from "../../theme/theme"
import ExpandIcon from "../accessories/ExpandIcon"
import PrincipalPartsRow from "../EntryCard/PrincipalPartsRow/PrincipalPartsRow"
import declensions from "./declensions"

export default function NounCard(): JSX.Element {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Card>
      <CardActionArea onClick={() => setExpanded((expanded) => !expanded)}>
        <CardHeaderMui
          title="Noun Declensions"
          action={<ExpandIcon {...{ expanded }} />}
          classes={{
            action: classes.action,
          }}
        />
      </CardActionArea>
      <Collapse in={expanded}>
        <CardContent className={classes.cardContent}>
          <Divider variant="middle" />
          <PrincipalPartsRow {...declensions.first} />
          <Divider variant="middle" />
          <PrincipalPartsRow {...declensions.second} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

const useStyles = makeStyles((theme: MyTheme) => ({
  action: {
    marginBottom: -theme.spacing(1),
  },
  cardContent: {
    marginTop: -theme.spacing(2),
    marginBottom: -theme.spacing(2),
  },
}))
