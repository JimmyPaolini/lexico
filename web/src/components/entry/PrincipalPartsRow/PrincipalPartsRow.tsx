import React from 'react'

import { styled } from '@mui/material/styles';

import { Box, CardHeader } from '@mui/material'

import { Inflection, Maybe, PrincipalPart } from '../../../graphql/generated'
import { unCamelCase } from '../../../utils/string'
import ExpandIcon from '../../accessories/ExpandIcon'
import BookmarkButton from './BookmarkButton'
import inflectionToString from './inflectionToString'

const PREFIX = 'PrincipalPartsRow';

const classes = {
  principalPartsRow: `${PREFIX}-principalPartsRow`,
  bookmark: `${PREFIX}-bookmark`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`& .${classes.principalPartsRow}`]: {
    background: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  [`& .${classes.bookmark}`]: {
    display: 'inline-block',
    position: 'relative',
    top: 8,
  }
}));

type Props = {
  id: string
  partOfSpeech: string
  principalParts: Maybe<PrincipalPart[]> | undefined
  inflection: Inflection | null | undefined
  bookmarked?: Maybe<boolean>
  expanded?: boolean
}

export default function PrincipalPartsRow({
  id,
  partOfSpeech,
  principalParts,
  inflection,
  bookmarked,
  expanded,
}: Props) {


  const principalPartsFormatted = principalParts
    ?.map((principalPart) => principalPart.text.join('/'))
    .join(', ')

  const subheader = `${unCamelCase(partOfSpeech)}, ${inflectionToString(
    inflection,
    partOfSpeech,
  )}`.replace(/, ?$|^, ?/, '')

  return (
    <CardHeader
      title={principalPartsFormatted}
      titleTypographyProps={{ variant: 'subtitle1' }}
      subheader={subheader}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
      className={classes.principalPartsRow}
      action={
        expanded === undefined ? (
          <BookmarkButton {...{ id, bookmarked }} />
        ) : (
          <StyledBox mt={2.5} mr={1.5}>
            <ExpandIcon expanded={expanded} />
          </StyledBox>
        )
      }
      aria-label="Principal Parts, Inflection, and Bookmark toggle"
    />
  );
}
