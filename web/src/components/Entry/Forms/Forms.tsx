import { useState } from 'react'

import {
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  Identifier,
  IdentifierType,
} from 'src/components/accessories/Identifier'
import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { getSettingsLocal } from 'src/components/user/settings/settingsLocal'
import {
  AdjectiveForms,
  Forms as FormsType,
  NounForms,
  VerbForms,
} from 'src/graphql/generated'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { AdjectiveFormsTable } from './PartsOfSpeech/AdjectiveFormsTable'
import { NounFormsTable } from './PartsOfSpeech/NounFormsTable'
import { VerbFormsTable } from './PartsOfSpeech/VerbFormsTable'

type Props = {
  search: string
  forms?: FormsType | null
  partOfSpeech: string
  identifiers: string[]
}

export const Forms = ({
  search,
  forms,
  partOfSpeech,
  identifiers: identifiersList = [],
}: Props) => {
  const theme = useTheme()
  const { user } = useLexicoContext()
  const expandedInitial =
    user?.settings?.formsExpandedDefault ||
    getSettingsLocal().formsExpandedDefault ||
    false
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  if (!search && !forms) return <></>
  return (
    <>
      <CardContent>
        <CardActionArea
          onClick={() => setExpanded((expanded) => !expanded)}
          disabled={!forms}
          disableRipple
          disableTouchRipple
          sx={{ paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1) }}
        >
          <Grid container wrap="nowrap">
            <Grid container item direction="column">
              <Typography variant="body1">{search || 'Forms'}</Typography>
              {identifiersList.map((identifiers) => (
                <Grid
                  container
                  item
                  key={identifiers}
                  sx={{ marginTop: theme.spacing(0.5) }}
                >
                  {identifiers.split(' ').map((identifier) => (
                    <Identifier
                      identifier={identifier as IdentifierType}
                      key={identifier}
                    />
                  ))}
                </Grid>
              ))}
            </Grid>
            {[
              'verb',
              'noun',
              'properNoun',
              'adjective',
              'participle',
              'suffix',
              'numeral',
              'pronoun',
              'determiner',
            ].includes(partOfSpeech) &&
              forms && (
                <ExpandIcon
                  {...{ expanded }}
                  sx={{
                    marginTop: theme.spacing(0.5),
                    marginRight: theme.spacing(0.5),
                  }}
                />
              )}
          </Grid>
        </CardActionArea>
      </CardContent>
      {forms && (
        <Collapse in={expanded}>
          <Divider variant="middle" />
          {['verb'].includes(partOfSpeech) ? (
            <VerbFormsTable forms={forms as VerbForms} search={search} />
          ) : ['noun', 'properNoun'].includes(partOfSpeech) ? (
            <NounFormsTable forms={forms as NounForms} search={search} />
          ) : [
              'adjective',
              'participle',
              'suffix',
              'numeral',
              'pronoun',
              'determiner',
            ].includes(partOfSpeech) ? (
            <AdjectiveFormsTable
              forms={forms as AdjectiveForms}
              search={search}
            />
          ) : null}
        </Collapse>
      )}
    </>
  )
}
