import React, { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import SwitchMui from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'

const PREFIX = 'SwitchEnglishLatin'

const classes = {
  switchBase: `${PREFIX}-switchBase`,
  track: `${PREFIX}-track`,
  thumb: `${PREFIX}-thumb`,
  checked: `${PREFIX}-checked`,
  box: `${PREFIX}-box`,
  switch: `${PREFIX}-switch`,
  primary: `${PREFIX}-primary`,
  secondary: `${PREFIX}-secondary`,
  la: `${PREFIX}-la`,
  en: `${PREFIX}-en`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    position: 'relative',
    height: 40,
    width: 64,
  },

  [`& .${classes.switch}`]: {
    height: 40,
    width: 64,
    padding: 8,
  },

  [`& .${classes.primary}`]: {
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.secondary}`]: {
    backgroundColor: theme.palette.secondary.main,
  },

  [`& .${classes.la}`]: {
    position: 'absolute',
    top: 11,
    color: theme.palette.text.secondary,
    fontSize: 12,
    pointerEvents: 'none',
    left: 37,
  },

  [`& .${classes.en}`]: {
    position: 'absolute',
    top: 11,
    color: theme.palette.text.secondary,
    fontSize: 12,
    pointerEvents: 'none',
    left: 12,
  },
}))

type Props = {
  isLatin: boolean
  setLatin: Dispatch<SetStateAction<boolean>>
}

export default function SwitchEnglishLatin({ isLatin, setLatin }: Props) {
  return (
    <StyledBox className={classes.box}>
      <Switch
        name="English/Latin"
        color="primary"
        checked={isLatin}
        onClick={() => setLatin((isLatin) => !isLatin)}
        className={classes.switch}
        inputProps={{ 'aria-label': 'English/Latin Toggle' }}
        classes={{
          track: isLatin ? classes.primary : classes.secondary,
          thumb: isLatin ? classes.primary : classes.secondary,
          switchBase: classes.switchBase,
          checked: classes.checked,
        }}
        disableRipple
        disableTouchRipple
        disableFocusRipple
      />
      <Typography className={classes.en}>EN</Typography>
      <Typography className={classes.la}>LA</Typography>
    </StyledBox>
  )
}

const Switch = SwitchMui
