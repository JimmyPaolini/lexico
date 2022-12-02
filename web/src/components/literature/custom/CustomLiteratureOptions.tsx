import { MouseEvent, useState } from 'react'

import { AccountCircle, MoreHoriz } from '@mui/icons-material'
import { IconButton, ListItemSecondaryAction } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CustomText } from 'src/utils/literatureLocal'

import { CustomLiteratureMenu } from './CustomLiteratureOptions/CustomLiteratureMenu'

const PREFIX = 'CustomLiteratureOptions'

const classes = {
  iconButtons: `${PREFIX}-iconButtons`,
  options: `${PREFIX}-options`,
}

const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)(() => ({
  [`&.${classes.iconButtons}`]: {
    position: 'relative',
    right: 0,
    flexShrink: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    transform: 'none',
  },

  [`& .${classes.options}`]: {
    padding: 4,
  },
}))

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}

export const CustomLiteratureOptions = ({
  text,
  refreshCustomTexts,
}: Props) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  return (
    <StyledListItemSecondaryAction
      onClick={(event) => event.stopPropagation()}
      className={classes.iconButtons}
    >
      {!text?.local ? (
        <IconButton
          disabled
          aria-label="on user"
          className={classes.options}
          size="large"
        >
          <AccountCircle />
        </IconButton>
      ) : null}
      <IconButton
        aria-label="options"
        className={classes.options}
        onClick={openMenu}
        size="large"
      >
        <MoreHoriz />
      </IconButton>
      <CustomLiteratureMenu
        {...{ text, refreshCustomTexts, anchor, setAnchor }}
      />
    </StyledListItemSecondaryAction>
  )
}
