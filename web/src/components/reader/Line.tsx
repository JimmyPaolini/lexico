import { useContext } from 'react'

import { Divider, Grid, Skeleton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import LazyLoad from 'react-lazyload'

import { Line as ReaderLine } from 'src/graphql/generated'
import { getSettingsLocal } from 'src/utils/settingsLocal'
import { normalize } from 'src/utils/string'

import { Context } from '../layout/Context'
import { Word } from './Word'

type Props = { line: ReaderLine, openModal: (word: string) => void }

export const Line = ({ line, openModal }: Props) => {
  const theme = useTheme()
  const { user } = useContext(Context)
  const words = normalize(line.line).match(/\w+|\W+/gi)
  const lineLabelFontSize =
    ((user?.settings?.fontSize || getSettingsLocal().fontSize) as number) - 3

  return (
    <Grid container wrap="nowrap">
      <Typography
        sx={{
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'inline-block',
          height: '100%',
          marginRight: theme.spacing(1),
          marginLeft: theme.spacing(1),
          fontFamily: 'courier, monospace',
        }}
        align="right"
        component="span"
        variant="inherit"
        style={{ fontSize: lineLabelFontSize }}
      >
        {line.lineLabel}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: 'inline',
          marginRight: theme.spacing(1),
          background: theme.palette.primary.main,
        }}
      />
      <LazyLoad
        offset={1000}
        throttle={50}
        height={28}
        style={{ display: 'inline', width: '100%', flexGrow: 1 }}
        placeholder={<Skeleton />}
      >
        {words?.map((word, i) => (
          <Word {...{ word, openModal }} key={line.id + i} />
        ))}
      </LazyLoad>
    </Grid>
  )
}
