import React from 'react'

import { Card, Divider, Grid, Grow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Head from 'next/head'

import CommentBox from '../components/about/CommentBox'
import ToolIconGrid from '../components/about/ToolIconGrid'
import UpcommingFeatures from '../components/about/UpcomingFeatures'
import CardHeader from '../components/accessories/CardHeader'

export default function About() {
  const theme = useTheme()
  return (
    <>
      <Head>
        <title>Lexico - About</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          overflowX: 'hidden',
        }}
      >
        <Grow in={true}>
          <Card
            sx={{
              padding: theme.spacing(1),
              margin: theme.spacing(2),
              marginTop: theme.spacing(4),
              maxWidth: theme.custom.cardWidth * 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <CardHeader title="About" />
            <Divider sx={{ margin: theme.spacing(1) }} />
            <Typography variant="body1" sx={{ padding: theme.spacing(1) }}>
              I love reading and writing Latin, so I built Lexico to help others
              enjoy Latin through a user-friendly dictionary and literature
              interface. As with all things it is a work ever in progress, so as
              long as folks use it I’ll be striving to improve it. Contact me
              below if you&apos;d like to get involved!
            </Typography>
            <Divider sx={{ margin: theme.spacing(1) }} />
            <ToolIconGrid />
            <Divider sx={{ margin: theme.spacing(1) }} />
            <CommentBox />
            <Divider sx={{ margin: theme.spacing(1) }} />
            <UpcommingFeatures />
            <Divider sx={{ margin: theme.spacing(1) }} />
            <Typography variant="h6" align="center">
              Omnia mūtantur, nihil īnterit
            </Typography>
          </Card>
        </Grow>
      </Grid>
    </>
  )
}
