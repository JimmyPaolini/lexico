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
  Forms,
  NounForms,
  VerbForms,
} from '../../../graphql/generated'
import { Identifier } from '../../../utils/identifiers'
import { getSettingsLocal } from '../../../utils/settingsLocal'
import ExpandIcon from '../../accessories/ExpandIcon'
import IdentifierPill from '../../accessories/Pills/IdentifierPill'
import { Context } from '../../layout/Context'
import AdjectiveFormsTable from './PartsOfSpeech/AdjectiveFormsTable'
import NounFormsTable from './PartsOfSpeech/NounFormsTable'
import VerbFormsTable from './PartsOfSpeech/VerbFormsTable'

type Props = {
  searched: string
  forms?: Forms | null
  partOfSpeech: string
  identifiers: string[]
}

export default function FormsRow({
  searched,
  forms,
  partOfSpeech,
  identifiers: identifiersList = [],
}: Props) {
  const theme = useTheme()
  const { user } = useContext(Context)
  const expandedInitial =
    user?.settings?.formsExpandedDefault ||
    getSettingsLocal().formsExpandedDefault ||
    false
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  if (!searched)
    searched =
      partOfSpeech === 'verb' ? 'Conjugation Table' : 'Declension Table'

  const FormsTable = !forms ? null : partOfSpeechToFormsCard[partOfSpeech]

  const expandable = forms && FormsTable

  if (searched.match(/Table/i) && !expandable) return <></>

  return (
    <>
      <CardContent>
        <CardActionArea
          onClick={() => setExpanded((expanded) => !expanded)}
          disabled={!expandable}
          disableRipple
          disableTouchRipple
          sx={{ paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1) }}
        >
          <Grid container wrap="nowrap">
            <Grid container item direction="column">
              <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
                {searched}
              </Typography>
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
            {FormsTable && (
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
      {expandable && (
        <Collapse in={expanded}>
          <Divider variant="middle" />
          <FormsTable
            forms={forms as VerbForms | NounForms | AdjectiveForms}
            searched={searched}
          />
        </Collapse>
      )}
    </>
  )
}

const partOfSpeechToFormsCard = {
  verb: VerbFormsTable,
  noun: NounFormsTable,
  properNoun: NounFormsTable,
  adjective: AdjectiveFormsTable,
  participle: AdjectiveFormsTable,
  suffix: AdjectiveFormsTable,
  numeral: AdjectiveFormsTable,
  pronoun: AdjectiveFormsTable,
  determiner: AdjectiveFormsTable,
} as {
  [key: string]:
    | typeof VerbFormsTable
    | typeof NounFormsTable
    | typeof AdjectiveFormsTable
}
