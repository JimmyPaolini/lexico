import { useState } from 'react'

import {
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  useTheme,
} from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { getSettingsLocal } from 'src/components/user/settings/settingsLocal'
import { Entry } from 'src/graphql/generated'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { Translation } from './Translation'

type Props = { translations: Entry['translations'] }

export const Translations = ({ translations }: Props) => {
  const theme = useTheme()
  const { user } = useLexicoContext()
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings?.translationsExpandedDefault ||
      getSettingsLocal().translationsExpandedDefault ||
      false
  )
  const expandable = (translations?.length ?? 0) > 2

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
