import { useContext, useState } from 'react'

import {
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  useTheme,
} from '@mui/material'

import { Translation } from '../../../graphql/generated'
import { getSettingsLocal } from '../../../utils/settingsLocal'
import ExpandIcon from '../../accessories/ExpandIcon'
import { Context } from '../../layout/Context'
import TranslationBullet from './TranslationBullet'

type Props = { translations: Translation[] }

export default function TranslationsRow({ translations }: Props) {
  const theme = useTheme()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings?.translationsExpandedDefault ||
      getSettingsLocal().translationsExpandedDefault ||
      false,
  )
  const expandable = translations.length > 2

  return (
    <CardContent>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disabled={!expandable}
        disableRipple
        disableTouchRipple
      >
        <Grid container justifyContent="space-evenly" wrap="nowrap">
          <Grid container item direction="column">
            {translations.slice(0, 2).map((translation) => (
              <TranslationBullet
                translation={translation}
                key={translation.id}
              />
            ))}
            <Collapse in={expanded || !expandable} timeout={250} mountOnEnter>
              {translations.slice(2).map((translation) => (
                <TranslationBullet
                  translation={translation}
                  key={translation.id}
                />
              ))}
            </Collapse>
          </Grid>
          {expandable && (
            <ExpandIcon
              expanded={expanded}
              sx={{
                marginTop: theme.spacing(0.5),
                marginRight: theme.spacing(1.5),
              }}
            />
          )}
        </Grid>
      </CardActionArea>
    </CardContent>
  )
}
