import { useContext, useState } from 'react'

import {
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  useTheme,
} from '@mui/material'

import { Entry } from 'src/hooks/search/useSearch'
import { getSettingsLocal } from 'src/utils/settingsLocal'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { Context } from '../../layout/Context'
import { Translation } from './Translation'

type Props = { translations: Entry['translations'] }

export const Translations = ({ translations }: Props) => {
  const theme = useTheme()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings?.translationsExpandedDefault ||
      getSettingsLocal().translationsExpandedDefault ||
      false,
  )
  const expandable = translations?.length! > 2

  return !translations?.length ? null : (
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
              <Translation translation={translation} key={translation.id} />
            ))}
            <Collapse in={expanded || !expandable}>
              {translations.slice(2).map((translation) => (
                <Translation translation={translation} key={translation.id} />
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
