import React, { memo } from 'react'

import { Avatar, CardActionArea, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useRouter } from 'next/router'
import LinesEllipsis from 'react-lines-ellipsis'

import { Text } from '../../graphql/generated'
import { romanNumeralize } from '../../utils/romanNumeral'
import { sentenceCase } from '../../utils/string'

const PREFIX = 'LiteratureText'

const classes = {
  textContainer: `${PREFIX}-textContainer`,
  bookText: `${PREFIX}-bookText`,
  standaloneTextContainer: `${PREFIX}-standaloneTextContainer`,
  standaloneText: `${PREFIX}-standaloneText`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.textContainer}`]: {
    flex: '20%',
  },

  [`& .${classes.bookText}`]: {
    margin: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.standaloneTextContainer}`]: {
    height: 56,
    margin: theme.spacing(1),
    padding: '8px 8px',
    borderRadius: 16,
    background: theme.palette.grey[600],
    color: theme.palette.primary.main,
    overflow: 'hidden',
  },

  [`& .${classes.standaloneText}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: 'auto',
    lineHeight: 1.1,
    textAlign: 'center',
  },
}))

type Props = {
  text: Text
}
export default memo(function LiteratureText({ text }: Props) {
  const router = useRouter()

  const isTitleBook = text.title.match(/book \d+/i)

  return (
    <StyledGrid item xs={isTitleBook ? 2 : 4} container justifyContent="center">
      <CardActionArea onClick={() => router.push(`reader/${text.id}`)}>
        {isTitleBook ? (
          <Avatar className={classes.bookText}>
            {text.title.match(/\d+/)?.[0]}
          </Avatar>
        ) : (
          <Grid className={classes.standaloneTextContainer}>
            <Typography className={classes.standaloneText}>
              <LinesEllipsis
                text={romanNumeralize(sentenceCase(text.title))}
                maxLine="3"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </Typography>
          </Grid>
        )}
      </CardActionArea>
    </StyledGrid>
  )
})
