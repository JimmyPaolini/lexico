import { useContext, useState } from 'react'

import {
  Box,
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Translation } from '../../../graphql/generated'
import { getSettingsLocal } from '../../../utils/settingsLocal'
import ExpandIcon from '../../accessories/ExpandIcon'
import { Context } from '../../layout/Context'
import TranslationBullet from './TranslationBullet'

type Props = {
  translations: Translation[]
}

export default function TranslationsRow({ translations }: Props) {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings?.translationsExpandedDefault ||
      getSettingsLocal().translationsExpandedDefault ||
      false,
  )
  const expandable = translations.length > 2

  return (
    <CardContent className={classes.translationsRow}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disabled={!expandable}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          wrap="nowrap"
        >
          <Grid container item direction="column">
            {translations.slice(0, 2).map((translation) => (
              <TranslationBullet {...{ translation }} key={translation.id} />
            ))}
            <Collapse in={expanded || !expandable} timeout={250} mountOnEnter>
              {translations.slice(2).map((translation) => (
                <TranslationBullet {...{ translation }} key={translation.id} />
              ))}
            </Collapse>
          </Grid>
          {expandable && (
            <Box mt={0.5} mr={1.5}>
              <ExpandIcon {...{ expanded }} />
            </Box>
          )}
        </Grid>
      </CardActionArea>
    </CardContent>
  )
}

const useStyles = makeStyles((theme) => ({
  translationsRow: {
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    '&:last-child': {
      padding: theme.spacing(1),
    },
  },
  hide: {
    display: 'none',
  },
}))
