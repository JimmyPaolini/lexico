import React from 'react'

import { Card, Divider, Grid, Grow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'

import CommentBox from '../components/about/CommentBox'
import ToolIconGrid from '../components/about/ToolIconGrid'
import UpcommingFeatures from '../components/about/UpcomingFeatures'
import CardHeader from '../components/accessories/CardHeader'

const PREFIX = 'about'

const classes = {
  card: `${PREFIX}-card`,
  body: `${PREFIX}-body`,
  divider: `${PREFIX}-divider`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.card}`]: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    maxWidth: theme.custom.cardWidth * 2,
  },

  [`& .${classes.body}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.divider}`]: {
    margin: theme.spacing(1),
  },
}))

export default function About() {
  return (
    <Root>
      <Head>
        <title>Lexico - About</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ overflowX: 'hidden' }}
      >
        <Grow in={true}>
          <Card className={classes.card}>
            <CardHeader title="About" />
            <Divider className={classes.divider} />
            <Typography variant="body1" className={classes.body}>
              I love reading and writing Latin, so I built Lexico to help others
              enjoy Latin through a user-friendly dictionary and literature
              interface. As with all things it is a work ever in progress, so as
              long as folks use it I’ll be striving to improve it. Contact me
              below if you&apos;d like to get involved!
            </Typography>
            <Divider className={classes.divider} />
            <ToolIconGrid />
            <Divider className={classes.divider} />
            <CommentBox />
            <Divider className={classes.divider} />
            <UpcommingFeatures />
            <Divider className={classes.divider} />
            <Typography variant="h6" align="center">
              Omnia mūtantur, nihil īnterit
            </Typography>
          </Card>
        </Grow>
      </Grid>
    </Root>
  )
}
