import React, { memo } from 'react'

import { Add } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader as CardHeaderMui,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import CustomLiteratureRows from './CustomLiteratureRows'

const PREFIX = 'CustomLiteratureCard'

const classes = {
  literatureCustomCard: `${PREFIX}-literatureCustomCard`,
  noPadding: `${PREFIX}-noPadding`,
  add: `${PREFIX}-add`,
  action: `${PREFIX}-action`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.literatureCustomCard}`]: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - theme.spacing(4),
    paddingBottom: 0,
    margin: theme.spacing(1),
  },

  [`& .${classes.noPadding}`]: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },

  [`& .${classes.add}`]: {
    margin: theme.spacing(1),
    marginRight: 12,
  },

  [`& .${classes.action}`]: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}))

export default memo(function LiteratureCustomCard() {
  return (
    <StyledCard elevation={4} className={classes.literatureCustomCard}>
      <CardActionArea href="/literature/custom">
        <CardHeaderMui
          title="Your Literature"
          action={<Add className={classes.add} />}
          classes={{ action: classes.action }}
        />
      </CardActionArea>
      <CardContent className={classes.noPadding}>
        <CustomLiteratureRows />
      </CardContent>
    </StyledCard>
  )
})
