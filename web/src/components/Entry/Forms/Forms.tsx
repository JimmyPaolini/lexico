import { useContext, useState } from 'react'

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
  AdjectiveForms,
  Forms as FormsType,
  NounForms,
  VerbForms,
} from 'src/graphql/generated'
import { Identifier } from 'src/utils/identifiers'
import { getSettingsLocal } from 'src/utils/settingsLocal'

import { ExpandIcon } from '../../accessories/ExpandIcon'
import { IdentifierPill } from '../../accessories/Pills/IdentifierPill'
import { Context } from '../../layout/Context'
import { AdjectiveFormsTable } from './PartsOfSpeech/AdjectiveFormsTable'
import { NounFormsTable } from './PartsOfSpeech/NounFormsTable'
import { VerbFormsTable } from './PartsOfSpeech/VerbFormsTable'

type Props = {
  searched: string
  forms?: FormsType | null
  partOfSpeech: string
  identifiers: string[]
}

export const Forms = ({
  searched,
  forms,
  partOfSpeech,
  identifiers: identifiersList = [],
}: Props) => {
  const theme = useTheme()
  const { user } = useContext(Context)
  const expandedInitial =
    user?.settings?.formsExpandedDefault ||
    getSettingsLocal().formsExpandedDefault ||
    false
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  if (!searched) {
    searched =
      partOfSpeech === 'verb' ? 'Conjugation Table' : 'Declension Table'
  }

  if (searched.match(/Table/i) && !forms) return <></>

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
              <Typography variant="body1">{searched}</Typography>
              {identifiersList.map((identifiers) => (
                <Grid
                  container
                  item
                  key={identifiers}
                  sx={{ marginTop: theme.spacing(0.5) }}
                >
                  {identifiers.split(' ').map((identifier) => (
                    <IdentifierPill
                      identifier={identifier as Identifier}
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
            ].includes(partOfSpeech) && (
              <ExpandIcon
                {...{ expanded: Boolean(forms) }}
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
            <VerbFormsTable forms={forms as VerbForms} searched={searched} />
          ) : ['noun', 'properNoun'].includes(partOfSpeech) ? (
            <NounFormsTable forms={forms as NounForms} searched={searched} />
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
              searched={searched}
            />
          ) : null}
        </Collapse>
      )}
    </>
  )
}
